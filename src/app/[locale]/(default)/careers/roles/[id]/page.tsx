import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import RoleInfoPage from "./roleInfoPage";
import { locales } from "~/i18n/config";
import { getCareerJob, getCareerJobIds } from "~/sanity/queries/careersPage";

export const dynamic = "force-static";
export const revalidate = 300;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.robusst.com";

export async function generateStaticParams() {
  const jobs = await getCareerJobIds();
  return locales.flatMap((locale) =>
    jobs.flatMap((job) => (job.id ? [{ locale, id: job.id }] : [])),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const result = await getCareerJob(locale, id);
  const job = result.job;
  if (!job?.seo.title || !job.seo.description) return {};

  const canonical = `${BASE_URL}/${locale}/careers/roles/${id}`;
  const languages = Object.fromEntries(
    locales.map((supportedLocale) => [
      supportedLocale,
      `${BASE_URL}/${supportedLocale}/careers/roles/${id}`,
    ]),
  );
  const images = job.seo.socialImage
    ? [{ url: job.seo.socialImage, alt: job.seo.title }]
    : undefined;

  return {
    title: job.seo.title,
    description: job.seo.description,
    keywords: job.seo.keywords ?? undefined,
    alternates: {
      canonical,
      languages: {
        ...languages,
        "x-default": `${BASE_URL}/en/careers/roles/${id}`,
      },
    },
    openGraph: {
      title: job.seo.title,
      description: job.seo.description,
      url: canonical,
      siteName: "Robusst",
      images,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: job.seo.title,
      description: job.seo.description,
      images,
    },
    robots: { index: !job.seo.noIndex, follow: !job.seo.noIndex },
  };
}

interface Props {
  params: Promise<{ locale: string; id: string }>;
}

const RolePage: React.FC<Props> = async ({ params }) => {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const result = await getCareerJob(locale, id);
  if (!result.job || !result.rolePage) notFound();

  return <RoleInfoPage job={result.job} rolePage={result.rolePage} />;
};

export default RolePage;
