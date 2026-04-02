import React from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Banner } from "~/components/sections/cybersecurity/Banner";
import SolutionModules from "~/components/sections/cybersecurity/SolutionModules";
import WhyChooseRobusst from "~/components/sections/cybersecurity/WhyChooseRobusst";
import ThreatIntelligence from "~/components/sections/cybersecurity/ThreatIntelligence/ThreatIntelligence";
import HowItWorks from "~/components/sections/cybersecurity/HowItWorks/HowItWorks";
import BusinessOutcomes from "~/components/sections/cybersecurity/BusinessOutcomes/BusinessOutcomes";
import OurUSP from "~/components/sections/cybersecurity/OurUSP/OurUSP";
import { FAQSection } from "~/components/sections/cybersecurity/FAQSection";
import { locales } from "~/i18n/config";

export const dynamic = "force-static";
export const revalidate = 300;

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.robusst.com";
const TITLE = "Cybersecurity Solutions for Telecom & Banking | Robusst";
const DESC =
  "Proactive endpoint, network, and application protection with real-time threat monitoring, compliance management, and AI-driven anomaly detection for telecom and banking enterprises.";
const CANONICAL = `${BASE_URL}/en/solutions/cybersecurity`;
const OG_IMAGE = `${BASE_URL}/api/og?title=${encodeURIComponent(TITLE)}&description=${encodeURIComponent(DESC)}`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords: [
    "Telecom Cybersecurity",
    "Banking Cyber Security",
    "Network Security",
    "Threat Detection",
    "Compliance Management",
    "Robusst Cyber Security",
    "Enterprise Security",
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

const cybersecurity = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Banner />
      <WhyChooseRobusst />
      <SolutionModules />

      <ThreatIntelligence />
      <HowItWorks />
      <BusinessOutcomes />
      <OurUSP />
      <FAQSection />
    </>
  );
};

export default cybersecurity;
