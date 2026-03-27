"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import type { CareersSection } from "~/i18n/types/careers";

export const WeMakeDifference: React.FC = () => {
  const t = useTranslations("careers");
  const weMakeDifferenceSection = t.raw(
    "weMakeDifference",
  ) as CareersSection["weMakeDifference"];

  return (
    <>
      <div className="w-full overflow-hidden bg-white sm:-mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 150">
          <path
            d="M0,80 C300,50 400,50 600,80 C800,110 900,110 1200,80 L1200,200 L0,200 Z"
            fill="#000000"
          />
        </svg>
      </div>

      <section className="bg-primary relative overflow-hidden px-6 py-15 sm:px-12 md:py-20 xl:px-25">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-start gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex h-full w-full max-w-md overflow-hidden rounded-xl bg-linear-to-r from-pink-50 to-purple-50">
            <Image
              src="/career/1.webp"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
              alt="Cpm"
              className="h-full w-full object-cover"
            />

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
      <div className="w-full overflow-hidden bg-white sm:-mt-5">
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
      </div>
    </>
  );
};
