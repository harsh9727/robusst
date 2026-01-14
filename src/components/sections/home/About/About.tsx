"use client";

import React from "react";
import Image from "next/image";

import { about } from "public";
import { useTranslations } from "next-intl";
import type { AboutSection } from "~/i18n/types/home";
import { AnimatedText } from "~/components/ui/TextAnimation";

export const About: React.FC = () => {
  const t = useTranslations();
  const aboutSection = t.raw("about") as AboutSection;

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 px-6 py-16 sm:gap-8 sm:px-12 sm:py-32 lg:px-25 lg:py-25">
      <section className="flex flex-col justify-center gap-1 text-center">
        <AnimatedText
          text={aboutSection.heading}
          className="text-2xl font-medium sm:text-3xl lg:text-4xl"
          as="h2"
        />

        <p className="text-muted-foreground px-4 text-base font-medium sm:text-lg">
          {aboutSection.subheading}
        </p>
      </section>

      <section className="grid items-center gap-6 px-0 sm:gap-9 sm:px-12 lg:px-25 2xl:grid-cols-2">
        <div className="shadow-brand-one relative aspect-video h-full overflow-hidden rounded-xl shadow-[15px_15px_0px] duration-150 hover:shadow-[25px_25px_0px]">
          {/*<div className="bg-brand-three absolute top-0 left-0 w-full h-full z-10" />*/}
          <Image
            src={about}
            alt="about"
            fill
            className="object-cover object-top duration-150 hover:scale-110"
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
