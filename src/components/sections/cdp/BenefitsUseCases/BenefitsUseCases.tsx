"use client";

import Image from "next/image";
import { Layers, Zap, Database, ShieldCheck, BellRing } from "lucide-react";
import { useTranslations } from "next-intl";
import type { BenefitsUseCasesSection } from "~/i18n/types/cdp";

const iconMap = [Layers, Zap, Database, BellRing, ShieldCheck];

export const BenefitsUseCases = () => {
  const t = useTranslations();
  const benefitsSection = t.raw("cdp_page")
    .benefitsUseCases as BenefitsUseCasesSection;

  return (
    <section className="relative overflow-hidden bg-white px-6 py-24">
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* LEFT CONTENT */}
        <div className="group shadow-brand-three relative h-150 w-full overflow-hidden rounded-2xl shadow-[0px_0px_10px] duration-300 hover:shadow-[0px_0px_50px]">
          <Image
            src="/solutions/cdp/1.webp"
            fill
            alt="AI Powered Customer Data Platform"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
        </div>

        {/* RIGHT IMAGE */}
        <div>
          <p className="text-brand-three mb-6 text-3xl leading-tight font-extrabold md:text-4xl">
            {benefitsSection.heading}
          </p>

          <h2 className="mb-6 text-2xl leading-tight font-extrabold text-gray-900">
            {benefitsSection.subheading}
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {benefitsSection.benefits.map((item, index) => {
              const Icon = iconMap[index];
              if (!Icon) return null;
              return (
                <div
                  key={index}
                  className="group rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-all hover:-translate-y-1 hover:border-pink-300 hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 min-w-11 items-center justify-center rounded-lg bg-pink-50 transition group-hover:bg-pink-100">
                      <Icon className="h-5 w-5 text-pink-600" />
                    </div>

                    <div>
                      <h4 className="mb-1 font-semibold text-black">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600">
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
