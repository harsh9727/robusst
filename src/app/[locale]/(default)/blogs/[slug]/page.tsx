import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

import markdownStyles from "~/styles/markdown-styles.module.css";
import markdownToHtml from "~/utils/markdownToHtml";
import { locales } from "~/i18n/config";
import {
  getCmsBlogList,
  getCmsBlogPost,
  type CmsBlogPostFull,
} from "~/lib/cms/client";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.robusst.com";

// ─── ISR ──────────────────────────────────────────────────────────────────────
export const dynamic = "force-static";
export const revalidate = 300;
// New slugs only appear after a rebuild or when the revalidation webhook fires.
// Requests for slugs not in the static set 404 instead of trying to render.
export const dynamicParams = false;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function calculateReadingTime(text: string): number {
  return Math.ceil(text.split(/\s+/).length / 200);
}

function buildOgImageUrl(title: string, description: string): string {
  return `${BASE_URL}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;
}

/** Tag-overlap scoring for related posts (same algorithm as the old api.ts) */
function getRelatedPosts(
  current: CmsBlogPostFull,
  allPosts: Awaited<ReturnType<typeof getCmsBlogList>>,
  limit = 3,
) {
  if (!allPosts) return [];

  const others = allPosts.filter((p) => p.slug !== current.slug);
  if (others.length === 0) return [];

  const toTokens = (tags: string[]) =>
    new Set(
      tags
        .join(" ")
        .toLowerCase()
        .split(/\W+/)
        .filter((w) => w.length > 3),
    );

  const currentTokens = toTokens([
    current.meta?.primaryKeyword ?? "",
    ...current.tags,
  ]);

  if (currentTokens.size === 0) return others.slice(0, limit);

  return others
    .map((p) => {
      const tokens = toTokens([p.meta?.primaryKeyword ?? "", ...p.tags]);
      let score = 0;
      for (const t of currentTokens) if (tokens.has(t)) score++;
      return { p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ p }) => p);
}

// ─── Static Params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  // Fetch the canonical English slug list; replicate across every locale.
  const posts = await getCmsBlogList("en");
  if (!posts) return [];

  return locales.flatMap((locale) =>
    posts.map((post) => ({ locale, slug: post.slug })),
  );
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata(props: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await props.params;

  // Try locale-specific first; fall back to English if the CMS doesn't have a
  // translation yet (blogs are currently English-only).
  const post =
    (await getCmsBlogPost(slug, locale)) ??
    (locale !== "en" ? await getCmsBlogPost(slug, "en") : null);

  if (!post) return {};

  const metaTitle = post.meta?.metaTitle ?? post.title;
  const metaDescription = post.meta?.metaDescription ?? post.excerpt ?? "";
  const primaryKeyword = post.meta?.primaryKeyword ?? post.tags[0] ?? "";
  const ogImageUrl = buildOgImageUrl(metaTitle, metaDescription);
  const canonicalUrl = `${BASE_URL}/en/blogs/${slug}`;

  const keywords = [
    primaryKeyword,
    ...post.tags,
    "Robusst",
    "Telecom AI Solutions",
    "Enterprise Technology",
    "Digital Transformation",
  ]
    .filter(Boolean)
    .join(", ");

  const languageAlternates = Object.fromEntries(
    locales.map((l) => [l, `${BASE_URL}/${l}/blogs/${slug}`]),
  );

  return {
    title: metaTitle,
    description: metaDescription,
    keywords,
    authors: [{ name: post.author?.name ?? "Robusst Team", url: BASE_URL }],
    creator: "Robusst",
    publisher: "Robusst",
    category: "Technology Insights",

    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `${BASE_URL}/${locale}/blogs/${slug}`,
      siteName: "Robusst",
      images: [
        {
          url: post.coverImage ?? ogImageUrl,
          width: 1200,
          height: 630,
          alt: metaTitle,
          type: post.coverImage ? "image/jpeg" : "image/png",
        },
      ],
      locale: locale === "ar" ? "ar_SA" : `${locale}_${locale.toUpperCase()}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author?.name ?? "Robusst Team"],
      tags: [primaryKeyword, ...post.tags].filter(Boolean),
    },

    twitter: {
      card: "summary_large_image",
      site: "@robusst",
      creator: "@robusst",
      title: metaTitle,
      description: metaDescription,
      images: [{ url: post.coverImage ?? ogImageUrl, alt: metaTitle }],
    },

    alternates: {
      canonical: canonicalUrl,
      languages: languageAlternates,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  // Try locale-specific first, then fall back to English.
  const post =
    (await getCmsBlogPost(slug, locale)) ??
    (locale !== "en" ? await getCmsBlogPost(slug, "en") : null);

  if (!post) notFound();

  const content = await markdownToHtml(post.body ?? "");
  const readingTime = calculateReadingTime(post.body ?? "");
  const wordCount = (post.body ?? "").split(/\s+/).length;

  // Related posts — fetch the list (cheap: same ISR-cached request) and score.
  const allPosts = await getCmsBlogList(locale === "en" ? "en" : "en");
  const relatedPosts = getRelatedPosts(post, allPosts);

  const postUrl = `${BASE_URL}/${locale}/blogs/${slug}`;
  const canonicalUrl = `${BASE_URL}/en/blogs/${slug}`;

  const metaTitle = post.meta?.metaTitle ?? post.title;
  const metaDescription = post.meta?.metaDescription ?? post.excerpt ?? "";
  const primaryKeyword = post.meta?.primaryKeyword ?? post.tags[0] ?? "";
  const ogImageUrl = buildOgImageUrl(metaTitle, metaDescription);
  const coverImageUrl = post.coverImage ?? ogImageUrl;

  // ─── JSON-LD ───────────────────────────────────────────────────────────────

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": canonicalUrl,
    headline: post.title,
    name: post.title,
    description: metaDescription,
    url: canonicalUrl,
    image: {
      "@type": "ImageObject",
      url: coverImageUrl,
      width: 1200,
      height: 630,
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    inLanguage: "en-US",
    author: {
      "@type": "Organization",
      name: post.author?.name ?? "Robusst Team",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Robusst",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.webp`,
        width: 200,
        height: 80,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    about: {
      "@type": "Thing",
      name: primaryKeyword || "Telecom AI Solutions",
    },
    keywords: [primaryKeyword, ...post.tags].filter(Boolean).join(", "),
    wordCount,
    timeRequired: `PT${readingTime}M`,
    articleSection: "Technology Insights",
    isPartOf: {
      "@type": "Blog",
      name: "Robusst Blog",
      url: `${BASE_URL}/en/blogs`,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${BASE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${BASE_URL}/${locale}/blogs`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  };

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {/* ─── Structured Data ──────────────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ─── Hero Banner ──────────────────────────────────────────────────── */}
      <div className="bg-primary mt-24 flex min-h-[50vh] w-full flex-col items-center justify-center px-6 py-16 sm:mt-28 sm:px-12 sm:py-20 lg:mt-32 lg:px-24">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center gap-2 text-xs text-white/40"
        >
          <Link
            href={`/${locale}`}
            className="transition-colors hover:text-white/70"
          >
            Home
          </Link>
          <span>/</span>
          <Link
            href={`/${locale}/blogs`}
            className="transition-colors hover:text-white/70"
          >
            Blog
          </Link>
          <span>/</span>
          <span className="line-clamp-1 max-w-[200px] text-white/60 sm:max-w-xs">
            {post.title}
          </span>
        </nav>

        <h1 className="text-primary-foreground mx-auto max-w-4xl text-center text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl xl:text-6xl">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-center text-base sm:text-lg">
            {post.excerpt}
          </p>
        )}

        {/* Meta row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-white/60">
          <time dateTime={post.publishedAt}>{formattedDate}</time>
          <span className="text-white/30" aria-hidden>
            ·
          </span>
          <span>{readingTime} min read</span>
          <span className="text-white/30" aria-hidden>
            ·
          </span>
          <span>{wordCount.toLocaleString()} words</span>
          {primaryKeyword && (
            <>
              <span className="text-white/30" aria-hidden>
                ·
              </span>
              <span className="rounded-full bg-white/10 px-3 py-0.5 text-xs text-white/80">
                {primaryKeyword}
              </span>
            </>
          )}
        </div>
      </div>

      {/* ─── Article Body ─────────────────────────────────────────────────── */}
      <article
        id="main-content"
        className="mx-auto max-w-3xl px-6 py-12 sm:px-10 lg:px-6 xl:px-0"
      >
        <div
          className={markdownStyles.markdown}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>

      {/* ─── CTA Strip ────────────────────────────────────────────────────── */}
      <div className="bg-primary mx-auto mb-12 max-w-3xl rounded-2xl px-8 py-8 sm:px-10">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-white">
              Want results like this for your enterprise?
            </p>
            <p className="mt-1 text-sm text-white/60">
              Talk to our team about deploying AI solutions for telecom &amp;
              banking.
            </p>
          </div>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex shrink-0 items-center rounded-full bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
          >
            Get in Touch →
          </Link>
        </div>
      </div>

      {/* ─── Related Posts ────────────────────────────────────────────────── */}
      {relatedPosts.length > 0 && (
        <>
          <div className="w-full overflow-hidden bg-white sm:-mt-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 150"
              preserveAspectRatio="none"
            >
              <path
                d="M0,120 C300,150 400,150 600,120 C800,90 900,90 1200,120 L1200,0 L0,0 Z"
                fill="#000000"
                stroke="none"
              />
            </svg>
          </div>

          <section
            className="bg-gray-50 py-16"
            aria-labelledby="related-heading"
          >
            <div className="mx-auto max-w-6xl px-6 sm:px-12 lg:px-16">
              <h2
                id="related-heading"
                className="text-2xl font-bold text-gray-900 sm:text-3xl"
              >
                Related Articles
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/${locale}/blogs/${related.slug}`}
                    className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                    aria-label={`Read: ${related.title}`}
                  >
                    <div className="flex flex-col gap-2 p-5">
                      <p className="text-xs text-gray-400">
                        <time dateTime={related.publishedAt}>
                          {new Date(related.publishedAt).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "long", day: "numeric" },
                          )}
                        </time>
                      </p>
                      <h3 className="line-clamp-2 text-sm leading-snug font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
                        {related.title}
                      </h3>
                      <p className="line-clamp-2 text-xs text-gray-500">
                        {related.excerpt ?? ""}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <div className="w-full overflow-hidden bg-white sm:-mb-5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 150">
              <path
                d="M0,80 C300,50 400,50 600,80 C800,110 900,110 1200,80 L1200,200 L0,200 Z"
                fill="#000000"
              />
            </svg>
          </div>
        </>
      )}
    </>
  );
}
