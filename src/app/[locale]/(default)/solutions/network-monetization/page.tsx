import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Banner } from "~/components/sections/networkmonetization/Banner";
import { FAQSection } from "~/components/sections/networkmonetization/FAQSection";
import MobileUseCase from "~/components/sections/networkmonetization/MobileUseCase/MobileUseCase";
import MonetizationFramework from "~/components/sections/networkmonetization/MonetizationFramework/MonetizationFramework";
import { Network_Solution_Grid } from "~/components/sections/networkmonetization/SolutionGrid";
import Telcos from "~/components/sections/networkmonetization/Telcos/Telcos";
import { UseCaseGrid } from "~/components/sections/networkmonetization/UseCaseGrid";
import UserExperienceManagement from "~/components/sections/networkmonetization/UserExperienceManagement/UserExperienceManagement";
import WhyNetworkMonetization from "~/components/sections/networkmonetization/WhyNetworkMonetization/WhyNetworkMonetization";
import { locales } from "~/i18n/config";
import { getNetworkMonetizationPage } from "~/sanity/queries/networkMonetizationPage";

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
  const page = await getNetworkMonetizationPage(locale);
  if (!page?.seo.title || !page.seo.description) return {};
  const route = "/solutions/network-monetization";
  const canonical = `${BASE_URL}/${locale}${route}`;
  const languages = Object.fromEntries(
    locales.map((supportedLocale) => [
      supportedLocale,
      `${BASE_URL}/${supportedLocale}${route}`,
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
      languages: { ...languages, "x-default": `${BASE_URL}/en${route}` },
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
      title: page.seo.title,
      description: page.seo.description,
      images,
    },
    robots: { index: !page.seo.noIndex, follow: !page.seo.noIndex },
  };
}

export default async function NetworkMonetizationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = await getNetworkMonetizationPage(locale);
  if (!page)
    throw new Error(
      `Missing published Sanity Network Monetization page for ${locale}`,
    );
  const content = page.networkMonetizationPage;
  return (
    <>
      <Banner data={content} />
      <WhyNetworkMonetization data={content} />
      <MonetizationFramework data={content} />
      <UserExperienceManagement data={content} />
      <Network_Solution_Grid data={content} />
      <MobileUseCase data={content} />
      <UseCaseGrid data={content} />
      <Telcos data={content} />
      <FAQSection data={content} />
    </>
  );
}
