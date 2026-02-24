"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { SolutionsSection } from "~/i18n/types/home";

const SolutionsImage = [
  "/solutions/customized/4.webp",
  "/solutions/customized/5.webp",
  "/solutions/customized/6.webp",
  "/solutions/customized/7.webp",
  "/solutions/customized/8.webp",
];

export const CustomizedSolutionsSlider: React.FC = () => {
  const t = useTranslations();

  const solutionsSection: SolutionsSection[] = [
    {
      heading: "Data-Driven Intelligence for Smarter Decisions",
      countPrefix: "01",
      subheading:
        "We empower organizations to use data for good — turning insights into real-world results. With predictive analytics, churn prevention, and ARPU growth insights, Robusst enables data-backed strategies.",
      items: [],
    },
    {
      heading: "The Brain Behind Telecom Transformation",
      countPrefix: "02",
      subheading:
        "Real-time monitoring dashboards demo view. Predictive churn prevention scenarios with measurable impact such as +35% ARPU and –40% revenue leakage.",
      items: [],
    },
    {
      heading: "End-to-End Integration & Flexibility",
      countPrefix: "03",
      subheading:
        "Proven interoperability across Cisco, Nokia, Huawei. Cloud-native, API-driven architecture built for flexibility across telecom ecosystems.",
      items: [],
    },
  ];

  return (
    <>
      {/* Top Wave */}
      <div className="w-full overflow-hidden bg-white sm:-mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 150">
          <path
            d="M0,80 C300,50 400,50 600,80 C800,110 900,110 1200,80 L1200,200 L0,200 Z"
            fill="#000000"
          />
        </svg>
      </div>

      {/* Section Heading */}
      <div className="container mx-auto mt-10">
        <p className="text-brand-two text-center text-xl font-semibold sm:text-5xl">
          Customized Telecom Solutions
        </p>
      </div>

      {/* Cards Grid */}
      <div className="container mx-auto mt-16 grid grid-cols-1 gap-8 pb-20 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {solutionsSection.map((solution, index) => {
          const imageSrc = SolutionsImage[index % SolutionsImage.length];

          return (
            <div
              key={index}
              className="group shadow-brand-two hover:border-brand-one/50 flex flex-col gap-3 rounded-xl border border-white/20 bg-white p-3 shadow-[0px_0px_10px] transition-all duration-300 group-hover:shadow-[10px_10px_40px] hover:shadow-[0px_0px_50px]"
            >
              {/* Image */}
              <div className="relative flex h-60 w-full overflow-hidden rounded-lg bg-black">
                <Image
                  src={imageSrc!}
                  alt={solution.heading}
                  width={500}
                  height={300}
                  className="h-full w-full object-cover object-center brightness-90 transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Text Content */}
              <div className="px-1">
                <p className="mt-2 text-lg font-semibold text-black">
                  {solution.heading}
                </p>

                <p className="text-muted-foreground mt-2 leading-snug">
                  {solution.subheading}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Wave */}
      <div className="w-full overflow-hidden bg-white sm:-mt-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 150"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 C300,150 400,150 600,120 C800,90 900,90 1200,120 L1200,0 L0,0 Z"
            fill="#000000"
          />
        </svg>
      </div>
    </>
  );
};
