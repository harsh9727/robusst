import type { CybersecurityPageQueryResult } from "~/sanity/types";

export type SanityCybersecurityPage =
  NonNullable<CybersecurityPageQueryResult>["cybersecurityPage"];
export type SanityCybersecuritySection<
  Key extends keyof SanityCybersecurityPage,
> = SanityCybersecurityPage[Key];
export type SanityCybersecurityModule = NonNullable<
  SanityCybersecuritySection<"solutionModules">["modules"]
>[number];
