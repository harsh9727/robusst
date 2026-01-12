"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { successStoriesBanner } from "public";
import React from "react";
import type { SuccessStoryPageSection } from "~/i18n/types/successStory";

export const Banner: React.FC = () => {
  const t = useTranslations();
  const mainStoryPage = t.raw(
    "mainStoryPage",
  ) as SuccessStoryPageSection["mainStoryPage"];

  return (
    <div className="bg-primary flex h-screen w-full flex-col items-center justify-center lg:flex-row">
      <div className="bg-primary relative order-2 flex h-full w-full flex-col justify-center gap-2 overflow-hidden px-8 sm:px-12 lg:order-1 lg:min-w-[50%] lg:pl-25">
        <div className="bg-brand-one absolute top-full -right-40 h-20 w-50 -translate-y-1/2 rotate-6 animate-pulse blur-[250px] sm:h-120 lg:top-1/2 lg:-left-40" />
        <div className="bg-brand-one absolute -bottom-5 -left-12 h-20 w-120 animate-pulse blur-[120px]" />

        <h1 className="text-primary-foreground text-3xl font-medium lg:text-4xl xl:text-6xl">
          {mainStoryPage.banner.heading}
        </h1>
        <p className="text-primary-foreground mt-2 text-lg">
          {mainStoryPage.banner.subheading}
        </p>
      </div>

      <div className="relative order-1 h-full w-full items-center justify-center overflow-hidden lg:order-2 lg:min-w-[50%]">
        <div className="bg-primary absolute -bottom-15 -left-4 z-10 h-20 w-[120vw] rotate-6 sm:h-30 lg:-top-9 lg:-left-28 lg:h-[120vh] lg:w-50 lg:rotate-12" />
        <div className="relative h-full w-full bg-black">
          <Image
            src={successStoriesBanner.src}
            alt="hero image"
            fill
            className="object-cover object-top"
            unoptimized
          />

          {/*<div className="bg-primary/50 h-full w-full"></div>*/}
        </div>
      </div>
    </div>
  );
};
