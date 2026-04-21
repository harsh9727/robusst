import React from "react";
import { SolutionCard } from "../SolutionCard";
import { getCmsContent } from "~/lib/cms/client";
import type { Home_JsonType } from "~/types/api";

export const SolutionGrid: React.FC<{ locale: string }> = async ({
  locale,
}) => {
  const solutionsSection = await getCmsContent<Home_JsonType>("home", locale);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 bg-white py-15 sm:py-20 md:py-25">
      <div className="container grid w-full gap-5 px-5 md:grid-cols-2 xl:grid-cols-3">
        {solutionsSection?.solutions.items.map((solution, index) => (
          <SolutionCard key={index} solutionData={solution} />
        ))}
      </div>
    </div>
  );
};
