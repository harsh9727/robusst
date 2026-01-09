"use client";

import React from "react";
import { partnership } from "public";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import type { PartnershipSection } from "~/i18n/types/partnership";

export const Vision: React.FC = () => {
  const t = useTranslations("partnership");
  const visionSection = t.raw("vision") as PartnershipSection["vision"];

  return (
    <div className="bg-primary relative flex w-full items-center justify-center overflow-hidden px-4 py-10 sm:px-6 sm:py-16 lg:px-15 lg:py-20">
      <div className="bg-brand-two absolute -top-40 -right-20 h-32 w-72 rotate-6 blur-[160px] sm:h-50 sm:w-180" />
      <div className="bg-brand-two absolute -bottom-20 left-1/2 size-32 -translate-x-1/2 rounded-full blur-[120px] sm:size-50" />

      <section className="relative z-10 grid w-full max-w-7xl grid-cols-12 gap-6 sm:gap-8 lg:gap-10">
        <div className="col-span-12 md:col-span-6">
          {/* Vision */}
          <div className="bg-brand-two mb-4 h-64 w-full overflow-hidden rounded-lg sm:h-64 md:h-100">
            <Image
              src={partnership.vision}
              alt="Vision"
              className="h-full w-full object-cover object-top"
            />
          </div>

          <h2 className="my-4 text-2xl font-bold text-pink-500 sm:text-3xl">
            {visionSection.heading}
          </h2>

          <ul className="sm:text-md space-y-2 text-sm text-white">
            {visionSection.items.map((item, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="mt-1 mr-2 h-4 w-4 shrink-0 text-pink-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Mission */}
        <div className="col-span-12 md:col-span-6">
          <div className="bg-brand-two mb-4 h-64 w-full overflow-hidden rounded-lg sm:h-64 md:h-100">
            <Image
              src={partnership.mission}
              alt="Mission"
              className="h-full w-full object-cover"
            />
          </div>

          <h2 className="my-4 text-2xl font-bold text-pink-500 sm:text-3xl">
            {visionSection.mission.heading}
          </h2>

          {visionSection.mission.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="sm:text-md mt-3 text-sm leading-relaxed text-white first:mt-0"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
};
