"use client";

import { useTranslations } from "next-intl";
import React from "react";
import type { CareersSection } from "~/i18n/types/careers";

export const WhatWeOffer: React.FC = () => {
  const t = useTranslations("careers");
  const whatWeOfferSection = t.raw(
    "whatWeOffer",
  ) as CareersSection["whatWeOffer"];
  return (
    <section className="relative overflow-hidden px-6 py-15 sm:px-12 md:py-20 xl:px-25">
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col items-start justify-start gap-10 lg:flex-row lg:justify-between">
        <div className="h-100 w-full max-w-xl rounded-lg bg-pink-200" />
        <div className="h-full w-full">
          <h3 className="mb-5 text-2xl leading-tight font-bold sm:text-3xl md:text-4xl">
            {whatWeOfferSection.heading}
          </h3>

          <div className="flex flex-col gap-4">
            {whatWeOfferSection.sections.map((section, index) => (
              <section key={index}>
                <p className="text-md font-medium">{section.title}</p>
                <p className="text-md text-muted-foreground">
                  {section.description}
                </p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
