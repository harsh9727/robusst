"use client";

import React from "react";
import Image from "next/image";
import { partnership } from "public";
import { useTranslations } from "next-intl";
import type { PartnershipSection } from "~/i18n/types/partnership";

export const Challenges: React.FC = () => {
  const t = useTranslations("partnership");
  const challengesSection = t.raw(
    "challenges",
  ) as PartnershipSection["challenges"];

  const icons = [
    partnership.privacy,
    partnership.ethics,
    partnership.digitalization,
    partnership.technologyicon,
  ];

  return (
    <div className="bg-primary relative flex w-full items-center justify-center overflow-hidden px-4 py-10 sm:px-6 sm:py-16 lg:px-20 lg:py-20">
      <div className="bg-brand-three blur-50 absolute -top-60 -right-20 h-40 w-100 rotate-6 sm:h-50 sm:w-180" />
      <div className="bg-brand-three blur-35 absolute -bottom-30 left-1/2 size-40 -translate-x-1/2 rounded-full sm:size-50" />
      <section className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-7 md:grid-cols-12">
          {/* col-md-4 */}
          <div className="md:col-span-12 lg:col-span-4">
            <div className="flex h-75 overflow-hidden rounded-xl sm:h-87.5 md:h-87.5 lg:h-full">
              <Image
                src={partnership.challenge}
                alt="Challenges"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-12 lg:col-span-8">
            <h2 className="my-5 pb-5 text-3xl font-bold text-pink-500">
              {challengesSection.heading}{" "}
              <span className="text-white">
                {challengesSection.headingHighlight}
              </span>
            </h2>
            <ul className="grid grid-cols-1 gap-7 sm:grid-cols-2">
              {challengesSection.items.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-5 rounded-lg bg-white px-3 py-3"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-pink-500 bg-pink-200 p-3">
                    <Image
                      src={icons[index]!}
                      alt={item}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h4 className="text-md font-semibold text-pink-500 lg:text-lg">
                    {item}
                  </h4>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
