import { defineQuery } from "next-sanity";
import { sanityClient } from "../lib/client";

export const aboutPageQuery = defineQuery(`
  *[_type == "aboutPage" && language == $locale][0]{
    "hero": {
      "title": hero.title,
      "description": hero.description,
      "subDescription": hero.paragraphs[0],
      "image": hero.image.image.asset->url,
      "imageAlt": hero.image.alt
    },
    "mission": {
      "heading": mission.title,
      "paragraphs": mission.paragraphs,
      "image": mission.image.image.asset->url,
      "imageAlt": mission.image.alt
    },
    "vision": {
      "heading": vision.title,
      "items": vision.labels,
      "image": vision.image.image.asset->url,
      "imageAlt": vision.image.alt
    },
    "ourPurpose": {
      "heading": purpose.title,
      "paragraphs": purpose.paragraphs,
      "image": purpose.image.image.asset->url,
      "imageAlt": purpose.image.alt
    },
    "values": {
      "heading": values.title,
      "items": values.items[]{title, description, "icon": iconKey}
    },
    "whatDefinesUs": {
      "heading": whatDefinesUs.title,
      "paragraphs": whatDefinesUs.paragraphs,
      "image": whatDefinesUs.image.image.asset->url,
      "imageAlt": whatDefinesUs.image.alt
    },
    "challenges": {
      "heading": challenges.title,
      "paragraphs": challenges.paragraphs,
      "items": challenges.items[]{title, "icon": iconKey}
    }
  }
`);

export async function getAboutPage(locale: string) {
  return sanityClient.fetch(
    aboutPageQuery,
    { locale },
    { next: { revalidate: 300, tags: [`sanity-aboutPage-${locale}`] } },
  );
}
