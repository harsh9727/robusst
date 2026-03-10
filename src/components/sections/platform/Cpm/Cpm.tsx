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
          {/* Image */}
          <div className="flex h-full w-full shadow-[0px_0px_0px] duration-150 hover:shadow-[0px_0px_30px] shadow-brand-three max-w-md overflow-hidden rounded-xl bg-linear-to-r from-brand-one to-purple-50">
            <Image
              src={platform.cmp}
              alt="Cpm"
              className="h-full w-full object-cover"
            />
          </div>
          {/* Content */}
          <div>
            <h3 className="mb-5 text-2xl leading-tight font-bold text-white sm:text-3xl md:text-4xl">
              {cpmSection.heading}
            </h3>

            <p className="text-md mb-5 w-[90%] leading-relaxed text-gray-300">
              {cpmSection.subHeading}
            </p>

            <h4 className="mb-3 text-lg font-bold text-brand-one">
              {commonSection.keyModules}:
            </h4>

            <ul className="mb-5 space-y-1 text-white">
              {cpmSection.keyModules.map((item, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-brand-one" />
                  {item}
                </li>
              ))}
            </ul>

            <h4 className="mb-3 text-lg font-bold text-brand-one">
              {commonSection.clientBenefits}:
            </h4>

            <ul className="mt-4 space-y-1 text-white">
              {cpmSection.clientBenefits.map((item, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-brand-one" />
                  {item}
                </li>
              ))}
            </ul>
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
