import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import AiNetwork from "~/components/sections/noc/AiNetwork/AiNetwork";
import { Banner } from "~/components/sections/noc/Banner";
import BusinessOutcomes from "~/components/sections/noc/BusinessOutcomes/BusinessOutcomes";
import ChaosControl from "~/components/sections/noc/ChaosControl/ChaosControl";
import CoreCapabilities from "~/components/sections/noc/CoreCapabilities/CoreCapabilities";
import DeploymentModels from "~/components/sections/noc/DeploymentModels/DeploymentModels";
import { FAQSection } from "~/components/sections/noc/FAQSection";
import FrameworkADAA from "~/components/sections/noc/FrameworkADAA/FrameworkADAA";
import HumanInLoop from "~/components/sections/noc/HumanInLoop/HumanInLoop";
import IntegratedComponents from "~/components/sections/noc/IntegratedComponents/IntegratedComponents";
import IntelligentDiffNOC from "~/components/sections/noc/IntelligentDiffNOC/IntelligentDiffNOC";
import IntelligentNOC from "~/components/sections/noc/IntelligentNOC/IntelligentNOC";
import KeyBenefits from "~/components/sections/noc/KeyBenefits/KeyBenefits";
import LifecycleAutomation from "~/components/sections/noc/LifecycleAutomation/LifecycleAutomation";
import NetworkChaos from "~/components/sections/noc/NetworkChaos/NetworkChaos";
import NetworkOperationsChaos from "~/components/sections/noc/NetworkOperationsChaos/NetworkOperationsChaos";
import { locales } from "~/i18n/config";
import { getIntelligentNocPage } from "~/sanity/queries/intelligentNocPage";

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
  const page = await getIntelligentNocPage(locale);
  if (!page?.seo.title || !page.seo.description) return {};
  const route = "/solutions/intelligent-noc";
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

export default async function IntelligentNocPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = await getIntelligentNocPage(locale);
  if (!page)
    throw new Error(
      `Missing published Sanity Intelligent NOC page for ${locale}`,
    );
  const content = page.nocPage;
  return (
    <>
      <Banner data={content.banner} />
      <BusinessOutcomes data={content.businessOutcomes} />
      <AiNetwork data={content.aiNetwork} />
      <NetworkChaos data={content.networkChaos} />
      <IntelligentNOC data={content.intelligentNOC} />
      <CoreCapabilities data={content.coreCapabilities} />
      <NetworkOperationsChaos data={content.networkOperationsChaos} />
      <IntelligentDiffNOC data={content.intelligentDiffNOC} />
      <ChaosControl data={content.chaosControl} />
      <FrameworkADAA data={content.frameworkADAA} />
      <LifecycleAutomation data={content.lifecycleAutomation} />
      <IntegratedComponents data={content.integratedComponents} />
      <DeploymentModels data={content.deploymentModels} />
      <KeyBenefits data={content.keyBenefits} />
      <HumanInLoop data={content.humanInLoop} />
      <FAQSection data={content.faq} />
    </>
  );
}
