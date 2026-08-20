import { defineQuery } from "next-sanity";
import { sanityClient } from "../lib/client";

export const brandedCallingPageQuery = defineQuery(`
  *[_type == "brandedCallingPage" && language == $locale][0]{
    "brandPage": {
      "banner": banner->{"heading": content.title, "subheading": content.subtitle, "image": content.image.image.asset->url, "imageAlt": content.image.alt},
      "eliminate": eliminate->{"heading": content.title, "videoThumbnail": content.images[0].image.asset->url, "videoThumbnailAlt": content.images[0].alt, "image": content.images[1].image.asset->url, "imageAlt": content.images[1].alt, "videoId": content.video.videoId, "playText": content.labels[0], "closeText": content.labels[1], "videoTitle": content.labels[2]},
      "transformCommunication": transformCommunication->{"ctaHeading": content.title, "paragraph1": content.paragraphs[0], "paragraph2": content.paragraphs[1], "image": content.image.image.asset->url, "imageAlt": content.image.alt},
      "whyChoose": whyChoose->{"heading": content.title, "items": content.items[]{title, description}},
      "brandedCalling": brandedCalling->{"heading": content.title, "subheading": content.titleHighlight, "description1": content.paragraphs[0], "description2": content.paragraphs[1], "benefits": content.labels, "image": content.image.image.asset->url, "imageAlt": content.image.alt},
      "keyFeatures": keyFeatures->{"heading": content.title, "features": content.items[]{title, description}, "image": content.image.image.asset->url, "imageAlt": content.image.alt},
      "antiSpamProtection": antiSpamProtection->{"heading": content.title, "subheading": content.titleHighlight, "description1": content.paragraphs[0], "description2": content.paragraphs[1], "benefits": content.labels, "image": content.image.image.asset->url, "imageAlt": content.image.alt},
      "coreProtectionFeatures": coreProtectionFeatures->{"heading": content.title, "features": content.items[]{title, description}, "image": content.image.image.asset->url, "imageAlt": content.image.alt},
      "industryApplications": industryApplications->{"heading": content.title, "subheading": content.subtitle, "industries": content.items[]{title, description}},
      "regionalExcellence": regionalExcellence->{"heading": content.title, "subheading": content.subtitle, "regions": content.items[]{title, description}, "image": content.image.image.asset->url, "imageAlt": content.image.alt},
      "securityCompliance": securityCompliance->{"heading": content.title, "items": content.items[]{title, description}},
      "faq": faq->{"heading": content.title, "items": content.faqs[]{question, "answer": pt::text(answer)}, "image": content.image.image.asset->url, "imageAlt": content.image.alt}
    },
    "seo": {"title": seo.metaTitle, "description": seo.metaDescription, "keywords": seo.keywords, "socialImage": coalesce(seo.socialImage.image.asset->url, banner->content.image.image.asset->url, *[_type == "siteSettings" && language == $locale][0].defaultSeo.socialImage.image.asset->url), "noIndex": seo.noIndex}
  }
`);

export async function getBrandedCallingPage(locale: string) {
  return sanityClient.fetch(
    brandedCallingPageQuery,
    { locale },
    {
      next: { revalidate: 300, tags: [`sanity-brandedCallingPage-${locale}`] },
    },
  );
}
