import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getCmsBlogList, type CmsBlogListPost } from "~/lib/cms/client";
import { locales } from "~/i18n/config";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.robusst.com";

export const dynamic = "force-static";
export const revalidate = 300;

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// ─── Dynamic OG image for the blog listing page ───────────────────────────────
const OG_TITLE = "Robusst Blog | AI & Telecom Insights";
const OG_DESC =
  "Expert perspectives on AI-driven telecom transformation, network monetization, revenue assurance, and enterprise digital strategy — from the Robusst team.";
const OG_IMAGE_URL = `${BASE_URL}/api/og?title=${encodeURIComponent(OG_TITLE)}&description=${encodeURIComponent(OG_DESC)}`;

export const metadata: Metadata = {
  title: "Blog | Robusst — AI & Telecom Insights",
  description:
    "Explore expert insights on AI, telecom transformation, network monetization, and enterprise digital strategy from the Robusst team.",
  keywords: [
    "Robusst Blog",
    "Telecom AI Insights",
    "Network Monetization",
    "Enterprise Digital Transformation",
    "AI Strategy",
    "B2B Technology",
    "Telecom Innovation",
    "AI-Powered Solutions",
    "Digital Transformation",
  ].join(", "),
  authors: [{ name: "Robusst Team", url: BASE_URL }],
  creator: "Robusst",
  publisher: "Robusst",
  category: "Technology Insights",
  openGraph: {
    title: OG_TITLE,
    description: OG_DESC,
    url: `${BASE_URL}/en/blogs`,
    siteName: "Robusst",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Robusst Blog — AI & Telecom Insights",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@robusst",
    creator: "@robusst",
    title: OG_TITLE,
    description: OG_DESC,
    images: [
      { url: OG_IMAGE_URL, alt: "Robusst Blog — AI & Telecom Insights" },
    ],
  },
  alternates: {
    canonical: `${BASE_URL}/en/blogs`,
    languages: {
      en: `${BASE_URL}/en/blogs`,
      fr: `${BASE_URL}/fr/blogs`,
      ru: `${BASE_URL}/ru/blogs`,
      pt: `${BASE_URL}/pt/blogs`,
      es: `${BASE_URL}/es/blogs`,
      ar: `${BASE_URL}/ar/blogs`,
    },
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

export default async function BlogsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = await getCmsBlogList(locale);
  const allPosts: CmsBlogListPost[] = posts ?? [];

  const blogListJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${BASE_URL}/${locale}/blogs`,
    name: "Robusst Blog",
    description:
      "Expert perspectives on AI-driven telecom transformation, network monetization, revenue assurance, and enterprise digital strategy — from the Robusst team.",
    url: `${BASE_URL}/${locale}/blogs`,
    inLanguage: "en-US",
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
    blogPost: allPosts.map((post) => ({
      "@type": "BlogPosting",
      "@id": `${BASE_URL}/${locale}/blogs/${post.slug}`,
      headline: post.title,
      name: post.title,
      description: post.meta?.metaDescription ?? post.excerpt ?? "",
      url: `${BASE_URL}/${locale}/blogs/${post.slug}`,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
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
      },
      image: {
        "@type": "ImageObject",
        url: `${BASE_URL}/api/og?title=${encodeURIComponent(post.title)}&description=${encodeURIComponent(post.meta?.metaDescription ?? post.excerpt ?? "")}`,
        width: 1200,
        height: 630,
      },
      keywords: [post.meta?.primaryKeyword, ...post.tags]
        .filter(Boolean)
        .join(", "),
      isPartOf: {
        "@type": "Blog",
        name: "Robusst Blog",
        url: `${BASE_URL}/${locale}/blogs`,
      },
    })),
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListJsonLd) }}
      />

      {/* ─── Hero Banner ─────────────────────────────────────────────────── */}
      <div className="bg-primary relative mt-30 flex min-h-[45vh] w-full flex-col items-center justify-center overflow-hidden px-6 py-20 sm:px-12 lg:px-25">
        <div className="bg-brand-one absolute top-0 right-0 h-40 w-160 -translate-x-1/2 -translate-y-1/2 blur-[120px]" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h1 className="text-primary-foreground text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl">
            AI &amp; Telecom Blog
          </h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-base sm:text-lg">
            Expert perspectives on AI-driven telecom transformation, network
            monetization, and enterprise digital strategy — from the Robusst
            team.
          </p>
          <p className="text-primary-foreground/50 mt-6 text-sm">
            {allPosts.length} article{allPosts.length !== 1 ? "s" : ""}{" "}
            published
          </p>
        </div>
      </div>

      {/* ─── Blog Grid ───────────────────────────────────────────────────── */}
      <div className="bg-background py-16 sm:py-20 lg:py-25">
        <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-12 lg:px-25">
          {allPosts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-2xl font-semibold text-gray-800">
                No articles yet
              </p>
              <p className="mt-2 text-gray-500">
                No articles have been published yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {allPosts.map((post) => {
                const primaryKeyword =
                  post.meta?.primaryKeyword ?? post.tags[0] ?? null;

                const formattedDate = new Date(
                  post.publishedAt,
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });

                return (
                  <Link
                    key={post.slug}
                    href={`/${locale}/blogs/${post.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    aria-label={`Read: ${post.title}`}
                  >
                    {/* Card body */}
                    <div className="flex flex-1 flex-col gap-3 p-6">
                      {/* Keyword tag */}
                      {primaryKeyword && (
                        <span className="bg-brand-one/10 text-brand-one w-fit rounded-full px-3 py-0.5 text-xs font-medium">
                          {primaryKeyword}
                        </span>
                      )}

                      {/* Title */}
                      <h2 className="line-clamp-2 text-lg leading-snug font-semibold text-gray-900 transition-colors group-hover:text-blue-600 sm:text-xl">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-gray-500">
                        {post.excerpt ?? ""}
                      </p>

                      {/* Footer */}
                      <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-4">
                        <p className="text-xs text-gray-400">{formattedDate}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
