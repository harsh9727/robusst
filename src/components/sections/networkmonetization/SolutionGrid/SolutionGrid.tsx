"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import type { SolutionGridSection } from "~/i18n/types/networkMonetization";

export const Network_Solution_Grid = () => {
  const t = useTranslations();
  const section = t.raw(
    "network_monetization_page.solutionGrid",
  ) as SolutionGridSection;

  return (
    <>
      <div className="bg-black pt-16">
        <div className="container mx-auto flex flex-col items-center gap-10 p-5">
          {section.solutions.map((solution, index) => (
            <div
              key={index}
              className="flex w-full max-w-5xl flex-col gap-6 rounded-lg border border-white/30 p-5 lg:flex-row lg:items-center"
            >
              {/* Image placeholder */}
              <div className="relative h-120 min-w-70 overflow-hidden rounded sm:h-150 lg:h-100">
                <Image src={solution.image} alt={solution.title} fill />
              </div>

              {/* Content */}
              <div>
                <h2 className="text-brand-one text-3xl font-semibold">
                  {solution.title}
                </h2>

                {solution.subtitle && (
                  <p className="mt-1 text-white">{solution.subtitle}</p>
                )}

                {/* Features */}
                {solution.features.length > 0 && (
                  <>
                    <p className="mt-5 font-semibold text-white">Features</p>

                    <ul className="mt-1 list-disc space-y-1 pl-5 text-white">
                      {solution.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </>
                )}

                {/* Business Impact */}
                {solution.businessImpact.length > 0 && (
                  <>
                    <p className="mt-5 font-semibold text-white">
                      Business Impact
                    </p>

                    <ul className="mt-1 list-disc space-y-1 pl-5 text-white">
                      {solution.businessImpact.map((impact, i) => (
                        <li key={i}>{impact}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/*<div className="w-full overflow-hidden bg-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 150"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 C300,150 400,150 600,120 C800,90 900,90 1200,120 L1200,0 L0,0 Z"
            fill="#000000"
            stroke="none"
          />
        </svg>
      </div>*/}
    </>
  );
};
