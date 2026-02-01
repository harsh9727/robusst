"use client";

import React from "react";
import Image from "next/image";
import { platform } from "public";
import { useTranslations } from "next-intl";
import type { PlatformsSection } from "~/i18n/types/platforms";

export const Banner: React.FC = () => {
  const t = useTranslations("platforms");
  const bannerSection = t.raw("banner") as PlatformsSection["banner"];
  return (
    <div className="bg-primary relative flex h-[calc(100vh+200px)] w-full flex-col items-center justify-center lg:flex-row">
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

          {/*<path
            d="M0,100 C300,70 400,70 600,100 C800,130 900,130 1200,100"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeDasharray="10 5"
          />*/}
        </svg>
      </div>
      <div className="bg-primary relative order-2 flex h-full w-full flex-col justify-center gap-2 overflow-hidden px-8 sm:px-12 lg:order-1 lg:min-w-[50%] lg:pl-25">
        <div className="bg-brand-one absolute top-full -right-40 h-20 w-50 -translate-y-1/2 rotate-6 animate-pulse blur-[250px] sm:h-120 lg:top-1/2 lg:-left-40" />
        <div className="bg-brand-one absolute -bottom-5 -left-12 h-20 w-120 animate-pulse blur-[120px]" />

        <h1 className="text-primary-foreground -mt-20 text-3xl font-medium lg:text-4xl xl:text-6xl">
          {bannerSection.heading}
        </h1>
        <p className="text-primary-foreground mt-2 text-lg">
          {bannerSection.subHeading}
        </p>
      </div>

      <div className="relative order-1 h-full w-full items-center justify-center overflow-hidden lg:order-2 lg:min-w-[50%]">
        <div className="bg-primary absolute -bottom-15 -left-4 z-10 h-20 w-[120vw] rotate-6 sm:h-30 lg:-top-9 lg:-left-28 lg:h-[120vh] lg:w-50 lg:rotate-12" />
        <div className="relative h-full w-full bg-black">
          {/*<Image
            src={platform.banner.src}
            alt="hero image"
            fill
            className="object-cover object-top"
          />*/}

          <video
            src="/pics/office_video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
};
