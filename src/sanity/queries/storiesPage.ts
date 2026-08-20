import { defineQuery } from "next-sanity";
import { sanityClient } from "../lib/client";

export const storiesPageQuery = defineQuery(`
  *[_type == "storiesPage" && language == $locale][0]{
    "storiesPage": {
      "banner": banner->{"heading": content.title, "subheading": content.subtitle, "image": content.image.image.asset->url, "imageAlt": content.image.alt, "ctaText": content.primaryCta.link.label, "ctaHref": content.primaryCta.link.href},
      "readMoreText": listing->content.labels[0],
      "challengesTitle": detailDialog->content.labels[0],
      "solutionTitle": detailDialog->content.labels[1]
    },
    "stories": *[_type == "successStory" && language == $locale]{
      "id": legacyId,
      title,
      "companyLogo": customerLogo.image.asset->url,
      "companyLogoAlt": customerLogo.alt,
      "companyName": customerName,
      "description": summary,
      "cusomterChallenges": challenges[]{_key, title, description},
      "solutions": solutions[]{_key, title, description}
    },
    "seo": {"title": seo.metaTitle, "description": seo.metaDescription, "keywords": seo.keywords, "socialImage": coalesce(seo.socialImage.image.asset->url, banner->content.image.image.asset->url, *[_type == "siteSettings" && language == $locale][0].defaultSeo.socialImage.image.asset->url), "noIndex": seo.noIndex}
  }
`);

export async function getStoriesPage(locale: string) {
  const page = await sanityClient.fetch(
    storiesPageQuery,
    { locale },
    {
      next: {
        revalidate: 300,
        tags: [`sanity-storiesPage-${locale}`, `sanity-successStory-${locale}`],
      },
    },
  );
  if (page?.stories) page.stories.sort((a, b) => Number(a.id) - Number(b.id));
  return page;
}
