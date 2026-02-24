"use client";

import Image from "next/image";
import { ShieldCheck, Globe, Lock, ClipboardCheck } from "lucide-react";
import { platform } from "public";
import { useTranslations } from "next-intl";
import type { SecurityComplianceSection } from "~/i18n/types/brand";

const iconMap = [ShieldCheck, Globe, Lock, ClipboardCheck];

export const SecurityCompliance = () => {
  const t = useTranslations();
  const securitySection = t.raw("brand_page")
    .securityCompliance as SecurityComplianceSection;
  return (
    <section className="w-full bg-white px-4 py-20 sm:px-6 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 flex flex-col items-center justify-center gap-6 sm:items-center sm:gap-5">
          {/*<div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl">
            <Image
              src={platform.cmp}
              alt="Security and Compliance"
              fill
              className="object-contain"
            />
          </div>*/}

          <h2 className="text-brand-one text-3xl font-extrabold tracking-tight md:text-4xl">
            {securitySection.heading}
          </h2>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {securitySection.items.map((item, index) => {
            const Icon = iconMap[index];
            if (!Icon) return null;
            return (
              <div
                key={index}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <Icon className="text-brand-one mb-4 h-10 w-10" />
                <h4 className="mb-3 text-xl font-bold text-black">
                  {item.title}
                </h4>
                <p className="text-sm leading-relaxed text-gray-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
