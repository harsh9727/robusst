// Type definitions for NOC page translations

export interface OutcomeItem {
  value: number;
  suffix: string;
  label: string;
  gradient: string;
}

export interface BannerSection {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface BusinessOutcomesSection {
  title: string;
  description: string;
  outcomes: OutcomeItem[];
}

export interface AiNetworkSection {
  badge: string;
  title: string;
  titleHighlight: string;
  industryTags: string[];
  bulletPoints: string[];
  image: string;
  imageAlt: string;
}

export interface ChallengeItem {
  icon: string;
  text: string;
}

export interface ChallengeGroup {
  title: string;
  icon: string;
  items: ChallengeItem[];
}

export interface NetworkChaosSection {
  title: string;
  subtitle: string;
  todaysChallenges: ChallengeGroup;
  intelligentSolution: ChallengeGroup;
}

export interface IntelligentNOCSection {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  titleLine3: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface CapabilityItem {
  title: string;
  description: string;
}

export interface CoreCapabilitiesSection {
  title: string;
  capabilities: CapabilityItem[];
}

export interface NetworkOperationsItem {
  icon: string;
  title: string;
  description: string;
}

export interface NetworkOperationsChaosSection {
  title: string;
  items: NetworkOperationsItem[];
  image: string;
  imageAlt: string;
}

export interface FeatureItem {
  title: string;
  description: string;
}

export interface IntelligentDiffNOCSection {
  title: string;
  features: FeatureItem[];
}

export interface ChaosControlItem {
  icon: string;
  title: string;
  description: string;
}

export interface ChaosControlSection {
  title: string;
  items: ChaosControlItem[];
  image: string;
  imageAlt: string;
}

export interface FrameworkADAASection {
  title: string;
  subtitle: string;
  subtitleDescription: string;
  features: FeatureItem[];
}

export interface StepItem {
  title: string;
}

export interface LifecycleAutomationSection {
  title: string;
  description: string;
  steps: StepItem[];
}

export interface IntegratedComponentsSection {
  title: string;
  subtitle: string;
  featuresLeft: string[];
  featuresRight: string[];
}

export interface DeploymentModel {
  title: string;
  icon: string;
  description: string;
}

export interface DeploymentModelsSection {
  title: string;
  description: string;
  models: DeploymentModel[];
}

export interface KeyBenefitsSection {
  title: string;
  features: FeatureItem[];
}

export interface HumanInLoopSection {
  titleLine1: string;
  titleLine2: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface NOCPageTranslations {
  banner: BannerSection;
  businessOutcomes: BusinessOutcomesSection;
  aiNetwork: AiNetworkSection;
  networkChaos: NetworkChaosSection;
  intelligentNOC: IntelligentNOCSection;
  coreCapabilities: CoreCapabilitiesSection;
  networkOperationsChaos: NetworkOperationsChaosSection;
  intelligentDiffNOC: IntelligentDiffNOCSection;
  chaosControl: ChaosControlSection;
  frameworkADAA: FrameworkADAASection;
  lifecycleAutomation: LifecycleAutomationSection;
  integratedComponents: IntegratedComponentsSection;
  deploymentModels: DeploymentModelsSection;
  keyBenefits: KeyBenefitsSection;
  humanInLoop: HumanInLoopSection;
}
