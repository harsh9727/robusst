"use client";

import { useTranslations } from "next-intl";
import React from "react";
import type { CareersSection } from "~/i18n/types/careers";

export const RiseWithUs: React.FC = () => {
  const t = useTranslations("careers");
  const riseWithUsSection = t.raw("riseWithUs") as CareersSection["riseWithUs"];
  return (
    <div className="relative container mx-auto flex w-full flex-col gap-5 px-6 pt-12 sm:px-12 sm:pt-16 lg:px-25 lg:pt-25">
        <h3 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
        {riseWithUsSection.heading}
      </h3>

      <div className="grid w-full gap-5 md:grid-cols-2">
        {riseWithUsSection.cards.map((card, index) => (
          <div key={index} className="rounded-lg border p-5">
            <div className="bg-primary size-9 rounded-sm" />
            <h3 className="mt-4 text-xl md:text-2xl font-semibold">{card.title}</h3>
            <p className="text-muted-foreground leading-tight">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
