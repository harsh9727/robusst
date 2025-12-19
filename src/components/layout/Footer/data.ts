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
        label: "Link Here",
        href: "/",
      },
      {
        label: "Link Here",
        href: "/",
      },
      {
        label: "Link Here",
        href: "/",
      },
    ],
  },
  {
    category: "Our Services",
    links: [
      {
        label: "Link Here",
        href: "/",
      },
      {
        label: "Link Here",
        href: "/",
      },
      {
        label: "Link Here",
        href: "/",
      },
    ],
  },
];
