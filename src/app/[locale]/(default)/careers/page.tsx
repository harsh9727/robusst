import React from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getCmsContent } from "~/lib/cms/client";
import type { Careers_JsonType } from "~/types/api/careers_json.types";
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
const TITLE = "Careers at Robusst | Build the Future of Telecom AI";
const DESC =
  "Join a global team of innovators delivering AI-powered solutions to telecom & banking enterprises across 23+ countries. Explore open roles at Robusst.";
const CANONICAL = `${BASE_URL}/en/careers`;
const OG_IMAGE = `${BASE_URL}/api/og?title=${encodeURIComponent(TITLE)}&description=${encodeURIComponent(DESC)}`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords: [
    "Robusst Careers",
    "AI Jobs",
    "Telecom Technology Jobs",
    "Enterprise Software Careers",
    "Digital Transformation Jobs",
    "Join Robusst",
  ].join(", "),
  authors: [{ name: "Robusst Team", url: BASE_URL }],
  creator: "Robusst",
  publisher: "Robusst",
  openGraph: {
    title: TITLE,
    description: DESC,
    url: CANONICAL,
    siteName: "Robusst",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: TITLE,
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
    title: TITLE,
    description: DESC,
    images: [{ url: OG_IMAGE, alt: TITLE }],
  },
  alternates: { canonical: CANONICAL },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const CarrerPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  setRequestLocale(locale);

  // This fetch IS inside a Server Component.
  // ISR cache, revalidateTag, and revalidatePath all work correctly here.
  // At RUNTIME: returns null on failure; each component falls back to useTranslations.
  const cmsCareers = await getCmsContent<Careers_JsonType>("careers", locale);

  return (
    <>
      <FadeIn backgroundColor="bg-primary">
        <Banner data={cmsCareers?.careers} />
      </FadeIn>
      <FadeIn delay={0.1} backgroundColor="bg-primary-foreground">
        <RiseWithUs data={cmsCareers?.careers} />
      </FadeIn>
      <FadeIn delay={0.1} backgroundColor="bg-primary-foreground">
        <WeMakeDifference data={cmsCareers?.careers} />
      </FadeIn>
      <FadeIn delay={0.2} backgroundColor="bg-primary-foreground">
        <WhatWeOffer data={cmsCareers?.careers} />
      </FadeIn>
      <FadeIn delay={0.1} backgroundColor="bg-primary-foreground">
        <Values data={cmsCareers?.careers} />
      </FadeIn>
      <FadeIn delay={0.2} backgroundColor="bg-primary-foreground">
        <ReadyToJoinUs data={cmsCareers?.careers} />
      </FadeIn>
      <FadeIn delay={0.1} backgroundColor="bg-primary-foreground">
        <OurHiringProcess data={cmsCareers?.careers} />
      </FadeIn>
      <FadeIn delay={0.2} backgroundColor="bg-primary-foreground">
        <CurrentOpenings data={cmsCareers?.careers} />
      </FadeIn>
      <FadeIn delay={0.2} backgroundColor="bg-primary-foreground">
        <Contact data={cmsCareers?.careers} />
      </FadeIn>
    </>
  );
};

export default CarrerPage;
