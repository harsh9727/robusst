// Type definitions for AI Call page translations

export interface BannerSection {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface BusinessProblem {
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface BusinessProblemSection {
  title: string;
  subtitle: string;
  videoThumbnail: string;
  videoThumbnailAlt: string;
  playButtonText: string;
  videoId: string;
  problems: BusinessProblem[];
}

export interface Solution {
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface SolutionOverviewSection {
  title: string;
  titleHighlight: string;
  image: string;
  imageAlt: string;
  solutions: Solution[];
}

export interface Stat {
  number: number;
  suffix: string;
  label: string;
  color: string;
}

export interface KeyValuePropositionSection {
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  stats: Stat[];
}

export interface Capability {
  title: string;
  description: string;
  icon: string;
  color: string;
  border: string;
}

export interface CoreCapabilitiesSection {
  title: string;
  subtitle: string;
  capabilities: Capability[];
}

export interface AdvancedFeature {
  title: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
}

export interface AdvancedAIIntelligenceSection {
  title: string;
  subtitle: string;
  features: AdvancedFeature[];
}

export interface ArchitectureComponent {
  title: string;
  description: string;
  icon: string;
  color: string;
  border: string;
}

export interface EnterpriseArchitectureSection {
  title: string;
  subtitle: string;
  components: ArchitectureComponent[];
  image: string;
  imageAlt: string;
}

export interface SolutionDetailSection {
  title: string;
  description: string;
}

export interface SolutionDetailedContent {
  subtitle: string;
  description: string;
  sections?: SolutionDetailSection[];
  features?: string[];
  whyItMatters?: string;
}

export interface SolutionGridItem {
  title: string;
  acronym: string;
  imageSrc: string;
  description: string;
  detailedContent: SolutionDetailedContent;
}

export interface SolutionGridSection {
  title: string;
  viewDetailsText: string;
  solutions: SolutionGridItem[];
}

export interface CustomDevelopmentFeature {
  title: string;
  description: string;
  icon: string;
  titleColor: string;
  iconStyle: string;
}

export interface CustomDevelopmentSection {
  cta: string;
  title: string;
  subtitle: string;
  features: CustomDevelopmentFeature[];
}

export interface UseCase {
  title: string;
  description: string;
  icon: string;
  color: string;
  glow: string;
}

export interface IdealUseCasesSection {
  title: string;
  subtitle: string;
  useCases: UseCase[];
}

export interface FutureAutomationSection {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  imageAlt: string;
}

export type Faq = {
  question: string;
  answer: string;
};

export interface AICallPageTranslations {
  banner: BannerSection;
  businessProblem: BusinessProblemSection;
  solutionOverview: SolutionOverviewSection;
  keyValueProposition: KeyValuePropositionSection;
  coreCapabilities: CoreCapabilitiesSection;
  advancedAIIntelligence: AdvancedAIIntelligenceSection;
  enterpriseArchitecture: EnterpriseArchitectureSection;
  solutionGrid: SolutionGridSection;
  customDevelopment: CustomDevelopmentSection;
  idealUseCases: IdealUseCasesSection;
  futureAutomation: FutureAutomationSection;
  faq: Faq[];
}
