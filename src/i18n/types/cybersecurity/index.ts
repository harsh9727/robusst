// Type definitions for Cybersecurity page translations

export interface BannerSection {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface WhyChoosePoint {
  title: string;
  description: string;
}

export interface WhyChooseRobusstSection {
  title: string;
  subtitle: string;
  description: string;
  videoThumbnail: string;
  videoThumbnailAlt: string;
  playButtonText: string;
  points: WhyChoosePoint[];
}

export interface DetailedContentSection {
  title: string;
  description: string;
}

export interface SolutionModuleDetailedContent {
  subtitle: string;
  description: string;
  features?: string[];
  sections?: DetailedContentSection[];
  whyItMatters?: string;
}

export interface SolutionModule {
  title: string;
  acronym: string;
  color: string;
  imageSrc: string;
  description: string;
  detailedContent: SolutionModuleDetailedContent;
}

export interface SolutionModulesSection {
  title: string;
  description: string;
  viewDetailsText: string;
  modules: SolutionModule[];
}

export interface ThreatIntelligenceFeature {
  icon: string;
  title: string;
  text: string;
}

export interface ThreatIntelligenceSection {
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  features: ThreatIntelligenceFeature[];
}

export interface HowItWorksStep {
  title: string;
  text: string;
}

export interface HowItWorksSection {
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  steps: HowItWorksStep[];
}

export interface BusinessOutcome {
  title: string;
  text: string;
}

export interface BusinessOutcomesSection {
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  outcomes: BusinessOutcome[];
}

export interface USPPoint {
  title: string;
  text: string;
}

export interface OurUSPSection {
  title: string;
  subtitle: string;
  uspPoints: USPPoint[];
}

export type Faq = {
  question: string;
  answer: string;
};

export interface CybersecurityPageTranslations {
  banner: BannerSection;
  whyChooseRobusst: WhyChooseRobusstSection;
  solutionModules: SolutionModulesSection;
  threatIntelligence: ThreatIntelligenceSection;
  howItWorks: HowItWorksSection;
  businessOutcomes: BusinessOutcomesSection;
  ourUSP: OurUSPSection;
  faq: Faq[];
}
