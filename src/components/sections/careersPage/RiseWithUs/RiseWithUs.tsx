"use client";

import React from "react";
import type { Careers_JsonType } from "~/types/api/careers_json.types";

interface RiseWithUsProps {
  data?: Careers_JsonType["careers"];
}

export const RiseWithUs: React.FC<RiseWithUsProps> = ({ data }) => {
  const riseWithUsSection = data?.riseWithUs;

  if (!riseWithUsSection) return null;

  return (
    <div className="relative container mx-auto flex w-full flex-col gap-5 px-6 py-12 sm:px-12 sm:pt-16 lg:px-25 lg:pt-25">
      <h3 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
        {riseWithUsSection.heading}
      </h3>

      <div className="grid w-full gap-5 md:grid-cols-2">
        {riseWithUsSection.cards.map((card, index) => (
          <div key={index} className="rounded-lg border p-5">
            <h3 className="text-xl font-semibold md:text-2xl">{card.title}</h3>
            <p className="text-muted-foreground leading-tight">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
