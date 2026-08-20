import type { PocWaitlistPageQueryResult } from "~/sanity/types";

export type SanityPocWaitlistData = NonNullable<
  NonNullable<PocWaitlistPageQueryResult>["pocWaitlist"]
>;
