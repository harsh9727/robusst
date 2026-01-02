"use client";

import React from "react";
import { SolutionsGridData } from "~/app/[locale]/(default)/solutions/data";
import { SolutionCard } from "../SolutionCard";

export const SolutionsGrid: React.FC = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 bg-[#e9e9e9] py-15 sm:py-20 md:py-25">
      <div className="container grid w-full gap-5 px-5 md:grid-cols-2 xl:grid-cols-3">
        {SolutionsGridData.map((data, index) => (
          <SolutionCard key={index} solutionData={data} />
        ))}
      </div>
    </div>
  );
};
