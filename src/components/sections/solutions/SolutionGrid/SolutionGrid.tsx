"use client";

import React from "react";
import { SolutionCard } from "../SolutionCard";
import { useTranslations } from "next-intl";
import type {
  SuccessStoriesDataType,
  SuccessStoryPageSection,
} from "~/i18n/types/successStory";
import { solutions, successStories } from "public";
import type {
  SolutionsSection,
  SuccessStoriesSection,
} from "~/i18n/types/home";

const SolutionsImage = [
  solutions.antispam.src,
  solutions.cdp.src,
  solutions.cyberSecurity.src,
  solutions.networkMonitorization.src,
  solutions.customizedSolution.src,
  solutions.salesData.src,
  solutions.voice.src,
];

export const SolutionGrid: React.FC = () => {
  const t = useTranslations();
  const solutionsSection = t.raw("solutions") as SolutionsSection;

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 bg-white py-15 sm:py-20 md:py-25">
      <div className="container grid w-full gap-5 px-5 md:grid-cols-2 xl:grid-cols-3">
        {solutionsSection.items.map((solution, index) => (
          <SolutionCard
            key={index}
            image={SolutionsImage[index] ?? ""}
            solutionData={solution}
          />
        ))}
      </div>
    </div>
  );
};
