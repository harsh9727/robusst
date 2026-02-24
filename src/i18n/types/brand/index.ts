// Banner Section Types
export type BannerSection = {
  heading: string;
  subheading: string;
};

// Eliminate Section Types
export type EliminateSection = {
  heading: string;
};

// Transform Communication Section Types
export type TransformCommunicationSection = {
  paragraph1: string;
  paragraph2: string;
  ctaHeading: string;
  ctaButton: string;
};

// Why Choose Section Types
export type WhyChooseItem = {
  title: string;
  description: string;
};

export type WhyChooseSection = {
  heading: string;
  items: WhyChooseItem[];
};

// Branded Calling Section Types
export type BrandedCallingSection = {
  heading: string;
  subheading: string;
  description1: string;
  description2: string;
  benefits: string[];
  ctaButton: string;
};

// Key Features Section Types
export type KeyFeature = {
  title: string;
  description: string;
};

export type KeyFeaturesSection = {
  heading: string;
  features: KeyFeature[];
};

// Anti-Spam Protection Section Types
export type AntiSpamProtectionSection = {
  heading: string;
  subheading: string;
  description1: string;
  description2: string;
  benefits: string[];
  ctaButton: string;
};

// Core Protection Features Section Types
export type CoreProtectionFeature = {
  title: string;
  description: string;
};

export type CoreProtectionFeaturesSection = {
  heading: string;
  features: CoreProtectionFeature[];
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

// Regional Excellence Section Types
export type Region = {
  title: string;
  description: string;
};

export type RegionalExcellenceSection = {
  heading: string;
  subheading: string;
  regions: Region[];
};

// Security Compliance Section Types
export type SecurityComplianceItem = {
  title: string;
  description: string;
};

export type SecurityComplianceSection = {
  heading: string;
  items: SecurityComplianceItem[];
};

// FAQ Section Types
export type FAQItem = {
  question: string;
  answer: string;
};

export type FAQSection = {
  heading: string;
  items: FAQItem[];
};

// Root Brand Page Type
export type BrandPageTranslations = {
  banner: BannerSection;
  eliminate: EliminateSection;
  transformCommunication: TransformCommunicationSection;
  whyChoose: WhyChooseSection;
  brandedCalling: BrandedCallingSection;
  keyFeatures: KeyFeaturesSection;
  antiSpamProtection: AntiSpamProtectionSection;
  coreProtectionFeatures: CoreProtectionFeaturesSection;
  industryApplications: IndustryApplicationsSection;
  regionalExcellence: RegionalExcellenceSection;
  securityCompliance: SecurityComplianceSection;
  faq: FAQSection;
};
