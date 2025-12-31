"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { platform } from "public";
import { useTranslations } from "next-intl";
import type { PlatformsSection } from "~/i18n/types/platforms";

export const Noc: React.FC = () => {
  const t = useTranslations("platforms");
  const nocSection = t.raw("noc") as PlatformsSection["noc"];
  const commonSection = t.raw("common") as PlatformsSection["common"];

  return (
    <section className="px-6 py-20 sm:px-12 xl:px-25">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-2">
        {/* Content */}
        <div>
          <h3 className="mb-5 text-4xl leading-tight font-bold text-black">
            {nocSection.heading}
          </h3>

          <p className="text-md mb-5 w-[90%] leading-relaxed text-gray-600">
            {nocSection.subHeading}
          </p>

          <h4 className="mb-3 text-lg font-bold text-pink-600">
            {commonSection.keyModules}:
          </h4>

          <ul className="mb-5 space-y-1 text-black">
            {nocSection.keyModules.map((item, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-pink-600" />
                {item}
              </li>
            ))}
          </ul>

          <h4 className="mb-3 text-lg font-bold text-pink-600">
            {commonSection.clientBenefits}:
          </h4>

          <ul className="mt-4 space-y-1 text-black">
            {nocSection.clientBenefits.map((item, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-pink-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-pink-50 to-purple-50">
          <Image
            src={platform.noc}
            alt="Noc"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};
