import type { Metadata } from "next";
import React from "react";
import { setRequestLocale } from "next-intl/server";
import { getSiteSettings } from "~/sanity/queries/siteSettings";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const settings = await getSiteSettings(locale);
  return {
    title: settings?.dashboardPageTitle,
    robots: { index: false, follow: false },
  };
}

export default async function Dashboard({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const settings = await getSiteSettings(locale);
  if (!settings?.dashboardPageTitle)
    throw new Error(`Missing dashboard page copy for ${locale}`);
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center">
      <p>
        {settings.siteName} - {settings.dashboardPageTitle}
      </p>
    </main>
  );
}
