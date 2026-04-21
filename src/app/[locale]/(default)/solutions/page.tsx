import React from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Banner, SolutionGrid } from "~/components/sections/solutions";

import { locales } from "~/i18n/config";
import { getCmsContent } from "~/lib/cms/client";
import type { Solutionspage_JsonType } from "~/types/api/solutionspage_json.types";

export const dynamic = "force-static";
export const revalidate = 300;

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.robusst.com";
const TITLE = "AI Solutions for Telecom & Banking | Robusst";
const DESC =
  "Branded calling, CDP, cybersecurity, network monetization, AI call center — Robusst delivers measurable AI-powered results for telecom & banking enterprises in 23+ countries.";
const CANONICAL = `${BASE_URL}/en/solutions`;
const OG_IMAGE = `${BASE_URL}/api/og?title=${encodeURIComponent(TITLE)}&description=${encodeURIComponent(DESC)}`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords: [
    "Robusst AI Solutions",
    "Telecom AI Platform",
    "Branded Calling",
    "Network Monetization",
    "Customer Data Platform",
    "Cyber Security",
    "AI Call Center",
    "Digital Transformation",
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

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  setRequestLocale(locale);

  // This fetch IS inside a Server Component.
  // ISR cache, revalidateTag, and revalidatePath all work correctly here.
  // At RUNTIME: returns null on failure; Banner falls back to useTranslations.
  const cmsSolutionsPage = await getCmsContent<Solutionspage_JsonType>(
    "solutionspage",
    locale,
  );

  return (
    <>
      <Banner data={cmsSolutionsPage?.solutions_page} />
      <SolutionGrid locale={locale} />
    </>
  );
};

export default Page;
