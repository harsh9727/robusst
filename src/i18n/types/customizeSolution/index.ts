// Banner Section Types
export type BannerSection = {
  heading: string;
  subheading: string;
};

// Innovation Process Section Types
export type InnovationProcessStep = {
  title: string;
  description: string;
};

export type InnovationProcessSection = {
  heading: string;
  subheading: string;
  steps: InnovationProcessStep[];
};

// Customized Solutions Section Types
export type CustomizedSolutionsSection = {
  heading: string;
  description: string;
  ctaText: string;
};

// Customer Centric Section Types
export type CustomerCentricSection = {
  heading: string;
  description: string;
  points: string[];
};

// Challenges Section Types
export type ChallengeCategory = {
  title: string;
  points: string[];
};

export type ChallengesSection = {
  heading: string;
  subheading: string;
  categories: ChallengeCategory[];
};

// Customized Solutions Slider Section Types
export type CustomizedSolution = {
  heading: string;
  countPrefix: string;
  subheading: string;
  imageSrc: string;
};

export type CustomizedSolutionsSliderSection = {
  heading: string;
  solutions: CustomizedSolution[];
};

// Commitment to Excellence Section Types
export type CommitmentFeature = {
  text: string;
};

export type CommitmentToExcellenceSection = {
  heading: string;
  features: CommitmentFeature[];
};

export type Faq = {
  question: string;
  answer: string;
};

// Root CustomizeSolution Type
export type CustomizeSolutionTranslations = {
  banner: BannerSection;
  innovationProcess: InnovationProcessSection;
  customizedSolutions: CustomizedSolutionsSection;
  customerCentric: CustomerCentricSection;
  challenges: ChallengesSection;
  customizedSolutionsSlider: CustomizedSolutionsSliderSection;
  commitmentToExcellence: CommitmentToExcellenceSection;
  faq: Faq[];
};
