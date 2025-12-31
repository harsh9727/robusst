import Image from "next/image";
import React from "react";
import { platform } from "public";
import type { PlatformsSection } from "~/i18n/types/platforms";
import { useTranslations } from "next-intl";

export const Whychoose: React.FC = () => {
  const t = useTranslations("platforms");
  const whyChooseSection = t.raw("whychoose") as PlatformsSection["whychoose"];

  return (
    <section className="px-6 py-20 sm:px-12 xl:px-25">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div>
          <h3 className="pb-10 text-4xl leading-tight font-bold text-black">
            {whyChooseSection.heading}
          </h3>

          <ul className="flex flex-col gap-5">
            {whyChooseSection.benefits.map((benefit, index) => (
              <li
                key={index}
                className="flex flex-col gap-1 rounded-r-lg border-l-4 border-pink-600 bg-pink-50 p-4 pl-4"
              >
                <h4 className="text-xl font-bold text-pink-600">
                  {benefit.title}
                </h4>
                <p className="text-black">{benefit.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-pink-50 to-purple-50">
          <Image
            src={platform.whychoose}
            alt="Why Choose Us"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};
