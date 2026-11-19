import React from "react";
import { FadeIn } from "~/components/ui/FadeIn";
import { DialectExplorer } from "./DialectExplorer";
import { formatStatistic } from "./formatStatistic";
import { voiceDemoIcons } from "./icons";
import { SectionHeading } from "./SectionHeading";
import type { VoiceDemoData } from "./types";

interface CoverageProps {
  coverage: VoiceDemoData["coverage"];
  dialects: VoiceDemoData["dialects"];
  outcomes: VoiceDemoData["outcomes"];
}

export const Coverage: React.FC<CoverageProps> = ({
  coverage,
  dialects,
  outcomes,
}) => (
  <section
    aria-labelledby="voice-demo-coverage"
    className="bg-primary-foreground px-6 py-15 sm:px-12 md:py-20 xl:px-25"
  >
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-14">
      <FadeIn className="flex flex-col gap-5">
        <SectionHeading
          id="voice-demo-coverage"
          tone="light"
          eyebrow={coverage.eyebrow}
          title={coverage.title}
          titleHighlight={coverage.titleHighlight}
        />
        <p className="max-w-3xl text-lg text-neutral-600">
          {coverage.description}
        </p>
      </FadeIn>

      <dl className="grid gap-4 sm:grid-cols-3">
        {(coverage.statistics ?? []).map((statistic) => (
          <div
            key={statistic.label}
            className="shadow-brand-one flex flex-col-reverse gap-2 rounded-xl border border-neutral-200 p-6 shadow-[0px_0px_0px] duration-150 hover:shadow-[0px_0px_10px]"
          >
            <dt className="text-neutral-600">{statistic.label}</dt>
            <dd className="text-brand-one text-4xl font-extrabold md:text-5xl">
              {formatStatistic(statistic)}
            </dd>
          </div>
        ))}
      </dl>

      <DialectExplorer dialects={dialects} />

      <ul className="grid gap-4 md:grid-cols-3">
        {(outcomes ?? []).map((outcome, index) => {
          const Icon = outcome.icon ? voiceDemoIcons[outcome.icon] : undefined;
          return (
            <li key={outcome.title}>
              <FadeIn delay={index * 0.1} className="h-full">
                <div className="shadow-brand-three h-full rounded-xl border border-neutral-200 p-6 shadow-[0px_0px_0px] duration-150 hover:shadow-[0px_0px_10px]">
                  {Icon && (
                    <Icon
                      aria-hidden="true"
                      className="text-brand-three size-7"
                    />
                  )}
                  <h3 className="mt-4 text-xl font-semibold text-black">
                    {outcome.title}
                  </h3>
                  <p className="mt-2 text-neutral-600">{outcome.description}</p>
                </div>
              </FadeIn>
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);
