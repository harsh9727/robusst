import React from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Banner } from "~/components/sections/cdp/Banner";
import { WhyChooseRobusst } from "~/components/sections/cdp/WhyChooseRobusst";
import { IndustryApplications } from "~/components/sections/cdp/IndustryApplications";
import { ProvenImpact } from "~/components/sections/cdp/ProvenImpact";
import { TelecomUseCases } from "~/components/sections/cdp/TelecomUseCases";
import { PersonalizedExperience } from "~/components/sections/cdp/PersonalizedExperience";
import { BenefitsUseCases } from "~/components/sections/cdp/BenefitsUseCases";
import { AccelerateValue } from "~/components/sections/cdp/AccelerateValue";
import { KeyFeaturesCapabilities } from "~/components/sections/cdp/KeyFeaturesCapabilities";
import { CtaSection } from "~/components/sections/cdp/CtaSection";
import { CDP_Solution_Grid } from "~/components/sections/cdp/SolutionGrid";
import { FAQSection } from "~/components/sections/cdp/FAQSection";

import { locales } from "~/i18n/config";

export const dynamic = "force-static";
export const revalidate = 300;

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.robusst.com";
const TITLE = "Customer Data Platform for Telecom & Banking | Robusst";
const DESC =
  "Centralize customer data from every touchpoint for real-time insights, precise segmentation, and personalized campaigns — driving 200% higher marketing ROI with Robusst CDP.";
const CANONICAL = `${BASE_URL}/en/solutions/customer-data-platform`;
const OG_IMAGE = `${BASE_URL}/api/og?title=${encodeURIComponent(TITLE)}&description=${encodeURIComponent(DESC)}`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords: [
    "Customer Data Platform",
    "CDP for Telecom",
    "Telecom Analytics",
    "Customer Segmentation",
    "Real-Time Insights",
    "Personalized Marketing",
    "Robusst CDP",
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

const Cdp = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Banner />
      <WhyChooseRobusst />
      <IndustryApplications />
      <ProvenImpact />
      <TelecomUseCases />
      <PersonalizedExperience />
      <CDP_Solution_Grid />
      <BenefitsUseCases />
      <AccelerateValue />
      <KeyFeaturesCapabilities />
      <CtaSection />
      <FAQSection />
    </>
  );
};

export default Cdp;
