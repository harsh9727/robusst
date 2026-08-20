import { defineField, defineType } from "sanity";
import { sanityLanguageIds } from "../../languages";

export const localizedPageTypeNames = [
  "homePage",
  "aboutPage",
  "blogIndexPage",
  "careersPage",
  "contactPage",
  "partnershipPage",
  "platformsPage",
  "pocWaitlistPage",
  "solutionsPage",
  "aiCallCenterPage",
  "brandedCallingPage",
  "customerDataPlatformPage",
  "customizedSolutionsPage",
  "cybersecurityPage",
  "intelligentNocPage",
  "networkMonetizationPage",
  "stsDmsPage",
  "storiesPage",
] as const;

const pageDefinitions = [
  {
    name: "homePage",
    title: "Home page",
    sections: [
      "hero",
      "trustedBy",
      "about",
      "solutions",
      "results",
      "successStories",
      "techStack",
      "industriesWeServe",
      "howWeHelp",
      "eventsCoverage",
      "whyChooseUs",
      "blogs",
      "ourPresence",
      "contact",
    ],
  },
  {
    name: "aboutPage",
    title: "About page",
    sections: [
      "hero",
      "challenges",
      "mission",
      "vision",
      "purpose",
      "values",
      "whatDefinesUs",
    ],
  },
  {
    name: "blogIndexPage",
    title: "Blog listing",
    sections: ["hero", "listing", "emptyState", "articleUi", "cta"],
  },
  {
    name: "careersPage",
    title: "Careers page",
    sections: [
      "banner",
      "riseWithUs",
      "values",
      "weMakeDifference",
      "whatWeOffer",
      "lifeAtRobusst",
      "hiringProcess",
      "currentOpenings",
      "readyToJoin",
      "contact",
      "rolePage",
    ],
  },
  {
    name: "contactPage",
    title: "Contact page",
    sections: ["hero", "formIntro"],
  },
  {
    name: "partnershipPage",
    title: "Partnership page",
    sections: ["banner", "partnerProgram", "formIntro"],
  },
  {
    name: "platformsPage",
    title: "Platforms page",
    sections: ["banner", "whyChoose", "cdp", "cpm", "kyc", "noc"],
  },
  {
    name: "pocWaitlistPage",
    title: "POC waitlist page",
    sections: ["hero", "formIntro"],
  },
  {
    name: "solutionsPage",
    title: "Solutions listing",
    sections: ["banner", "solutionGrid"],
  },
  {
    name: "aiCallCenterPage",
    title: "AI Call Center",
    sections: [
      "banner",
      "businessProblem",
      "solutionOverview",
      "keyValueProposition",
      "coreCapabilities",
      "advancedAiIntelligence",
      "enterpriseArchitecture",
      "solutionGrid",
      "customDevelopment",
      "idealUseCases",
      "futureAutomation",
      "faq",
    ],
  },
  {
    name: "brandedCallingPage",
    title: "Branded Calling",
    sections: [
      "banner",
      "brandedCalling",
      "antiSpamProtection",
      "whyChoose",
      "keyFeatures",
      "coreProtectionFeatures",
      "eliminate",
      "transformCommunication",
      "securityCompliance",
      "regionalExcellence",
      "industryApplications",
      "faq",
    ],
  },
  {
    name: "customerDataPlatformPage",
    title: "Customer Data Platform",
    sections: [
      "banner",
      "whyChooseRobusst",
      "industryApplications",
      "provenImpact",
      "telecomUseCases",
      "personalizedExperience",
      "solutionGrid",
      "benefitsUseCases",
      "accelerateValue",
      "keyFeaturesCapabilities",
      "cta",
      "faq",
    ],
  },
  {
    name: "customizedSolutionsPage",
    title: "Customized Solutions",
    sections: [
      "banner",
      "challenges",
      "customerCentric",
      "customizedSolutions",
      "solutionsSlider",
      "innovationProcess",
      "commitmentToExcellence",
      "faq",
    ],
  },
  {
    name: "cybersecurityPage",
    title: "Cybersecurity",
    sections: [
      "banner",
      "whyChooseRobusst",
      "solutionModules",
      "threatIntelligence",
      "howItWorks",
      "businessOutcomes",
      "ourUsp",
      "faq",
    ],
  },
  {
    name: "intelligentNocPage",
    title: "Intelligent NOC",
    sections: [
      "banner",
      "intelligentNoc",
      "coreCapabilities",
      "keyBenefits",
      "aiNetwork",
      "networkChaos",
      "networkOperationsChaos",
      "chaosControl",
      "frameworkAdaa",
      "humanInLoop",
      "integratedComponents",
      "intelligentDiffNoc",
      "lifecycleAutomation",
      "deploymentModels",
      "businessOutcomes",
      "faq",
    ],
  },
  {
    name: "networkMonetizationPage",
    title: "Network Monetization",
    sections: [
      "banner",
      "whyNetworkMonetization",
      "monetizationFramework",
      "userExperienceManagement",
      "solutionGrid",
      "mobileUseCase",
      "useCaseGrid",
      "telcos",
      "faq",
    ],
  },
  {
    name: "stsDmsPage",
    title: "STS/DMS",
    sections: [
      "banner",
      "telecomIntelligence",
      "salesDistribution",
      "whyRobusst",
      "robusstPlatform",
      "businessAutomation",
      "successStories",
      "solutionGrid",
      "driveSales",
      "erpHrisIntegration",
      "industryAgnostic",
      "faq",
    ],
  },
  {
    name: "storiesPage",
    title: "Success Stories",
    sections: ["banner", "listing", "detailDialog", "cta"],
  },
] as const;

export function uniqueLanguageRule(documentType: string) {
  return (
    language: string | undefined,
    context: {
      document?: { _id?: string };
      getClient: (options: { apiVersion: string }) => {
        fetch: (
          query: string,
          params: Record<string, string>,
        ) => Promise<number>;
      };
    },
  ) => {
    if (!language) return "Language is required";
    const id = context.document?._id?.replace(/^drafts\./, "") ?? "";
    return context
      .getClient({ apiVersion: "2026-08-15" })
      .fetch(
        "count(*[_type == $type && language == $language && !(_id in [$id, $draftId])])",
        { type: documentType, language, id, draftId: `drafts.${id}` },
      )
      .then((count) =>
        count === 0 ? true : `A ${language} document already exists`,
      );
  };
}

export const fixedPageSection = defineType({
  name: "fixedPageSection",
  title: "Fixed page section",
  type: "document",
  fields: [
    defineField({
      name: "internalTitle",
      title: "Internal title",
      type: "string",
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pageType",
      title: "Page type",
      type: "string",
      readOnly: true,
      hidden: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sectionKey",
      title: "Section key",
      type: "string",
      readOnly: true,
      hidden: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      readOnly: true,
      hidden: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "fixedSection",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "internalTitle", subtitle: "language" } },
});

export const localizedPageTypes = pageDefinitions.map(
  ({ name, title, sections }) =>
    defineType({
      name,
      title,
      type: "document",
      groups: [
        { name: "content", title: "Content", default: true },
        { name: "seo", title: "SEO" },
        { name: "workflow", title: "Translation workflow" },
      ],
      fields: [
        defineField({
          name: "internalTitle",
          title: "Internal title",
          type: "string",
          group: "content",
          initialValue: title,
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "language",
          title: "Language",
          type: "string",
          group: "workflow",
          readOnly: true,
          hidden: true,
          options: {
            list: sanityLanguageIds.map((id) => ({ title: id, value: id })),
          },
          validation: (rule) =>
            rule.required().custom(uniqueLanguageRule(name)),
        }),
        ...sections.map((section) => {
          const sectionTitle = section
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .replace(/^./, (character) => character.toUpperCase());
          return [
            "aiCallCenterPage",
            "brandedCallingPage",
            "customizedSolutionsPage",
            "intelligentNocPage",
            "networkMonetizationPage",
            "storiesPage",
            "stsDmsPage",
          ].includes(name)
            ? defineField({
                name: section,
                title: sectionTitle,
                type: "reference",
                to: [{ type: "fixedPageSection" }],
                options: {
                  disableNew: true,
                  filter: ({ document }) => ({
                    filter:
                      "pageType == $pageType && sectionKey == $sectionKey && language == $language",
                    params: {
                      pageType: name,
                      sectionKey: section,
                      language: document.language,
                    },
                  }),
                },
                group: "content",
                validation: (rule) => rule.required(),
              })
            : defineField({
                name: section,
                title: sectionTitle,
                type: "fixedSection",
                group: "content",
                initialValue: { internalName: section },
                validation: (rule) => rule.required(),
              });
        }),
        ...(name === "contactPage" ||
        name === "pocWaitlistPage" ||
        name === "partnershipPage"
          ? [
              defineField({
                name: "form",
                title: "Form copy",
                type: "formCopy",
                group: "content",
                validation: (rule) => rule.required(),
              }),
            ]
          : []),
        defineField({
          name: "seo",
          title: "SEO",
          type: "seo",
          group: "seo",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "translation",
          title: "Translation",
          type: "translationWorkflow",
          group: "workflow",
          validation: (rule) => rule.required(),
        }),
      ],
      preview: {
        select: {
          title: "internalTitle",
          language: "language",
          status: "translation.status",
        },
        prepare: ({ title: previewTitle, language, status }) => ({
          title: previewTitle || title,
          subtitle: [language?.toUpperCase(), status]
            .filter(Boolean)
            .join(" · "),
        }),
      },
    }),
);
