export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  domain: string;
  ogImage: {
    url: string;
    width: number;
    height: number;
  };
  twitterHandle: string;
  links: {
    twitter: string;
  };
};

export interface Author {
  name: string;
  picture: string;
}

export interface Blog {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  author: Author;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
  metaTitle?: string;
  metaDescription?: string;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
}
