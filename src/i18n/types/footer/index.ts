// Footer Types
export type FooterLink = {
  label: string;
  href: string;
};

export type FooterLinksCategory = {
  category: string;
  links: FooterLink[];
};

export type SocialLink = {
  platform: string;
  href: string;
  ariaLabel: string;
};

export type FooterSection = {
  cta: {
    heading: string;
    subheading: string;
    buttonText: string;
  };
  branding: {
    companyName: string;
    tagline: string;
  };
  linkCategories: FooterLinksCategory[];
  social: {
    heading: string;
    links: SocialLink[];
  };
  legal: {
    copyright: string;
    links: FooterLink[];
  };
};
