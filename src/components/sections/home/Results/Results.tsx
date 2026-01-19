"use client";
import React from "react";
import Image from "next/image";
import type { ResultsSection } from "~/i18n/types/home";
import { result } from "public";
import { useTranslations } from "next-intl";
import { AnimatedText } from "~/components/ui/TextAnimation";

export const Results: React.FC = () => {
  const t = useTranslations();
  const resultsData = t.raw("results") as ResultsSection;
  return (
    <div className="flex justify-center px-6 py-12 sm:px-12 sm:py-16 lg:px-25 lg:py-25">
      <div className="group relative container">
        {/* Animated gradient shadow background */}
        <div className="from-brand-one via-brand-two to-brand-three animate-gradient-shift absolute -inset-1 rounded-2xl bg-linear-to-br bg-size-[200%_200%] opacity-0 blur-xl duration-150 group-hover:opacity-100 sm:rounded-3xl lg:rounded-4xl" />

        {/* Main content box */}
        <div className="bg-background relative grid min-h-125 grid-cols-1 overflow-hidden rounded-2xl border sm:min-h-150 sm:rounded-3xl lg:h-150 lg:grid-cols-2 lg:rounded-4xl">
          <div className="bg-primary/70 relative order-1 min-h-50 w-full overflow-hidden lg:order-2 lg:min-h-0">
            <Image
              src={result.src}
              alt="image"
              fill
              className="object-cover object-top"
            />
          </div>
          <div className="bg-primary order-2 flex w-full flex-col gap-6 p-6 sm:gap-8 sm:p-10 lg:order-1 lg:p-15">
            <section>
              <AnimatedText
                text={resultsData.heading}
                className="text-primary-foreground text-2xl font-black sm:text-3xl lg:text-5xl"
                as="h2"
              />
              <p className="text-muted-foreground text-sm sm:text-base">
                {resultsData.subheading}
              </p>
            </section>
            <section className="grid grid-cols-2 gap-x-2 gap-y-4 sm:gap-x-4 sm:gap-y-5 lg:gap-y-3">
              {resultsData.items.map((data, index) => (
                <div key={index} className="">
                  <p className="text-primary-foreground text-lg leading-tight sm:text-xl lg:text-xl">
                    {data.label}
                  </p>
                  <p className="text-muted-foreground text-xs sm:text-sm">
                    {data.title}
                  </p>
                </div>
              ))}
            </section>
            <p className="text-primary-foreground text-sm sm:text-base">
              {resultsData.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
