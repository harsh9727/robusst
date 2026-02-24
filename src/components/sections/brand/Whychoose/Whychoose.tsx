"use client";

import {
  ShieldCheck,
  Plug,
  Globe2,
  MapPinned,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { WhyChooseSection } from "~/i18n/types/brand";

const iconMap = [ShieldCheck, Plug, Globe2, MapPinned];

function WhyChooseCard(
  { title, description }: { title: string; description: string },
  Icon: LucideIcon,
  index: number,
) {
  return (
    <div
      key={index}
      className="group border-brand-one relative rounded-3xl border bg-white/70 p-8 shadow-md backdrop-blur-xl transition hover:shadow-2xl"
    >
      <p className="bg-brand-one w-fit rounded-sm p-4">
        <Icon size={30} className="text-white" />
      </p>

      <p className="mt-3 text-2xl font-semibold">{title}</p>

      <p className="leading-tight text-gray-700">{description}</p>
    </div>
  );
}

export const Whychoose = () => {
  const t = useTranslations();
  const whyChooseSection = t.raw("brand_page").whyChoose as WhyChooseSection;

  return (
    <section className="relative bg-white px-4 py-20 sm:px-8">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-pink-400/20 blur-[120px]" />
        <div className="absolute right-10 bottom-10 h-72 w-72 rounded-full bg-purple-400/20 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <h2 className="text-brand-one mb-10 text-center text-3xl font-extrabold sm:text-4xl md:mb-16">
          {whyChooseSection.heading}
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {whyChooseSection.items.map((item, index) => {
            const Icon = iconMap[index];
            if (!Icon) return null;
            return WhyChooseCard(item, Icon, index);
          })}
        </div>
      </div>
    </section>
  );
};
