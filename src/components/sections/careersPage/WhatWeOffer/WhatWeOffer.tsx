"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import type { CareersSection } from "~/i18n/types/careers";
import type { Careers_JsonType } from "~/types/api/careers_json.types";

interface WhatWeOfferProps {
  data?: Careers_JsonType["careers"];
}

export const WhatWeOffer: React.FC<WhatWeOfferProps> = ({ data }) => {
  const t = useTranslations("careers");
  const whatWeOfferSection =
    data?.whatWeOffer ??
    (t.raw("whatWeOffer") as CareersSection["whatWeOffer"]);
  return (
    <section className="relative overflow-hidden px-6 py-15 sm:px-12 md:py-20 xl:px-25">
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col items-start justify-start gap-10 lg:flex-row lg:justify-between">
        <div className="relative h-100 w-full max-w-xl overflow-hidden rounded-lg bg-pink-200">
          <Image
            src="/career/2.webp"
            alt="hero image"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
            className="object-cover object-top"
          />
        </div>
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
