export interface SubMenuItem {
  label: string;
  href: string;
}

export interface NavigationLink {
  label: string;
  href?: string;
  subMenu?: SubMenuItem[];
}

export interface HeaderSection {
  logo: {
    alt: string;
  };
  navigation: {
    links: NavigationLink[];
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
}
