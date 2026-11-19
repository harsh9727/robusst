import type { VoiceDemoStatistic } from "./types";

export function formatStatistic(statistic: VoiceDemoStatistic) {
  return `${statistic.prefix ?? ""}${statistic.value}${statistic.suffix ?? ""}`;
}
