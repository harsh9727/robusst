import type { StoriesPageQueryResult } from "~/sanity/types";

export type SanityStoriesPage =
  NonNullable<StoriesPageQueryResult>["storiesPage"];
export type SanitySuccessStory = NonNullable<
  NonNullable<StoriesPageQueryResult>["stories"]
>[number];
