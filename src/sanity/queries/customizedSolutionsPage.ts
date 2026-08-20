import { defineQuery } from "next-sanity";
import { sanityClient } from "../lib/client";

export const customizedSolutionsPageQuery = defineQuery(`
  *[_type == "customizedSolutionsPage" && language == $locale][0]{
    "customizedSolutionsPage": {
      "banner": banner->{"heading": content.title, "subheading": content.subtitle, "image": content.image.image.asset->url, "imageAlt": content.image.alt},
      "innovationProcess": innovationProcess->{"heading": content.title, "subheading": content.subtitle, "playText": content.labels[0], "closeText": content.labels[1], "videoId": content.video.videoId, "playerTitle": content.video.title, "image": content.image.image.asset->url, "imageAlt": content.image.alt, "steps": content.items[]{_key, title, description}},
      "customizedSolutions": customizedSolutions->{"heading": content.title, "description": content.description, "ctaText": content.primaryCta.link.label, "ctaHref": content.primaryCta.link.href, "image": content.image.image.asset->url, "imageAlt": content.image.alt},
      "customerCentric": customerCentric->{"heading": content.title, "description": content.description, "points": content.labels, "image": content.image.image.asset->url, "imageAlt": content.image.alt},
      "challenges": challenges->{"heading": content.title, "subheading": content.subtitle, "image": content.image.image.asset->url, "imageAlt": content.image.alt, "categories": content.groups[]{_key, title, "points": items[].title}},
      "customizedSolutionsSlider": solutionsSlider->{"heading": content.title, "solutions": content.items[]{_key, "heading": title, "subheading": description, "countPrefix": eyebrow, "imageSrc": image.image.asset->url, "imageAlt": image.alt}},
      "commitmentToExcellence": commitmentToExcellence->{"heading": content.title, "features": content.items[]{_key, "text": title}, "image": content.image.image.asset->url, "imageAlt": content.image.alt},
      "faq": faq->{"items": content.faqs[]{_key, question, "answer": pt::text(answer)}, "image": content.image.image.asset->url, "imageAlt": content.image.alt}
    },
    "seo": {"title": seo.metaTitle, "description": seo.metaDescription, "keywords": seo.keywords, "socialImage": coalesce(seo.socialImage.image.asset->url, banner->content.image.image.asset->url, *[_type == "siteSettings" && language == $locale][0].defaultSeo.socialImage.image.asset->url), "noIndex": seo.noIndex}
  }
`);

export async function getCustomizedSolutionsPage(locale: string) {
  return sanityClient.fetch(
    customizedSolutionsPageQuery,
    { locale },
    {
      next: {
        revalidate: 300,
        tags: [`sanity-customizedSolutionsPage-${locale}`],
      },
    },
  );
}
