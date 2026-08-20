import { defineQuery } from "next-sanity";
import { sanityClient } from "../lib/client";

export const discoveryContentQuery = defineQuery(`{
  "site": *[_type == "siteSettings" && language == $locale][0]{
    siteName,
    tagline,
    organizationDescription,
    contactEmail,
    "logo": logo.image.asset->url,
    "logoAlt": logo.alt,
    "favicon": favicon.asset->url,
    socialLinksHeading,
    socialLinks[]{label, href},
    quickLinksHeading,
    primaryNavigation[]{label, href},
    solutionLinks[]{label, href},
    defaultSeo{
      "title": metaTitle,
      "description": metaDescription,
      keywords,
      "socialTitle": socialTitle,
      "socialDescription": socialDescription,
      "socialImage": socialImage.image.asset->url,
      "socialImageAlt": socialImage.alt,
      noIndex
    }
  },
  "solutions": *[_type == "solutionsPage" && language == $locale][0]{
    "heading": banner.title,
    "description": banner.subtitle,
    "items": solutionGrid.items[]{title, description, "href": cta.link.href}
  },
  "home": *[_type == "homePage" && language == $locale][0]{
    "results": results{title, description, items[]{title, "value": eyebrow}},
    "industries": industriesWeServe{title, description, items[]{title, description}},
    "presence": ourPresence{title, subtitle, labels},
    "storiesHeading": successStories.title,
    "blogsHeading": blogs.title
  },
  "customers": array::unique(*[_type == "successStory" && language == $locale].customerName),
  "stories": *[_type == "successStory" && language == $locale] | order(legacyId asc){title, customerName, summary},
  "blogs": *[_type == "blogPost" && language == $locale] | order(publishedAt desc){title, "slug": slug.current, excerpt, publishedAt}
}`);

export function getDiscoveryContent(locale = "en") {
  return sanityClient.fetch(
    discoveryContentQuery,
    { locale },
    { next: { revalidate: 300, tags: [`sanity-discovery-${locale}`] } },
  );
}
