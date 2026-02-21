export type SuccessStoriesDataType = {
  id: string;
  title: string;
  companyName: string;
  companyLogo: string;
  banner: string;
  cusomterChallenges: {
    title: string;
    description: string;
  }[];
  solutions: {
    title: string;
    description: string;
  }[];
  benefits: {
    title: string;
    description: string;
  }[];
};

export type SuccessStoryPageSection = {
  mainStoryPage: {
    banner: {
      heading: string;
      subheading: string;
    };
    successStoryGrid: {
      ctaText: string;
    };
  };
  storyPage: {
    challengesTitle: string;
    solutionTitle: string;
  };
};
