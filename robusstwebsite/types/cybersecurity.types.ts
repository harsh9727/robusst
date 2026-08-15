export type Cybersecurity_JsonType = {
  cybersecurity_page: {
    faq: Array<{
      answer: string;
      question: string;
    }>;
    banner: {
      image: string;
      title: string;
      imageAlt: string;
      description: string;
    };
    ourUSP: {
      title: string;
      subtitle: string;
      uspPoints: Array<{
        text: string;
        title: string;
      }>;
    };
    howItWorks: {
      image: string;
      steps: Array<{
        text: string;
        title: string;
      }>;
      title: string;
      imageAlt: string;
      subtitle: string;
    };
    solutionModules: {
      title: string;
      modules: Array<{
        color: string;
        title: string;
        acronym: string;
        imageSrc: string;
        description: string;
        detailedContent: {
          features: string[];
          subtitle: string;
          description: string;
        };
      }>;
      description: string;
      viewDetailsText: string;
    };
    businessOutcomes: {
      image: string;
      title: string;
      imageAlt: string;
      outcomes: Array<{
        text: string;
        title: string;
      }>;
      subtitle: string;
    };
    whyChooseRobusst: {
      title: string;
      points: Array<{
        title: string;
        description: string;
      }>;
      subtitle: string;
      description: string;
      playButtonText: string;
      videoThumbnail: string;
      videoThumbnailAlt: string;
    };
    threatIntelligence: {
      image: string;
      title: string;
      features: Array<{
        icon: string;
        text: string;
        title: string;
      }>;
      imageAlt: string;
      subtitle: string;
    };
  };
};