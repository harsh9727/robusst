import { defineQuery } from "next-sanity";
import { sanityClient } from "../lib/client";

/*
 * Menu labels for unreleased pages (see src/sanity/pageRelease.ts). The label
 * is the page's hero eyebrow, so no extra Sanity field is needed.
 */
export const previewNavigationQuery = defineQuery(`
  *[_type in $types && language == $locale]{
    _type,
    "label": banner->content.eyebrow
  }
`);

export function getPreviewNavigation(locale: string, types: readonly string[]) {
  return sanityClient.fetch(
    previewNavigationQuery,
    { locale, types: [...types] },
    {
      next: {
        revalidate: 300,
        tags: types.map((type) => `sanity-${type}-${locale}`),
      },
    },
  );
}
