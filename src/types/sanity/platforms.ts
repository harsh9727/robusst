import type { PlatformsPageQueryResult } from "~/sanity/types";

export type SanityPlatformsData = NonNullable<
  NonNullable<PlatformsPageQueryResult>["platforms"]
>;
