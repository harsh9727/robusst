export type Careers_JsonType = {
  careers: {
    banner: {
      body: string;
      heading: string;
      primaryCta: string;
      secondaryCta: string;
    };
    values: {
      cards: Array<{
        desc: string;
        title: string;
      }>;
      heading: string;
    };
    contact: {
      emailUs: string;
      heading: string;
      followUs: string;
      whatsapp: string;
      description: string;
      questionsPrompt: string;
      latestJobOpenings: string;
      recruitmentSupport: string;
    };
    rolePage: {
      applyNowCta: string;
      overviewHeading: string;
      requirementsHeading: string;
      keyResponsibilitiesHeading: string;
    };
    riseWithUs: {
      cards: Array<{
        title: string;
        description: string;
      }>;
      heading: string;
    };
    jobOpenings: Array<{
      id: string;
      roleType: string;
      localtion: string;
      shortDesc: string;
      department: string;
      requirements: string[];
      roleOverView: string[];
      positionTitle: string;
      responsibilities: string[];
    }>;
    whatWeOffer: {
      heading: string;
      sections: Array<{
        title: string;
        description: string;
      }>;
    };
    lifeAtRobusst: {
      heading: string;
    };
    readyToJoinUs: {
      bodyOne: string;
      bodyTwo: string;
      heading: string;
    };
    currentOpenings: {
      heading: string;
      viewJobCta: string;
      applyNowCta: string;
    };
    ourHiringProcess: {
      body: string;
      heading: string;
    };
    weMakeDifference: {
      bodyOne: string;
      bodyTwo: string;
      heading: string;
    };
    employeesTestimonials: {
      heading: string;
      testimonials: Array<{
        name: string;
        message: string;
        designation: string;
      }>;
    };
  };
};
