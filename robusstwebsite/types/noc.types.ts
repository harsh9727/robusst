export type Noc_JsonType = {
  noc_page: {
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
    aiNetwork: {
      badge: string;
      image: string;
      title: string;
      imageAlt: string;
      bulletPoints: string[];
      industryTags: string[];
      titleHighlight: string;
    };
    humanInLoop: {
      image: string;
      imageAlt: string;
      titleLine1: string;
      titleLine2: string;
      description: string;
    };
    keyBenefits: {
      title: string;
      features: Array<{
        title: string;
        description: string;
      }>;
    };
    chaosControl: {
      image: string;
      items: Array<{
        icon: string;
        title: string;
        description: string;
      }>;
      title: string;
      imageAlt: string;
    };
    networkChaos: {
      title: string;
      subtitle: string;
      todaysChallenges: {
        icon: string;
        items: Array<{
          icon: string;
          text: string;
        }>;
        title: string;
      };
      intelligentSolution: {
        icon: string;
        items: Array<{
          icon: string;
          text: string;
        }>;
        title: string;
      };
    };
    frameworkADAA: {
      title: string;
      features: Array<{
        title: string;
        description: string;
      }>;
      subtitle: string;
      subtitleDescription: string;
    };
    intelligentNOC: {
      badge: string;
      image: string;
      imageAlt: string;
      titleLine1: string;
      titleLine2: string;
      titleLine3: string;
      description: string;
    };
    businessOutcomes: {
      title: string;
      outcomes: Array<{
        label: string;
        value: string;
        suffix: string;
        gradient: string;
      }>;
      description: string;
    };
    coreCapabilities: {
      title: string;
      capabilities: Array<{
        title: string;
        description: string;
      }>;
    };
    deploymentModels: {
      title: string;
      models: Array<{
        icon: string;
        title: string;
        description: string;
      }>;
      description: string;
    };
    intelligentDiffNOC: {
      title: string;
      features: Array<{
        title: string;
        description: string;
      }>;
    };
    lifecycleAutomation: {
      steps: Array<{
        title: string;
      }>;
      title: string;
      description: string;
    };
    integratedComponents: {
      title: string;
      subtitle: string;
      featuresLeft: string[];
      featuresRight: string[];
    };
    networkOperationsChaos: {
      image: string;
      items: Array<{
        icon: string;
        title: string;
        description: string;
      }>;
      title: string;
      imageAlt: string;
    };
  };
};
