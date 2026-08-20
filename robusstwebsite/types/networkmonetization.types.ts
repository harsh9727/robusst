export type Networkmonetization_JsonType = {
  network_monetization_page: {
    faq: Array<{
      answer: string;
      question: string;
    }>;
    banner: {
      title: string;
      video: string;
      videoAlt: string;
      description: string;
    };
    telcos: {
      image: string;
      title: string;
      features: string[];
      imageAlt: string;
    };
    useCaseGrid: {
      title: string;
      subtitle: string;
      solutions: Array<{
        title: string;
        acronym: string;
        imageSrc: string;
        description: string;
        detailedContent: {
          features: string[];
          subtitle: string;
          description: string;
          whyItMatters: string;
        };
      }>;
    };
    solutionGrid: {
      solutions: Array<{
        image: string;
        title: string;
        features: string[];
        subtitle: string;
        businessImpact: string[];
      }>;
    };
    mobileUseCase: {
      title: string;
      subtitle: string;
      useCases: Array<{
        icon: string;
        title: string;
        description: string;
      }>;
    };
    monetizationFramework: {
      title: string;
      frameworks: Array<{
        glow: string;
        icon: string;
        color: string;
        title: string;
        description: string;
      }>;
    };
    whyNetworkMonetization: {
      title: string;
      points: string[];
      playButtonText: string;
      videoThumbnail: string;
      videoThumbnailAlt: string;
      highlightStatement: string;
    };
    userExperienceManagement: {
      badge: string;
      image: string;
      title: string;
      features: string[];
      imageAlt: string;
      subtitle: string;
    };
  };
};