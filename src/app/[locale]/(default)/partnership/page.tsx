import React from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Banner } from "~/components/sections/partnership/banner/Banner";
import FormSection from "~/components/sections/partnership/formsection/FormSection";
import Partner from "~/components/sections/partnership/partner/Partner";
import { FadeIn } from "~/components/ui/FadeIn";
import { getPartnershipPage } from "~/sanity/queries/partnershipPage";

import { locales } from "~/i18n/config";

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
  const page = await getPartnershipPage(locale);
  if (!page?.seo.title || !page.seo.description) return {};

  const canonical = `${BASE_URL}/${locale}/partnership`;
  const languages = Object.fromEntries(
    locales.map((supportedLocale) => [
      supportedLocale,
      `${BASE_URL}/${supportedLocale}/partnership`,
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
      languages: { ...languages, "x-default": `${BASE_URL}/en/partnership` },
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
    robots: {
      index: !page.seo.noIndex,
      follow: !page.seo.noIndex,
    },
  };
}

const PartnershipPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const partnershipPage = await getPartnershipPage(locale);
  if (!partnershipPage) {
    throw new Error(`Missing published Sanity Partnership page for ${locale}`);
  }
  return (
    <div>
      <FadeIn backgroundColor="bg-primary">
        <Banner data={partnershipPage.banner} />
      </FadeIn>
      <FadeIn>
        <Partner data={partnershipPage.partner} />
      </FadeIn>
      <FadeIn>
        <FormSection data={partnershipPage.formSection} />
      </FadeIn>
    </div>
  );
};

export default PartnershipPage;
