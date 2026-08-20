import type { MetadataRoute } from "next";
import { locales } from "~/i18n/config";
import { getSitemapContent } from "~/sanity/queries/sitemap";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.robusst.com";
type ChangeFreq = "daily" | "weekly" | "monthly";

const ROUTES: {
  path: string;
  changeFrequency: ChangeFreq;
  priority: number;
}[] = [
  { path: "", changeFrequency: "daily", priority: 1 },
  { path: "/platforms", changeFrequency: "weekly", priority: 0.9 },
  { path: "/stories", changeFrequency: "weekly", priority: 0.9 },
  { path: "/blogs", changeFrequency: "weekly", priority: 0.9 },
  { path: "/solutions", changeFrequency: "weekly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/careers", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/partnership", changeFrequency: "monthly", priority: 0.8 },
  { path: "/poc_waitlist", changeFrequency: "monthly", priority: 0.7 },
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

function languageAlternates(path: string) {
  return {
    languages: {
      ...Object.fromEntries(
        locales.map((locale) => [locale, `${baseUrl}/${locale}${path}`]),
      ),
      "x-default": `${baseUrl}/en${path}`,
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getSitemapContent();
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/llms.txt`,
      changeFrequency: "weekly",
      priority: 0.6,
      lastModified: now,
    },
  ];
  for (const route of ROUTES)
    for (const locale of locales)
      entries.push({
        url: `${baseUrl}/${locale}${route.path}`,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        lastModified: now,
        alternates: languageAlternates(route.path),
      });
  for (const post of content.blogs) {
    const path = `/blogs/${post.slug}`;
    entries.push({
      url: `${baseUrl}/${post.language}${path}`,
      changeFrequency: "monthly",
      priority: 0.75,
      lastModified: new Date(post.lastModified),
      alternates: languageAlternates(path),
    });
  }
  for (const job of content.jobs) {
    const path = `/careers/roles/${job.legacyId}`;
    entries.push({
      url: `${baseUrl}/${job.language}${path}`,
      changeFrequency: "monthly",
      priority: 0.7,
      lastModified: new Date(job.lastModified),
      alternates: languageAlternates(path),
    });
  }
  return entries;
}
