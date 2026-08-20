import type { HomePageQueryResult } from "~/sanity/types";

export type SanityHomePage = NonNullable<HomePageQueryResult>;
export type SanityHomeSection<Key extends keyof SanityHomePage> = NonNullable<
  SanityHomePage[Key]
>;
