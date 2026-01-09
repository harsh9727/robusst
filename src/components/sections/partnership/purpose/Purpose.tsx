"use client";

import React from "react";
import Image from "next/image";
import { partnership } from "public";
import { Button } from "~/components/ui/button";
import { useTranslations } from "next-intl";
import type { PartnershipSection } from "~/i18n/types/partnership";

export const Purpose: React.FC = () => {
  const t = useTranslations("partnership");
  const purposeSection = t.raw("purpose") as PartnershipSection["purpose"];

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-16 lg:px-15">
      <h2 className="pb-10 text-center text-2xl font-bold text-black sm:pb-14 sm:text-3xl lg:text-4xl">
        {purposeSection.heading}{" "}
        <span className="block text-pink-500 sm:inline-block">
          {purposeSection.headingHighlight}
        </span>
      </h2>

      <div className="mx-auto grid max-w-7xl grid-cols-12 items-center gap-6 sm:gap-8 lg:gap-10">
        <div className="order-1 col-span-12 overflow-hidden rounded-xl md:order-2 md:col-span-6 lg:col-span-4">
          <div className="h-75 sm:h-100 md:h-full">
            <Image
              src={partnership.monetize}
              alt="CDP"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="order-2 col-span-12 md:order-1 md:col-span-6 lg:col-span-8">
          <h5 className="mb-4 text-lg font-bold text-black sm:text-xl">
            {purposeSection.subtitle}
          </h5>

          {purposeSection.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="sm:text-md mb-3 text-sm font-medium text-gray-600"
            >
              {paragraph}
            </p>
          ))}

          <Button
            variant="outline"
            className="mt-4 border-pink-500 px-5 py-4 text-pink-500 hover:bg-pink-50"
          >
            {purposeSection.buttonText}
          </Button>
        </div>
      </div>

      <div className="mx-auto mt-10 grid max-w-7xl grid-cols-12 items-center gap-6 sm:gap-8 md:mt-10 lg:gap-10">
        <div className="col-span-12 overflow-hidden rounded-xl md:col-span-12 lg:col-span-4">
          <div className="h-75 sm:h-100 md:h-100 lg:h-full">
            <Image
              src={partnership.monetize2}
              alt="CDP"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="col-span-12 md:col-span-12 lg:col-span-8">
          <h5 className="mt-3 mb-5 text-lg font-bold text-black sm:text-xl md:mt-0">
            {purposeSection.secondSection.subtitle}
          </h5>
          <h6 className="mb-5 text-lg font-bold text-pink-500 sm:text-xl md:mt-0">
            {purposeSection.secondSection.coreValuesHeading}
          </h6>
          <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-2">
            {purposeSection.secondSection.coreValues.map((value, index) => {
              const icons = [
                partnership.innovation,
                partnership.trust,
                partnership.excellence,
                partnership.partnershipicon,
              ];
              return (
                <div
                  key={index}
                  className="flex items-center gap-4 rounded-lg border p-4 sm:flex-row sm:p-5"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-pink-500 bg-pink-200 p-3">
                    <Image src={icons[index]!} alt={value.title} />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold text-pink-600">
                      {value.title}
                    </h3>
                    <p className="sm:text-md text-sm text-black">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
