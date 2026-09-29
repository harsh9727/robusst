import type { MetadataRoute } from "next";
import { locales } from "~/i18n/config";
import { getSitemapContent } from "~/sanity/queries/sitemap";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.robusst.com";
type ChangeFreq = "daily" | "weekly" | "monthly";

const ROUTES: {
  type: string;
  path: string;
  changeFrequency: ChangeFreq;
  priority: number;
}[] = [
  { type: "homePage", path: "", changeFrequency: "daily", priority: 1 },
  {
    type: "platformsPage",
    path: "/platforms",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    type: "storiesPage",
    path: "/stories",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    type: "blogIndexPage",
    path: "/blogs",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    type: "solutionsPage",
    path: "/solutions",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    type: "aboutPage",
    path: "/about",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    type: "careersPage",
    path: "/careers",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    type: "contactPage",
    path: "/contact",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    type: "partnershipPage",
    path: "/partnership",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    type: "pocWaitlistPage",
    path: "/poc_waitlist",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    type: "aiCallCenterPage",
    path: "/solutions/ai-call-center",
    changeFrequency: "weekly",
    priority: 0.95,
  },
  {
    type: "brandedCallingPage",
    path: "/solutions/branded-calling",
    changeFrequency: "weekly",
    priority: 0.95,
  },
  {
    type: "customerDataPlatformPage",
    path: "/solutions/customer-data-platform",
    changeFrequency: "weekly",
    priority: 0.95,
  },
  {
    type: "customizedSolutionsPage",
    path: "/solutions/customized-solutions",
    changeFrequency: "weekly",
    priority: 0.95,
  },
  {
    type: "cybersecurityPage",
    path: "/solutions/cybersecurity",
    changeFrequency: "weekly",
    priority: 0.95,
  },
  {
    type: "intelligentNocPage",
    path: "/solutions/intelligent-noc",
    changeFrequency: "weekly",
    priority: 0.95,
  },
  {
    type: "networkMonetizationPage",
    path: "/solutions/network-monetization",
    changeFrequency: "weekly",
    priority: 0.95,
  },
  {
    type: "stsDmsPage",
    path: "/solutions/sts-dms",
    changeFrequency: "weekly",
    priority: 0.95,
  },
];

function fixedAlternates(path: string) {
  return {
    languages: {
      ...Object.fromEntries(
        locales.map((locale) => [locale, `${baseUrl}/${locale}${path}`]),
      ),
      "x-default": `${baseUrl}/en${path}`,
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
  for (const route of ROUTES) {
    for (const locale of locales) {
      const page = content.pages.find(
        (item) => item._type === route.type && item.language === locale,
      );
      if (!page) continue;
      entries.push({
        url: `${baseUrl}/${locale}${route.path}`,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        lastModified: new Date(page.lastModified),
        alternates: fixedAlternates(route.path),
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
