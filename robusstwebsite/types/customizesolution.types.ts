export type Customizesolution_JsonType = {
  customized_solution_page: {
    faq: Array<{
      answer: string;
      question: string;
    }>;
    banner: {
      heading: string;
      subheading: string;
    };
    challenges: {
      heading: string;
      categories: Array<{
        title: string;
        points: string[];
      }>;
      subheading: string;
    };
    customerCentric: {
      points: string[];
      heading: string;
      description: string;
    };
    innovationProcess: {
      steps: Array<{
        title: string;
        description: string;
      }>;
      heading: string;
      subheading: string;
    };
    customizedSolutions: {
      ctaText: string;
      heading: string;
      description: string;
    };
    commitmentToExcellence: {
      heading: string;
      features: Array<{
        text: string;
      }>;
    };
    customizedSolutionsSlider: {
      heading: string;
      solutions: Array<{
        heading: string;
        imageSrc: string;
        subheading: string;
        countPrefix: string;
      }>;
    };
  };
};