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
import { SolutionVideoSection } from "~/components/sections/common/SolutionVideoSection";

import { locales } from "~/i18n/config";
import { getCustomerDataPlatformPage } from "~/sanity/queries/customerDataPlatformPage";

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
  const page = await getCustomerDataPlatformPage(locale);
  if (!page?.seo.title || !page.seo.description) return {};
  const route = "/solutions/customer-data-platform";
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
      title: page.seo.title,
      description: page.seo.description,
      images,
    },
    robots: { index: !page.seo.noIndex, follow: !page.seo.noIndex },
  };
}

const Cdp = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = await getCustomerDataPlatformPage(locale);
  if (!page)
    throw new Error(
      `Missing published Sanity Customer Data Platform page for ${locale}`,
    );
  const content = page.cdpPage;
  return (
    <>
      <Banner data={content.banner} />
      <SolutionVideoSection {...content.videoSection} />
      <WhyChooseRobusst data={content.whyChooseRobusst} />
      <IndustryApplications data={content.industryApplications} />
      <ProvenImpact data={content.provenImpact} />
      <TelecomUseCases data={content.telecomUseCases} />
      <PersonalizedExperience data={content.personalizedExperience} />
      <CDP_Solution_Grid data={content.solutionGrid} />
      <BenefitsUseCases data={content.benefitsUseCases} />
      <AccelerateValue data={content.accelerateValue} />
      <KeyFeaturesCapabilities data={content.keyFeaturesCapabilities} />
      <CtaSection data={content.ctaSection} />
      <FAQSection data={content.faq} />
    </>
  );
};

export default Cdp;
