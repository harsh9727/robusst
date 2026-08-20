import React from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import {
  Banner,
  Cdp,
  Cpm,
  Noc,
  Kyc,
  Whychoose,
} from "~/components/sections/platform";
import { locales } from "~/i18n/config";
import { getPlatformsPage } from "~/sanity/queries/platformsPage";

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
  const page = await getPlatformsPage(locale);
  if (!page?.seo.title || !page.seo.description) return {};

  const canonical = `${BASE_URL}/${locale}/platforms`;
  const languages = Object.fromEntries(
    locales.map((supportedLocale) => [
      supportedLocale,
      `${BASE_URL}/${supportedLocale}/platforms`,
    ]),
  );
  const images = page.seo.socialImage
    ? [{ url: page.seo.socialImage, alt: page.seo.title }]
    : undefined;

  return {
    title: page.seo.title,
    description: page.seo.description,
    keywords: page.seo.keywords ?? undefined,
    authors: [{ name: "Robusst Team", url: BASE_URL }],
    creator: "Robusst",
    publisher: "Robusst",
    alternates: {
      canonical,
      languages: { ...languages, "x-default": `${BASE_URL}/en/platforms` },
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
      site: "@robusst",
      creator: "@robusst",
      title: page.seo.title,
      description: page.seo.description,
      images,
    },
    robots: { index: !page.seo.noIndex, follow: !page.seo.noIndex },
  };
}

const Platforms = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const platformsPage = await getPlatformsPage(locale);
  if (!platformsPage) {
    throw new Error(`Missing published Sanity Platforms page for ${locale}`);
  }

  return (
    <>
      <Banner data={platformsPage.platforms} />
      <Cdp data={platformsPage.platforms} />
      <Cpm data={platformsPage.platforms} />
      <Noc data={platformsPage.platforms} />
      <Kyc data={platformsPage.platforms} />
      <Whychoose data={platformsPage.platforms} />
    </>
  );
};

export default Platforms;
