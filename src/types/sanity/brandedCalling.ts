import type { BrandedCallingPageQueryResult } from "~/sanity/types";

export type SanityBrandedCallingData = NonNullable<
  NonNullable<BrandedCallingPageQueryResult>["brandPage"]
>;

export type SanityBrandedCallingSection<
  Key extends keyof SanityBrandedCallingData,
> = NonNullable<SanityBrandedCallingData[Key]>;
