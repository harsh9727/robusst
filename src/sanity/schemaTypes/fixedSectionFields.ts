/**
 * Fields supported by each fixed page section.
 *
 * The shared fixedSection schema keeps the project within Sanity's schema field
 * limit. This map keeps the editor section-specific by hiding controls that the
 * corresponding frontend section does not use. It is the union of populated
 * fields across all migrated locales.
 */

export type FixedSectionField =
  | "eyebrow"
  | "title"
  | "titleHighlight"
  | "subtitle"
  | "description"
  | "additionalCopy"
  | "paragraphs"
  | "labels"
  | "countPrefix"
  | "image"
  | "images"
  | "video"
  | "primaryCta"
  | "secondaryCta"
  | "statistics"
  | "items"
  | "groups"
  | "logos"
  | "faqs";

const fixedSectionFields = {
  "aboutPage.challenges": ["items", "paragraphs", "title"],
  "aboutPage.hero": ["description", "image", "paragraphs", "title"],
  "aboutPage.mission": ["image", "paragraphs", "title"],
  "aboutPage.purpose": ["image", "paragraphs", "title"],
  "aboutPage.values": ["items", "title"],
  "aboutPage.vision": ["image", "labels", "title"],
  "aboutPage.whatDefinesUs": ["image", "paragraphs", "title"],
  "aiCallCenterPage.advancedAiIntelligence": ["items", "subtitle", "title"],
  "aiCallCenterPage.banner": ["description", "image", "subtitle", "title"],
  "aiCallCenterPage.businessProblem": [
    "image",
    "items",
    "labels",
    "subtitle",
    "title",
    "video",
  ],
  "aiCallCenterPage.coreCapabilities": ["images", "items", "subtitle", "title"],
  "aiCallCenterPage.customDevelopment": [
    "image",
    "items",
    "primaryCta",
    "subtitle",
    "title",
  ],
  "aiCallCenterPage.enterpriseArchitecture": [
    "image",
    "items",
    "subtitle",
    "title",
  ],
  "aiCallCenterPage.faq": ["faqs", "image", "title"],
  "aiCallCenterPage.futureAutomation": ["description", "primaryCta", "title"],
  "aiCallCenterPage.idealUseCases": ["items", "subtitle", "title"],
  "aiCallCenterPage.keyValueProposition": ["statistics", "subtitle", "title"],
  "aiCallCenterPage.solutionGrid": ["groups", "labels", "title"],
  "aiCallCenterPage.solutionOverview": [
    "image",
    "items",
    "title",
    "titleHighlight",
  ],
  "blogIndexPage.articleUi": ["labels"],
  "blogIndexPage.cta": ["description", "primaryCta", "title"],
  "blogIndexPage.emptyState": ["description", "title"],
  "blogIndexPage.hero": ["description", "title"],
  "blogIndexPage.listing": ["labels"],
  "brandedCallingPage.antiSpamProtection": [
    "image",
    "labels",
    "paragraphs",
    "title",
    "titleHighlight",
  ],
  "brandedCallingPage.banner": ["image", "subtitle", "title"],
  "brandedCallingPage.brandedCalling": [
    "image",
    "labels",
    "paragraphs",
    "title",
    "titleHighlight",
  ],
  "brandedCallingPage.coreProtectionFeatures": ["image", "items", "title"],
  "brandedCallingPage.eliminate": ["images", "labels", "title", "video"],
  "brandedCallingPage.faq": ["faqs", "image", "title"],
  "brandedCallingPage.industryApplications": ["items", "subtitle", "title"],
  "brandedCallingPage.keyFeatures": ["image", "items", "title"],
  "brandedCallingPage.regionalExcellence": [
    "image",
    "items",
    "subtitle",
    "title",
  ],
  "brandedCallingPage.securityCompliance": ["items", "title"],
  "brandedCallingPage.transformCommunication": ["image", "paragraphs", "title"],
  "brandedCallingPage.whyChoose": ["items", "title"],
  "careersPage.banner": [
    "description",
    "image",
    "primaryCta",
    "secondaryCta",
    "title",
  ],
  "careersPage.contact": [
    "description",
    "image",
    "items",
    "labels",
    "subtitle",
    "title",
  ],
  "careersPage.currentOpenings": ["labels", "title"],
  "careersPage.hiringProcess": ["description", "images", "title"],
  "careersPage.lifeAtRobusst": ["images", "title"],
  "careersPage.readyToJoin": ["image", "paragraphs", "title"],
  "careersPage.riseWithUs": ["items", "title"],
  "careersPage.rolePage": ["labels"],
  "careersPage.values": ["items", "title"],
  "careersPage.weMakeDifference": ["image", "paragraphs", "title"],
  "careersPage.whatWeOffer": ["image", "items", "title"],
  "contactPage.formIntro": ["title"],
  "contactPage.hero": ["image", "subtitle", "title"],
  "customerDataPlatformPage.accelerateValue": ["image", "items", "title"],
  "customerDataPlatformPage.banner": [
    "description",
    "image",
    "subtitle",
    "title",
    "video",
  ],
  "customerDataPlatformPage.benefitsUseCases": [
    "image",
    "items",
    "subtitle",
    "title",
  ],
  "customerDataPlatformPage.cta": [
    "description",
    "image",
    "primaryCta",
    "secondaryCta",
    "title",
  ],
  "customerDataPlatformPage.faq": ["faqs", "image", "title"],
  "customerDataPlatformPage.industryApplications": [
    "items",
    "subtitle",
    "title",
  ],
  "customerDataPlatformPage.keyFeaturesCapabilities": [
    "image",
    "items",
    "subtitle",
    "title",
  ],
  "customerDataPlatformPage.personalizedExperience": [
    "eyebrow",
    "image",
    "labels",
    "title",
  ],
  "customerDataPlatformPage.provenImpact": ["image", "items", "title"],
  "customerDataPlatformPage.solutionGrid": [
    "groups",
    "image",
    "labels",
    "title",
  ],
  "customerDataPlatformPage.telecomUseCases": [
    "description",
    "image",
    "labels",
    "title",
  ],
  "customerDataPlatformPage.whyChooseRobusst": ["image", "items", "title"],
  "customizedSolutionsPage.banner": ["image", "subtitle", "title"],
  "customizedSolutionsPage.challenges": [
    "groups",
    "image",
    "subtitle",
    "title",
  ],
  "customizedSolutionsPage.commitmentToExcellence": ["image", "items", "title"],
  "customizedSolutionsPage.customerCentric": [
    "description",
    "image",
    "labels",
    "title",
  ],
  "customizedSolutionsPage.customizedSolutions": [
    "description",
    "image",
    "primaryCta",
    "title",
  ],
  "customizedSolutionsPage.faq": ["faqs", "image"],
  "customizedSolutionsPage.innovationProcess": [
    "image",
    "items",
    "labels",
    "subtitle",
    "title",
    "video",
  ],
  "customizedSolutionsPage.solutionsSlider": ["items", "title"],
  "cybersecurityPage.banner": ["description", "image", "title"],
  "cybersecurityPage.businessOutcomes": ["image", "items", "subtitle", "title"],
  "cybersecurityPage.faq": ["faqs", "image"],
  "cybersecurityPage.howItWorks": ["image", "items", "subtitle", "title"],
  "cybersecurityPage.ourUsp": ["items", "subtitle", "title"],
  "cybersecurityPage.solutionModules": [
    "description",
    "groups",
    "labels",
    "title",
  ],
  "cybersecurityPage.threatIntelligence": [
    "image",
    "items",
    "subtitle",
    "title",
  ],
  "cybersecurityPage.whyChooseRobusst": [
    "description",
    "image",
    "items",
    "labels",
    "subtitle",
    "title",
    "video",
  ],
  "homePage.about": [
    "image",
    "labels",
    "paragraphs",
    "subtitle",
    "title",
    "video",
  ],
  "homePage.blogs": ["paragraphs", "primaryCta", "title"],
  "homePage.contact": ["primaryCta", "subtitle", "title"],
  "homePage.eventsCoverage": ["images", "subtitle", "title"],
  "homePage.hero": ["items"],
  "homePage.howWeHelp": ["items", "subtitle", "title"],
  "homePage.industriesWeServe": ["items", "title"],
  "homePage.ourPresence": ["labels", "subtitle", "title"],
  "homePage.results": ["description", "image", "items", "subtitle", "title"],
  "homePage.solutions": ["countPrefix", "items", "subtitle", "title"],
  "homePage.successStories": [
    "countPrefix",
    "items",
    "paragraphs",
    "primaryCta",
    "title",
  ],
  "homePage.techStack": ["description", "groups", "title"],
  "homePage.trustedBy": ["logos", "title"],
  "homePage.whyChooseUs": ["items", "title"],
  "intelligentNocPage.aiNetwork": [
    "eyebrow",
    "image",
    "labels",
    "paragraphs",
    "title",
    "titleHighlight",
  ],
  "intelligentNocPage.banner": ["description", "image", "title", "video"],
  "intelligentNocPage.businessOutcomes": ["description", "items", "title"],
  "intelligentNocPage.chaosControl": ["image", "items", "title"],
  "intelligentNocPage.coreCapabilities": ["items", "title"],
  "intelligentNocPage.deploymentModels": ["description", "items", "title"],
  "intelligentNocPage.faq": ["faqs", "image", "title"],
  "intelligentNocPage.frameworkAdaa": [
    "description",
    "items",
    "subtitle",
    "title",
  ],
  "intelligentNocPage.humanInLoop": [
    "description",
    "image",
    "title",
    "titleHighlight",
  ],
  "intelligentNocPage.integratedComponents": ["groups", "subtitle", "title"],
  "intelligentNocPage.intelligentDiffNoc": ["items", "title"],
  "intelligentNocPage.intelligentNoc": [
    "description",
    "eyebrow",
    "image",
    "subtitle",
    "title",
    "titleHighlight",
  ],
  "intelligentNocPage.keyBenefits": ["items", "title"],
  "intelligentNocPage.lifecycleAutomation": ["description", "items", "title"],
  "intelligentNocPage.networkChaos": ["groups", "subtitle", "title"],
  "intelligentNocPage.networkOperationsChaos": ["image", "items", "title"],
  "networkMonetizationPage.banner": ["description", "title", "video"],
  "networkMonetizationPage.faq": ["faqs", "image"],
  "networkMonetizationPage.mobileUseCase": ["items", "subtitle", "title"],
  "networkMonetizationPage.monetizationFramework": ["items", "title"],
  "networkMonetizationPage.solutionGrid": ["groups", "labels"],
  "networkMonetizationPage.telcos": ["image", "labels", "title"],
  "networkMonetizationPage.useCaseGrid": [
    "groups",
    "labels",
    "subtitle",
    "title",
  ],
  "networkMonetizationPage.userExperienceManagement": [
    "eyebrow",
    "image",
    "labels",
    "subtitle",
    "title",
  ],
  "networkMonetizationPage.whyNetworkMonetization": [
    "description",
    "image",
    "labels",
    "paragraphs",
    "title",
    "video",
  ],
  "partnershipPage.banner": ["image", "primaryCta", "title"],
  "partnershipPage.formIntro": ["description", "title"],
  "partnershipPage.partnerProgram": ["items", "title"],
  "platformsPage.banner": ["subtitle", "title", "video"],
  "platformsPage.cdp": ["groups", "image", "subtitle", "title"],
  "platformsPage.cpm": ["groups", "image", "subtitle", "title"],
  "platformsPage.kyc": ["groups", "image", "subtitle", "title"],
  "platformsPage.noc": ["groups", "image", "subtitle", "title"],
  "platformsPage.whyChoose": ["items", "title"],
  "pocWaitlistPage.formIntro": ["title"],
  "pocWaitlistPage.hero": ["image", "primaryCta", "subtitle", "title"],
  "solutionsPage.banner": ["subtitle", "title", "video"],
  "solutionsPage.solutionGrid": ["items"],
  "storiesPage.banner": ["image", "primaryCta", "subtitle", "title"],
  "storiesPage.cta": ["primaryCta"],
  "storiesPage.detailDialog": ["labels"],
  "storiesPage.listing": ["labels"],
  "stsDmsPage.banner": ["description", "image", "title"],
  "stsDmsPage.businessAutomation": ["items", "subtitle", "title"],
  "stsDmsPage.driveSales": ["image", "items", "title", "titleHighlight"],
  "stsDmsPage.erpHrisIntegration": ["eyebrow", "items", "subtitle", "title"],
  "stsDmsPage.faq": ["faqs", "image"],
  "stsDmsPage.industryAgnostic": ["items", "subtitle", "title"],
  "stsDmsPage.robusstPlatform": ["items", "labels", "subtitle", "title"],
  "stsDmsPage.salesDistribution": [
    "items",
    "subtitle",
    "title",
    "titleHighlight",
  ],
  "stsDmsPage.solutionGrid": ["groups", "image", "labels", "title"],
  "stsDmsPage.successStories": ["image", "items", "subtitle", "title"],
  "stsDmsPage.telecomIntelligence": [
    "description",
    "image",
    "labels",
    "title",
    "titleHighlight",
    "video",
  ],
  "stsDmsPage.whyRobusst": [
    "description",
    "image",
    "items",
    "subtitle",
    "title",
  ],
} as const satisfies Record<string, readonly FixedSectionField[]>;

type FixedSectionVisibilityContext = {
  document?: {
    _type?: string;
    pageType?: unknown;
    sectionKey?: unknown;
  };
  parent?: { internalName?: unknown };
  value?: unknown;
};

export function hideUnusedFixedSectionField(field: FixedSectionField) {
  return ({ document, parent, value }: FixedSectionVisibilityContext) => {
    // Never hide existing data, including data introduced by a migration.
    if (value !== undefined && value !== null) return false;

    const pageType =
      document?._type === "fixedPageSection"
        ? document.pageType
        : document?._type;
    const sectionKey =
      document?._type === "fixedPageSection"
        ? document.sectionKey
        : parent?.internalName;

    if (typeof pageType !== "string" || typeof sectionKey !== "string") {
      return false;
    }

    const supportedFields: readonly FixedSectionField[] | undefined =
      fixedSectionFields[
        `${pageType}.${sectionKey}` as keyof typeof fixedSectionFields
      ];

    // Fail open for newly introduced sections until their field map is added.
    return supportedFields ? !supportedFields.includes(field) : false;
  };
}
