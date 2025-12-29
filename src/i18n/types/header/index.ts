// Header Types
export type NavLink = {
  label: string;
  href: string;
};

export type HeaderSection = {
  logo: {
    alt: string;
  };
  navigation: {
    links: NavLink[];
  };
  cta: {
    primary: {
      label: string;
      href: string;
    };
    secondary: {
      label: string;
      href: string;
    };
  };
  mobile: {
    menuAriaLabel: string;
    sheetTitle: string;
  };
};
