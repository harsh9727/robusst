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
