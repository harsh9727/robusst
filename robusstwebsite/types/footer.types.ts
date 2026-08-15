export type Footer_JsonType = {
  footer: {
    cta: {
      heading: string;
      buttonText: string;
      subheading: string;
    };
    legal: {
      links: Array<{
        href: string;
        label: string;
      }>;
      copyright: string;
    };
    social: {
      links: Array<{
        href: string;
        platform: string;
        ariaLabel: string;
      }>;
      heading: string;
    };
    branding: {
      tagline: string;
      companyName: string;
    };
    linkCategories: Array<{
      links: Array<{
        href: string;
        label: string;
      }>;
      category: string;
    }>;
  };
};