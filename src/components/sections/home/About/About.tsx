"use client";

import React from "react";
import Image from "next/image";

import { about } from "public";
import { useTranslations } from "next-intl";
import type { AboutSection } from "~/i18n/types/home";

export const About: React.FC = () => {
  const t = useTranslations();
  const aboutSection = t.raw("about") as AboutSection;

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 px-6 py-16 sm:gap-8 sm:px-12 sm:py-32 lg:px-25 lg:py-50">
      <section className="flex flex-col justify-center gap-1 text-center">
        <p className="text-2xl font-medium sm:text-3xl lg:text-4xl">
          {aboutSection.heading}
        </p>

        <p className="text-muted-foreground px-4 text-base font-medium sm:text-lg">
          {aboutSection.subheading}
        </p>
      </section>

      <section className="grid items-center gap-6 px-0 sm:gap-9 sm:px-12 lg:flex-row lg:px-25 xl:grid-cols-2">
        <div className="relative h-80 overflow-hidden rounded-xl border lg:h-100">
          <Image
            src={about}
            alt="about"
            fill
            className="object-cover object-top"
          />
        </div>

        <div className="flex w-full flex-col gap-4 sm:gap-5">
          {aboutSection.paragraphs.map((para, index) => (
            <p
              key={index}
              className="mx-auto max-w-full px-4 text-base leading-relaxed sm:max-w-160 sm:px-0 sm:text-lg sm:leading-tight lg:max-w-200 lg:text-xl"
            >
              {para}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
};
