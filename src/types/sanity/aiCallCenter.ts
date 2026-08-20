import type { AiCallCenterPageQueryResult } from "~/sanity/types";

export type SanityAiCallPageData = NonNullable<
  NonNullable<AiCallCenterPageQueryResult>["aiCallPage"]
>;

export type SanityAiCallSection<Key extends keyof SanityAiCallPageData> =
  NonNullable<SanityAiCallPageData[Key]>;
