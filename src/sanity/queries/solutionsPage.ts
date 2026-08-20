import { defineQuery } from "next-sanity";
import { sanityClient } from "../lib/client";

export const solutionsPageQuery = defineQuery(`
  *[_type == "solutionsPage" && language == $locale][0]{
    "solutionsPage": {
      "banner": {
        "title": banner.title,
        "subtitle": banner.subtitle,
        "video": banner.video.videoFile.asset->url,
        "videoTitle": banner.video.title
      },
      "solutions": solutionGrid.items[]{
        "slug": internalName,
        title,
        description,
        "image": image.image.asset->url,
        "imageAlt": image.alt,
        "ctaLabel": cta.link.label,
        "ctaAriaLabel": cta.link.ariaLabel,
        "ctaHref": cta.link.href
      }
    },
    "seo": {
      "title": seo.metaTitle,
      "description": seo.metaDescription,
      "keywords": seo.keywords,
      "socialImage": coalesce(
        seo.socialImage.image.asset->url,
        solutionGrid.items[0].image.image.asset->url,
        *[_type == "siteSettings" && language == $locale][0].defaultSeo.socialImage.image.asset->url
      ),
      "noIndex": seo.noIndex
    }
  }
`);

export async function getSolutionsPage(locale: string) {
  return sanityClient.fetch(
    solutionsPageQuery,
    { locale },
    {
      next: {
        revalidate: 300,
        tags: [`sanity-solutionsPage-${locale}`],
      },
    },
  );
}
