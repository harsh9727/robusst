// Type definitions for Network Monetization page translations

export interface BannerSection {
  title: string;
  description: string;
  video: string;
  videoAlt: string;
}

export interface WhyNetworkMonetizationSection {
  title: string;
  videoThumbnail: string;
  videoThumbnailAlt: string;
  playButtonText: string;
  points: string[];
  highlightStatement: string;
}

export interface MonetizationFrameworkItem {
  title: string;
  description: string;
  icon: string;
  color: string;
  glow: string;
}

export interface MonetizationFrameworkSection {
  title: string;
  frameworks: MonetizationFrameworkItem[];
}

export interface UserExperienceManagementSection {
  badge: string;
  title: string;
  subtitle: string;
  features: string[];
  image: string;
  imageAlt: string;
}

export interface SolutionGridItem {
  title: string;
  image: string;
  subtitle: string;
  features: string[];
  businessImpact: string[];
}

export interface SolutionGridSection {
  solutions: SolutionGridItem[];
}

export interface MobileUseCaseItem {
  icon: string;
  title: string;
  description: string;
}

export interface MobileUseCaseSection {
  title: string;
  subtitle: string;
  useCases: MobileUseCaseItem[];
}

export interface UseCaseDetailedContent {
  subtitle: string;
  description: string;
  features: string[];
  whyItMatters: string;
}

export interface UseCaseSolution {
  acronym: string;
  title: string;
  description: string;
  imageSrc: string;
  detailedContent: UseCaseDetailedContent;
}

export interface UseCaseGridSection {
  title: string;
  subtitle: string;
  solutions: UseCaseSolution[];
}

export interface TelcosSection {
  title: string;
  image: string;
  imageAlt: string;
  features: string[];
}

export interface NetworkMonetizationPageTranslations {
  banner: BannerSection;
  whyNetworkMonetization: WhyNetworkMonetizationSection;
  monetizationFramework: MonetizationFrameworkSection;
  userExperienceManagement: UserExperienceManagementSection;
  solutionGrid: SolutionGridSection;
  mobileUseCase: MobileUseCaseSection;
  useCaseGrid: UseCaseGridSection;
  telcos: TelcosSection;
}
