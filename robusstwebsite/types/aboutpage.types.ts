export type Aboutpage_JsonType = {
  aboutPage: {
    hero: {
      image: string;
      title: string;
      description: string;
      subDescription: string;
    };
    values: {
      items: Array<{
        icon: string;
        title: string;
        description: string;
      }>;
      heading: string;
    };
    vision: {
      image: string;
      items: string[];
      heading: string;
    };
    mission: {
      image: string;
      heading: string;
      paragraphs: string[];
    };
    challenges: {
      items: Array<{
        icon: string;
        title: string;
      }>;
      heading: string;
      paragraphs: string[];
    };
    ourPurpose: {
      image: string;
      heading: string;
      paragraphs: string[];
    };
    whatDefinesUs: {
      image: string;
      heading: string;
      paragraphs: string[];
    };
  };
};