import React from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Banner } from "~/components/sections/networkmonetization/Banner";
import MonetizationFramework from "~/components/sections/networkmonetization/MonetizationFramework/MonetizationFramework";
import WhyNetworkMonetization from "~/components/sections/networkmonetization/WhyNetworkMonetization/WhyNetworkMonetization";
import UserExperienceManagement from "~/components/sections/networkmonetization/UserExperienceManagement/UserExperienceManagement";
import MobileUseCase from "~/components/sections/networkmonetization/MobileUseCase/MobileUseCase";
import Telcos from "~/components/sections/networkmonetization/Telcos/Telcos";
import { Network_Solution_Grid } from "~/components/sections/networkmonetization/SolutionGrid";
import { UseCaseGrid } from "~/components/sections/networkmonetization/UseCaseGrid";
import { FAQSection } from "~/components/sections/networkmonetization/FAQSection";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.robusst.com";
const TITLE = "Network Monetization & Optimization | Robusst";
const DESC =
  "Automate complex network testing and optimization to improve coverage, reduce rollout time by 40%, and enhance voice and data quality across your entire network.";
const CANONICAL = `${BASE_URL}/en/solutions/network-monetization`;
const OG_IMAGE = `${BASE_URL}/api/og?title=${encodeURIComponent(TITLE)}&description=${encodeURIComponent(DESC)}`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords: [
    "Network Monetization",
    "Network Optimization",
    "Telecom Network Testing",
    "Network Quality",
    "Coverage Optimization",
    "Robusst Network",
    "5G Monetization",
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

const NetworkMonetization = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Banner />
      <WhyNetworkMonetization />
      <MonetizationFramework />
      <UserExperienceManagement />
      <Network_Solution_Grid />
      {/*<NetworkTestSystem />
      <NetworkCoverageSystem />
      <IntelligentNOC />*/}
      <MobileUseCase />
      <UseCaseGrid />
      {/*<OpenRANSolutions />
      <SmartEnergy />
      <SpecialEventManagement />
      <SpecialOperation />
      <DriverLess />
      <VoLTE />
      <HetNet />
      <Spectrum />
      <IoT />*/}
      <Telcos />
      <FAQSection />
    </>
  );
};

export default NetworkMonetization;
