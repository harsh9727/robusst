import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import type { Locale } from "./config";

// ── Architectural rule ────────────────────────────────────────────────────────
// getRequestConfig runs inside next-intl middleware infrastructure, NOT inside
// Next.js's render pipeline. Any fetch() call here does NOT participate in the
// ISR fetch cache. next: { tags, revalidate } options are silently ignored.
// revalidateTag / revalidatePath cannot reach data fetched here.
//
// Rule: this file returns { locale, messages } ONLY.
// CMS fetches belong in page.tsx / layout.tsx (Server Components).
// ─────────────────────────────────────────────────────────────────────────────

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: {
      // ── home: kept as static fallback for non-home components ──────────────
      // The home PAGE fetches live CMS data via getCmsContent("home", locale)
      // in page.tsx and passes typed props — so home section components no
      // longer read these keys via useTranslations().
      //
      // However, two non-home components still reference home.json keys:
      //   • src/components/sections/solutions/SolutionGrid  → "solutions"
      //   • src/components/sections/careersPage/Contact     → "contact"
      //
      // Keep this import until those components are migrated off home.json.
      // Once migrated, delete home.json across all locales and remove this line.
      // ───────────────────────────────────────────────────────────────────────
      ...(await import(`../../locales/${locale}/home.json`)).default,

      // ── Still on static JSON — migrate each once its CMS schema is ready ───
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
      ...(await import(`../../locales/${locale}/customizeSolution.json`))
        .default,
      ...(await import(`../../locales/${locale}/noc.json`)).default,
      ...(await import(`../../locales/${locale}/networkMonetization.json`))
        .default,
      ...(await import(`../../locales/${locale}/aiCall.json`)).default,
      ...(await import(`../../locales/${locale}/stsAndDms.json`)).default,
      ...(await import(`../../locales/${locale}/contact.json`)).default,
      ...(await import(`../../locales/${locale}/pocWaitlist.json`)).default,
      ...(await import(`../../locales/${locale}/successStories.json`)).default,
      ...(await import(`../../locales/${locale}/solutionsPage.json`)).default,
      ...(await import(`../../locales/${locale}/cybersecurity.json`)).default,
    },
  };
});
