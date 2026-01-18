"use client";

import React from "react";
import type { TechStackSection } from "~/i18n/types/home";
import { useTranslations } from "next-intl";

export const TechStack: React.FC = () => {
  const t = useTranslations();
  const techStackSection = t.raw("techStack") as TechStackSection;
  return (
    <div className="z-10 flex flex-col gap-8 sm:gap-10 lg:gap-14">
      <section className="flex flex-col justify-between gap-6 lg:flex-row lg:gap-0">
        <p className="text-primary-foreground text-2xl font-black sm:text-3xl lg:text-5xl">
          {techStackSection.heading}
        </p>
        <p className="text-muted-foreground max-w-full text-sm leading-relaxed sm:text-base sm:leading-tight lg:max-w-xl">
          {techStackSection.description}
        </p>
      </section>

      <section className="grid grid-cols-1 gap-x-10 gap-y-6 sm:gap-x-30 sm:gap-y-8 lg:grid-cols-2 lg:gap-x-50 lg:gap-y-10">
        {techStackSection.items.map((data, index) => (
          <div
            key={index}
            className="border-border/20 group grid w-full grid-cols-1 justify-between gap-4 border-t sm:grid-cols-2 sm:gap-6 lg:gap-8"
          >
            <p className="text-primary-foreground border-brand-one -mt-px w-fit border-t p-4 text-xl sm:p-5 sm:text-2xl">
              {data.title}
            </p>
            <div className="text-muted-foreground group-hover:text-primary-foreground p-4 text-sm duration-150 sm:p-5 sm:text-base">
              {data.stack.map((stack, index) => (
                <p key={index}>{stack}</p>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
