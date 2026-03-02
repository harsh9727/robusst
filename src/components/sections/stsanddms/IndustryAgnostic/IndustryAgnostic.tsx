"use client";

import {
  ShoppingCart,
  Car,
  Paintbrush,
  Cable,
  Milk,
  Tv,
  Wine,
  Building2,
  Shirt,
  Sparkles,
  Pill,
  Pencil,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Marquee from "react-fast-marquee";
import { useTranslations } from "next-intl";
import type { IndustryAgnosticSection } from "~/i18n/types/stsAndDms";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  ShoppingCart,
  Car,
  Paintbrush,
  Cable,
  Milk,
  Tv,
  Wine,
  Building2,
  Shirt,
  Sparkles,
  Pill,
  Pencil,
};

export default function IndustryAgnostic() {
  const t = useTranslations();
  const industryAgnostic = t.raw(
    "sts_and_dms_page.industryAgnostic",
  ) as IndustryAgnosticSection;

  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-2">
          {/* Left Content */}
          <div className="">
            <h2 className="text-5xl leading-tight font-extrabold text-pink-500">
              {industryAgnostic.title}
            </h2>

            <p className="text-md mt-1 text-black">
              {industryAgnostic.subtitle}
            </p>
          </div>

          {/* Industry Cards */}
          <Marquee className="mt-8">
            {industryAgnostic.industries.map((item, i) => {
              const Icon = iconMap[item.icon];
              return (
                <div key={i} className="group relative mx-5 w-40 rounded-2xl">
                  <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-xl bg-[#0b0f1a]">
                    {Icon && <Icon size={30} className="text-white" />}
                  </div>

                  <p className="mt-2 text-center text-lg font-semibold text-gray-800 transition-colors duration-300 group-hover:text-pink-500">
                    {item.title}
                  </p>
                </div>
              );
            })}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
