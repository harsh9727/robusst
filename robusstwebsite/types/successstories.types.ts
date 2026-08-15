export type Successstories_JsonType = {
  story: Array<{
    id: string;
    title: string;
    banner: string;
    solutions: Array<{
      title: string;
      description: string;
    }>;
    companyLogo: string;
    companyName: string;
    description: string;
    cusomterChallenges: Array<{
      title: string;
      description: string;
    }>;
  }>;
  mainStoryPage: {
    banner: {
      heading: string;
      subheading: string;
    };
  };
};