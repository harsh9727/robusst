import React from "react";
import { setRequestLocale } from "next-intl/server";
import { SuccessStoriesPage } from "./successStoryPage";
import { locales } from "~/i18n/config";

import { getCmsContent } from "~/lib/cms/client";
import type { Storypage_JsonType } from "~/types/api/storypage_json.types";
import type { Successstories_JsonType } from "~/types/api/successstories_json.types";

export const dynamic = "force-static";
export const revalidate = 300;

export async function generateStaticParams() {
  // Primary: CMS data. At BUILD TIME getCmsContent throws if CMS is unreachable
  // (fast-fail deploy). At RUNTIME this function is never called.
  const cmsData = await getCmsContent<Successstories_JsonType>(
    "successstories",
    "en",
  );
  const slugs = (cmsData?.story ?? []).map((s) => s.id);
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

const StoriesPage: React.FC<Props> = async ({ params }) => {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  // At RUNTIME: returns null on failure; SuccessStoriesPage falls back to useTranslations.
  const cmsStoryPage = await getCmsContent<Storypage_JsonType>(
    "storypage",
    locale,
  );
  const cmsSuccessStories = await getCmsContent<Successstories_JsonType>(
    "successstories",
    locale,
  );

  return (
    <SuccessStoriesPage
      slug={slug}
      storyPageData={cmsStoryPage?.storyPage}
      storiesData={cmsSuccessStories?.story}
    />
  );
};

export default StoriesPage;
