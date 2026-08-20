import { defineQuery } from "next-sanity";
import { sanityClient } from "../lib/client";

const platformProjection = `{
  "heading": title,
  "subHeading": subtitle,
  "image": image.image.asset->url,
  "imageAlt": image.alt,
  "keyModules": groups[internalName == "keyModules"][0].items[].title,
  "clientBenefits": groups[internalName == "clientBenefits"][0].items[].title
}`;

export const platformsPageQuery = defineQuery(`
  *[_type == "platformsPage" && language == $locale][0]{
    "platforms": {
      "banner": {
        "heading": banner.title,
        "subHeading": banner.subtitle,
        "videoUrl": banner.video.videoFile.asset->url,
        "videoTitle": banner.video.title
      },
      "cdp": cdp${platformProjection},
      "cpm": cpm${platformProjection},
      "kyc": kyc${platformProjection},
      "noc": noc${platformProjection},
      "common": {
        "keyModules": cdp.groups[internalName == "keyModules"][0].title,
        "clientBenefits": cdp.groups[internalName == "clientBenefits"][0].title
      },
      "whychoose": {
        "heading": whyChoose.title,
        "benefits": whyChoose.items[]{title, description}
      }
    },
    "seo": {
      "title": seo.metaTitle,
      "description": seo.metaDescription,
      "keywords": seo.keywords,
      "socialImage": coalesce(
        seo.socialImage.image.asset->url,
        *[_type == "siteSettings" && language == $locale][0].defaultSeo.socialImage.image.asset->url
      ),
      "noIndex": seo.noIndex
    }
  }
`);

export async function getPlatformsPage(locale: string) {
  return sanityClient.fetch(
    platformsPageQuery,
    { locale },
    { next: { revalidate: 300, tags: [`sanity-platformsPage-${locale}`] } },
  );
}
