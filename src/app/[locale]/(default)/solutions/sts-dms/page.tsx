import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Banner } from "~/components/sections/stsanddms/Banner";
import BusinessAutomation from "~/components/sections/stsanddms/BusinessAutomation/BusinessAutomation";
import DriveSales from "~/components/sections/stsanddms/DriveSales/DriveSales";
import ErpHrisIntegration from "~/components/sections/stsanddms/ErpHrisIntegration/ErpHrisIntegration";
import { FAQSection } from "~/components/sections/stsanddms/FAQSection";
import IndustryAgnostic from "~/components/sections/stsanddms/IndustryAgnostic/IndustryAgnostic";
import RobusstPlatform from "~/components/sections/stsanddms/RobusstPlatform/RobusstPlatform";
import SalesDistribution from "~/components/sections/stsanddms/SalesDistribution/SalesDistribution";
import { STS_Solution_Grid } from "~/components/sections/stsanddms/SolutionGrid";
import SuccessStories from "~/components/sections/stsanddms/SuccessStories/SuccessStories";
import { TelecomIntelligence } from "~/components/sections/stsanddms/TelecomIntelligence/TelecomIntelligence";
import WhyRobusst from "~/components/sections/stsanddms/WhyRobusst/WhyRobusst";
import { locales } from "~/i18n/config";
import { getStsDmsPage } from "~/sanity/queries/stsDmsPage";

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
  const page = await getStsDmsPage(locale);
  if (!page?.seo.title || !page.seo.description) return {};
  const route = "/solutions/sts-dms";
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

export default async function StsDmsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = await getStsDmsPage(locale);
  if (!page)
    throw new Error(`Missing published Sanity STS/DMS page for ${locale}`);
  const content = page.stsDmsPage;
  return (
    <>
      <Banner data={content.banner} />
      <TelecomIntelligence data={content.telecomIntelligence} />
      <SalesDistribution data={content.salesDistribution} />
      <WhyRobusst data={content.whyRobusst} />
      <RobusstPlatform data={content.robusstPlatform} />
      <BusinessAutomation data={content.businessAutomation} />
      <SuccessStories data={content.successStories} />
      <STS_Solution_Grid data={content.solutionGrid} />
      <DriveSales data={content.driveSales} />
      <ErpHrisIntegration data={content.erpHrisIntegration} />
      <IndustryAgnostic data={content.industryAgnostic} />
      <FAQSection data={content.faq} />
    </>
  );
}
