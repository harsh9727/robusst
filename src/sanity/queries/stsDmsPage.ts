import { defineQuery } from "next-sanity";
import { sanityClient } from "../lib/client";

export const stsDmsPageQuery = defineQuery(`
  *[_type == "stsDmsPage" && language == $locale][0]{
    "stsDmsPage": {
      "banner": banner->{"title": content.title, "description": content.description, "image": content.image.image.asset->url, "imageAlt": content.image.alt},
      "telecomIntelligence": telecomIntelligence->{"title": content.title, "titleHighlight": content.titleHighlight, "description": content.description, "playButtonText": content.labels[0], "closeButtonText": content.labels[1], "videoId": content.video.videoId, "playerTitle": content.video.title, "videoThumbnail": content.image.image.asset->url, "videoThumbnailAlt": content.image.alt},
      "salesDistribution": salesDistribution->{"title": content.title, "titleHighlight": content.titleHighlight, "subtitle": content.subtitle, "modules": content.items[]{_key, title, description, "icon": iconKey}},
      "whyRobusst": whyRobusst->{"title": content.title, "subtitle": content.subtitle, "description": content.description, "points": content.items[]{_key, title, description}, "image": content.image.image.asset->url, "imageAlt": content.image.alt},
      "robusstPlatform": robusstPlatform->{"title": content.title, "subtitle": content.subtitle, "centerTitle": content.labels[0], "centerSubtitle": content.labels[1], "features": content.items[]{_key, "title": [title, subtitle], description, "icon": iconKey}},
      "businessAutomation": businessAutomation->{"title": content.title, "subtitle": content.subtitle, "products": content.items[]{_key, title, description, "icon": iconKey}},
      "successStories": successStories->{"title": content.title, "subtitle": content.subtitle, "stories": content.items[]{_key, title, "text": description, "icon": iconKey}, "image": content.image.image.asset->url, "imageAlt": content.image.alt},
      "solutionGrid": solutionGrid->{"title": content.title, "viewDetailsText": content.labels[0], "whyItMattersLabel": content.labels[1], "decorativeImage": content.image.image.asset->url, "decorativeImageAlt": content.image.alt, "solutions": content.groups[]{_key, "acronym": internalName, title, description, "imageSrc": coalesce(image.image.asset->url, ""), "imageAlt": coalesce(image.alt, title), "detailedContent": {"subtitle": subtitle, "description": labels[0], "whyItMatters": labels[1], "sections": items[]{_key, title, description}}}},
      "driveSales": driveSales->{"title": content.title, "titleHighlight": content.titleHighlight, "useCases": content.items[]{_key, "label": title, "icon": iconKey}, "image": content.image.image.asset->url, "imageAlt": content.image.alt},
      "erpHrisIntegration": erpHrisIntegration->{"badge": content.eyebrow, "title": content.title, "subtitle": content.subtitle, "features": content.items[]{_key, title, description, "icon": iconKey}},
      "industryAgnostic": industryAgnostic->{"title": content.title, "subtitle": content.subtitle, "industries": content.items[]{_key, title, "image": image.image.asset->url, "imageAlt": image.alt}},
      "faq": faq->{"items": content.faqs[]{_key, question, "answer": pt::text(answer)}, "image": content.image.image.asset->url, "imageAlt": content.image.alt}
    },
    "seo": {"title": seo.metaTitle, "description": seo.metaDescription, "keywords": seo.keywords, "socialImage": coalesce(seo.socialImage.image.asset->url, banner->content.image.image.asset->url, *[_type == "siteSettings" && language == $locale][0].defaultSeo.socialImage.image.asset->url), "noIndex": seo.noIndex}
  }
`);

export async function getStsDmsPage(locale: string) {
  return sanityClient.fetch(
    stsDmsPageQuery,
    { locale },
    { next: { revalidate: 300, tags: [`sanity-stsDmsPage-${locale}`] } },
  );
}
