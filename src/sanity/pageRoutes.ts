import type { localizedPageTypeNames } from "./schemaTypes/documents/pages";

export type LocalizedPageType = (typeof localizedPageTypeNames)[number];

type PageRoute = {
  /** Path after the locale prefix. An empty string is the locale home page. */
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

/**
 * Single source of truth for the public URL of every localized Sanity page.
 *
 * The sitemap, the revalidation webhook, and Studio Presentation all read this
 * map. A page appears in the sitemap for a locale as soon as its Sanity
 * document for that locale is published, so adding a new page type only needs
 * one entry here (TypeScript enforces that every page type has one).
 */
export const PAGE_ROUTES = {
  homePage: { path: "", changeFrequency: "daily", priority: 1 },
  aboutPage: { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  blogIndexPage: { path: "/blogs", changeFrequency: "weekly", priority: 0.9 },
  careersPage: { path: "/careers", changeFrequency: "monthly", priority: 0.8 },
  contactPage: { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  partnershipPage: {
    path: "/partnership",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  platformsPage: {
    path: "/platforms",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  pocWaitlistPage: {
    path: "/poc_waitlist",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  solutionsPage: {
    path: "/solutions",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  aiCallCenterPage: {
    path: "/solutions/ai-call-center",
    changeFrequency: "weekly",
    priority: 0.95,
  },
  brandedCallingPage: {
    path: "/solutions/branded-calling",
    changeFrequency: "weekly",
    priority: 0.95,
  },
  customerDataPlatformPage: {
    path: "/solutions/customer-data-platform",
    changeFrequency: "weekly",
    priority: 0.95,
  },
  customizedSolutionsPage: {
    path: "/solutions/customized-solutions",
    changeFrequency: "weekly",
    priority: 0.95,
  },
  cybersecurityPage: {
    path: "/solutions/cybersecurity",
    changeFrequency: "weekly",
    priority: 0.95,
  },
  intelligentNocPage: {
    path: "/solutions/intelligent-noc",
    changeFrequency: "weekly",
    priority: 0.95,
  },
  networkMonetizationPage: {
    path: "/solutions/network-monetization",
    changeFrequency: "weekly",
    priority: 0.95,
  },
  stsDmsPage: {
    path: "/solutions/sts-dms",
    changeFrequency: "weekly",
    priority: 0.95,
  },
  storiesPage: { path: "/stories", changeFrequency: "weekly", priority: 0.9 },
  voiceDemoPage: {
    path: "/voice-ai-demo",
    changeFrequency: "weekly",
    priority: 0.9,
  },
} as const satisfies Record<LocalizedPageType, PageRoute>;

export const PAGE_TYPES = Object.keys(PAGE_ROUTES) as LocalizedPageType[];

export const PAGE_PATHS = Object.fromEntries(
  PAGE_TYPES.map((type) => [type, PAGE_ROUTES[type].path]),
) as Record<LocalizedPageType, string>;
