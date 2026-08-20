import { defineQuery } from "next-sanity";
import { sanityClient } from "../lib/client";

export const cybersecurityPageQuery = defineQuery(`
  *[_type == "cybersecurityPage" && language == $locale][0]{
    _id, language,
    "seo": {"title": seo.metaTitle, "description": seo.metaDescription, "keywords": seo.keywords, "socialImage": seo.socialImage.image.asset->url, "noIndex": coalesce(seo.noIndex, false)},
    "cybersecurityPage": {
      "banner": {"title": banner.title, "description": banner.description, "image": banner.image.image.asset->url, "imageAlt": banner.image.alt},
      "whyChooseRobusst": {"title": whyChooseRobusst.title, "subtitle": whyChooseRobusst.subtitle, "description": whyChooseRobusst.description, "playButtonText": whyChooseRobusst.labels[0], "closeButtonText": whyChooseRobusst.labels[1], "videoId": whyChooseRobusst.video.videoId, "playerTitle": whyChooseRobusst.video.title, "videoThumbnail": whyChooseRobusst.image.image.asset->url, "videoThumbnailAlt": whyChooseRobusst.image.alt, "points": whyChooseRobusst.items[]{_key, title, description}},
      "solutionModules": {"title": solutionModules.title, "description": solutionModules.description, "viewDetailsText": solutionModules.labels[0], "moduleLabel": solutionModules.labels[1], "keyFeaturesLabel": solutionModules.labels[2], "whyItMattersLabel": solutionModules.labels[3], "coreTitle": solutionModules.labels[4], "coreDescription": solutionModules.labels[5], "modules": solutionModules.groups[]{_key, "acronym": internalName, title, description, "imageSrc": image.image.asset->url, "imageAlt": image.alt, "detailedContent": {"subtitle": subtitle, "description": labels[0], "whyItMatters": labels[1], "features": labels[2..-1], "sections": items[]{_key, title, description}}}},
      "threatIntelligence": {"title": threatIntelligence.title, "subtitle": threatIntelligence.subtitle, "image": threatIntelligence.image.image.asset->url, "imageAlt": threatIntelligence.image.alt, "features": threatIntelligence.items[]{_key, title, "text": description, "icon": iconKey}},
      "howItWorks": {"title": howItWorks.title, "subtitle": howItWorks.subtitle, "image": howItWorks.image.image.asset->url, "imageAlt": howItWorks.image.alt, "steps": howItWorks.items[]{_key, title, "text": description}},
      "businessOutcomes": {"title": businessOutcomes.title, "subtitle": businessOutcomes.subtitle, "image": businessOutcomes.image.image.asset->url, "imageAlt": businessOutcomes.image.alt, "outcomes": businessOutcomes.items[]{_key, title, "text": description}},
      "ourUSP": {"title": ourUsp.title, "subtitle": ourUsp.subtitle, "uspPoints": ourUsp.items[]{_key, title, "text": description}},
      "faq": {"items": faq.faqs[]{_key, question, "answer": pt::text(answer)}, "image": faq.image.image.asset->url, "imageAlt": faq.image.alt}
    }
  }
`);

export async function getCybersecurityPage(locale: string) {
  return sanityClient.fetch(
    cybersecurityPageQuery,
    { locale },
    { next: { revalidate: 300, tags: [`sanity-cybersecurityPage-${locale}`] } },
  );
}
