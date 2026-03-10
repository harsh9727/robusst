"use client";

import React from "react";
import Image from "next/image";
import { platform } from "public";
import { CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import type { PlatformsSection } from "~/i18n/types/platforms";

export const Cdp: React.FC = () => {
  const t = useTranslations("platforms");
  const cdpSection = t.raw("cdp") as PlatformsSection["cdp"];
  const commonSection = t.raw("common") as PlatformsSection["common"];

  return (
    <section className="bg-primary-foreground px-6 py-15 sm:px-12 md:py-20 xl:px-25">
      <div className="mx-auto flex w-full max-w-7xl flex-col-reverse items-start justify-start gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="mb-5 text-2xl leading-tight font-bold text-black sm:text-3xl md:text-4xl">
            {cdpSection.heading}
          </h3>

          <p className="text-md mb-5 w-[90%] leading-relaxed text-gray-600">
            {cdpSection.subHeading}
          </p>

          <h4 className="mb-3 text-lg font-bold text-pink-600">
            {commonSection.keyModules}:
          </h4>

          <ul className="mb-5 space-y-1 text-black">
            {cdpSection.keyModules.map((item, index) => (
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
            {cdpSection.clientBenefits.map((item, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-pink-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Image */}
        <div className="flex h-full w-full max-w-md overflow-hidden shadow-[0px_0px_0px] duration-150 shadow-brand-one hover:shadow-[0px_0px_30px] rounded-xl bg-linear-to-r from-pink-50 to-purple-50">
          <Image
            src={platform.cdp1}
            alt="Cdp"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};
