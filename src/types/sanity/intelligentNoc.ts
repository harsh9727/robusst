import type { IntelligentNocPageQueryResult } from "~/sanity/types";

export type SanityIntelligentNocPage =
  NonNullable<IntelligentNocPageQueryResult>["nocPage"];
export type SanityIntelligentNocSection<
  Key extends keyof SanityIntelligentNocPage,
> = SanityIntelligentNocPage[Key];
