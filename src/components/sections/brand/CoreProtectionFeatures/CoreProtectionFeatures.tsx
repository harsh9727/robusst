"use client";

import Image from "next/image";
import { ShieldAlert, Network, Star, Ban } from "lucide-react";
import { platform } from "public";
import { useTranslations } from "next-intl";
import type { CoreProtectionFeaturesSection } from "~/i18n/types/brand";

const iconMap = [ShieldAlert, Network, Star, Ban];

export const CoreProtectionFeatures = () => {
  const t = useTranslations();
  const coreProtectionSection = t.raw("brand_page")
    .coreProtectionFeatures as CoreProtectionFeaturesSection;

  return (
    <section className="overflow-hidden bg-white px-4 py-16 sm:px-6 lg:px-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center md:grid-cols-2 md:gap-10 lg:gap-25">
        {/* LEFT CONTENT */}

        <div className="relative">
          <div className="relative mb-10 flex h-[300px] justify-center overflow-hidden rounded-3xl md:mb-0 md:h-[400px] lg:h-[550px]">
            <Image
              src="/solutions/brand/6.webp"
              alt="Suspected Spam Call"
              width={500}
              height={500}
              priority
              className="h-full w-fit object-cover"
            />
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div>
          <h2 className="mb-10 text-2xl font-extrabold text-pink-500 uppercase md:text-3xl">
            {coreProtectionSection.heading}
          </h2>

          <div className="space-y-6">
            {coreProtectionSection.features.map((feature, index) => {
              const Icon = iconMap[index];
              if (!Icon) return null;
              return (
                <FeatureRow
                  key={index}
                  icon={<Icon />}
                  title={feature.title}
                  desc={feature.description}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

/* Feature Row */
const FeatureRow = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => {
  return (
    <div className="flex gap-4">
      <div className="shadow-brand-three flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pink-500/10 text-pink-500 shadow-[0px_0px_0px] duration-150 hover:shadow-[0px_0px_10px]">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-pink-600">{title}</h3>
        <p className="text-sm leading-relaxed text-black">{desc}</p>
      </div>
    </div>
  );
};
