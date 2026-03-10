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
    <section className="bg-primary-foreground px-6 py-15 sm:px-12 md:py-20 xl:px-25">
      <div className="mx-auto flex w-full max-w-7xl flex-col-reverse items-start justify-start gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="mb-5 text-2xl leading-tight font-bold text-black sm:text-3xl md:text-4xl">
            {nocSection.heading}
          </h3>

          <p className="text-md mb-5 w-[90%] leading-relaxed text-gray-600">
            {nocSection.subHeading}
          </p>

          <h4 className="mb-3 text-lg font-bold text-brand-one">
            {commonSection.keyModules}:
          </h4>

          <ul className="mb-5 space-y-1 text-black">
            {nocSection.keyModules.map((item, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-brand-one" />
                {item}
              </li>
            ))}
          </ul>

          <h4 className="mb-3 text-lg font-bold text-brand-one">
            {commonSection.clientBenefits}:
          </h4>

          <ul className="mt-4 space-y-1 text-black">
            {nocSection.clientBenefits.map((item, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-brand-one" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Image */}
        <div className="flex h-full shadow-[0px_0px_0px] duration-150 hover:shadow-[0px_0px_30px] shadow-brand-one w-full max-w-md overflow-hidden rounded-xl bg-linear-to-r from-brand-one to-purple-50">
          <Image
            src={platform.noc}
            alt="Cdp"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};
