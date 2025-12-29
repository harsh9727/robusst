"use client";

import React from "react";

import { events } from "public";
import Image from "next/image";
import type { EventsCoverageSection } from "~/i18n/types/home";
import { useTranslations } from "next-intl";

export const EventsCoverage: React.FC = () => {
  const t = useTranslations();
  const eventsCoverageSection = t.raw(
    "eventsCoverage",
  ) as EventsCoverageSection;

  return (
    <section className="bg-primary relative flex w-full justify-center px-6 py-12 sm:px-12 sm:py-16 lg:px-25 lg:py-25">
      <div className="container flex w-full flex-col items-center gap-6 sm:gap-8 lg:gap-10">
        <section className="flex flex-col justify-center gap-1 px-4 text-center">
          <p className="text-primary-foreground text-2xl font-medium sm:text-3xl lg:text-4xl">
            {eventsCoverageSection.heading}
          </p>
          <p className="text-muted-foreground text-base font-medium sm:text-lg">
            {eventsCoverageSection.subheading}
          </p>
        </section>
        <div className="relative w-full overflow-hidden">
          <div className="grid grid-cols-2 gap-3 px-4 max-[390px]:grid-cols-1 sm:grid-cols-3 sm:gap-4 sm:px-8 lg:grid-cols-4 lg:px-12">
            {Object.entries(events).map(([key, image], idx) => (
              <div
                key={idx}
                className="bg-primary-foreground relative h-32 w-full overflow-hidden rounded-lg p-6 sm:h-40 lg:h-40"
              >
                <Image
                  src={image}
                  alt={key}
                  width={200}
                  height={200}
                  className="h-full w-full object-contain"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
