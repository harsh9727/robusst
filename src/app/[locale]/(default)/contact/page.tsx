import type { Metadata } from "next";
import React from "react";
import { setRequestLocale } from "next-intl/server";
import { locales } from "~/i18n/config";
import { getContactPage } from "~/sanity/queries/contactPage";
import ContactContent from "./ContactContent";

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
  const page = await getContactPage(locale);
  if (!page) return {};
  const route = "/contact";
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

// ── Page ───────────────────────────────────────────────────────────────────────
const ContactPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const contactPage = await getContactPage(locale);
  if (!contactPage) {
    throw new Error(`Missing published Sanity Contact page for ${locale}`);
  }

  return <ContactContent data={contactPage} />;
};

export default ContactPage;
