export type PlatformsSection = {
  banner: {
    heading: string;
    subHeading: string;
  };
  common: {
    keyModules: string;
    clientBenefits: string;
  };
  cdp: {
    heading: string;
    subHeading: string;
    keyModules: string[];
    clientBenefits: string[];
  };
  cpm: {
    heading: string;
    subHeading: string;
    keyModules: string[];
    clientBenefits: string[];
  };
  noc: {
    heading: string;
    subHeading: string;
    keyModules: string[];
    clientBenefits: string[];
  };
  kyc: {
    heading: string;
    subHeading: string;
    keyModules: string[];
    clientBenefits: string[];
  };
  whychoose: {
    heading: string;
    benefits: {
      title: string;
      description: string;
    }[];
  };
};
