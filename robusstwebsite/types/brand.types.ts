export type Brand_JsonType = {
  brand_page: {
    faq: {
      items: Array<{
        answer: string;
        question: string;
      }>;
      heading: string;
    };
    banner: {
      heading: string;
      subheading: string;
    };
    eliminate: {
      heading: string;
    };
    whyChoose: {
      items: Array<{
        title: string;
        description: string;
      }>;
      heading: string;
    };
    keyFeatures: {
      heading: string;
      features: Array<{
        title: string;
        description: string;
      }>;
    };
    brandedCalling: {
      heading: string;
      benefits: string[];
      ctaButton: string;
      subheading: string;
      description1: string;
      description2: string;
    };
    antiSpamProtection: {
      heading: string;
      benefits: string[];
      ctaButton: string;
      subheading: string;
      description1: string;
      description2: string;
    };
    regionalExcellence: {
      heading: string;
      regions: Array<{
        title: string;
        description: string;
      }>;
      subheading: string;
    };
    securityCompliance: {
      items: Array<{
        title: string;
        description: string;
      }>;
      heading: string;
    };
    industryApplications: {
      heading: string;
      industries: Array<{
        title: string;
        description: string;
      }>;
      subheading: string;
    };
    coreProtectionFeatures: {
      heading: string;
      features: Array<{
        title: string;
        description: string;
      }>;
    };
    transformCommunication: {
      ctaButton: string;
      ctaHeading: string;
      paragraph1: string;
      paragraph2: string;
    };
  };
};
