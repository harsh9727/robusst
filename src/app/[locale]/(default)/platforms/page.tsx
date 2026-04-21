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
import { getCmsContent } from "~/lib/cms/client";
import type { Platforms_JsonType } from "~/types/api/platforms_json.types";

export const dynamic = "force-static";
export const revalidate = 300;

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.robusst.com";
const TITLE = "Robusst Platforms | Enterprise AI Infrastructure";
const DESC =
  "Scalable, cloud-native enterprise platforms for network monetization, customer data, revenue assurance, and AI-powered automation — built for telcos and banks.";
const OG_IMAGE = `${BASE_URL}/api/og?title=${encodeURIComponent(TITLE)}&description=${encodeURIComponent(DESC)}`;
const CANONICAL = `${BASE_URL}/en/platforms`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords: [
    "Robusst Platform",
    "Enterprise AI Platform",
    "Telecom Network Platform",
    "Revenue Assurance Platform",
    "Cloud Native Telecom",
    "AI Infrastructure",
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

const Platforms = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  setRequestLocale(locale);

  // This fetch IS inside a Server Component.
  // ISR cache, revalidateTag, and revalidatePath all work correctly here.
  // At BUILD TIME: throws loudly if CMS is unreachable (fast-fail deploy).
  // At RUNTIME:    returns null on failure; each component handles null gracefully.
  const cmsPlatforms = await getCmsContent<Platforms_JsonType>(
    "platforms",
    locale,
  );

  return (
    <>
      <Banner data={cmsPlatforms?.platforms} />
      <Cdp data={cmsPlatforms?.platforms} />
      <Cpm data={cmsPlatforms?.platforms} />
      <Noc data={cmsPlatforms?.platforms} />
      <Kyc data={cmsPlatforms?.platforms} />
      <Whychoose data={cmsPlatforms?.platforms} />
    </>
  );
};

export default Platforms;
