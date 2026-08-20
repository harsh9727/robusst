import type { CustomizedSolutionsPageQueryResult } from "~/sanity/types";

export type SanityCustomizedSolutionsPage =
  NonNullable<CustomizedSolutionsPageQueryResult>["customizedSolutionsPage"];
export type SanityCustomizedSolutionsSection<
  Key extends keyof SanityCustomizedSolutionsPage,
> = SanityCustomizedSolutionsPage[Key];
