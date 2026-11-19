import type { MetadataRoute } from "next";
import { locales } from "~/i18n/config";
import { isPageVisible } from "~/sanity/pageRelease";
import { PAGE_ROUTES, PAGE_TYPES } from "~/sanity/pageRoutes";
import { getSitemapContent } from "~/sanity/queries/sitemap";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.robusst.com";

function fixedAlternates(path: string, availableLocales: readonly string[]) {
  return {
    languages: {
      ...Object.fromEntries(
        availableLocales.map((locale) => [
          locale,
          `${baseUrl}/${locale}${path}`,
        ]),
      ),
      ...(availableLocales.includes("en")
        ? { "x-default": `${baseUrl}/en${path}` }
        : {}),
    },
  };
}

function translatedAlternates(
  translations: Array<{
    language: string | null;
    slug?: string | null;
    legacyId?: string | null;
  }> | null,
  pathFor: (value: string) => string,
) {
  const entries = (translations ?? []).flatMap((translation) => {
    const value = translation.slug ?? translation.legacyId;
    return translation.language && value
      ? [
          [
            translation.language,
            `${baseUrl}/${translation.language}${pathFor(value)}`,
          ],
        ]
      : [];
  });
  const english = (translations ?? []).find(
    (translation) => translation.language === "en",
  );
  const englishValue = english?.slug ?? english?.legacyId;
  return {
    languages: {
      ...Object.fromEntries(entries),
      ...(englishValue
        ? { "x-default": `${baseUrl}/en${pathFor(englishValue)}` }
        : {}),
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getSitemapContent();
  const entries: MetadataRoute.Sitemap = [];
  // Every localized page type is listed automatically once its Sanity
  // document is published. Pages marked "Prevent search indexing" and pages
  // not yet released on this deployment are left out.
  for (const type of PAGE_TYPES) {
    if (!isPageVisible(type)) continue;
    const route = PAGE_ROUTES[type];
    const pages = content.pages.filter(
      (page) =>
        page._type === type &&
        !page.noIndex &&
        page.language &&
        (locales as readonly string[]).includes(page.language),
    );
    const availableLocales = locales.filter((locale) =>
      pages.some((page) => page.language === locale),
    );
    for (const locale of availableLocales) {
      const page = pages.find((item) => item.language === locale);
      if (!page) continue;
      entries.push({
        url: `${baseUrl}/${locale}${route.path}`,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        lastModified: new Date(page.lastModified),
        alternates: fixedAlternates(route.path, availableLocales),
      });
    }
  }
  for (const post of content.blogs) {
    const path = `/blogs/${post.slug}`;
    entries.push({
      url: `${baseUrl}/${post.language}${path}`,
      changeFrequency: "monthly",
      priority: 0.75,
      lastModified: new Date(post.lastModified),
      alternates: translatedAlternates(
        post.translations,
        (translatedSlug) => `/blogs/${translatedSlug}`,
      ),
    });
  }
  for (const author of content.authors) {
    const path = `/blogs/authors/${author.slug}`;
    entries.push({
      url: `${baseUrl}/${author.language}${path}`,
      changeFrequency: "monthly",
      priority: 0.65,
      lastModified: new Date(author.lastModified),
      alternates: translatedAlternates(
        author.translations,
        (translatedSlug) => `/blogs/authors/${translatedSlug}`,
      ),
    });
  }
  for (const job of content.jobs) {
    const path = `/careers/roles/${job.legacyId}`;
    entries.push({
      url: `${baseUrl}/${job.language}${path}`,
      changeFrequency: "monthly",
      priority: 0.7,
      lastModified: new Date(job.lastModified),
      alternates: translatedAlternates(
        job.translations,
        (translatedId) => `/careers/roles/${translatedId}`,
      ),
    });
  }
  return entries;
}
