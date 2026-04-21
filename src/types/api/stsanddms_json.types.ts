export type Stsanddms_JsonType = {
  sts_and_dms_page: {
    faq: Array<{ answer: string; question: string }>;
    banner: {
      image: string;
      title: string;
      imageAlt: string;
      description: string;
    };
    driveSales: {
      image: string;
      title: string;
      imageAlt: string;
      useCases: Array<{ icon: string; label: string }>;
      titleHighlight: string;
    };
    whyRobusst: {
      image: string;
      title: string;
      imageAlt: string;
      subtitle: string;
      description: string;
      points: Array<{ title: string; description: string }>;
    };
    solutionGrid: {
      title: string;
      solutions: Array<{
        title: string;
        acronym: string;
        imageSrc: string;
        description: string;
        detailedContent: {
          sections: Array<{ title: string; description: string }>;
          subtitle: string;
          description: string;
          whyItMatters: string;
        };
      }>;
      decorativeImage: string;
      viewDetailsText: string;
      decorativeImageAlt: string;
    };
    successStories: {
      image: string;
      title: string;
      imageAlt: string;
      subtitle: string;
      stories: Array<{ icon: string; text: string; title: string }>;
    };
    robusstPlatform: {
      title: string;
      subtitle: string;
      centerTitle: string;
      centerSubtitle: string;
      features: Array<{
        icon: string;
        angle: string;
        title: string[];
        description: string;
      }>;
    };
    industryAgnostic: {
      title: string;
      subtitle: string;
      industries: Array<{ icon: string; title: string }>;
    };
    salesDistribution: {
      title: string;
      subtitle: string;
      titleHighlight: string;
      modules: Array<{ icon: string; title: string; description: string }>;
    };
    businessAutomation: {
      title: string;
      subtitle: string;
      products: Array<{ icon: string; title: string; description: string }>;
    };
    erpHrisIntegration: {
      badge: string;
      title: string;
      subtitle: string;
      features: Array<{ icon: string; title: string; description: string }>;
    };
    telecomIntelligence: {
      title: string;
      videoId: string;
      description: string;
      playButtonText: string;
      titleHighlight: string;
      videoThumbnail: string;
      videoThumbnailAlt: string;
    };
  };
};
