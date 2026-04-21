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
    messages: {},
  };
});
