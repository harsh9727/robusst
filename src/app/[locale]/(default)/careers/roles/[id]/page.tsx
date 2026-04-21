import React from "react";
import { setRequestLocale } from "next-intl/server";
import RoleInfoPage from "./roleInfoPage";
import { locales } from "~/i18n/config";

import { getCmsContent } from "~/lib/cms/client";
import type { Careers_JsonType } from "~/types/api/careers_json.types";
import type { Common_JsonType } from "~/types/api/common_json.types";

export const dynamic = "force-static";
export const revalidate = 300;

type JobOpening = { id: string };

export async function generateStaticParams() {
  // Primary: CMS data. At BUILD TIME getCmsContent throws if CMS is unreachable
  // (fast-fail deploy). At RUNTIME it returns null — but generateStaticParams
  // only ever runs at build time so null means no role pages are generated.
  const cmsData = await getCmsContent<Careers_JsonType>("careers", "en");
  const ids = (
    (cmsData?.careers.jobOpenings as JobOpening[] | undefined) ?? []
  ).map((job) => job.id);
  return locales.flatMap((locale) => ids.map((id) => ({ locale, id })));
}

interface Props {
  params: Promise<{ locale: string; id: string }>;
}

const RolePage: React.FC<Props> = async ({ params }) => {
  const { locale, id } = await params;
  setRequestLocale(locale);

  // At RUNTIME: returns null on failure; RoleInfoPage falls back to useTranslations.
  const cmsCareers = await getCmsContent<Careers_JsonType>("careers", locale);
  const cmsCommon = await getCmsContent<Common_JsonType>("common", locale);

  return (
    <RoleInfoPage
      id={id}
      data={cmsCareers?.careers}
      commonData={cmsCommon?.common}
    />
  );
};

export default RolePage;
