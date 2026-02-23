"use client";
import React from "react";
import type { PlatformsSection } from "~/i18n/types/platforms";
import { useTranslations } from "next-intl";

export const Whychoose: React.FC = () => {
  const t = useTranslations("platforms");
  const whyChooseSection = t.raw("whychoose") as PlatformsSection["whychoose"];

  return (
    <section className="bg-primary-foreground px-6 py-15 sm:px-12 md:py-20 xl:px-25">
      <div className="mx-auto flex w-full max-w-7xl flex-col-reverse items-start justify-start gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <h3 className="mb-5 text-2xl leading-tight font-bold text-black sm:text-3xl md:text-4xl">
            {whyChooseSection.heading}
          </h3>
          <ul className="flex flex-col gap-5">
            {whyChooseSection.benefits.map((benefit, index) => (
              <li
                key={index}
                className="flex flex-col gap-1 rounded-r-lg border-l-4 border-pink-600 bg-pink-50 p-4 pl-4"
              >
                <h4 className="text-lg font-bold text-pink-600 sm:text-xl">
                  {benefit.title}
                </h4>
                <p className="text-black">{benefit.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
