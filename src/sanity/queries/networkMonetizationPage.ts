import { defineQuery } from "next-sanity";
import { sanityClient } from "../lib/client";

export const networkMonetizationPageQuery = defineQuery(`
  *[_type == "networkMonetizationPage" && language == $locale][0]{
    "networkMonetizationPage": {
      "banner": banner->{"title": content.title, "description": content.description, "video": content.video.videoFile.asset->url, "videoAlt": content.video.title},
      "whyNetworkMonetization": whyNetworkMonetization->{"title": content.title, "highlightStatement": content.description, "points": content.paragraphs, "playButtonText": content.labels[0], "closeButtonText": content.labels[1], "videoThumbnail": content.image.image.asset->url, "videoThumbnailAlt": content.image.alt, "videoId": content.video.videoId, "playerTitle": content.video.title},
      "monetizationFramework": monetizationFramework->{"title": content.title, "frameworks": content.items[]{_key, title, description, "icon": iconKey}},
      "userExperienceManagement": userExperienceManagement->{"badge": content.eyebrow, "title": content.title, "subtitle": content.subtitle, "features": content.labels, "image": content.image.image.asset->url, "imageAlt": content.image.alt},
      "solutionGrid": solutionGrid->{"featuresLabel": content.labels[0], "businessImpactLabel": content.labels[1], "solutions": content.groups[]{_key, title, subtitle, "image": image.image.asset->url, "imageAlt": image.alt, "features": labels, "businessImpact": items[].title}},
      "mobileUseCase": mobileUseCase->{"title": content.title, "subtitle": content.subtitle, "useCases": content.items[]{_key, title, description, "icon": iconKey}},
      "useCaseGrid": useCaseGrid->{"title": content.title, "subtitle": content.subtitle, "viewMoreLabel": content.labels[0], "moduleLabel": content.labels[1], "keyFeaturesLabel": content.labels[2], "whyItMattersLabel": content.labels[3], "solutions": content.groups[]{_key, "acronym": internalName, title, description, "detailedContent": {"subtitle": subtitle, "description": labels[0], "whyItMatters": labels[1], "features": labels[2..-1]}}},
      "telcos": telcos->{"title": content.title, "features": content.labels, "image": content.image.image.asset->url, "imageAlt": content.image.alt},
      "faq": faq->{"items": content.faqs[]{_key, question, "answer": pt::text(answer)}, "image": content.image.image.asset->url, "imageAlt": content.image.alt}
    },
    "seo": {"title": seo.metaTitle, "description": seo.metaDescription, "keywords": seo.keywords, "socialImage": coalesce(seo.socialImage.image.asset->url, *[_type == "siteSettings" && language == $locale][0].defaultSeo.socialImage.image.asset->url), "noIndex": seo.noIndex}
  }
`);

export async function getNetworkMonetizationPage(locale: string) {
  return sanityClient.fetch(
    networkMonetizationPageQuery,
    { locale },
    {
      next: {
        revalidate: 300,
        tags: [`sanity-networkMonetizationPage-${locale}`],
      },
    },
  );
}
