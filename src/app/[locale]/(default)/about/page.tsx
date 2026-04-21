import React from "react";
import { setRequestLocale } from "next-intl/server";
import { locales } from "~/i18n/config";
import { getCmsContent } from "~/lib/cms/client";
import type { Aboutpage_JsonType } from "~/types/api/about_json.types";
import AboutContent from "./AboutContent";

export const dynamic = "force-static";
export const revalidate = 300;

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const About = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const cmsAbout = await getCmsContent<Aboutpage_JsonType>("aboutpage", locale);

  return <AboutContent data={cmsAbout?.aboutPage} />;
};

export default About;
