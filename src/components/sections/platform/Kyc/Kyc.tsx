"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { platform } from "public";
import type { PlatformsSection } from "~/i18n/types/platforms";
import { useTranslations } from "next-intl";

export const Kyc: React.FC = () => {
  const t = useTranslations("platforms");
  const kycSection = t.raw("kyc") as PlatformsSection["kyc"];
  const commonSection = t.raw("common") as PlatformsSection["common"];

  return (
    <section className="bg-primary relative overflow-hidden px-6 py-15 sm:px-12 md:py-20 xl:px-25">
      <div className="bg-brand-one blur-50 absolute -top-60 -right-20 h-40 w-100 rotate-6 sm:h-50 sm:w-180" />
      <div className="bg-brand-one blur-35 absolute -bottom-30 left-1/2 size-40 -translate-x-1/2 rounded-full sm:size-50" />
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-start gap-10 lg:flex-row lg:items-center lg:justify-between">
        {/* Image */}
        <div className="flex h-full w-full max-w-md overflow-hidden rounded-xl bg-linear-to-r from-pink-50 to-purple-50">
          <Image
            src={platform.kyc}
            alt="Cpm"
            className="h-full w-full object-cover"
          />
        </div>
        {/* Content */}
        <div>
          <h3 className="mb-5 text-2xl leading-tight font-bold text-white sm:text-3xl md:text-4xl">
            {kycSection.heading}
          </h3>

          <p className="text-md mb-5 w-[90%] leading-relaxed text-gray-300">
            {kycSection.subHeading}
          </p>

          <h4 className="mb-3 text-lg font-bold text-pink-600">
            {commonSection.keyModules}:
          </h4>

          <ul className="mb-5 space-y-1 text-white">
            {kycSection.keyModules.map((item, index) => (
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
            {kycSection.clientBenefits.map((item, index) => (
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
