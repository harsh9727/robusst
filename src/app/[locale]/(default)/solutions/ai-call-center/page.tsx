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
import { getAiCallCenterPage } from "~/sanity/queries/aiCallCenterPage";

export const dynamic = "force-static";
export const revalidate = 300;

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.robusst.com";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const page = await getAiCallCenterPage(locale);
  if (!page?.seo.title || !page.seo.description) return {};

  const route = "/solutions/ai-call-center";
  const canonical = `${BASE_URL}/${locale}${route}`;
  const languages = Object.fromEntries(
    locales.map((supportedLocale) => [
      supportedLocale,
      `${BASE_URL}/${supportedLocale}${route}`,
    ]),
  );
  const images = page.seo.socialImage
    ? [{ url: page.seo.socialImage, alt: page.seo.title }]
    : undefined;

  return {
    title: page.seo.title,
    description: page.seo.description,
    keywords: page.seo.keywords ?? undefined,
    authors: [{ name: "Robusst Team", url: BASE_URL }],
    creator: "Robusst",
    publisher: "Robusst",
    alternates: {
      canonical,
      languages: { ...languages, "x-default": `${BASE_URL}/en${route}` },
    },
    openGraph: {
      title: page.seo.title,
      description: page.seo.description,
      url: canonical,
      siteName: "Robusst",
      images,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@robusst",
      creator: "@robusst",
      title: page.seo.title,
      description: page.seo.description,
      images,
    },
    robots: { index: !page.seo.noIndex, follow: !page.seo.noIndex },
  };
}

const Aicall = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const page = await getAiCallCenterPage(locale);
  if (!page) {
    throw new Error(
      `Missing published Sanity AI Call Center page for ${locale}`,
    );
  }
  const content = page.aiCallPage;

  return (
    <>
      <Banner data={content.banner} />
      <BusinessProblem data={content.businessProblem} />
      <SolutionOverview data={content.solutionOverview} />
      <KeyValueProposition data={content.keyValueProposition} />
      <CoreCapabilities data={content.coreCapabilities} />
      <AdvancedAIIntelligence data={content.advancedAIIntelligence} />
      <EnterpriseArchitecture data={content.enterpriseArchitecture} />
      <AICALL_Solution_Grid data={content.solutionGrid} />
      {/*<InfrastructureControl />
      <SecurityCompliance />
      <EnterpriseSupport />*/}
      <CustomDevelopment data={content.customDevelopment} />
      <IdealUseCases data={content.idealUseCases} />
      <FutureAutomation data={content.futureAutomation} />
      <FAQSection data={content.faq} />
    </>
  );
};

export default Aicall;
