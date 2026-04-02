import React from "react";
import { setRequestLocale } from "next-intl/server";
import { SuccessStoriesPage } from "./successStoryPage";
import { locales } from "~/i18n/config";
import storiesData from "../../../../../../locales/en/successStories.json";

export const dynamic = "force-static";
export const revalidate = 300;

type Story = { id: string };

export function generateStaticParams() {
  const slugs = (storiesData.story as Story[]).map((s) => s.id);
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

const StoriesPage: React.FC<Props> = async ({ params }) => {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  return <SuccessStoriesPage slug={slug} />;
};

export default StoriesPage;
