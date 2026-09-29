import { defineQuery } from "next-sanity";
import { sanityClient } from "../lib/client";

export const homePageQuery = defineQuery(`
  *[_type == "homePage" && language == $locale][0]{
    "hero": {
      "slides": hero.items[]{
        title,
        description,
        "ctaText": cta.link.label,
        "ctaHref": cta.link.href,
        "image": image.image.asset->url,
        "imageAlt": image.alt,
        "videoUrl": video.videoFile.asset->url,
        "posterUrl": video.poster.image.asset->url
      }
    },
    "trustedBy": {
      "heading": trustedBy.title,
      "logos": trustedBy.logos[]{
        name,
        "image": logo.image.asset->url,
        "alt": logo.alt
      }
    },
    "about": {
      "heading": about.title,
      "subheading": about.subtitle,
      "paragraphs": about.paragraphs,
      "image": about.image.image.asset->url,
      "imageAlt": about.image.alt,
      "videoId": about.video.videoId,
      "videoTitle": about.video.title,
      "playLabel": about.labels[0],
      "closeLabel": about.labels[1]
    },
    "solutions": {
      "heading": solutions.title,
      "subheading": solutions.subtitle,
      "countPrefix": solutions.countPrefix,
      "items": solutions.items[]{
        title,
        description,
        "points": features,
        "image": image.image.asset->url,
        "imageAlt": image.alt,
        "slug": string::split(cta.link.href, "/")[-1],
        "href": cta.link.href,
        "ctaText": cta.link.label,
        "ctaAriaLabel": cta.link.ariaLabel
      }
    },
    "results": {
      "heading": results.title,
      "subheading": results.subtitle,
      "description": results.description,
      "image": results.image.image.asset->url,
      "imageAlt": results.image.alt,
      "items": results.items[]{"label": eyebrow, title}
    },
    "successStories": {
      "heading": successStories.title,
      "countPrefix": successStories.countPrefix,
      "viewAllLabel": successStories.primaryCta.link.label,
      "viewAllHref": successStories.primaryCta.link.href,
      "learnMoreLabel": successStories.paragraphs[0],
      "items": successStories.items[]{
        title,
        description,
        "image": image.image.asset->url,
        "imageAlt": image.alt
      }
    },
    "techStack": {
      "heading": techStack.title,
      "description": techStack.description,
      "items": techStack.groups[]{
        "id": internalName,
        title,
        "tools": items[]{title, "icon": image.image.asset->url, "iconAlt": image.alt}
      }
    },
    "industriesWeServe": {
      "heading": industriesWeServe.title,
      "items": industriesWeServe.items[]{
        title,
        "image": image.image.asset->url,
        "imageAlt": image.alt
      }
    },
    "howWeHelp": {
      "heading": howWeHelp.title,
      "subheading": howWeHelp.subtitle,
      "items": howWeHelp.items[]{title, description}
    },
    "eventsCoverage": {
      "heading": eventsCoverage.title,
      "subheading": eventsCoverage.subtitle,
      "images": eventsCoverage.images[]{"url": image.asset->url, alt}
    },
    "whyChooseUs": {
      "heading": whyChooseUs.title,
      "withoutHeading": whyChooseUs.labels[0],
      "withoutDescription": whyChooseUs.labels[1],
      "withHeading": whyChooseUs.labels[2],
      "withDescription": whyChooseUs.labels[3],
      "points": whyChooseUs.items[]{title, description}
    },
    "blogs": {
      "heading": blogs.title,
      "viewAllLabel": blogs.primaryCta.link.label,
      "viewAllHref": blogs.primaryCta.link.href,
      "emptyLabel": blogs.paragraphs[0],
      "readLabel": blogs.paragraphs[1]
    },
    "ourPresence": {
      "heading": ourPresence.title,
      "mobileListHeading": ourPresence.subtitle,
      "countries": ourPresence.items[]{title, latitude, longitude}
    },
    "contact": {
      "heading": contact.title,
      "subheading": contact.subtitle,
      "ctaText": contact.primaryCta.link.label,
      "ctaHref": contact.primaryCta.link.href,
      "calendlyUrl": *[_type == "siteSettings" && language == $locale][0].calendlyUrl
    }
  }
`);

export async function getHomePage(locale: string) {
  return sanityClient.fetch(
    homePageQuery,
    { locale },
    { next: { revalidate: 300, tags: [`sanity-homePage-${locale}`] } },
  );
}
