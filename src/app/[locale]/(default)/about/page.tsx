import type { Metadata } from "next";
import React from "react";
import { setRequestLocale } from "next-intl/server";
import { locales } from "~/i18n/config";
import { getAboutPage } from "~/sanity/queries/aboutPage";
import AboutContent from "./AboutContent";

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
  const page = await getAboutPage(locale);
  if (!page) return {};
  const route = "/about";
  const canonical = `${BASE_URL}/${locale}${route}`;
  const languages = Object.fromEntries(
    locales.map((language) => [language, `${BASE_URL}/${language}${route}`]),
  );
  const images = page.seo.socialImage
    ? [
        {
          url: page.seo.socialImage,
          alt: page.seo.socialTitle ?? page.seo.title,
        },
      ]
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
      title: page.seo.socialTitle ?? page.seo.title,
      description: page.seo.socialDescription ?? page.seo.description,
      url: canonical,
      images,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.seo.socialTitle ?? page.seo.title,
      description: page.seo.socialDescription ?? page.seo.description,
      images,
    },
    robots: { index: !page.seo.noIndex, follow: !page.seo.noIndex },
  };
}

const About = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const aboutPage = await getAboutPage(locale);
  if (!aboutPage) {
    throw new Error(`Missing published Sanity About page for ${locale}`);
  }

  return <AboutContent data={aboutPage} />;
};

export default About;
