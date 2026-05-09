import React from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Banner, StoriesGrid } from "~/components/sections/successStories";
import { locales } from "~/i18n/config";
import { getCmsContent } from "~/lib/cms/client";
import type { Storypage_JsonType } from "~/types/api/storypage_json.types";
import type { Successstories_JsonType } from "~/types/api/successstories_json.types";

export const dynamic = "force-static";
export const revalidate = 300;

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.robusst.com";
const TITLE = "Success Stories | Robusst Customer Impact";
const DESC =
  "Real results: 3× higher campaign conversions, 78% less network downtime, 85% less revenue leakage. See how Robusst transforms telecom & banking enterprises.";
const CANONICAL = `${BASE_URL}/en/stories`;
const OG_IMAGE = `${BASE_URL}/api/og?title=${encodeURIComponent(TITLE)}&description=${encodeURIComponent(DESC)}`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords: [
    "Robusst Case Studies",
    "Telecom AI Success Stories",
    "Network Monetization Results",
    "AI ROI",
    "Digital Transformation Results",
    "Telecom Customer Stories",
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

  const cmsStoryPage = await getCmsContent<Storypage_JsonType>(
    "storypage",
    locale,
  );
  const cmsSuccessStories = await getCmsContent<Successstories_JsonType>(
    "successstories",
    locale,
  );

  return (
    <>
      <Banner data={cmsStoryPage?.mainStoryPage} />
      <StoriesGrid
        data={cmsSuccessStories?.story}
        storyPageData={cmsStoryPage?.storyPage}
      />
    </>
  );
};

export default Page;
