import type { CustomerDataPlatformPageQueryResult } from "~/sanity/types";

export type SanityCustomerDataPlatformData = NonNullable<
  NonNullable<CustomerDataPlatformPageQueryResult>["cdpPage"]
>;

export type SanityCustomerDataPlatformSection<
  Key extends keyof SanityCustomerDataPlatformData,
> = NonNullable<SanityCustomerDataPlatformData[Key]>;
