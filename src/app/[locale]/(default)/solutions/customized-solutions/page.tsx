import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Banner } from "~/components/sections/customizesolution";
import ChallengesSection from "~/components/sections/customizesolution/ChallengesSection/ChallengesSection";
import CommitmentToExcellence from "~/components/sections/customizesolution/CommitmentToExcellence/CommitmentToExcellence";
import CustomerCentric from "~/components/sections/customizesolution/CustomerCentric/CustomerCentric";
import CustomizedSolutions from "~/components/sections/customizesolution/CustomizedSolutions/CustomizedSolutions";
import { CustomizedSolutionsSlider } from "~/components/sections/customizesolution/CustomizedSolutionsSlider";
import { FAQSection } from "~/components/sections/customizesolution/FAQSection";
import InnovationProcess from "~/components/sections/customizesolution/InnovationProcess/InnovationProcess";
import { locales } from "~/i18n/config";
import { getCustomizedSolutionsPage } from "~/sanity/queries/customizedSolutionsPage";

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
  const page = await getCustomizedSolutionsPage(locale);
  if (!page?.seo.title || !page.seo.description) return {};
  const route = "/solutions/customized-solutions";
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

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = await getCustomizedSolutionsPage(locale);
  if (!page)
    throw new Error(
      `Missing published Sanity Customized Solutions page for ${locale}`,
    );
  const content = page.customizedSolutionsPage;
  return (
    <>
      <Banner data={content.banner} />
      <InnovationProcess data={content.innovationProcess} />
      <CustomizedSolutions data={content.customizedSolutions} />
      <CustomerCentric data={content.customerCentric} />
      <ChallengesSection data={content.challenges} />
      <CustomizedSolutionsSlider data={content.customizedSolutionsSlider} />
      <CommitmentToExcellence data={content.commitmentToExcellence} />
      <FAQSection data={content.faq} />
    </>
  );
}
