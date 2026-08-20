import React from "react";
import { SolutionCard } from "../SolutionCard";
import type { SanitySolutionsPageData } from "~/types/sanity/solutions";

interface SolutionGridProps {
  solutions: SanitySolutionsPageData["solutions"];
}

export const SolutionGrid: React.FC<SolutionGridProps> = ({ solutions }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 bg-white py-15 sm:py-20 md:py-25">
      <div className="container grid w-full gap-5 px-5 md:grid-cols-2 xl:grid-cols-3">
        {(solutions ?? []).map((solution) => (
          <SolutionCard key={solution.slug} solutionData={solution} />
        ))}
      </div>
    </div>
  );
};
