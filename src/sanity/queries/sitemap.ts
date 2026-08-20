import { defineQuery } from "next-sanity";
import { sanityClient } from "../lib/client";

export const sitemapContentQuery = defineQuery(`{
  "blogs": *[_type == "blogPost" && defined(slug.current)]{
    language,
    "slug": slug.current,
    "lastModified": coalesce(updatedAtEditorial, _updatedAt)
  },
  "jobs": *[_type == "jobPosting" && defined(legacyId) && open == true]{
    language,
    legacyId,
    "lastModified": _updatedAt
  }
}`);

export function getSitemapContent() {
  return sanityClient.fetch(
    sitemapContentQuery,
    {},
    { next: { revalidate: 300, tags: ["sanity-sitemap"] } },
  );
}
