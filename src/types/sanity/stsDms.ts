import type { StsDmsPageQueryResult } from "~/sanity/types";

export type SanityStsDmsPage = NonNullable<StsDmsPageQueryResult>["stsDmsPage"];
export type SanityStsDmsSection<Key extends keyof SanityStsDmsPage> =
  SanityStsDmsPage[Key];
export type SanityStsDmsSolution = NonNullable<
  SanityStsDmsSection<"solutionGrid">["solutions"]
>[number];
