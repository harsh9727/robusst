"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import type { CareersSection } from "~/i18n/types/careers";
import type { Careers_JsonType } from "~/types/api/careers_json.types";

interface ReadyToJoinUsProps {
  data?: Careers_JsonType["careers"];
}

export const ReadyToJoinUs: React.FC<ReadyToJoinUsProps> = ({ data }) => {
  const t = useTranslations("careers");
  const readyToJoinUsSection =
    data?.readyToJoinUs ??
    (t.raw("readyToJoinUs") as CareersSection["readyToJoinUs"]);

  return (
    <section className="overflow-hidden px-6 py-15 sm:px-12 md:py-20 xl:px-25">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-start gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex h-full w-full max-w-md overflow-hidden rounded-xl">
          <Image
            src="/career/3.webp"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
            alt="Cpm"
            className="h-full w-full object-cover"
          />

          <div className="h-80 w-full bg-pink-200" />
        </div>
        {/* Content */}
        <div className="h-full w-full">
          <h3 className="mb-5 text-2xl leading-tight font-bold sm:text-3xl md:text-4xl">
            {readyToJoinUsSection.heading}
          </h3>

          <p className="text-md text-muted-foreground mb-5 w-[90%] leading-relaxed">
            {readyToJoinUsSection.bodyOne}
          </p>

          <p className="text-md text-muted-foreground mb-5 w-[90%] leading-relaxed">
            {readyToJoinUsSection.bodyTwo}
          </p>
        </div>
      </div>
    </section>
  );
};
