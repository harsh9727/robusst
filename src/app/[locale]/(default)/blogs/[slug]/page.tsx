import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { BlogPortableText } from "~/components/feature/BlogPortableText/BlogPortableText";
import { locales } from "~/i18n/config";
import { getBlogPost, getBlogPostSlugs } from "~/sanity/queries/blog";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.robusst.com";
export const dynamic = "force-static";
export const revalidate = 300;
// New published slugs render on demand and are cached without requiring a rebuild.
export const dynamicParams = true;

function metrics(text: string) {
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  return { wordCount, readingTime: Math.max(1, Math.ceil(wordCount / 200)) };
}

export async function generateStaticParams() {
  const posts = await getBlogPostSlugs();
  return posts
    .filter((post) =>
      locales.includes(post.language as (typeof locales)[number]),
    )
    .map(({ language: locale, slug }) => ({ locale, slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = await getBlogPost(locale, slug);
  if (!post) return {};
  const canonical = `${BASE_URL}/${locale}/blogs/${slug}`;
  const languages = Object.fromEntries(
    locales.map((language) => [
      language,
      `${BASE_URL}/${language}/blogs/${slug}`,
    ]),
  );
  const imageUrl = post.seo.socialImage ?? post.coverImage;
  const images = imageUrl
    ? [{ url: imageUrl, alt: post.coverImageAlt ?? post.seo.title }]
    : undefined;
  return {
    title: post.seo.title,
    description: post.seo.description,
    keywords: post.seo.keywords ?? undefined,
    authors: [{ name: post.authorName, url: BASE_URL }],
    creator: post.site?.siteName ?? "Robusst",
    publisher: post.site?.siteName ?? "Robusst",
    alternates: {
      canonical,
      languages: { ...languages, "x-default": `${BASE_URL}/en/blogs/${slug}` },
    },
    openGraph: {
      title: post.seo.socialTitle ?? post.seo.title,
      description: post.seo.socialDescription ?? post.seo.description,
      url: canonical,
      siteName: post.site?.siteName ?? "Robusst",
      images,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.authorName],
      tags: post.seo.keywords ?? undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo.socialTitle ?? post.seo.title,
      description: post.seo.socialDescription ?? post.seo.description,
      images,
    },
    robots: { index: !post.seo.noIndex, follow: !post.seo.noIndex },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const post = await getBlogPost(locale, slug);
  if (!post?.indexPage) notFound();
  const labels = post.indexPage.articleUi.labels ?? [];
  const { wordCount, readingTime } = metrics(post.plainText);
  const formattedDate = new Date(post.publishedAt).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const postUrl = `${BASE_URL}/${locale}/blogs/${slug}`;
  const primaryKeyword = post.seo.keywords?.[0] ?? post.categories?.[0] ?? "";
  const imageUrl = post.seo.socialImage ?? post.coverImage;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": postUrl,
    headline: post.title,
    name: post.title,
    description: post.seo.description,
    url: postUrl,
    image: imageUrl ? { "@type": "ImageObject", url: imageUrl } : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    inLanguage: locale,
    author: { "@type": "Organization", name: post.authorName, url: BASE_URL },
    publisher: {
      "@type": "Organization",
      name: post.site?.siteName,
      url: BASE_URL,
      logo: post.site?.logo
        ? { "@type": "ImageObject", url: post.site.logo }
        : undefined,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    about: primaryKeyword
      ? { "@type": "Thing", name: primaryKeyword }
      : undefined,
    keywords: post.seo.keywords?.join(", "),
    wordCount,
    timeRequired: `PT${readingTime}M`,
    isPartOf: {
      "@type": "Blog",
      name: labels[1],
      url: `${BASE_URL}/${locale}/blogs`,
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: labels[0],
        item: `${BASE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: labels[1],
        item: `${BASE_URL}/${locale}/blogs`,
      },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="bg-primary mt-24 flex min-h-[50vh] w-full flex-col items-center justify-center px-6 py-16 sm:mt-28 sm:px-12 sm:py-20 lg:mt-32 lg:px-24">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center gap-2 text-xs text-white/40"
        >
          <Link
            href={`/${locale}`}
            className="transition-colors hover:text-white/70"
          >
            {labels[0]}
          </Link>
          <span>/</span>
          <Link
            href={`/${locale}/blogs`}
            className="transition-colors hover:text-white/70"
          >
            {labels[1]}
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
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-white/60">
          <time dateTime={post.publishedAt}>{formattedDate}</time>
          <span className="text-white/30" aria-hidden>
            ·
          </span>
          <span>
            {readingTime} {labels[2]}
          </span>
          <span className="text-white/30" aria-hidden>
            ·
          </span>
          <span>
            {wordCount.toLocaleString(locale)} {labels[3]}
          </span>
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
      <article
        id="main-content"
        className="mx-auto max-w-3xl px-6 py-12 sm:px-10 lg:px-6 xl:px-0"
      >
        <BlogPortableText body={post.body} />
      </article>
      <div className="bg-primary mx-auto mb-12 max-w-3xl rounded-2xl px-8 py-8 sm:px-10">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-white">
              {post.indexPage.cta.title}
            </p>
            <p className="mt-1 text-sm text-white/60">
              {post.indexPage.cta.description}
            </p>
          </div>
          <Link
            href={`/${locale}${post.indexPage.cta.href}`}
            className="inline-flex shrink-0 items-center rounded-full bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
          >
            {post.indexPage.cta.label}
          </Link>
        </div>
      </div>
      {(post.relatedPosts?.length ?? 0) > 0 && (
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
                {labels[4]}
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {post.relatedPosts?.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/${locale}/blogs/${related.slug}`}
                    className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex flex-col gap-2 p-5">
                      <p className="text-xs text-gray-400">
                        <time dateTime={related.publishedAt}>
                          {new Date(related.publishedAt).toLocaleDateString(
                            locale,
                            { year: "numeric", month: "long", day: "numeric" },
                          )}
                        </time>
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
