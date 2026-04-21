export type Cdp_JsonType = {
  cdp_page: {
    faq: Array<{
      answer: string;
      question: string;
    }>;
    banner: {
      heading: string;
      subheading: string;
      description: string;
    };
    ctaSection: {
      heading: string;
      primaryCta: string;
      description: string;
      secondaryCta: string;
    };
    provenImpact: {
      stats: Array<{
        label: string;
        value: string;
        description: string;
      }>;
      heading: string;
    };
    solutionGrid: {
      heading: string;
      modules: Array<{
        title: string;
        acronym: string;
        imageSrc: string;
        description: string;
        detailedContent: {
          sections: Array<{
            title: string;
            description: string;
          }>;
          subtitle: string;
          description: string;
          whyItMatters: string;
        };
      }>;
    };
    accelerateValue: {
      heading: string;
      features: Array<{
        title: string;
        description: string;
      }>;
    };
    telecomUseCases: {
      heading: string;
      useCases: string[];
      description: string;
    };
    benefitsUseCases: {
      heading: string;
      benefits: Array<{
        title: string;
        description: string;
      }>;
      subheading: string;
    };
    whyChooseRobusst: {
      heading: string;
      features: Array<{
        title: string;
      }>;
    };
    industryApplications: {
      heading: string;
      industries: Array<{
        title: string;
        description: string;
      }>;
      subheading: string;
    };
    personalizedExperience: {
      badge: string;
      heading: string;
      useCases: Array<{
        text: string;
      }>;
    };
    keyFeaturesCapabilities: {
      heading: string;
      features: Array<{
        title: string;
        description: string;
      }>;
      subheading: string;
    };
  };
};
