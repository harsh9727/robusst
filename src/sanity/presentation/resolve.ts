import { defineLocations } from "sanity/presentation";

const pagePaths = {
  homePage: "",
  aboutPage: "/about",
  blogIndexPage: "/blogs",
  careersPage: "/careers",
  contactPage: "/contact",
  partnershipPage: "/partnership",
  platformsPage: "/platforms",
  pocWaitlistPage: "/poc_waitlist",
  solutionsPage: "/solutions",
  aiCallCenterPage: "/solutions/ai-call-center",
  brandedCallingPage: "/solutions/branded-calling",
  customerDataPlatformPage: "/solutions/customer-data-platform",
  customizedSolutionsPage: "/solutions/customized-solutions",
  cybersecurityPage: "/solutions/cybersecurity",
  intelligentNocPage: "/solutions/intelligent-noc",
  networkMonetizationPage: "/solutions/network-monetization",
  stsDmsPage: "/solutions/sts-dms",
  storiesPage: "/stories",
} as const;

const pageLocations = Object.fromEntries(
  Object.entries(pagePaths).map(([type, pagePath]) => [
    type,
    defineLocations({
      select: { language: "language", title: "internalTitle" },
      resolve: (selection) => {
        const { language, title } = selection ?? {};
        return {
          locations: [
            {
              title: title || type,
              href: `/${language || "en"}${pagePath}`,
            },
          ],
        };
      },
    }),
  ]),
);

export const presentationResolve = {
  locations: {
    siteSettings: defineLocations({
      message: "Site settings are used globally across every page.",
      tone: "caution",
    }),
    languageSettings: defineLocations({
      message: "Language-switcher options are used globally across every page.",
      tone: "caution",
    }),
    fixedPageSection: defineLocations({
      select: {
        title: "internalTitle",
        pageType: "pageType",
        language: "language",
      },
      resolve: (selection) => {
        const { title, pageType, language } = selection ?? {};
        const pagePath = pagePaths[pageType as keyof typeof pagePaths];
        return {
          locations:
            pagePath === undefined
              ? []
              : [
                  {
                    title: title || "Page section",
                    href: `/${language || "en"}${pagePath}`,
                  },
                ],
        };
      },
    }),
    ...pageLocations,
    blogPost: defineLocations({
      select: { title: "title", slug: "slug.current", language: "language" },
      resolve: (selection) => {
        const { title, slug, language } = selection ?? {};
        return {
          locations: slug
            ? [
                {
                  title: title || "Blog post",
                  href: `/${language || "en"}/blogs/${slug}`,
                },
                {
                  title: "Blog listing",
                  href: `/${language || "en"}/blogs`,
                },
              ]
            : [],
        };
      },
    }),
    jobPosting: defineLocations({
      select: { title: "title", legacyId: "legacyId", language: "language" },
      resolve: (selection) => {
        const { title, legacyId, language } = selection ?? {};
        return {
          locations: legacyId
            ? [
                {
                  title: title || "Job posting",
                  href: `/${language || "en"}/careers/roles/${legacyId}`,
                },
                {
                  title: "Careers",
                  href: `/${language || "en"}/careers`,
                },
              ]
            : [],
        };
      },
    }),
    successStory: defineLocations({
      select: { title: "title", language: "language" },
      resolve: (selection) => {
        const { title, language } = selection ?? {};
        return {
          locations: [
            {
              title: title || "Success story",
              href: `/${language || "en"}/stories`,
            },
          ],
        };
      },
    }),
  },
};
