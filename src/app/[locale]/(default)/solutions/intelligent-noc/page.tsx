import React from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import BusinessOutcomes from "~/components/sections/noc/BusinessOutcomes/BusinessOutcomes";
import { Banner } from "~/components/sections/noc/Banner";
import AiNetwork from "~/components/sections/noc/AiNetwork/AiNetwork";
import NetworkChaos from "~/components/sections/noc/NetworkChaos/NetworkChaos";
import IntelligentNOC from "~/components/sections/noc/IntelligentNOC/IntelligentNOC";
import CoreCapabilities from "~/components/sections/noc/CoreCapabilities/CoreCapabilities";
import NetworkOperationsChaos from "~/components/sections/noc/NetworkOperationsChaos/NetworkOperationsChaos";
import IntelligentDiffNOC from "~/components/sections/noc/IntelligentDiffNOC/IntelligentDiffNOC";
import ChaosControl from "~/components/sections/noc/ChaosControl/ChaosControl";
import FrameworkADAA from "~/components/sections/noc/FrameworkADAA/FrameworkADAA";
import LifecycleAutomation from "~/components/sections/noc/LifecycleAutomation/LifecycleAutomation";
import IntegratedComponents from "~/components/sections/noc/IntegratedComponents/IntegratedComponents";
import DeploymentModels from "~/components/sections/noc/DeploymentModels/DeploymentModels";
import KeyBenefits from "~/components/sections/noc/KeyBenefits/KeyBenefits";
import HumanInLoop from "~/components/sections/noc/HumanInLoop/HumanInLoop";
import { FAQSection } from "~/components/sections/noc/FAQSection";

import { locales } from "~/i18n/config";
import { getCmsContent } from "~/lib/cms/client";
import type { Noc_JsonType } from "~/types/api/noc_json.types";

export const dynamic = "force-static";
export const revalidate = 300;

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.robusst.com";
const TITLE = "Intelligent NOC | AI-Powered Network Operations | Robusst";
const DESC =
  "AI-powered network monitoring and incident management to reduce downtime by 78%, predict failures before they happen, and automate network operations for telecom operators.";
const CANONICAL = `${BASE_URL}/en/solutions/intelligent-noc`;
const OG_IMAGE = `${BASE_URL}/api/og?title=${encodeURIComponent(TITLE)}&description=${encodeURIComponent(DESC)}`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords: [
    "Intelligent NOC",
    "Network Operations Center",
    "AI Network Monitoring",
    "Network Downtime Reduction",
    "Predictive Network Management",
    "Robusst NOC",
    "Telecom Operations",
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

  const cmsNoc = await getCmsContent<Noc_JsonType>("noc", locale);

  return (
    <>
      <Banner data={cmsNoc?.noc_page?.banner} />
      <BusinessOutcomes data={cmsNoc?.noc_page?.businessOutcomes} />
      <AiNetwork data={cmsNoc?.noc_page?.aiNetwork} />
      <NetworkChaos data={cmsNoc?.noc_page?.networkChaos} />
      <IntelligentNOC data={cmsNoc?.noc_page?.intelligentNOC} />
      <CoreCapabilities data={cmsNoc?.noc_page?.coreCapabilities} />
      <NetworkOperationsChaos data={cmsNoc?.noc_page?.networkOperationsChaos} />
      <IntelligentDiffNOC data={cmsNoc?.noc_page?.intelligentDiffNOC} />
      <ChaosControl data={cmsNoc?.noc_page?.chaosControl} />
      <FrameworkADAA data={cmsNoc?.noc_page?.frameworkADAA} />
      <LifecycleAutomation data={cmsNoc?.noc_page?.lifecycleAutomation} />
      <IntegratedComponents data={cmsNoc?.noc_page?.integratedComponents} />
      <DeploymentModels data={cmsNoc?.noc_page?.deploymentModels} />
      <KeyBenefits data={cmsNoc?.noc_page?.keyBenefits} />
      <HumanInLoop data={cmsNoc?.noc_page?.humanInLoop} />
      <FAQSection data={cmsNoc?.noc_page?.faq} />
    </>
  );
};

export default Cdp;
