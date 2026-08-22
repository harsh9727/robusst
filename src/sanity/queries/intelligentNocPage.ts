import { defineQuery } from "next-sanity";
import { sanityClient } from "../lib/client";

export const intelligentNocPageQuery = defineQuery(`
  *[_type == "intelligentNocPage" && language == $locale][0]{
    "nocPage": {
      "banner": banner->{"title": content.title, "description": content.description, "image": content.image.image.asset->url, "imageAlt": content.image.alt},
      "videoSection": banner->{"thumbnail": content.video.poster.image.asset->url, "thumbnailAlt": content.video.poster.alt, "videoId": content.video.videoId, "playerTitle": content.video.title, "playLabel": *[_type == "siteSettings" && language == $locale][0].playVideoLabel, "closeLabel": *[_type == "siteSettings" && language == $locale][0].closeDialogLabel},
      "businessOutcomes": businessOutcomes->{"title": content.title, "description": content.description, "outcomes": content.items[]{_key, "value": title, "suffix": subtitle, "label": description}},
      "aiNetwork": aiNetwork->{"badge": content.eyebrow, "title": content.title, "titleHighlight": content.titleHighlight, "bulletPoints": content.labels, "industryTags": content.paragraphs, "image": content.image.image.asset->url, "imageAlt": content.image.alt},
      "networkChaos": networkChaos->{"title": content.title, "subtitle": content.subtitle, "todaysChallenges": {"title": content.groups[0].title, "items": content.groups[0].items[]{_key, "text": title, "icon": iconKey}}, "intelligentSolution": {"title": content.groups[1].title, "items": content.groups[1].items[]{_key, "text": title, "icon": iconKey}}},
      "intelligentNOC": intelligentNoc->{"badge": content.eyebrow, "titleLine1": content.title, "titleLine2": content.titleHighlight, "titleLine3": content.subtitle, "description": content.description, "image": content.image.image.asset->url, "imageAlt": content.image.alt},
      "coreCapabilities": coreCapabilities->{"title": content.title, "capabilities": content.items[]{_key, title, description}},
      "networkOperationsChaos": networkOperationsChaos->{"title": content.title, "image": content.image.image.asset->url, "imageAlt": content.image.alt, "items": content.items[]{_key, title, description, "icon": iconKey}},
      "intelligentDiffNOC": intelligentDiffNoc->{"title": content.title, "features": content.items[]{_key, title, description}},
      "chaosControl": chaosControl->{"title": content.title, "image": content.image.image.asset->url, "imageAlt": content.image.alt, "items": content.items[]{_key, title, description, "icon": iconKey}},
      "frameworkADAA": frameworkAdaa->{"title": content.title, "subtitle": content.subtitle, "subtitleDescription": content.description, "features": content.items[]{_key, title, description}},
      "lifecycleAutomation": lifecycleAutomation->{"title": content.title, "description": content.description, "steps": content.items[]{_key, title}},
      "integratedComponents": integratedComponents->{"title": content.title, "subtitle": content.subtitle, "featuresLeft": content.groups[0].items[].title, "featuresRight": content.groups[1].items[].title},
      "deploymentModels": deploymentModels->{"title": content.title, "description": content.description, "models": content.items[]{_key, title, description, "icon": iconKey}},
      "keyBenefits": keyBenefits->{"title": content.title, "features": content.items[]{_key, title, description}},
      "humanInLoop": humanInLoop->{"titleLine1": content.title, "titleLine2": content.titleHighlight, "description": content.description, "image": content.image.image.asset->url, "imageAlt": content.image.alt},
      "faq": faq->{"heading": content.title, "items": content.faqs[]{_key, question, "answer": pt::text(answer)}, "image": content.image.image.asset->url, "imageAlt": content.image.alt}
    },
    "seo": {"title": seo.metaTitle, "description": seo.metaDescription, "keywords": seo.keywords, "socialImage": coalesce(seo.socialImage.image.asset->url, banner->content.image.image.asset->url, *[_type == "siteSettings" && language == $locale][0].defaultSeo.socialImage.image.asset->url), "noIndex": seo.noIndex}
  }
`);

export async function getIntelligentNocPage(locale: string) {
  return sanityClient.fetch(
    intelligentNocPageQuery,
    { locale },
    {
      next: { revalidate: 300, tags: [`sanity-intelligentNocPage-${locale}`] },
    },
  );
}
