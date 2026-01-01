"use client";

import { useTranslations } from "next-intl";
import React from "react";
import type { CareersSection } from "~/i18n/types/careers";

export const Values: React.FC = () => {
  const t = useTranslations("careers");
  const valuesSection = t.raw("values") as CareersSection["values"];

  return (
    <section className="bg-primary relative overflow-hidden px-6 py-15 sm:px-12 md:py-20 xl:px-25">
      <div className="bg-brand-two absolute -top-60 -right-20 h-40 w-100 rotate-6 blur-[200px] sm:h-50 sm:w-180" />
      <div className="bg-brand-two absolute -bottom-30 left-1/2 size-40 -translate-x-1/2 rounded-full blur-[140px] sm:size-50" />
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-start gap-10 lg:flex-row lg:items-center lg:justify-between">
        {/* Content */}
        <div className="h-full w-full">
          <h3 className="mb-5 text-2xl leading-tight font-bold text-white sm:text-3xl md:text-4xl">
            {valuesSection.heading}
          </h3>

          <div className="mt-8 grid w-full gap-5 md:grid-cols-2">
            {valuesSection.cards.map((data, index) => (
              <div
                key={index}
                className="border-border/20 rounded-lg border p-5"
              >
                <div className="bg-primary-foreground size-9 rounded-sm" />
                <h3 className="text-primary-foreground mt-4 text-2xl font-semibold">
                  {data.title}
                </h3>
                <p className="text-primary-foreground/70 mt-3 leading-tight">
                  {data.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
