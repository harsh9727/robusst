"use client";

import React from "react";
import Image from "next/image";
import { partnership } from "public";
import { useTranslations } from "next-intl";
import type { PartnershipSection } from "~/i18n/types/partnership";

export const Define: React.FC = () => {
  const t = useTranslations("partnership");
  const defineSection = t.raw("define") as PartnershipSection["define"];

  return (
    <section className="overflow-hidden px-4 pt-10 pb-15 sm:gap-8 sm:px-12 sm:py-15 lg:px-15 lg:py-15">
      <div className="mx-auto w-full max-w-7xl rounded-2xl bg-black px-5 pt-5 pb-8 lg:p-10">
        <div className="grid grid-cols-1 items-center gap-7 md:grid-cols-1 lg:grid-cols-2 lg:gap-10">
          <div className="order-2 lg:order-1">
            <h2 className="mb-5 text-4xl font-bold text-pink-500">
              {defineSection.heading}
            </h2>
            <h5 className="mb-5 text-xl font-bold text-white">
              {defineSection.subtitle}
            </h5>
            <p className="mb-3 text-white">{defineSection.description}</p>
            <div className="mt-5 grid grid-cols-1 gap-5 pt-5 sm:grid-cols-2 md:grid-cols-2">
              {defineSection.values.map((value, index) => (
                <div
                  key={index}
                  className="text-md mx-auto w-full max-w-md rounded-lg border border-white px-3 py-4 text-center text-white xl:p-5"
                >
                  <h5 className="mb-2 text-lg font-bold text-pink-500">
                    {value.title}
                  </h5>
                  <p className="mb-2">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 flex h-full w-full overflow-hidden rounded-xl md:h-100 lg:order-2 lg:h-full">
            <Image
              src={partnership.define}
              alt="Define"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
