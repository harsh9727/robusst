"use client";

import Image from "next/image";
import { Link2, Cpu, Database, ShieldCheck } from "lucide-react";
import { platform } from "public";
import { useTranslations } from "next-intl";
import type { KeyFeaturesCapabilitiesSection } from "~/i18n/types/cdp";

const iconMap = [Link2, Cpu, Database, ShieldCheck];

export const KeyFeaturesCapabilities = () => {
  const t = useTranslations();
  const keyFeaturesSection = t.raw("cdp_page")
    .keyFeaturesCapabilities as KeyFeaturesCapabilitiesSection;
  return (
    <section className="relative bg-gradient-to-b from-white to-slate-50 px-6 py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* LEFT – CONTENT */}

        <div className="group h-[250px ] relative w-full overflow-hidden rounded-2xl sm:h-[450px] lg:h-[550px]">
          <Image
            src="/solutions/cdp/5.webp"
            fill
            alt="AI Powered Customer Data Platform"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
        </div>

        {/* RIGHT – IMAGE */}

        <div>
          <p className="text-brand-three mb-6 text-3xl leading-tight font-extrabold md:text-4xl">
            {keyFeaturesSection.heading}
          </p>

          <h2 className="mb-6 text-2xl leading-tight font-extrabold text-gray-900">
            {keyFeaturesSection.subheading}
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {keyFeaturesSection.features.map((item, index) => {
              const Icon = iconMap[index];
              if (!Icon) return null;
              return (
                <div
                  key={index}
                  className="group rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-all hover:-translate-y-1 hover:border-pink-300 hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 min-w-11 items-center justify-center rounded-md bg-pink-50">
                      <Icon className="h-6 w-6 text-pink-500" />
                    </div>

                    <div>
                      <h4 className="mb-1 font-semibold text-slate-900">
                        {item.title}
                      </h4>
                      <p className="text-sm text-slate-600">
                        {item.description}
                      </p>
                    </div>
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
