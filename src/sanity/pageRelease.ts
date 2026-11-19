import "server-only";
import { PAGE_ROUTES, type LocalizedPageType } from "./pageRoutes";

/**
 * Pages that are finished in code and in Sanity but not yet released.
 *
 * They show locally and on staging (Vercel Preview), and stay hidden on
 * production: the route returns 404, and the sitemap, llms.txt, and header
 * leave them out. While a page is listed here, the header adds its Resources
 * link from code, because staging and production share one Sanity dataset.
 *
 * To release a page: remove it from this list, then add its menu link in
 * Sanity (for the voice demo: `pnpm sanity:voice-demo:migrate --with-navigation`).
 */
const UNRELEASED_PAGES: readonly LocalizedPageType[] = ["voiceDemoPage"];

const isProduction = process.env.VERCEL_ENV === "production";

export function isPageVisible(type: LocalizedPageType) {
  return !isProduction || !UNRELEASED_PAGES.includes(type);
}

/** Unreleased pages that this deployment shows (empty on production). */
export const previewPageTypes = UNRELEASED_PAGES.filter(isPageVisible);

/** Paths that this deployment hides, without the locale prefix. */
export const hiddenPagePaths: readonly string[] = UNRELEASED_PAGES.filter(
  (type) => !isPageVisible(type),
).map((type) => PAGE_ROUTES[type].path);

export function isHiddenHref(href: string | null | undefined) {
  return !!href && hiddenPagePaths.includes(href);
}
