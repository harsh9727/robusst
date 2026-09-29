export type Home_JsonType = {
  hero: {
    slides: Array<{
      title: string;
      ctaText: string;
      description: string;
    }>;
  };
  about: {
    heading: string;
    paragraphs: string[];
    subheading: string;
  };
  contact: {
    ctaText: string;
    heading: string;
    subheading: string;
  };
  results: {
    items: Array<{
      label: string;
      title: string;
    }>;
    heading: string;
    subheading: string;
    description: string;
  };
  howWeHelp: {
    items: Array<{
      title: string;
      description: string;
    }>;
    heading: string;
    subheading: string;
  };
  solutions: {
    items: Array<{
      slug: string;
      image: string;
      title: string;
      points: string[];
      description: string;
    }>;
    heading: string;
    subheading: string;
    countPrefix: string;
  };
  techStack: {
    items: Array<{
      id: string;
      title: string;
      tools: Array<{
        icon: string;
        title: string;
      }>;
    }>;
    heading: string;
    description: string;
  };
  trustedBy: {
    heading: string;
  };
  ourPresence: {
    heading: string;
    countries: string[];
    mobileListHeading: string;
  };
  whyChooseUs: {
    points: Array<{
      title: string;
      description: string;
    }>;
    heading: string;
  };
  eventsCoverage: {
    heading: string;
    subheading: string;
  };
  successStories: {
    items: Array<{
      title: string;
      description: string;
    }>;
    heading: string;
    countPrefix: string;
  };
  industriesWeServe: {
    items: Array<{
      title: string;
    }>;
    heading: string;
  };
};
