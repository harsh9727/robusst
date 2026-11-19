import type { VoiceDemoPageQueryResult } from "~/sanity/types";

export type VoiceDemoData = NonNullable<VoiceDemoPageQueryResult>;
export type VoiceDemoStatistic = NonNullable<
  VoiceDemoData["coverage"]["statistics"]
>[number];
