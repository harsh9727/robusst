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
  "coverImageAlt": coverImage.alt,
  "author": author->{name, "slug": slug.current}
}`;

const siteProjection = `{
  siteName,
  organizationDescription,
  "logo": logo.image.asset->url,
  twitterSiteHandle,
  twitterCreatorHandle
}`;

const translationProjection = `*[_type == "translation.metadata" && references(^._id)][0].translations[]{
  language,
  "slug": value->slug.current
}`;

export const blogIndexPageQuery = defineQuery(`
  *[_type == "blogIndexPage" && language == $locale][0]{
    "hero": hero->content{title, description},
    "emptyState": emptyState->content{title, description},
    blogUi,
    "cta": cta->content{title, description, "label": primaryCta.link.label, "href": primaryCta.link.href},
    "seo": {"title": seo.metaTitle, "description": seo.metaDescription, "keywords": seo.keywords, "socialTitle": seo.socialTitle, "socialDescription": seo.socialDescription, "socialImage": seo.socialImage.image.asset->url, "noIndex": seo.noIndex},
    "site": *[_type == "siteSettings" && language == $locale][0]${siteProjection},
    "posts": *[_type == "blogPost" && language == $locale] | order(publishedAt desc) ${cardProjection}
  }
`);

export const blogPostSlugsQuery = defineQuery(`
  *[_type == "blogPost" && defined(slug.current)]{"slug": slug.current, language}
`);

export const blogPostQuery = defineQuery(`
  *[_type == "blogPost" && language == $locale && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    "updatedAt": coalesce(updatedAtEditorial, _updatedAt),
    "author": author->{
      name,
      "slug": slug.current,
      role,
      bio,
      "image": image.image.asset->url,
      "imageAlt": image.alt,
      website,
      socialLinks[]{label, href, ariaLabel, openInNewTab}
    },
    categories,
    body[]{
      ...,
      markDefs[]{...},
      _type == "contentImage" => {alt, caption, credit, "url": image.asset->url},
      _type == "imageGallery" => {caption, images[]{alt, caption, credit, "url": image.asset->url}},
      _type in ["portableCta", "callToAction"] => {style, link{label, href, kind, ariaLabel, openInNewTab}}
    },
    "plainText": pt::text(body),
    "coverImage": coverImage.image.asset->url,
    "coverImageAlt": coverImage.alt,
    "seo": {"title": seo.metaTitle, "description": seo.metaDescription, "keywords": seo.keywords, "socialTitle": seo.socialTitle, "socialDescription": seo.socialDescription, "socialImage": seo.socialImage.image.asset->url, "noIndex": seo.noIndex},
    "translations": ${translationProjection},
    relatedPosts[]->${cardProjection},
    "indexPage": *[_type == "blogIndexPage" && language == $locale][0]{
      blogUi,
      "cta": cta->content{title, description, "label": primaryCta.link.label, "href": primaryCta.link.href}
    },
    "site": *[_type == "siteSettings" && language == $locale][0]${siteProjection}
  }
`);

export const blogAuthorSlugsQuery = defineQuery(`
  *[_type == "author" && defined(slug.current)]{"slug": slug.current, language}
`);

export const blogAuthorQuery = defineQuery(`
  *[_type == "author" && language == $locale && slug.current == $slug][0]{
    _id,
    name,
    "slug": slug.current,
    role,
    bio,
    postsHeading,
    emptyPostsMessage,
    website,
    socialLinks[]{label, href, ariaLabel, openInNewTab},
    "image": image.image.asset->url,
    "imageAlt": image.alt,
    "seo": {"title": seo.metaTitle, "description": seo.metaDescription, "keywords": seo.keywords, "socialTitle": seo.socialTitle, "socialDescription": seo.socialDescription, "socialImage": seo.socialImage.image.asset->url, "noIndex": seo.noIndex},
    "translations": ${translationProjection},
    "posts": *[_type == "blogPost" && language == $locale && references(^._id)] | order(publishedAt desc) ${cardProjection},
    "blogUi": *[_type == "blogIndexPage" && language == $locale][0].blogUi,
    "site": *[_type == "siteSettings" && language == $locale][0]${siteProjection}
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
              `sanity-author-${locale}`,
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
              `sanity-author-${locale}`,
            ],
          },
        },
  );
}

export function getBlogAuthorSlugs() {
  return sanityClient.fetch(
    blogAuthorSlugsQuery,
    {},
    { next: { revalidate: 300, tags: ["sanity-author-slugs"] } },
  );
}

export async function getBlogAuthor(locale: string, slug: string) {
  const { client, isPreview } = await getPreviewAwareSanityClient();
  return client.fetch(
    blogAuthorQuery,
    { locale, slug },
    isPreview
      ? { cache: "no-store" }
      : {
          next: {
            revalidate: 300,
            tags: [
              `sanity-author-${locale}`,
              `sanity-author-${locale}-${slug}`,
            ],
          },
        },
  );
}
