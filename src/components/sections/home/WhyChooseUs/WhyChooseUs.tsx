"use client";

import React from "react";
import Image from "next/image";

import { about } from "public";
import { useTranslations } from "next-intl";
import type { WhyChooseUsSection } from "~/i18n/types/home";
import { AnimatedText } from "~/components/ui/TextAnimation";

export const WhyChooseUs: React.FC = () => {
  const t = useTranslations();
  const whyChooseUsSection = t.raw("whyChooseUs") as WhyChooseUsSection;

  return (
    <div className="bg-primary-foreground flex w-full flex-col items-center justify-center gap-6 px-6 pt-16 sm:gap-8 sm:px-12 sm:pt-32 lg:px-25 lg:pt-25">
      <section className="flex flex-col justify-center gap-1 text-center">
        <AnimatedText
          text={whyChooseUsSection.heading}
          className="text-2xl font-medium sm:text-3xl lg:text-4xl"
          as="h2"
        />
      </section>

      <section className="grid items-center gap-6 px-0 sm:px-12 lg:flex-row lg:px-25 xl:grid-cols-2">
        <div className="relative h-80 overflow-hidden rounded-xl border lg:h-100">
          <Image
            src={about}
            alt="about"
            fill
            className="object-cover object-top"
          />
        </div>

        <section className="container grid w-full grid-cols-1 gap-4 px-6 sm:gap-5 sm:px-12 lg:px-25">
          {whyChooseUsSection.points.map((data, index) => {
            return (
              <div
                key={index}
                className="shadow-brand-one w-full rounded-lg border p-4 shadow-[-5px_5px_0px] duration-150 hover:shadow-[-10px_10px_0px] sm:p-5 lg:p-4"
              >
                <p className="text-lg font-semibold">{data.title}</p>
                <p className="text-muted-foreground text-sm leading-tight">
                  {data.description}
                </p>
              </div>
            );
          })}
        </section>
      </section>
    </div>
  );
};
