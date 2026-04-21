import React from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Banner } from "~/components/sections/partnership/banner/Banner";
import FormSection from "~/components/sections/partnership/formsection/FormSection";
import Partner from "~/components/sections/partnership/partner/Partner";
import { FadeIn } from "~/components/ui/FadeIn";
import { getCmsContent } from "~/lib/cms/client";
import type { Partnership_JsonType } from "~/types/api/partnership_json.types";

import { locales } from "~/i18n/config";

export const dynamic = "force-static";
export const revalidate = 300;

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.robusst.com";
const TITLE = "Partner With Robusst | Global Alliance Program";
const DESC =
  "Join Robusst's global partner ecosystem and co-deliver AI solutions for telecom & banking across Africa, Middle East, Asia, Europe, and beyond.";
const CANONICAL = `${BASE_URL}/en/partnership`;
const OG_IMAGE = `${BASE_URL}/api/og?title=${encodeURIComponent(TITLE)}&description=${encodeURIComponent(DESC)}`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords: [
    "Robusst Partnership",
    "Telecom AI Partner",
    "Global Alliance Program",
    "Enterprise Technology Partner",
    "Channel Partner",
    "Reseller Program",
  ].join(", "),
  authors: [{ name: "Robusst Team", url: BASE_URL }],
  creator: "Robusst",
  publisher: "Robusst",
  openGraph: {
    title: TITLE,
    description: DESC,
    url: CANONICAL,
    siteName: "Robusst",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: TITLE,
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@robusst",
    creator: "@robusst",
    title: TITLE,
    description: DESC,
    images: [{ url: OG_IMAGE, alt: TITLE }],
  },
  alternates: { canonical: CANONICAL },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const PartnershipPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const cmsPartnership = await getCmsContent<Partnership_JsonType>(
    "partnership",
    locale,
  );
  return (
    <div>
      <FadeIn backgroundColor="bg-primary">
        <Banner data={cmsPartnership?.partnership?.banner} />
      </FadeIn>
      <FadeIn>
        <Partner data={cmsPartnership?.partnership?.partner} />
      </FadeIn>
      <FadeIn>
        <FormSection data={cmsPartnership?.partnership?.formSection} />
      </FadeIn>
    </div>
  );
};

export default PartnershipPage;
