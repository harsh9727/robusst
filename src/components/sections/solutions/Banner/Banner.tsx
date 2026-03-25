"use client";

import { useTranslations } from "next-intl";
import React from "react";
import type { BannerSection } from "~/i18n/types/solutionsPage";

export const Banner: React.FC = () => {
  const t = useTranslations();
  const banner = t.raw("solutions_page.banner") as BannerSection;

  return (
    <div className="bg-primary relative flex h-[calc(100vh+200px)] w-full flex-col items-center">
      <div className="absolute bottom-0 left-0 z-20 w-full overflow-hidden bg-transparent sm:-mb-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 150"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 C300,50 400,50 600,80 C800,110 900,110 1200,80 L1200,200 L0,200 Z"
            fill="#ffffff"
            stroke="none"
          />
        </svg>
      </div>
      <div className="text-primary-foreground relative z-20 mt-60 flex w-full max-w-3xl flex-col items-center justify-center py-12 text-center">
        <h1 className="text-3xl font-bold lg:text-4xl xl:text-6xl">
          {banner.title}
        </h1>
        <p className="mt-2 text-lg">{banner.subtitle}</p>
      </div>

      <video
        src={banner.video}
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-10 h-full w-full object-cover object-top opacity-40"
      />
    </div>
  );
};
