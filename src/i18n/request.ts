import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import type { Locale } from "./config";
import { getCmsContent } from "~/lib/cms/client";
import type { Home_JsonType } from "~/types/api/home_json.types";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  // ── CMS-managed schemas ────────────────────────────────────────────────────
  // Each entry fetches from the CMS with ISR (5-min cache + on-demand purge).
  // Falls back to the static JSON if the CMS is unreachable or the schema
  // doesn't exist yet. To migrate a new page: add it here, delete the JSON.
  //
  // Future pattern (once the CMS schema exists):
  //   const footer = await getCmsContent<Footer_JsonType>("footer", locale);
  // ──────────────────────────────────────────────────────────────────────────
  const home = await getCmsContent<Home_JsonType>("home", locale);

  return {
    locale,
    messages: {
      // Home: live from CMS, static JSON as safety net
      ...(home ?? (await import(`../../locales/${locale}/home.json`)).default),

      // ── Still on static JSON — migrate each once its CMS schema is ready ──
      ...(await import(`../../locales/${locale}/footer.json`)).default,
      ...(await import(`../../locales/${locale}/header.json`)).default,
      ...(await import(`../../locales/${locale}/platforms.json`)).default,
      ...(await import(`../../locales/${locale}/storyPage.json`)).default,
      ...(await import(`../../locales/${locale}/careers.json`)).default,
      ...(await import(`../../locales/${locale}/common.json`)).default,
      ...(await import(`../../locales/${locale}/partnership.json`)).default,
      ...(await import(`../../locales/${locale}/aboutPage.json`)).default,
      ...(await import(`../../locales/${locale}/cdp.json`)).default,
      ...(await import(`../../locales/${locale}/brand.json`)).default,
      ...(await import(`../../locales/${locale}/customizeSolution.json`)),
      ...(await import(`../../locales/${locale}/noc.json`)),
      ...(await import(`../../locales/${locale}/networkMonetization.json`)),
      ...(await import(`../../locales/${locale}/aiCall.json`)),
      ...(await import(`../../locales/${locale}/stsAndDms.json`)),
      ...(await import(`../../locales/${locale}/contact.json`)),
      ...(await import(`../../locales/${locale}/pocWaitlist.json`)),
      ...(await import(`../../locales/${locale}/successStories.json`)),
      ...(await import(`../../locales/${locale}/solutionsPage.json`)),
      ...(await import(`../../locales/${locale}/cybersecurity.json`)).default,
    },
  };
});
