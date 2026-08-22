import { defineQuery } from "next-sanity";
import { sanityClient } from "../lib/client";

export const customerDataPlatformPageQuery = defineQuery(`
  *[_type == "customerDataPlatformPage" && language == $locale][0]{
    "cdpPage": {
      "banner": {"heading": banner.title, "subheading": banner.subtitle, "description": banner.description, "image": banner.image.image.asset->url, "imageAlt": banner.image.alt},
      "videoSection": {"thumbnail": banner.video.poster.image.asset->url, "thumbnailAlt": banner.video.poster.alt, "videoId": banner.video.videoId, "playerTitle": banner.video.title, "playLabel": *[_type == "siteSettings" && language == $locale][0].playVideoLabel, "closeLabel": *[_type == "siteSettings" && language == $locale][0].closeDialogLabel},
      "whyChooseRobusst": {"heading": whyChooseRobusst.title, "features": whyChooseRobusst.items[]{title}, "image": whyChooseRobusst.image.image.asset->url, "imageAlt": whyChooseRobusst.image.alt},
      "industryApplications": {"heading": industryApplications.title, "subheading": industryApplications.subtitle, "industries": industryApplications.items[]{title, description}},
      "provenImpact": {"heading": provenImpact.title, "stats": provenImpact.items[]{"value": title, "label": subtitle, description}, "image": provenImpact.image.image.asset->url, "imageAlt": provenImpact.image.alt},
      "telecomUseCases": {"heading": telecomUseCases.title, "description": telecomUseCases.description, "useCases": telecomUseCases.labels, "image": telecomUseCases.image.image.asset->url, "imageAlt": telecomUseCases.image.alt},
      "personalizedExperience": {"badge": personalizedExperience.eyebrow, "heading": personalizedExperience.title, "useCases": personalizedExperience.labels, "image": personalizedExperience.image.image.asset->url, "imageAlt": personalizedExperience.image.alt},
      "solutionGrid": {"heading": solutionGrid.title, "viewDetailsText": solutionGrid.labels[0], "moduleLabel": solutionGrid.labels[1], "centerImage": solutionGrid.image.image.asset->url, "centerImageAlt": solutionGrid.image.alt, "modules": solutionGrid.groups[]{"acronym": internalName, title, description, "viewDetailsText": ^.labels[0], "imageSrc": coalesce(image.image.asset->url, ""), "imageAlt": coalesce(image.alt, title), "detailedContent": {subtitle, "description": labels[0]}}},
      "benefitsUseCases": {"heading": benefitsUseCases.title, "subheading": benefitsUseCases.subtitle, "benefits": benefitsUseCases.items[]{title, description}, "image": benefitsUseCases.image.image.asset->url, "imageAlt": benefitsUseCases.image.alt},
      "accelerateValue": {"heading": accelerateValue.title, "features": accelerateValue.items[]{title, description}, "image": accelerateValue.image.image.asset->url, "imageAlt": accelerateValue.image.alt},
      "keyFeaturesCapabilities": {"heading": keyFeaturesCapabilities.title, "subheading": keyFeaturesCapabilities.subtitle, "features": keyFeaturesCapabilities.items[]{title, description}, "image": keyFeaturesCapabilities.image.image.asset->url, "imageAlt": keyFeaturesCapabilities.image.alt},
      "ctaSection": {"heading": cta.title, "description": cta.description, "primaryCta": cta.primaryCta.link.label, "primaryHref": cta.primaryCta.link.href, "secondaryCta": cta.secondaryCta.link.label, "secondaryHref": cta.secondaryCta.link.href, "image": cta.image.image.asset->url, "imageAlt": cta.image.alt},
      "faq": {"heading": faq.title, "items": faq.faqs[]{question, "answer": pt::text(answer)}, "image": faq.image.image.asset->url, "imageAlt": faq.image.alt}
    },
    "seo": {"title": seo.metaTitle, "description": seo.metaDescription, "keywords": seo.keywords, "socialImage": coalesce(seo.socialImage.image.asset->url, banner.image.image.asset->url, *[_type == "siteSettings" && language == $locale][0].defaultSeo.socialImage.image.asset->url), "noIndex": seo.noIndex}
  }
`);

export async function getCustomerDataPlatformPage(locale: string) {
  return sanityClient.fetch(
    customerDataPlatformPageQuery,
    { locale },
    {
      next: {
        revalidate: 300,
        tags: [`sanity-customerDataPlatformPage-${locale}`],
      },
    },
  );
}
