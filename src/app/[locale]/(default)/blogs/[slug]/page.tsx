import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// types
import type { Metadata } from "next";

// styles
import markdownStyles from "~/styles/markdown-styles.module.css";

// utils
import {
  getAllBlogs,
  getBlogBySlug,
  getRelatedBlogs,
  calculateReadingTime,
} from "~/utils/api";
import markdownToHtml from "~/utils/markdownToHtml";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.robusst.com";

// Supported locales for hreflang alternates
const LOCALES = ["en", "fr", "ru", "pt", "es", "ar"] as const;

// ─── Static Generation ────────────────────────────────────────────────────────

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllBlogs().map((post) => ({ slug: post.slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata(props: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await props.params;
  const post = getBlogBySlug(slug);

  if (!post) return {};

  const canonicalLocale = "en";
  const canonicalUrl = `${BASE_URL}/${canonicalLocale}/blogs/${slug}`;

  // Dynamic OG image via /api/og route
  const ogImageUrl = `${BASE_URL}/api/og?title=${encodeURIComponent(
    post.metaTitle ?? post.title,
  )}&description=${encodeURIComponent(
    post.metaDescription ?? post.excerpt ?? "",
  )}`;

  // Build hreflang alternates — point every locale to the same canonical English URL
  // since blog posts are currently English-only
  const languageAlternates = Object.fromEntries(
    LOCALES.map((l) => [`${l}`, `${BASE_URL}/${l}/blogs/${slug}`]),
  );

  const keywords = [
    post.primaryKeyword,
    ...(post.secondaryKeywords ?? []),
    "Robusst",
    "Telecom AI Solutions",
    "Enterprise Technology",
    "Digital Transformation",
  ]
    .filter(Boolean)
    .join(", ");

  return {
    title: post.metaTitle ?? `${post.title} | Robusst Blog`,
    description: post.metaDescription ?? post.excerpt,
    keywords,

    authors: [{ name: "Robusst Team", url: BASE_URL }],
    creator: "Robusst",
    publisher: "Robusst",
    category: "Technology Insights",

    openGraph: {
      title: post.metaTitle ?? post.title,
      description: post.metaDescription ?? post.excerpt,
      url: `${BASE_URL}/${locale}/blogs/${slug}`,
      siteName: "Robusst",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.metaTitle ?? post.title,
          type: "image/png",
        },
      ],
      locale: locale === "ar" ? "ar_SA" : `${locale}_${locale.toUpperCase()}`,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: ["Robusst Team"],
      tags: [post.primaryKeyword, ...(post.secondaryKeywords ?? [])].filter(
        Boolean,
      ) as string[],
    },

    twitter: {
      card: "summary_large_image",
      site: "@robusst",
      creator: "@robusst",
      title: post.metaTitle ?? post.title,
      description: post.metaDescription ?? post.excerpt,
      images: [{ url: ogImageUrl, alt: post.metaTitle ?? post.title }],
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
  const post = getBlogBySlug(slug);

  if (!post) notFound();

  const content = await markdownToHtml(post.content ?? "");
  const readingTime = calculateReadingTime(post.content ?? "");
  const wordCount = post.content?.split(/\s+/).length ?? 0;
  const relatedPosts = getRelatedBlogs(post, 3);
  const postUrl = `${BASE_URL}/${locale}/blogs/${slug}`;
  const canonicalUrl = `${BASE_URL}/en/blogs/${slug}`;

  // ─── JSON-LD ───────────────────────────────────────────────────────────────

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": canonicalUrl,
    headline: post.title,
    name: post.title,
    description: post.metaDescription ?? post.excerpt,
    url: canonicalUrl,
    image: {
      "@type": "ImageObject",
      url: `${BASE_URL}${post.coverImage}`,
      width: 1200,
      height: 630,
    },
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "en-US",
    author: {
      "@type": "Organization",
      name: "Robusst Team",
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
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    about: {
      "@type": "Thing",
      name: post.primaryKeyword ?? "Telecom AI Solutions",
    },
    keywords: [post.primaryKeyword, ...(post.secondaryKeywords ?? [])]
      .filter(Boolean)
      .join(", "),
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

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
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

        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-center text-base sm:text-lg">
          {post.excerpt}
        </p>

        {/* Meta row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-white/60">
          <time dateTime={post.date}>{formattedDate}</time>
          <span className="text-white/30" aria-hidden>
            ·
          </span>
          <span>{readingTime} min read</span>
          <span className="text-white/30" aria-hidden>
            ·
          </span>
          <span>{wordCount.toLocaleString()} words</span>
          {post.primaryKeyword && (
            <>
              <span className="text-white/30" aria-hidden>
                ·
              </span>
              <span className="rounded-full bg-white/10 px-3 py-0.5 text-xs text-white/80">
                {post.primaryKeyword}
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

      {/* ─── Share / CTA strip ────────────────────────────────────────────── */}
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
        <section className="bg-gray-50 py-16" aria-labelledby="related-heading">
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
                  <div className="relative h-44 w-full overflow-hidden bg-gray-100">
                    <Image
                      src={related.coverImage}
                      alt={related.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col gap-2 p-5">
                    <p className="text-xs text-gray-400">
                      <time dateTime={related.date}>
                        {new Date(related.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                      {" · "}
                      {calculateReadingTime(related.content ?? "")} min read
                    </p>
                    <h3 className="line-clamp-2 text-sm leading-snug font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
                      {related.title}
                    </h3>
                    <p className="line-clamp-2 text-xs text-gray-500">
                      {related.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
