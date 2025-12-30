// Hero Section Types
export type HeroSlide = {
  title: string;
  description: string;
  ctaText: string;
}[];

// Trusted By Section Types
export type TrustedBySection = {
  heading: string;
};

// About Section Types
export type AboutSection = {
  heading: string;
  subheading: string;
  paragraphs: string[];
};

// Solutions Section Types
export type SolutionItem = {
  title: string;
  description: string;
  points: string[];
};

export type SolutionsSection = {
  heading: string;
  countPrefix: string;
  subheading: string;
  items: SolutionItem[];
};

// Results Section Types
export type ResultItem = {
  label: string;
  title: string;
};

export type ResultsSection = {
  heading: string;
  subheading: string;
  description: string;
  items: ResultItem[];
};

// Success Stories Section Types
export type SuccessStoryItem = {
  title: string;
  description: string;
};

export type SuccessStoriesSection = {
  heading: string;
  countPrefix: string;
  items: SuccessStoryItem[];
};

// Industries We Serve Section Types
export type IndustryItem = {
  title: string;
};

export type IndustriesWeServeSection = {
  heading: string;
  items: IndustryItem[];
};

// Tech Stack Section Types
export type TechStackItem = {
  title: string;
  stack: string[];
};

export type TechStackSection = {
  heading: string;
  description: string;
  items: TechStackItem[];
};

// How We Help Section Types
export type HowWeHelpItem = {
  title: string;
  description: string;
};

export type HowWeHelpSection = {
  heading: string;
  subheading: string;
  items: HowWeHelpItem[];
};

// Events Coverage Section Types
export type EventsCoverageSection = {
  heading: string;
  subheading: string;
};

// Why Choose Us Section Types
export type WhyChooseUsSection = {
  heading: string;
  points: {
    title: string;
    description: string;
  }[];
};

// Our Presence Section Types
export type OurPresenceSection = {
  heading: string;
  mobileListHeading: string;
  countries: string[];
};

// Contact Section Types
export type ContactSection = {
  heading: string;
  subheading: string;
  ctaText: string;
};
