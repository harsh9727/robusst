import type { MetadataRoute } from "next";
import { locales } from "~/i18n/config";
import storiesData from "../../locales/en/successStories.json";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.robusst.com";

type ChangeFreq =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

const ROUTES: { path: string; changeFrequency: ChangeFreq; priority: number }[] =
  [
    { path: "", changeFrequency: "daily", priority: 1.0 },
    { path: "/platforms", changeFrequency: "weekly", priority: 0.9 },
    { path: "/stories", changeFrequency: "weekly", priority: 0.9 },
    { path: "/solutions", changeFrequency: "weekly", priority: 0.9 },
    { path: "/about", changeFrequency: "monthly", priority: 0.8 },
    { path: "/careers", changeFrequency: "monthly", priority: 0.8 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
    { path: "/partnership", changeFrequency: "monthly", priority: 0.8 },
    {
      path: "/solutions/ai-call-center",
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      path: "/solutions/branded-calling",
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      path: "/solutions/customer-data-platform",
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      path: "/solutions/customized-solutions",
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      path: "/solutions/cybersecurity",
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      path: "/solutions/intelligent-noc",
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      path: "/solutions/network-monetization",
      changeFrequency: "weekly",
      priority: 0.95,
    },
    { path: "/solutions/sts-dms", changeFrequency: "weekly", priority: 0.95 },
  ];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // llms.txt — helps AI crawlers discover the machine-readable index
  entries.push({
    url: `${baseUrl}/llms.txt`,
    changeFrequency: "weekly",
    priority: 0.6,
    lastModified: now,
  });

  // Main locale routes with hreflang alternates
  for (const route of ROUTES) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}${route.path}`,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        lastModified: now,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}${route.path}`]),
          ),
        },
      });
    }
  }

  // Individual story pages
  const storyIds = (storiesData.story as { id: string }[]).map((s) => s.id);

  for (const locale of locales) {
    for (const id of storyIds) {
      entries.push({
        url: `${baseUrl}/${locale}/stories/${id}`,
        changeFrequency: "monthly",
        priority: 0.7,
        lastModified: now,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/stories/${id}`]),
          ),
        },
      });
    }
  }

  return entries;
}
