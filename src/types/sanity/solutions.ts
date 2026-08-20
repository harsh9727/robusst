import type { SolutionsPageQueryResult } from "~/sanity/types";

export type SanitySolutionsPageData = NonNullable<
  NonNullable<SolutionsPageQueryResult>["solutionsPage"]
>;

export type SanitySolutionCardData = NonNullable<
  SanitySolutionsPageData["solutions"]
>[number];
