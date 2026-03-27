import React from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.robusst.com";
const TITLE = "Branded Calling & Anti-SPAM Solution | Robusst";
const DESC =
  "Display your brand name and logo on every outbound call. Increase pick-up rates by 3×, eliminate spam tagging, and build customer trust with Robusst Branded Calling.";
const CANONICAL = `${BASE_URL}/en/solutions/branded-calling`;
const OG_IMAGE = `${BASE_URL}/api/og?title=${encodeURIComponent(TITLE)}&description=${encodeURIComponent(DESC)}`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords: [
    "Branded Calling",
    "Anti-SPAM Solution",
    "Call Pick-Up Rate",
    "STIR SHAKEN",
    "Telecom Branding",
    "Robusst Branded Calling",
    "Outbound Call Branding",
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

import { Banner } from "~/components/sections/brand/Banner";
import { Eliminate } from "~/components/sections/brand/Eliminate";
import { TransformCommunication } from "~/components/sections/brand/TransformCommunication";
import { Whychoose } from "~/components/sections/brand/Whychoose";
import { BrandedCalling } from "~/components/sections/brand/BrandedCalling";
import { KeyFeatures } from "~/components/sections/brand/KeyFeatures";
import { AntiSpamProtection } from "~/components/sections/brand/AntiSpamProtection";
import { CoreProtectionFeatures } from "~/components/sections/brand/CoreProtectionFeatures";
import { IndustryApplications } from "~/components/sections/brand/IndustryApplications";
import { RegionalExcellence } from "~/components/sections/brand/RegionalExcellence";
import { SecurityCompliance } from "~/components/sections/brand/SecurityCompliance";
import { FAQSection } from "~/components/sections/brand/FAQSection";

const brand = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div>
      <Banner />
      <Eliminate />
      <TransformCommunication />
      <Whychoose />
      <BrandedCalling />
      <KeyFeatures />
      <AntiSpamProtection />
      <CoreProtectionFeatures />
      <IndustryApplications />
      <RegionalExcellence />
      <SecurityCompliance />
      <FAQSection />
    </div>
  );
};

export default brand;
