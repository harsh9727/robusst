import React from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { getBrandedCallingPage } from "~/sanity/queries/brandedCallingPage";
import { locales } from "~/i18n/config";

import { Banner } from "~/components/sections/brand/Banner";
import { Eliminate } from "~/components/sections/brand/Eliminate";
import { TransformCommunication } from "~/components/sections/brand/TransformCommunication";
import { Whychoose } from "~/components/sections/brand/Whychoose";
import { BrandedCalling } from "~/components/sections/brand/BrandedCalling";
import { KeyFeatures } from "~/components/sections/brand/KeyFeatures";
import { AntiSpamProtection } from "~/components/sections/brand/AntiSpamProtection";
import { CoreProtectionFeatures } from "~/components/sections/brand/CoreProtectionFeatures";
import { IndustryApplications } from "~/components/sections/brand/IndustryApplications";
import { RegionalExcellence } from "~/components/sections/brand/RegionalExcellence";
import { SecurityCompliance } from "~/components/sections/brand/SecurityCompliance";
import { FAQSection } from "~/components/sections/brand/FAQSection";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.robusst.com";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const page = await getBrandedCallingPage(locale);
  if (!page?.seo.title || !page.seo.description) return {};
  const route = "/solutions/branded-calling";
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

export const dynamic = "force-static";
export const revalidate = 300;

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const brand = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const page = await getBrandedCallingPage(locale);
  if (!page)
    throw new Error(
      `Missing published Sanity Branded Calling page for ${locale}`,
    );
  const content = page.brandPage;

  return (
    <div>
      <Banner data={content.banner} />
      <Eliminate data={content.eliminate} />
      <TransformCommunication data={content.transformCommunication} />
      <Whychoose data={content.whyChoose} />
      <BrandedCalling data={content.brandedCalling} />
      <KeyFeatures data={content.keyFeatures} />
      <AntiSpamProtection data={content.antiSpamProtection} />
      <CoreProtectionFeatures data={content.coreProtectionFeatures} />
      <IndustryApplications data={content.industryApplications} />
      <RegionalExcellence data={content.regionalExcellence} />
      <SecurityCompliance data={content.securityCompliance} />
      <FAQSection data={content.faq} />
    </div>
  );
};

export default brand;
