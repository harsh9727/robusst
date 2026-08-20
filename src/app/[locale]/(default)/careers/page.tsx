import React from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getCareersPage } from "~/sanity/queries/careersPage";
import {
  Banner,
  CurrentOpenings,
  ReadyToJoinUs,
  RiseWithUs,
  Values,
  WeMakeDifference,
  WhatWeOffer,
  OurHiringProcess,
  Contact,
} from "~/components/sections/careersPage";
import { FadeIn } from "~/components/ui/FadeIn";

import { locales } from "~/i18n/config";

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
  const page = await getCareersPage(locale);
  if (!page?.seo.title || !page.seo.description) return {};

  const canonical = `${BASE_URL}/${locale}/careers`;
  const languages = Object.fromEntries(
    locales.map((supportedLocale) => [
      supportedLocale,
      `${BASE_URL}/${supportedLocale}/careers`,
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
      languages: { ...languages, "x-default": `${BASE_URL}/en/careers` },
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

const CarrerPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const careersPage = await getCareersPage(locale);
  if (!careersPage) {
    throw new Error(`Missing published Sanity Careers page for ${locale}`);
  }

  return (
    <>
      <FadeIn backgroundColor="bg-primary">
        <Banner data={careersPage.careers} />
      </FadeIn>
      <FadeIn delay={0.1} backgroundColor="bg-primary-foreground">
        <RiseWithUs data={careersPage.careers} />
      </FadeIn>
      <FadeIn delay={0.1} backgroundColor="bg-primary-foreground">
        <WeMakeDifference data={careersPage.careers} />
      </FadeIn>
      <FadeIn delay={0.2} backgroundColor="bg-primary-foreground">
        <WhatWeOffer data={careersPage.careers} />
      </FadeIn>
      <FadeIn delay={0.1} backgroundColor="bg-primary-foreground">
        <Values data={careersPage.careers} />
      </FadeIn>
      <FadeIn delay={0.2} backgroundColor="bg-primary-foreground">
        <ReadyToJoinUs data={careersPage.careers} />
      </FadeIn>
      <FadeIn delay={0.1} backgroundColor="bg-primary-foreground">
        <OurHiringProcess data={careersPage.careers} />
      </FadeIn>
      <FadeIn delay={0.2} backgroundColor="bg-primary-foreground">
        <CurrentOpenings data={careersPage.careers} />
      </FadeIn>
      <FadeIn delay={0.2} backgroundColor="bg-primary-foreground">
        <Contact data={careersPage.careers} />
      </FadeIn>
    </>
  );
};

export default CarrerPage;
