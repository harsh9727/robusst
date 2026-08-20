import type { NetworkMonetizationPageQueryResult } from "~/sanity/types";

export type SanityNetworkMonetizationPage =
  NonNullable<NetworkMonetizationPageQueryResult>["networkMonetizationPage"];
export type SanityNetworkMonetizationSection<
  Key extends keyof SanityNetworkMonetizationPage,
> = SanityNetworkMonetizationPage[Key];
export type SanityNetworkUseCase = NonNullable<
  SanityNetworkMonetizationSection<"useCaseGrid">["solutions"]
>[number];
