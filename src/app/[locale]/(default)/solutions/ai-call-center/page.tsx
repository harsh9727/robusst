import React from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import BusinessProblem from "~/components/sections/aicall/BusinessProblem/BusinessProblem";
import { Banner } from "~/components/sections/aicall/Banner";
import SolutionOverview from "~/components/sections/aicall/SolutionOverview/SolutionOverview";
import KeyValueProposition from "~/components/sections/aicall/KeyValueProposition/KeyValueProposition";
import CoreCapabilities from "~/components/sections/aicall/CoreCapabilities/CoreCapabilities";
import AdvancedAIIntelligence from "~/components/sections/aicall/AdvancedAIIntelligence/AdvancedAIIntelligence";
import EnterpriseArchitecture from "~/components/sections/aicall/EnterpriseArchitecture/EnterpriseArchitecture";
import CustomDevelopment from "~/components/sections/aicall/CustomDevelopment/CustomDevelopment";
import IdealUseCases from "~/components/sections/aicall/IdealUseCases/IdealUseCases";
import FutureAutomation from "~/components/sections/aicall/FutureAutomation/FutureAutomation";
import { AICALL_Solution_Grid } from "~/components/sections/aicall/SolutionGrid";
import { FAQSection } from "~/components/sections/aicall/FAQSection";
import { locales } from "~/i18n/config";

export const dynamic = "force-static";
export const revalidate = 300;

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.robusst.com";
const TITLE = "VoiceSync Enterprise — AI Call Center Automation | Robusst";
const DESC =
  "Automate customer interactions 24/7 with AI-driven voice flows, CRM integration, and voice analytics. Reduce call center costs while improving CSAT with Robusst VoiceSync.";
const CANONICAL = `${BASE_URL}/en/solutions/ai-call-center`;
const OG_IMAGE = `${BASE_URL}/api/og?title=${encodeURIComponent(TITLE)}&description=${encodeURIComponent(DESC)}`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords: [
    "AI Call Center",
    "VoiceSync Enterprise",
    "Call Center Automation",
    "AI Voice Bot",
    "CRM Integration",
    "Customer Service Automation",
    "Robusst AI Call Center",
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

const Aicall = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Banner />
      <BusinessProblem />
      <SolutionOverview />
      <KeyValueProposition />
      <CoreCapabilities />
      <AdvancedAIIntelligence />
      <EnterpriseArchitecture />
      <AICALL_Solution_Grid />
      {/*<InfrastructureControl />
      <SecurityCompliance />
      <EnterpriseSupport />*/}
      <CustomDevelopment />
      <IdealUseCases />
      <FutureAutomation />
      <FAQSection />
    </>
  );
};

export default Aicall;
