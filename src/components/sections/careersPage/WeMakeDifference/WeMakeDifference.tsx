"use client";

import { useTranslations } from "next-intl";
import React from "react";
import type { CareersSection } from "~/i18n/types/careers";

export const WeMakeDifference: React.FC = () => {
  const t = useTranslations("careers");
  const weMakeDifferenceSection = t.raw(
    "weMakeDifference",
  ) as CareersSection["weMakeDifference"];

  return (
    <section className="bg-primary relative overflow-hidden px-6 py-15 sm:px-12 md:py-20 xl:px-25">
      <div className="bg-brand-one absolute -top-60 -right-20 h-40 w-100 rotate-6 blur-[200px] sm:h-50 sm:w-180" />
      <div className="bg-brand-one absolute -bottom-30 left-1/2 size-40 -translate-x-1/2 rounded-full blur-[140px] sm:size-50" />
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-start gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex h-full w-full max-w-md overflow-hidden rounded-xl bg-linear-to-r from-pink-50 to-purple-50">
          {/*<Image
            src={platform.cmp}
            alt="Cpm"
            className="h-full w-full object-cover"
          />*/}

          <div className="h-80 w-full bg-pink-200" />
        </div>
        {/* Content */}
        <div className="h-full w-full">
          <h3 className="mb-5 text-2xl leading-tight font-bold text-white sm:text-3xl md:text-4xl">
            {weMakeDifferenceSection.heading}
          </h3>

          <p className="text-md mb-5 w-[90%] leading-relaxed text-gray-300">
            {weMakeDifferenceSection.bodyOne}
          </p>

          <p className="text-md mb-5 w-[90%] leading-relaxed text-gray-300">
            {weMakeDifferenceSection.bodyTwo}
          </p>
        </div>
      </div>
    </section>
  );
};
