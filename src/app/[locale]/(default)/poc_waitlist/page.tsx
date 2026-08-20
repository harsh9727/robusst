import React from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { locales } from "~/i18n/config";
import { getPocWaitlistPage } from "~/sanity/queries/pocWaitlistPage";
import PocWaitlistContent from "./PocWaitlistContent";

// ── ISR configuration ──────────────────────────────────────────────────────────
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
  const page = await getPocWaitlistPage(locale);
  if (!page?.seo.title || !page.seo.description) return {};

  const canonical = `${BASE_URL}/${locale}/poc_waitlist`;
  const languages = Object.fromEntries(
    locales.map((supportedLocale) => [
      supportedLocale,
      `${BASE_URL}/${supportedLocale}/poc_waitlist`,
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
      languages: {
        ...languages,
        "x-default": `${BASE_URL}/en/poc_waitlist`,
      },
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

// ── Page ───────────────────────────────────────────────────────────────────────
const PocWaitlistPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const pocWaitlistPage = await getPocWaitlistPage(locale);
  if (!pocWaitlistPage) {
    throw new Error(`Missing published Sanity POC Waitlist page for ${locale}`);
  }

  return (
    <PocWaitlistContent data={pocWaitlistPage.pocWaitlist} locale={locale} />
  );
};

export default PocWaitlistPage;
