import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { locales } from "~/i18n/config";
import { getBlogAuthor, getBlogAuthorSlugs } from "~/sanity/queries/blog";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.robusst.com";
export const dynamic = "force-static";
export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  const authors = await getBlogAuthorSlugs();
  return authors
    .filter((author) =>
      locales.includes(author.language as (typeof locales)[number]),
    )
    .map(({ language: locale, slug }) => ({ locale, slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const author = await getBlogAuthor(locale, slug);
  if (!author) return {};
  const canonical = `${BASE_URL}/${locale}/blogs/authors/${slug}`;
  const languages = Object.fromEntries(
    locales.map((language) => {
      const translatedSlug = author.translations?.find(
        (translation) => translation.language === language,
      )?.slug;
      return [
        language,
        `${BASE_URL}/${language}/blogs/authors/${translatedSlug ?? slug}`,
      ];
    }),
  );
  const englishSlug =
    author.translations?.find((translation) => translation.language === "en")
      ?.slug ?? slug;
  const imageUrl = author.seo.socialImage ?? author.image;
  const images = imageUrl
    ? [{ url: imageUrl, alt: author.imageAlt ?? author.name }]
    : undefined;
  return {
    title: author.seo.title,
    description: author.seo.description,
    keywords: author.seo.keywords ?? undefined,
    authors: [{ name: author.name, url: canonical }],
    creator: author.site?.siteName ?? undefined,
    publisher: author.site?.siteName ?? undefined,
    alternates: {
      canonical,
      languages: {
        ...languages,
        "x-default": `${BASE_URL}/en/blogs/authors/${englishSlug}`,
      },
    },
    openGraph: {
      title: author.seo.socialTitle ?? author.seo.title,
      description: author.seo.socialDescription ?? author.seo.description,
      url: canonical,
      siteName: author.site?.siteName ?? undefined,
      images,
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      site: author.site?.twitterSiteHandle ?? undefined,
      creator: author.site?.twitterCreatorHandle ?? undefined,
      title: author.seo.socialTitle ?? author.seo.title,
      description: author.seo.socialDescription ?? author.seo.description,
      images,
    },
    robots: { index: !author.seo.noIndex, follow: !author.seo.noIndex },
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const author = await getBlogAuthor(locale, slug);
  if (!author?.blogUi) notFound();
  const ui = author.blogUi;
  const profileUrl = `${BASE_URL}/${locale}/blogs/authors/${slug}`;
  const profileJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": profileUrl,
    url: profileUrl,
    inLanguage: locale,
    mainEntity: {
      "@type": "Person",
      name: author.name,
      description: author.bio,
      image: author.image,
      jobTitle: author.role,
      url: author.website ?? profileUrl,
      sameAs: author.socialLinks?.map((link) => link.href),
      worksFor: author.site?.siteName
        ? {
            "@type": "Organization",
            name: author.site.siteName,
            url: BASE_URL,
          }
        : undefined,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
      />
      <header className="bg-primary mt-24 px-6 py-16 text-white sm:mt-28 sm:px-12 sm:py-20 lg:mt-32">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
          {author.image && (
            <Image
              src={author.image}
              alt={author.imageAlt ?? ""}
              width={160}
              height={160}
              priority
              className="h-36 w-36 rounded-full bg-white object-cover sm:h-40 sm:w-40"
            />
          )}
          <div>
            <h1 className="text-4xl font-bold sm:text-5xl">{author.name}</h1>
            <p className="mt-2 text-lg text-white/70">{author.role}</p>
            <p className="mt-4 max-w-2xl leading-relaxed text-white/80">
              {author.bio}
            </p>
            {(author.socialLinks?.length ?? 0) > 0 && (
              <div className="mt-4 flex flex-wrap justify-center gap-4 sm:justify-start">
                {author.socialLinks?.map((link) => (
                  <a
                    key={`${link.href}-${link.label}`}
                    href={link.href ?? undefined}
                    aria-label={link.ariaLabel ?? undefined}
                    target={link.openInNewTab ? "_blank" : undefined}
                    rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                    className="text-sm font-medium underline underline-offset-4"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-16 sm:px-12">
        <h2 className="text-3xl font-bold text-gray-900">
          {author.postsHeading}
        </h2>
        {(author.posts?.length ?? 0) === 0 ? (
          <p className="mt-6 text-gray-500">{author.emptyPostsMessage}</p>
        ) : (
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {author.posts?.map((post) => (
              <Link
                key={post.slug}
                href={`/${locale}/blogs/${post.slug}`}
                aria-label={`${ui.readArticleLabel}: ${post.title}`}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                    {post.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm text-gray-500">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
