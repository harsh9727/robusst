export type AboutPageContent = {
  hero: {
    title: string;
    description: string;
    subDescription: string;
    image: string;
  };
  mission: {
    heading: string;
    paragraphs: string[];
    image: string;
  };
  vision: {
    heading: string;
    items: string[];
    image: string;
  };
  values: {
    heading: string;
    items: {
      title: string;
      description: string;
      icon: string;
    }[];
  };
  ourPurpose: {
    heading: string;
    paragraphs: string[];
    image: string;
  };
  whatDefinesUs: {
    heading: string;
    paragraphs: string[];
    image: string;
  };
  challenges: {
    heading: string;
    paragraphs: string[];
    items: {
      title: string;
      icon: string;
    }[];
  };
};
