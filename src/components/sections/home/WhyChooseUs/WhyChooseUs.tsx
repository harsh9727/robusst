"use client";

import React from "react";
import Image from "next/image";

import { about } from "public";
import { useTranslations } from "next-intl";
import type { WhyChooseUsSection } from "~/i18n/types/home";

export const WhyChooseUs: React.FC = () => {
  const t = useTranslations();
  const whyChooseUsSection = t.raw("whyChooseUs") as WhyChooseUsSection;

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 px-6 py-16 sm:gap-8 sm:px-12 sm:py-32 lg:px-25 lg:py-50">
      <section className="flex flex-col justify-center gap-1 text-center">
        <p className="text-2xl font-medium sm:text-3xl lg:text-4xl">
          {whyChooseUsSection.heading}
        </p>
      </section>

      <section className="grid items-center gap-6 px-0 sm:px-12 lg:flex-row lg:px-25 xl:grid-cols-2">
        <div className="relative h-80 overflow-hidden rounded-xl border lg:h-100">
          <Image
            src={about}
            alt="about"
            fill
            className="object-cover object-top"
          />
        </div>

        <section className="container grid w-full grid-cols-1 gap-4 px-6 sm:gap-5 sm:px-12 lg:px-25">
          {whyChooseUsSection.points.map((data, index) => {
            return (
              <div
                key={index}
                className="w-full rounded-lg border p-4 sm:p-5 lg:p-4"
              >
                <p className="text-lg font-semibold">{data.title}</p>
                <p className="text-muted-foreground text-sm leading-tight">
                  {data.description}
                </p>
              </div>
            );
          })}
        </section>
      </section>
    </div>
  );
};
