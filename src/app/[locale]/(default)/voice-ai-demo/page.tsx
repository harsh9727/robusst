import type { Metadata } from "next";
import React from "react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import {
  Capabilities,
  Coverage,
  DialectStrip,
  VoiceDemoHero,
  Wave,
} from "~/components/sections/voiceDemo";
import { locales } from "~/i18n/config";
import { isPageVisible } from "~/sanity/pageRelease";
import { PAGE_ROUTES } from "~/sanity/pageRoutes";
import { getVoiceDemoPage } from "~/sanity/queries/voiceDemoPage";

export const dynamic = "force-static";
export const revalidate = 300;

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.robusst.com";
const ROUTE = PAGE_ROUTES.voiceDemoPage.path;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isPageVisible("voiceDemoPage")) return {};
  const page = await getVoiceDemoPage(locale);
  if (!page?.seo.title || !page.seo.description) return {};

  const canonical = `${BASE_URL}/${locale}${ROUTE}`;
  const languages = Object.fromEntries(
    locales.map((language) => [language, `${BASE_URL}/${language}${ROUTE}`]),
  );
  const socialTitle = page.seo.socialTitle ?? page.seo.title;
  const socialDescription = page.seo.socialDescription ?? page.seo.description;
  // Without a CMS social image, use the localized generated share card.
  const ogParams = new URLSearchParams({
    locale,
    title: socialTitle,
    description: socialDescription,
  });
  const images = [
    page.seo.socialImage
      ? { url: page.seo.socialImage, alt: socialTitle }
      : {
          url: `${BASE_URL}/api/og?${ogParams.toString()}`,
          width: 1200,
          height: 630,
          alt: socialTitle,
        },
  ];

  return {
    title: page.seo.title,
    description: page.seo.description,
    keywords: page.seo.keywords ?? undefined,
    alternates: {
      canonical,
      languages: { ...languages, "x-default": `${BASE_URL}/en${ROUTE}` },
    },
    openGraph: {
      title: socialTitle,
      description: socialDescription,
      url: canonical,
      siteName: "Robusst",
      locale,
      images,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images,
    },
    robots: { index: !page.seo.noIndex, follow: !page.seo.noIndex },
  };
}

const VoiceAiDemo = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  setRequestLocale(locale);
  // Hidden on production until released. See src/sanity/pageRelease.ts.
  if (!isPageVisible("voiceDemoPage")) notFound();

  const page = await getVoiceDemoPage(locale);
  // Until the page is published in Sanity for this locale, serve a 404 rather
  // than failing the build. Publishing revalidates the route.
  if (!page) notFound();

  const url = `${BASE_URL}/${locale}${ROUTE}`;
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: page.seo.title,
    description: page.seo.description,
    inLanguage: locale,
    isPartOf: { "@type": "WebSite", url: `${BASE_URL}/${locale}` },
    keywords: page.seo.keywords?.join(", "),
    primaryImageOfPage: page.seo.socialImage
      ? { "@type": "ImageObject", url: page.seo.socialImage }
      : undefined,
    mainEntity: {
      "@type": "SoftwareApplication",
      name: page.hero.eyebrow,
      description: page.hero.subtitle,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web browser",
      url,
      provider: { "@type": "Organization", name: "Robusst", url: BASE_URL },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <VoiceDemoHero hero={page.hero} demo={page.demo} locale={locale} />
      <DialectStrip strip={page.dialectStrip} regions={page.dialects.regions} />
      <Wave into="light" />
      <Coverage
        coverage={page.coverage}
        dialects={page.dialects}
        outcomes={page.outcomes}
      />
      <Wave into="dark" />
      <Capabilities
        capabilities={page.capabilities}
        cta={page.cta}
        locale={locale}
      />
    </>
  );
};

export default VoiceAiDemo;
