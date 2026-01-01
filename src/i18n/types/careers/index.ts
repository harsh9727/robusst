export type CareersSection = {
  banner: {
    heading: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
  };
  riseWithUs: {
    heading: string;
    cards: {
      title: string;
      description: string;
    }[];
  };
  currentOpenings: {
    heading: string;
    viewJobCta: string;
    applyNowCta: string;
  };
  weMakeDifference: {
    heading: string;
    bodyOne: string;
    bodyTwo: string;
  };
  whatWeOffer: {
    heading: string;
    sections: {
      title: string;
      description: string;
    }[];
  };
  values: {
    heading: string;
    cards: {
      title: string;
      desc: string;
    }[];
  };
  readyToJoinUs: {
    heading: string;
    bodyOne: string;
    bodyTwo: string;
  };
  ourHiringProcess: {
    heading: string;
    body: string;
  };
  lifeAtRobusst: {
    heading: string;
  };
  employeesTestimonials: {
    heading: string;
    testimonials: {
      name: string;
      designation: string;
      message: string;
    }[];
  };
  contact: {
    heading: string;
    questionsPrompt: string;
    emailUs: string;
    whatsapp: string;
    recruitmentSupport: string;
    followUs: string;
    latestJobOpenings: string;
    description: string;
  };
  jobOpenings: {
    id: string;
    positionTitle: string;
    department: string;
    roleType: string;
    localtion: string;
    shortDesc: string;
    roleOverView: string[];
    responsibilities: string[];
    requirements: string[];
  }[];
  rolePage: {
    applyNowCta: string;
    overviewHeading: string;
    keyResponsibilitiesHeading: string;
    requirementsHeading: string;
  };
};
