import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";
import { getCmsContent } from "~/lib/cms/client";
import type { Common_JsonType } from "~/types/api/common_json.types";

// This file MUST be a server component so Next.js serves it with HTTP 404.
// Client-only logic is delegated to the <NotFoundClient> child below.

export default async function NotFound() {
  const locale = await getLocale();
  // getTranslations works in server components without params
  const t = await getTranslations("common");

  // At RUNTIME: returns null on failure; falls back to getTranslations.
  const cmsCommon = await getCmsContent<Common_JsonType>("common", locale);

  const notFoundText = cmsCommon?.common.notFound ?? t("notFound");
  const notFoundDescription =
    cmsCommon?.common.notFoundDescription ?? t("notFoundDescription");
  const notFoundAction =
    cmsCommon?.common.notFoundAction ?? t("notFoundAction");

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-1 bg-black">
      <p className="text-xl font-bold text-white">{notFoundText}</p>
      <p className="text-white/80">{notFoundDescription}</p>
      <Link
        href="/"
        className="bg-brand-three hover:bg-brand-three/90 mt-5 inline-flex h-13 items-center justify-center rounded-full px-8 text-lg font-medium text-white transition-colors"
      >
        {notFoundAction}
      </Link>
    </div>
  );
}
