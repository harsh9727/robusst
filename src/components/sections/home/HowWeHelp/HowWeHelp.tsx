"use client";
import React from "react";
import type { HowWeHelpSection } from "~/i18n/types/home";
import { useTranslations } from "next-intl";
import { FaChartLine } from "react-icons/fa";
import { FaTags } from "react-icons/fa6";
import { MdFeedback } from "react-icons/md";
import { LuBrainCircuit } from "react-icons/lu";
import { MdSecurity } from "react-icons/md";
import { LuNetwork } from "react-icons/lu";
import { AnimatedText } from "~/components/ui/TextAnimation";

const HowWeHelpIcons = [
  FaChartLine,
  FaTags,
  MdFeedback,
  LuBrainCircuit,
  MdSecurity,
  LuNetwork,
];

export const HowWeHelp: React.FC = () => {
  const t = useTranslations();
  const howWeHelpSection = t.raw("howWeHelp") as HowWeHelpSection;

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 px-6 py-12 sm:gap-8 sm:px-12 sm:py-16 lg:px-25 lg:py-25">
      <section className="flex flex-col justify-center gap-1 px-4 text-center">
        <AnimatedText
          text={howWeHelpSection.heading}
          className="text-2xl font-medium sm:text-3xl lg:text-4xl"
          as="h2"
        />
        <p className="text-muted-foreground text-base font-medium sm:text-lg">
          {howWeHelpSection.subheading}
        </p>
      </section>
      <section className="container grid w-full grid-cols-1 gap-4 px-6 sm:grid-cols-2 sm:gap-5 sm:px-12 lg:grid-cols-3 lg:px-25">
        {howWeHelpSection.items.map((data, index) => {
          const IconComponent = HowWeHelpIcons[index];

          return (
            <div
              key={index}
              className="w-full rounded-lg border p-4 sm:p-5 lg:p-4"
            >
              <div className="text-brand-three relative h-7 w-7 overflow-hidden rounded-sm">
                {IconComponent && <IconComponent className="h-full w-full" />}
              </div>
              <p className="mt-4 text-lg font-medium sm:mt-5 sm:text-xl">
                {data.title}
              </p>
              <p className="text-muted-foreground mt-1 text-sm leading-tight">
                {data.description}
              </p>
            </div>
          );
        })}
      </section>
    </div>
  );
};
