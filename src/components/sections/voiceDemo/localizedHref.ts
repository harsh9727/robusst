/** Adds the locale prefix to internal CMS links. */
export function localizedHref(href: string | null, locale: string) {
  if (!href) return `/${locale}/contact`;
  if (!href.startsWith("/")) return href;
  return `/${locale}${href === "/" ? "" : href}`;
}
