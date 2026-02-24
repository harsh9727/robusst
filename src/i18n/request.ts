import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import type { Locale } from "./config";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: {
      ...(await import(`../../locales/${locale}/home.json`)).default,
      ...(await import(`../../locales/${locale}/footer.json`)).default,
      ...(await import(`../../locales/${locale}/header.json`)).default,
      ...(await import(`../../locales/${locale}/platforms.json`)).default,
      ...(await import(`../../locales/${locale}/successStories.json`)).default,
      ...(await import(`../../locales/${locale}/storyPage.json`)).default,
      ...(await import(`../../locales/${locale}/careers.json`)).default,
      ...(await import(`../../locales/${locale}/common.json`)).default,
      ...(await import(`../../locales/${locale}/partnership.json`)).default,
      ...(await import(`../../locales/${locale}/aboutPage.json`)).default,
      ...(await import(`../../locales/${locale}/cdp.json`)).default,
      ...(await import(`../../locales/${locale}/brand.json`)).default,
      ...(await import(`../../locales/${locale}/customizeSolution.json`)).default,
    },
  };
});
