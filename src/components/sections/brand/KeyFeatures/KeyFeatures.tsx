"use client";

import Image from "next/image";
import {
  BadgeCheck,
  MessageSquareText,
  ShieldCheck,
  Network,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type { KeyFeaturesSection } from "~/i18n/types/brand";

const iconMap = [BadgeCheck, MessageSquareText, ShieldCheck, Network];

export const KeyFeatures = () => {
  const t = useTranslations();
  const keyFeaturesSection = t.raw("brand_page")
    .keyFeatures as KeyFeaturesSection;

  return (
    <section className="relative w-full bg-white px-4 py-14 sm:px-6 lg:px-16">
      {/* Heading */}
      <h2 className="mb-12 text-center text-3xl font-extrabold tracking-wide text-pink-500 uppercase">
        {keyFeaturesSection.heading}
      </h2>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-12">
        {/* LEFT FEATURES */}
        <div className="flex flex-col gap-6 lg:col-span-3">
          {keyFeaturesSection.features.slice(0, 2).map((feature, index) => {
            const Icon = iconMap[index];
            if (!Icon) return null;
            return (
              <FeatureCard
                key={index}
                title={feature.title}
                desc={feature.description}
                Icon={Icon}
              />
            );
          })}
        </div>

        {/* CENTER IMAGE */}
        <div className="relative h-75 overflow-hidden shadow-[0px_0px_0px] duration-150 hover:shadow-[0px_0px_40px] shadow-brand-one rounded-2xl  sm:h-100 lg:col-span-6 lg:min-h-112.5">
          <Image
            src="/solutions/brand/8.webp"
            fill
            alt="Business Calling"
            className="h-full w-full object-cover"
          />
        </div>

        {/* RIGHT FEATURES */}
        <div className="flex flex-col gap-6 lg:col-span-3">
          {keyFeaturesSection.features.slice(2, 4).map((feature, index) => {
            const Icon = iconMap[index + 2];
            if (!Icon) return null;
            return (
              <FeatureCard
                key={index}
                title={feature.title}
                desc={feature.description}
                Icon={Icon}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* Feature Card */
const FeatureCard = ({
  title,
  desc,
  Icon,
}: {
  title: string;
  desc: string;
  Icon: React.ElementType;
}) => {
  return (
    <div className="flex h-auto flex-col rounded-2xl border border-white/10 bg-black px-6 py-7 shadow-lg lg:min-h-50 lg:px-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-emerald-400">{title}</h3>
        <Icon className="h-7 w-7 text-emerald-400" />
      </div>

      <p className="text-sm leading-relaxed text-white/80">{desc}</p>
    </div>
  );
};
