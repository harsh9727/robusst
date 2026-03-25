// Banner Section Types
export type BannerSection = {
  heading: string;
  subheading: string;
  description: string;
};

// Why Choose Robusst Section Types
export type WhyChooseRobusstFeature = {
  title: string;
};

export type WhyChooseRobusstSection = {
  heading: string;
  features: WhyChooseRobusstFeature[];
};

// Industry Applications Section Types
export type Industry = {
  title: string;
  description: string;
};

export type IndustryApplicationsSection = {
  heading: string;
  subheading: string;
  industries: Industry[];
};

// Proven Impact Section Types
export type ProvenImpactStat = {
  value: string;
  label: string;
  description: string;
};

export type ProvenImpactSection = {
  heading: string;
  stats: ProvenImpactStat[];
};

// Telecom Use Cases Section Types
export type TelecomUseCasesSection = {
  heading: string;
  description: string;
  useCases: string[];
};

// Personalized Experience Section Types
export type PersonalizedExperienceUseCase = {
  text: string;
};

export type PersonalizedExperienceSection = {
  badge: string;
  heading: string;
  useCases: PersonalizedExperienceUseCase[];
};

// Solution Grid Section Types
export type SolutionModuleSection = {
  title: string;
  description: string;
};

export type SolutionModuleDetailedContent = {
  subtitle: string;
  description: string;
  sections?: SolutionModuleSection[];
  features?: string[];
  whyItMatters?: string;
};

export type SolutionModule = {
  title: string;
  acronym: string;
  imageSrc: string;
  description: string;
  detailedContent: SolutionModuleDetailedContent;
};

export type SolutionGridSection = {
  heading: string;
  modules: SolutionModule[];
};

// Benefits Use Cases Section Types
export type Benefit = {
  title: string;
  description: string;
};

export type BenefitsUseCasesSection = {
  heading: string;
  subheading: string;
  benefits: Benefit[];
};

// Accelerate Value Section Types
export type AccelerateValueFeature = {
  title: string;
  description: string;
};

export type AccelerateValueSection = {
  heading: string;
  features: AccelerateValueFeature[];
};

// Key Features Capabilities Section Types
export type KeyFeature = {
  title: string;
  description: string;
};

export type KeyFeaturesCapabilitiesSection = {
  heading: string;
  subheading: string;
  features: KeyFeature[];
};

// CTA Section Types
export type CtaSection = {
  heading: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
};

export type Faq = {
  question: string;
  answer: string;
};

// Root CDP Type
export type CDPTranslations = {
  banner: BannerSection;
  whyChooseRobusst: WhyChooseRobusstSection;
  industryApplications: IndustryApplicationsSection;
  provenImpact: ProvenImpactSection;
  telecomUseCases: TelecomUseCasesSection;
  personalizedExperience: PersonalizedExperienceSection;
  solutionGrid: SolutionGridSection;
  benefitsUseCases: BenefitsUseCasesSection;
  accelerateValue: AccelerateValueSection;
  keyFeaturesCapabilities: KeyFeaturesCapabilitiesSection;
  ctaSection: CtaSection;
  faq: Faq[];
};
