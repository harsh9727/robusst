"use client";

import React from "react";
import type { SanityCareersData } from "~/types/sanity/careers";

interface ValuesProps {
  data: SanityCareersData;
}

export const Values: React.FC<ValuesProps> = ({ data }) => {
  const valuesSection = data?.values;

  if (!valuesSection) return null;

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

      <section className="bg-primary relative overflow-hidden px-6 py-15 sm:px-12 md:py-20 xl:px-25">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-start gap-10 lg:flex-row lg:items-center lg:justify-between">
          {/* Content */}
          <div className="h-full w-full">
            <h3 className="mb-5 text-2xl leading-tight font-bold text-white sm:text-3xl md:text-4xl">
              {valuesSection.heading}
            </h3>

            <div className="mt-8 grid w-full gap-5 md:grid-cols-2">
              {(valuesSection.cards ?? []).map((data, index) => (
                <div
                  key={index}
                  className="border-border/20 rounded-lg border p-5"
                >
                  <h3 className="text-primary-foreground mt-4 text-2xl font-semibold">
                    {data.title}
                  </h3>
                  <p className="text-primary-foreground/70 mt-3 leading-tight">
                    {data.desc}
                  </p>
                </div>
              ))}
            </div>
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
