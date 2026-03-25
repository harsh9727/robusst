import React from "react";
import { setRequestLocale } from "next-intl/server";
import RoleInfoPage from "./roleInfoPage";
import { locales } from "~/i18n/config";
import careersData from "../../../../../../../locales/en/careers.json";

type JobOpening = { id: string };

export function generateStaticParams() {
  const ids = (careersData.careers.jobOpenings as JobOpening[]).map(
    (job) => job.id,
  );
  return locales.flatMap((locale) => ids.map((id) => ({ locale, id })));
}

interface Props {
  params: Promise<{ locale: string; id: string }>;
}

const RolePage: React.FC<Props> = async ({ params }) => {
  const { locale, id } = await params;
  setRequestLocale(locale);

  return <RoleInfoPage id={id} />;
};

export default RolePage;
