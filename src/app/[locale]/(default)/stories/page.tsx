import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Banner, StoriesGrid } from "~/components/sections/successStories";
import { locales } from "~/i18n/config";
import { getStoriesPage } from "~/sanity/queries/storiesPage";

export const dynamic = "force-static";
export const revalidate = 300;
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.robusst.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const page = await getStoriesPage(locale);
  if (!page?.seo.title || !page.seo.description) return {};
  const route = "/stories";
  const canonical = `${BASE_URL}/${locale}${route}`;
  const languages = Object.fromEntries(
    locales.map((supportedLocale) => [
      supportedLocale,
      `${BASE_URL}/${supportedLocale}${route}`,
    ]),
  );
  const images = page.seo.socialImage
    ? [{ url: page.seo.socialImage, alt: page.seo.title }]
    : undefined;
  return {
    title: page.seo.title,
    description: page.seo.description,
    keywords: page.seo.keywords ?? undefined,
    alternates: {
      canonical,
      languages: { ...languages, "x-default": `${BASE_URL}/en${route}` },
    },
    openGraph: {
      title: page.seo.title,
      description: page.seo.description,
      url: canonical,
      siteName: "Robusst",
      images,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.seo.title,
      description: page.seo.description,
      images,
    },
    robots: { index: !page.seo.noIndex, follow: !page.seo.noIndex },
  };
}

export default async function StoriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = await getStoriesPage(locale);
  if (!page)
    throw new Error(`Missing published Sanity Stories page for ${locale}`);
  return (
    <>
      <Banner data={page.storiesPage.banner} />
      <StoriesGrid data={page.stories ?? []} storyPageData={page.storiesPage} />
    </>
  );
}
