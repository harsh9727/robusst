"use client";

import React from "react";
import Image from "next/image";

import { useTranslations } from "next-intl";
import { industriesWeServe } from "public";
import type { IndustriesWeServeSection } from "~/i18n/types/home";

const IndustriesWeServeImages = [
  industriesWeServe.telecom.src,
  industriesWeServe.banking.src,
  industriesWeServe.fmcg.src,
  industriesWeServe.retails.src,
  industriesWeServe.IT.src,
  industriesWeServe.travel.src,
  industriesWeServe.pharma.src,
];

export const IndustriesWeServe: React.FC = () => {
  const t = useTranslations();
  const industriesWeServeSection = t.raw(
    "industriesWeServe",
  ) as IndustriesWeServeSection;
  return (
    <div className="relative z-10 flex flex-col gap-6 sm:gap-9">
      <div className="bg-brand-two absolute top-0 right-0 h-30 w-130 -translate-x-1/2 -translate-y-1/2 blur-[200px]" />

      <p className="text-primary-foreground z-10 text-2xl font-medium sm:text-3xl lg:text-4xl">
        {industriesWeServeSection.heading}
      </p>

      <section className="z-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
        {industriesWeServeSection.items.map((data, index) => (
          <div key={index} className="group flex flex-col gap-3">
            <div className="relative h-60 overflow-hidden rounded-xl">
              <Image
                src={IndustriesWeServeImages[index] as string}
                alt="image"
                fill
                className="object-cover object-top brightness-75"
              />
            </div>
            <p className="text-primary-foreground px-1 text-lg font-medium">
              {data.title}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};
