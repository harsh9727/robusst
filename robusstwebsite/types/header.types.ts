export type Header_JsonType = {
  header: {
    cta: {
      primary: {
        href: string;
        label: string;
      };
      secondary: {
        href: string;
        label: string;
      };
    };
    logo: {
      alt: string;
    };
    mobile: {
      sheetTitle: string;
      menuAriaLabel: string;
    };
    navigation: {
      links: Array<{
        href: string;
        label: string;
      }>;
    };
  };
};