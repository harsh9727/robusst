import React from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Banner } from "~/components/sections/stsanddms/Banner";
import { TelecomIntelligence } from "~/components/sections/stsanddms/TelecomIntelligence/TelecomIntelligence";
import SalesDistribution from "~/components/sections/stsanddms/SalesDistribution/SalesDistribution";
import WhyRobusst from "~/components/sections/stsanddms/WhyRobusst/WhyRobusst";
import RobusstPlatform from "~/components/sections/stsanddms/RobusstPlatform/RobusstPlatform";
import BusinessAutomation from "~/components/sections/stsanddms/BusinessAutomation/BusinessAutomation";
import SuccessStories from "~/components/sections/stsanddms/SuccessStories/SuccessStories";
import DriveSales from "~/components/sections/stsanddms/DriveSales/DriveSales";
import ErpHrisIntegration from "~/components/sections/stsanddms/ErpHrisIntegration/ErpHrisIntegration";
import IndustryAgnostic from "~/components/sections/stsanddms/IndustryAgnostic/IndustryAgnostic";
import { STS_Solution_Grid } from "~/components/sections/stsanddms/SolutionGrid";
import { FAQSection } from "~/components/sections/stsanddms/FAQSection";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.robusst.com";
const TITLE = "Sales Tracking & Distributor Management | Robusst STS-DMS";
const DESC =
  "Track sales performance and manage distributors, dealers, inventory, and loyalty programs from a single platform — reducing revenue leakage and improving field force efficiency.";
const CANONICAL = `${BASE_URL}/en/solutions/sts-dms`;
const OG_IMAGE = `${BASE_URL}/api/og?title=${encodeURIComponent(TITLE)}&description=${encodeURIComponent(DESC)}`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords: [
    "Sales Tracking System",
    "Distributor Management",
    "STS DMS",
    "Field Sales Automation",
    "Inventory Management",
    "Loyalty Program Management",
    "Robusst STS",
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

const StsAndDms = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Banner />
      <TelecomIntelligence />
      <SalesDistribution />
      <WhyRobusst />
      <RobusstPlatform />
      <BusinessAutomation />
      <SuccessStories />
      <STS_Solution_Grid />
      <DriveSales />
      <ErpHrisIntegration />
      <IndustryAgnostic />
      <FAQSection />
      {/*<PartnerWithRobusst />*/}
    </>
  );
};

export default StsAndDms;
