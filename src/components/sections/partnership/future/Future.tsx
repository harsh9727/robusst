"use client";

import React from "react";
import Image from "next/image";
import { partnership } from "public";
import { Button } from "~/components/ui/button";
import { useTranslations } from "next-intl";
import type { PartnershipSection } from "~/i18n/types/partnership";

export const Future: React.FC = () => {
  const t = useTranslations("partnership");
  const futureSection = t.raw("future") as PartnershipSection["future"];

  return (
    <section className="bg-primary-foreground flex items-center justify-center gap-6 overflow-hidden px-3 py-16 sm:gap-8 sm:px-12 sm:py-20 lg:px-15 lg:py-25">
      <div className="mx-auto w-full max-w-7xl rounded-2xl bg-black px-5 py-8 sm:px-8 sm:py-10 lg:p-12">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <h2 className="mb-5 text-2xl font-bold text-pink-500 sm:text-3xl lg:text-4xl">
              {futureSection.heading}
            </h2>

            <h5 className="mb-3 text-lg font-semibold text-white sm:text-xl">
              {futureSection.subtitle}
            </h5>

            {futureSection.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="mb-3 text-sm text-white/90 sm:text-base"
              >
                {paragraph}
              </p>
            ))}

            <h5 className="mb-4 text-base font-medium text-pink-500 sm:text-lg">
              {futureSection.callToAction}
            </h5>

            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                className="border-pink-500 px-6 py-4 text-sm font-medium text-pink-500 capitalize hover:bg-pink-50 hover:text-pink-700 sm:text-base"
              >
                {futureSection.buttons.careers}
              </Button>

              <Button
                variant="outline"
                className="border-pink-500 px-6 py-4 text-sm font-medium text-pink-500 capitalize hover:bg-pink-50 hover:text-pink-700 sm:text-base"
              >
                {futureSection.buttons.contact}
              </Button>
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-5">
            <div className="relative h-60 w-full overflow-hidden rounded-xl sm:h-75 md:h-100">
              <Image
                src={partnership.future}
                alt="Future"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
