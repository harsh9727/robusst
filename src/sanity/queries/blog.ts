import { defineQuery } from "next-sanity";
import { sanityClient } from "../lib/client";
import { getPreviewAwareSanityClient } from "../lib/previewClient";

const cardProjection = `{
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  "updatedAt": coalesce(updatedAtEditorial, _updatedAt),
  categories,
  "primaryKeyword": seo.keywords[0],
  "coverImage": coverImage.image.asset->url,
  "coverImageAlt": coverImage.alt
}`;

export const blogIndexPageQuery = defineQuery(`
  *[_type == "blogIndexPage" && language == $locale][0]{
    "hero": hero->content{title, description},
    "listing": listing->content{labels},
    "emptyState": emptyState->content{title, description},
    "articleUi": articleUi->content{labels},
    "cta": cta->content{title, description, "label": primaryCta.link.label, "href": primaryCta.link.href},
    "seo": {"title": seo.metaTitle, "description": seo.metaDescription, "keywords": seo.keywords, "socialTitle": seo.socialTitle, "socialDescription": seo.socialDescription, "socialImage": seo.socialImage.image.asset->url, "noIndex": seo.noIndex},
    "site": *[_type == "siteSettings" && language == $locale][0]{siteName, organizationDescription, "logo": logo.image.asset->url},
    "posts": *[_type == "blogPost" && language == $locale] | order(publishedAt desc) ${cardProjection}
  }
`);

export const blogPostSlugsQuery = defineQuery(`
  *[_type == "blogPost" && defined(slug.current)]{"slug": slug.current, language}
`);

export const blogPostQuery = defineQuery(`
  *[_type == "blogPost" && language == $locale && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    "updatedAt": coalesce(updatedAtEditorial, _updatedAt),
    authorName,
    "authorImage": authorImage.image.asset->url,
    "authorImageAlt": authorImage.alt,
    categories,
    body[]{
      ...,
      markDefs[]{...},
      _type == "contentImage" => {alt, caption, "url": image.asset->url},
      _type == "imageGallery" => {caption, images[]{alt, caption, "url": image.asset->url}},
      _type == "portableCta" => {style, link{label, href, kind, ariaLabel, openInNewTab}}
    },
    "plainText": pt::text(body),
    "coverImage": coverImage.image.asset->url,
    "coverImageAlt": coverImage.alt,
    "seo": {"title": seo.metaTitle, "description": seo.metaDescription, "keywords": seo.keywords, "socialTitle": seo.socialTitle, "socialDescription": seo.socialDescription, "socialImage": seo.socialImage.image.asset->url, "noIndex": seo.noIndex},
    relatedPosts[]->${cardProjection},
    "indexPage": *[_type == "blogIndexPage" && language == $locale][0]{
      "articleUi": articleUi->content{labels},
      "cta": cta->content{title, description, "label": primaryCta.link.label, "href": primaryCta.link.href}
    },
    "site": *[_type == "siteSettings" && language == $locale][0]{siteName, organizationDescription, "logo": logo.image.asset->url}
  }
`);

export async function getBlogIndexPage(locale: string) {
  const { client, isPreview } = await getPreviewAwareSanityClient();
  return client.fetch(
    blogIndexPageQuery,
    { locale },
    isPreview
      ? { cache: "no-store" }
      : {
          next: {
            revalidate: 300,
            tags: [
              `sanity-blogIndexPage-${locale}`,
              `sanity-blogPost-${locale}`,
            ],
          },
        },
  );
}

export function getBlogPostSlugs() {
  return sanityClient.fetch(
    blogPostSlugsQuery,
    {},
    { next: { revalidate: 300, tags: ["sanity-blogPost-slugs"] } },
  );
}

export async function getBlogPost(locale: string, slug: string) {
  const { client, isPreview } = await getPreviewAwareSanityClient();
  return client.fetch(
    blogPostQuery,
    { locale, slug },
    isPreview
      ? { cache: "no-store" }
      : {
          next: {
            revalidate: 300,
            tags: [
              `sanity-blogPost-${locale}`,
              `sanity-blogPost-${locale}-${slug}`,
            ],
          },
        },
  );
}
