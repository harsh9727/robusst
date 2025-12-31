"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { platform } from "public";
import type { PlatformsSection } from "~/i18n/types/platforms";
import { useTranslations } from "next-intl";

export const Cpm: React.FC = () => {
  const t = useTranslations("platforms");
  const cpmSection = t.raw("cpm") as PlatformsSection["cpm"];
  const commonSection = t.raw("common") as PlatformsSection["common"];

  return (
    <section className="bg-primary relative overflow-hidden px-6 py-20 sm:px-12 xl:px-25">
      <div className="bg-brand-two absolute -top-60 -right-20 h-40 w-100 rotate-6 blur-[200px] sm:h-50 sm:w-180" />
      <div className="bg-brand-two absolute -bottom-30 left-1/2 size-40 -translate-x-1/2 rounded-full blur-[140px] sm:size-50" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-2">
        {/* Image */}
        <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-xl">
          <Image
            src={platform.cmp}
            alt="Cpm"
            className="h-full w-full object-cover"
          />
        </div>
        {/* Content */}
        <div>
          <h3 className="mb-5 text-4xl leading-tight font-bold text-white">
            {cpmSection.heading}
          </h3>

          <p className="text-md mb-5 w-[90%] leading-relaxed text-gray-300">
            {cpmSection.subHeading}
          </p>

          <h4 className="mb-3 text-lg font-bold text-pink-600">
            {commonSection.keyModules}:
          </h4>

          <ul className="mb-5 space-y-1 text-white">
            {cpmSection.keyModules.map((item, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-pink-600" />
                {item}
              </li>
            ))}
          </ul>

          <h4 className="mb-3 text-lg font-bold text-pink-600">
            {commonSection.clientBenefits}:
          </h4>

          <ul className="mt-4 space-y-1 text-white">
            {cpmSection.clientBenefits.map((item, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-pink-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
