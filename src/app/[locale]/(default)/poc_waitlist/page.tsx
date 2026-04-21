import React from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { locales } from "~/i18n/config";
import { getCmsContent } from "~/lib/cms/client";
import type { Pocwaitlist_JsonType } from "~/types/api/pocwaitlist_json.types";
import PocWaitlistContent from "./PocWaitlistContent";

// ── ISR configuration ──────────────────────────────────────────────────────────
export const dynamic = "force-static";
export const revalidate = 300;

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.robusst.com";
const TITLE = "POC Waitlist | Robusst AI Platform";
const DESC =
  "Join the Robusst Proof-of-Concept waitlist and be first to experience AI-powered telecom solutions.";
const OG_IMAGE = `${BASE_URL}/api/og?title=${encodeURIComponent(TITLE)}&description=${encodeURIComponent(DESC)}`;
const CANONICAL = `${BASE_URL}/en/poc_waitlist`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
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
  robots: { index: true, follow: true },
};

// ── Page ───────────────────────────────────────────────────────────────────────
const PocWaitlistPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  setRequestLocale(locale);

  // This fetch IS inside a Server Component.
  // ISR cache, revalidateTag, and revalidatePath all work correctly here.
  // At RUNTIME: returns null on failure; PocWaitlistContent falls back to useTranslations.
  const cmsPocWaitlist = await getCmsContent<Pocwaitlist_JsonType>(
    "pocwaitlist",
    locale,
  );

  return <PocWaitlistContent data={cmsPocWaitlist?.poc_waitlist_page} />;
};

export default PocWaitlistPage;
