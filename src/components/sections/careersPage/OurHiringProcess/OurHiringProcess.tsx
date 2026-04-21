"use client";

import React from "react";

import { LifeAtRobusst } from "../LifeAtRobusst";
// import { EmployeesTestimonials } from "../EmployeesTestimonials";
import { useTranslations } from "next-intl";
import type { CareersSection } from "~/i18n/types/careers";
import type { Careers_JsonType } from "~/types/api/careers_json.types";
import Image from "next/image";

interface OurHiringProcessProps {
  data?: Careers_JsonType["careers"];
}

export const OurHiringProcess: React.FC<OurHiringProcessProps> = ({ data }) => {
  const t = useTranslations("careers");
  const ourHiringProcessSection =
    data?.ourHiringProcess ??
    (t.raw("ourHiringProcess") as CareersSection["ourHiringProcess"]);

  return (
    <>
      <div className="w-full overflow-hidden bg-white sm:-mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 150">
          <path
            d="M0,80 C300,50 400,50 600,80 C800,110 900,110 1200,80 L1200,200 L0,200 Z"
            fill="#000000"
          />
        </svg>
      </div>

      <div className="bg-primary relative flex flex-col gap-12 overflow-hidden">
        <div className="z-10 container mx-auto flex w-full flex-col gap-6 px-6 py-15 sm:gap-9 sm:px-12 md:py-20 xl:px-25">
          <div className="flex flex-col items-start justify-between gap-4">
            <p className="text-primary-foreground text-2xl font-black sm:text-3xl lg:text-5xl">
              {ourHiringProcessSection.heading}
            </p>
            <div className="mt-5 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div className="relative h-60 w-full overflow-hidden rounded-lg bg-pink-50">
                <Image
                  src="/career/hiring/1.webp"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
                  alt="Cpm"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="relative h-60 w-full overflow-hidden rounded-lg bg-pink-50">
                <Image
                  src="/career/hiring/2.webp"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
                  alt="Cpm"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="relative h-60 w-full overflow-hidden rounded-lg bg-pink-50">
                <Image
                  src="/career/hiring/3.webp"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
                  alt="Cpm"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <p className="text-primary-foreground mt-5">
              {ourHiringProcessSection.body}
            </p>
          </div>

          <div className="bg-muted-foreground h-[0.5px] w-full" />
          <LifeAtRobusst data={data} />

          {/*<div className="bg-muted-foreground h-[0.5px] w-full" />
          <EmployeesTestimonials />*/}
        </div>
      </div>
      <div className="w-full overflow-hidden bg-white sm:-mt-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 150"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 C300,150 400,150 600,120 C800,90 900,90 1200,120 L1200,0 L0,0 Z"
            fill="#000000"
            stroke="none"
          />
        </svg>
      </div>
    </>
  );
};
