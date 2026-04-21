export type Partnership_JsonType = {
  partnership: {
    team: {
      heading: string;
      members: Array<{ name: string; role: string }>;
    };
    banner: {
      heading: string;
      description: string;
    };
    define: {
      values: Array<{ title: string; description: string }>;
      heading: string;
      subtitle: string;
      description: string;
    };
    future: {
      buttons: { careers: string; contact: string };
      heading: string;
      subtitle: string;
      paragraphs: string[];
      callToAction: string;
    };
    vision: {
      items: string[];
      heading: string;
      mission: { heading: string; paragraphs: string[] };
    };
    driving: {
      heading: string;
      buttonText: string;
      paragraphs: string[];
    };
    partner: {
      cards: Array<{ title: string; buttonText: string; description: string }>;
      heading: string;
    };
    purpose: {
      heading: string;
      subtitle: string;
      buttonText: string;
      paragraphs: string[];
      secondSection: {
        subtitle: string;
        coreValues: Array<{ title: string; description: string }>;
        coreValuesHeading: string;
      };
      headingHighlight: string;
    };
    challenges: {
      items: string[];
      heading: string;
      headingHighlight: string;
    };
    formSection: {
      form: {
        nameLabel: string;
        emailLabel: string;
        phoneLabel: string;
        privacyText: string;
        submitButton: string;
        websiteLabel: string;
        jobTitleLabel: string;
        companyNameLabel: string;
        partnerTypeLabel: string;
      };
      heading: string;
      subtitle: string;
    };
  };
};
