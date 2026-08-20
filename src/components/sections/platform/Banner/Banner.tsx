"use client";

import React from "react";
import type { SanityPlatformsData } from "~/types/sanity/platforms";

interface BannerProps {
  data: SanityPlatformsData;
}

export const Banner: React.FC<BannerProps> = ({ data }) => {
  const bannerSection = data?.banner;
  if (!bannerSection?.videoUrl) return null;
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
          {bannerSection.heading}
        </h1>
        <p className="mt-2 text-lg">{bannerSection.subHeading}</p>
      </div>

      <video
        src={bannerSection.videoUrl}
        autoPlay
        loop
        muted
        playsInline
        aria-label={bannerSection.videoTitle ?? undefined}
        className="absolute z-10 h-full w-full object-cover object-top opacity-40"
      />
    </div>
  );
};
