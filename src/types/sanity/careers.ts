import type {
  CareerJobQueryResult,
  CareersPageQueryResult,
} from "~/sanity/types";

export type SanityCareersData = NonNullable<
  NonNullable<CareersPageQueryResult>["careers"]
>;

export type SanityCareerJob = NonNullable<
  NonNullable<CareerJobQueryResult>["job"]
>;

export type SanityCareerRolePage = NonNullable<
  NonNullable<CareerJobQueryResult>["rolePage"]
>;
