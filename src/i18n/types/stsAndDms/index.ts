// Type definitions for STS and DMS page translations

export interface BannerSection {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface TelecomIntelligenceSection {
  title: string;
  titleHighlight: string;
  description: string;
  videoThumbnail: string;
  videoThumbnailAlt: string;
  playButtonText: string;
  videoId: string;
}

export interface SalesDistributionModule {
  title: string;
  description: string;
  icon: string;
}

export interface SalesDistributionSection {
  title: string;
  titleHighlight: string;
  subtitle: string;
  modules: SalesDistributionModule[];
}

export interface WhyRobusstPoint {
  title: string;
  description: string;
}

export interface WhyRobusstSection {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  points: WhyRobusstPoint[];
}

export interface RobusstPlatformFeature {
  title: string[];
  description: string;
  icon: string;
  angle: number;
}

export interface RobusstPlatformSection {
  title: string;
  subtitle: string;
  centerTitle: string;
  centerSubtitle: string;
  features: RobusstPlatformFeature[];
}

export interface BusinessAutomationProduct {
  title: string;
  description: string;
  icon: string;
}

export interface BusinessAutomationSection {
  title: string;
  subtitle: string;
  products: BusinessAutomationProduct[];
}

export interface SuccessStory {
  title: string;
  text: string;
  icon: string;
}

export interface SuccessStoriesSection {
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  stories: SuccessStory[];
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

export interface Solution {
  title: string;
  acronym: string;
  imageSrc: string;
  description: string;
  detailedContent: SolutionDetailedContent;
}

export interface SolutionGridSection {
  title: string;
  viewDetailsText: string;
  decorativeImage: string;
  decorativeImageAlt: string;
  solutions: Solution[];
}

export interface DriveSalesUseCase {
  label: string;
  icon: string;
}

export interface DriveSalesSection {
  title: string;
  titleHighlight: string;
  image: string;
  imageAlt: string;
  useCases: DriveSalesUseCase[];
}

export interface ErpHrisFeature {
  icon: string;
  title: string;
  description: string;
}

export interface ErpHrisIntegrationSection {
  badge: string;
  title: string;
  subtitle: string;
  features: ErpHrisFeature[];
}

export interface Industry {
  title: string;
  icon: string;
}

export interface IndustryAgnosticSection {
  title: string;
  subtitle: string;
  industries: Industry[];
}

export interface StsAndDmsPageTranslations {
  banner: BannerSection;
  telecomIntelligence: TelecomIntelligenceSection;
  salesDistribution: SalesDistributionSection;
  whyRobusst: WhyRobusstSection;
  robusstPlatform: RobusstPlatformSection;
  businessAutomation: BusinessAutomationSection;
  successStories: SuccessStoriesSection;
  solutionGrid: SolutionGridSection;
  driveSales: DriveSalesSection;
  erpHrisIntegration: ErpHrisIntegrationSection;
  industryAgnostic: IndustryAgnosticSection;
}
