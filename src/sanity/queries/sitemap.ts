import { defineQuery } from "next-sanity";
import { sanityClient } from "../lib/client";

export const sitemapContentQuery = defineQuery(`{
  "pages": *[_type in [
    "homePage", "aboutPage", "blogIndexPage", "careersPage", "contactPage",
    "partnershipPage", "platformsPage", "pocWaitlistPage", "solutionsPage",
    "aiCallCenterPage", "brandedCallingPage", "customerDataPlatformPage",
    "customizedSolutionsPage", "cybersecurityPage", "intelligentNocPage",
    "networkMonetizationPage", "stsDmsPage", "storiesPage"
  ]]{
    _type,
    language,
    "lastModified": _updatedAt
  },
  "blogs": *[_type == "blogPost" && defined(slug.current)]{
    language,
    "slug": slug.current,
    "lastModified": coalesce(updatedAtEditorial, _updatedAt),
    "translations": *[_type == "translation.metadata" && references(^._id)][0].translations[]{
      language,
      "slug": value->slug.current
    }
  },
  "authors": *[_type == "author" && defined(slug.current)]{
    language,
    "slug": slug.current,
    "lastModified": _updatedAt,
    "translations": *[_type == "translation.metadata" && references(^._id)][0].translations[]{
      language,
      "slug": value->slug.current
    }
  },
  "jobs": *[_type == "jobPosting" && defined(legacyId) && open == true]{
    language,
    legacyId,
    "lastModified": _updatedAt,
    "translations": *[_type == "translation.metadata" && references(^._id)][0].translations[]{
      language,
      "legacyId": value->legacyId
    }
  }
}`);

export function getSitemapContent() {
  return sanityClient.fetch(
    sitemapContentQuery,
    {},
    { next: { revalidate: 300, tags: ["sanity-sitemap"] } },
  );
}
