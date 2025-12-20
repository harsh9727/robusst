interface FooterLinksProps {
  category: string;
  links: {
    label: string;
    href: string;
  }[];
}

export const footerLinksData: FooterLinksProps[] = [
  {
    category: "Quick Links",
    links: [
      {
        label: "Home",
        href: "/",
      },
      {
        label: "About Us",
        href: "/",
      },
      {
        label: "Platforms",
        href: "/",
      },
      {
        label: "Telecom AI Solutions",
        href: "/",
      },
      {
        label: "Success Stories",
        href: "/",
      },
      {
        label: "Languages",
        href: "/",
      },
      {
        label: "Contact Us",
        href: "/",
      },
    ],
  },
  {
    category: "Our Solution",
    links: [
      {
        label: "Branded Calling & Anti-SPAM",
        href: "/",
      },
      {
        label: "Customer Data Platform (CDP)",
        href: "/",
      },
      {
        label: "Cyber Security",
        href: "/",
      },
      {
        label: "Network Monetization",
        href: "/",
      },
      {
        label: "Customized Solutions",
        href: "/",
      },
      {
        label: "Sales Tracking & Distributor Management",
        href: "/",
      },
      {
        label: "VoiceSync Enterprise",
        href: "/",
      },
    ],
  },
];
