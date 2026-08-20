import type {
  BlogIndexPageQueryResult,
  BlogPostQueryResult,
} from "~/sanity/types";

export type SanityBlogIndexPage = NonNullable<BlogIndexPageQueryResult>;
export type SanityBlogCard = NonNullable<SanityBlogIndexPage["posts"]>[number];
export type SanityBlogPost = NonNullable<BlogPostQueryResult>;
