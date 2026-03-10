"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import type { RegionalExcellenceSection } from "~/i18n/types/brand";

export const RegionalExcellence = () => {
  const t = useTranslations();
  const regionalSection = t.raw("brand_page")
    .regionalExcellence as RegionalExcellenceSection;
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

      <section className="bg-primary relative flex w-full items-center justify-center overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-16 lg:py-25">
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <div>
            <h2 className="mb-6 text-3xl leading-tight font-extrabold text-brand-one md:text-4xl">
              {regionalSection.heading}
            </h2>

            <p className="mb-8 max-w-xl text-base leading-relaxed text-white/80">
              {regionalSection.subheading}
            </p>

            <ul className="space-y-4">
              {regionalSection.regions.map((region, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-white/90"
                >
                  <CheckCircle2 className="mt-1 h-6 w-6 text-brand-one" />
                  <span>
                    <strong className="text-white">{region.title}:</strong>{" "}
                    {region.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative h-75 overflow-hidden shadow-[0px_0px_0px] duration-150 hover:shadow-[0px_0px_40px] shadow-brand-one rounded-3xl shadow-2xl sm:h-92.5 md:h-100 lg:h-125">
            <Image
              src="/solutions/brand/4.webp"
              fill
              alt="Regional Business Communication"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
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
