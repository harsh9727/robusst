import React from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Banner, SolutionGrid } from "~/components/sections/solutions";

import { locales } from "~/i18n/config";
import { getSolutionsPage } from "~/sanity/queries/solutionsPage";

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
  const page = await getSolutionsPage(locale);
  if (!page?.seo.title || !page.seo.description) return {};

  const canonical = `${BASE_URL}/${locale}/solutions`;
  const languages = Object.fromEntries(
    locales.map((supportedLocale) => [
      supportedLocale,
      `${BASE_URL}/${supportedLocale}/solutions`,
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
      languages: { ...languages, "x-default": `${BASE_URL}/en/solutions` },
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

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const solutionsPage = await getSolutionsPage(locale);
  if (!solutionsPage) {
    throw new Error(`Missing published Sanity Solutions page for ${locale}`);
  }

  return (
    <>
      <Banner data={solutionsPage.solutionsPage} />
      <SolutionGrid solutions={solutionsPage.solutionsPage.solutions} />
    </>
  );
};

export default Page;
