import type { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { locales } from "~/i18n/config";
import { getBlogIndexPage } from "~/sanity/queries/blog";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.robusst.com";
export const dynamic = "force-static";
export const revalidate = 300;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const page = await getBlogIndexPage(locale);
  if (!page) return {};
  const canonical = `${BASE_URL}/${locale}/blogs`;
  const languages = Object.fromEntries(
    locales.map((language) => [language, `${BASE_URL}/${language}/blogs`]),
  );
  const image = page.seo.socialImage
    ? [
        {
          url: page.seo.socialImage,
          alt: page.seo.socialTitle ?? page.seo.title,
        },
      ]
    : undefined;
  return {
    title: page.seo.title,
    description: page.seo.description,
    keywords: page.seo.keywords ?? undefined,
    authors: page.site?.siteName
      ? [{ name: page.site.siteName, url: BASE_URL }]
      : undefined,
    creator: page.site?.siteName ?? undefined,
    publisher: page.site?.siteName ?? undefined,
    alternates: {
      canonical,
      languages: { ...languages, "x-default": `${BASE_URL}/en/blogs` },
    },
    openGraph: {
      title: page.seo.socialTitle ?? page.seo.title,
      description: page.seo.socialDescription ?? page.seo.description,
      url: canonical,
      siteName: page.site?.siteName ?? undefined,
      images: image,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.seo.socialTitle ?? page.seo.title,
      description: page.seo.socialDescription ?? page.seo.description,
      images: image,
    },
    robots: { index: !page.seo.noIndex, follow: !page.seo.noIndex },
  };
}

export default async function BlogsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = await getBlogIndexPage(locale);
  if (!page)
    throw new Error(`Missing published Sanity blog index for ${locale}`);
  const posts = page.posts ?? [];
  const countLabel =
    posts.length === 1
      ? page.blogUi.articleSingularLabel
      : page.blogUi.articlePluralLabel;
  const blogListJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${BASE_URL}/${locale}/blogs`,
    name: page.hero.title,
    description: page.hero.description,
    url: `${BASE_URL}/${locale}/blogs`,
    inLanguage: locale,
    publisher: {
      "@type": "Organization",
      name: page.site?.siteName,
      url: BASE_URL,
      logo: page.site?.logo
        ? { "@type": "ImageObject", url: page.site.logo }
        : undefined,
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      "@id": `${BASE_URL}/${locale}/blogs/${post.slug}`,
      headline: post.title,
      description: post.excerpt,
      url: `${BASE_URL}/${locale}/blogs/${post.slug}`,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      inLanguage: locale,
      author: post.author
        ? {
            "@type": "Person",
            name: post.author.name,
            url: `${BASE_URL}/${locale}/blogs/authors/${post.author.slug}`,
          }
        : { "@type": "Organization", name: page.site?.siteName },
      image: post.coverImage,
      keywords: [post.primaryKeyword, ...(post.categories ?? [])]
        .filter(Boolean)
        .join(", "),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListJsonLd) }}
      />
      <div className="bg-primary relative mt-30 flex min-h-[45vh] w-full flex-col items-center justify-center overflow-hidden px-6 py-20 sm:px-12 lg:px-25">
        <div className="bg-brand-one absolute top-0 right-0 h-40 w-160 -translate-x-1/2 -translate-y-1/2 blur-[120px]" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h1 className="text-primary-foreground text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl">
            {page.hero.title}
          </h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-base sm:text-lg">
            {page.hero.description}
          </p>
          <p className="text-primary-foreground/50 mt-6 text-sm">
            {posts.length} {countLabel}
          </p>
        </div>
      </div>
      <div className="bg-background py-16 sm:py-20 lg:py-25">
        <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-12 lg:px-25">
          {posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-2xl font-semibold text-gray-800">
                {page.emptyState.title}
              </p>
              <p className="mt-2 text-gray-500">
                {page.emptyState.description}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => {
                const formattedDate = new Date(
                  post.publishedAt,
                ).toLocaleDateString(locale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });
                return (
                  <Link
                    key={post.slug}
                    href={`/${locale}/blogs/${post.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    aria-label={`${page.blogUi.readArticleLabel}: ${post.title}`}
                  >
                    <div className="flex flex-1 flex-col gap-3 p-6">
                      {post.primaryKeyword && (
                        <span className="bg-brand-one/10 text-brand-one w-fit rounded-full px-3 py-0.5 text-xs font-medium">
                          {post.primaryKeyword}
                        </span>
                      )}
                      <h2 className="line-clamp-2 text-lg leading-snug font-semibold text-gray-900 transition-colors group-hover:text-blue-600 sm:text-xl">
                        {post.title}
                      </h2>
                      <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-gray-500">
                        {post.excerpt}
                      </p>
                      <div className="mt-2 flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
                        <p className="text-xs text-gray-400">{formattedDate}</p>
                        {post.author && (
                          <p className="truncate text-xs text-gray-500">
                            {page.blogUi.bylineLabel} {post.author.name}
                          </p>
                        )}
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
