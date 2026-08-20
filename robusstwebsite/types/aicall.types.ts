export type Aicall_JsonType = {
  ai_call_page: {
    faq: Array<{
      answer: string;
      question: string;
    }>;
    banner: {
      image: string;
      title: string;
      imageAlt: string;
      subtitle: string;
      description: string;
    };
    solutionGrid: {
      title: string;
      solutions: Array<{
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
      viewDetailsText: string;
    };
    idealUseCases: {
      title: string;
      subtitle: string;
      useCases: Array<{
        glow: string;
        icon: string;
        color: string;
        title: string;
        description: string;
      }>;
    };
    businessProblem: {
      title: string;
      videoId: string;
      problems: Array<{
        icon: string;
        color: string;
        title: string;
        description: string;
      }>;
      subtitle: string;
      playButtonText: string;
      videoThumbnail: string;
      videoThumbnailAlt: string;
    };
    coreCapabilities: {
      title: string;
      subtitle: string;
      capabilities: Array<{
        icon: string;
        color: string;
        title: string;
        border: string;
        description: string;
      }>;
    };
    futureAutomation: {
      image: string;
      title: string;
      ctaLink: string;
      ctaText: string;
      imageAlt: string;
      description: string;
    };
    solutionOverview: {
      image: string;
      title: string;
      imageAlt: string;
      solutions: Array<{
        icon: string;
        color: string;
        title: string;
        description: string;
      }>;
      titleHighlight: string;
    };
    customDevelopment: {
      cta: string;
      title: string;
      features: Array<{
        icon: string;
        title: string;
        iconStyle: string;
        titleColor: string;
        description: string;
      }>;
      subtitle: string;
    };
    keyValueProposition: {
      image: string;
      stats: Array<{
        color: string;
        label: string;
        number: string;
        suffix: string;
      }>;
      title: string;
      imageAlt: string;
      subtitle: string;
    };
    advancedAIIntelligence: {
      title: string;
      features: Array<{
        icon: string;
        color: string;
        title: string;
        gradient: string;
        description: string;
      }>;
      subtitle: string;
    };
    enterpriseArchitecture: {
      image: string;
      title: string;
      imageAlt: string;
      subtitle: string;
      components: Array<{
        icon: string;
        color: string;
        title: string;
        border: string;
        description: string;
      }>;
    };
  };
};