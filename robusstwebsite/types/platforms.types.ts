export type Platforms_JsonType = {
  platforms: {
    cdp: {
      heading: string;
      keyModules: string[];
      subHeading: string;
      clientBenefits: string[];
    };
    cpm: {
      heading: string;
      keyModules: string[];
      subHeading: string;
      clientBenefits: string[];
    };
    kyc: {
      heading: string;
      keyModules: string[];
      subHeading: string;
      clientBenefits: string[];
    };
    noc: {
      heading: string;
      keyModules: string[];
      subHeading: string;
      clientBenefits: string[];
    };
    banner: {
      heading: string;
      subHeading: string;
    };
    common: {
      keyModules: string;
      clientBenefits: string;
    };
    whychoose: {
      heading: string;
      benefits: Array<{
        title: string;
        description: string;
      }>;
    };
  };
};