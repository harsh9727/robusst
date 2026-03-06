export type PartnershipSection = {
  banner: {
    heading: string;
    description: string;
  };
  driving: {
    heading: string;
    paragraphs: string[];
    buttonText: string;
  };
  vision: {
    heading: string;
    items: string[];
    mission: {
      heading: string;
      paragraphs: string[];
    };
  };
  purpose: {
    heading: string;
    headingHighlight: string;
    subtitle: string;
    paragraphs: string[];
    buttonText: string;
    secondSection: {
      subtitle: string;
      coreValuesHeading: string;
      coreValues: {
        title: string;
        description: string;
      }[];
    };
  };
  define: {
    heading: string;
    subtitle: string;
    description: string;
    values: {
      title: string;
      description: string;
    }[];
  };
  team: {
    heading: string;
    members: {
      name: string;
      role: string;
    }[];
  };
  challenges: {
    heading: string;
    headingHighlight: string;
    items: string[];
  };
  future: {
    heading: string;
    subtitle: string;
    paragraphs: string[];
    callToAction: string;
    buttons: {
      careers: string;
      contact: string;
    };
  };
  partner: {
    heading: string;
    cards: {
      title: string;
      description: string;
      buttonText: string;
    }[];
  };
  formSection: {
    heading: string;
    subtitle: string;
    form: {
      nameLabel: string;
      jobTitleLabel: string;
      emailLabel: string;
      phoneLabel: string;
      companyNameLabel: string;
      websiteLabel: string;
      privacyText: string;
      submitButton: string;
    };
  };
};
