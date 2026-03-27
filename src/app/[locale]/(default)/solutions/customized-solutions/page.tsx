import type { Metadata } from "next";
import React from "react";
import { setRequestLocale } from "next-intl/server";
import { Banner } from "~/components/sections/customizesolution";
import CustomizedSolutions from "~/components/sections/customizesolution/CustomizedSolutions/CustomizedSolutions";
import InnovationProcess from "~/components/sections/customizesolution/InnovationProcess/InnovationProcess";
import CustomerCentric from "~/components/sections/customizesolution/CustomerCentric/CustomerCentric";
import ChallengesSection from "~/components/sections/customizesolution/ChallengesSection/ChallengesSection";
import CommitmentToExcellence from "~/components/sections/customizesolution/CommitmentToExcellence/CommitmentToExcellence";
import { CustomizedSolutionsSlider } from "~/components/sections/customizesolution/CustomizedSolutionsSlider";
import { FAQSection } from "~/components/sections/customizesolution/FAQSection";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.robusst.com";
const TITLE = "Customized AI Solutions for Enterprise | Robusst";
const DESC =
  "Tailored AI solutions aligned with your unique business goals — integrating with existing platforms, delivering measurable ROI, with dedicated long-term support from Robusst.";
const CANONICAL = `${BASE_URL}/en/solutions/customized-solutions`;
const OG_IMAGE = `${BASE_URL}/api/og?title=${encodeURIComponent(TITLE)}&description=${encodeURIComponent(DESC)}`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords: [
    "Custom AI Solutions",
    "Bespoke Telecom Software",
    "Enterprise AI Integration",
    "Tailored Technology",
    "Custom Software Development",
    "Robusst Custom Solutions",
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
  return (
    <>
      <Banner />
      <InnovationProcess />
      <CustomizedSolutions />
      <CustomerCentric />
      <ChallengesSection />
      <CustomizedSolutionsSlider />
      {/*<DataDrivenIntelligence />
      <TelecomBrain />
      <EndToEndIntegration />*/}
      <CommitmentToExcellence />
      {/*<VisionCTA />*/}
      <FAQSection />
    </>
  );
};

export default Page;
