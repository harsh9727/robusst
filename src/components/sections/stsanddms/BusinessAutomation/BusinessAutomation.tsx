"use client";

import {
  Cloud,
  HeartHandshake,
  ShieldCheck,
  Boxes,
  BadgeCheck,
  Headset,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import type { BusinessAutomationSection } from "~/i18n/types/stsAndDms";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Cloud,
  HeartHandshake,
  ShieldCheck,
  Boxes,
  BadgeCheck,
  Headset,
};

export default function BusinessAutomation() {
  const t = useTranslations();
  const businessAutomation = t.raw(
    "sts_and_dms_page.businessAutomation",
  ) as BusinessAutomationSection;

  return (
    <section className="relative overflow-hidden bg-white py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-10 max-w-3xl">
          <h2 className="mt-5 text-4xl leading-tight font-extrabold text-gray-900 lg:text-5xl">
            {businessAutomation.title}
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-gray-600">
            {businessAutomation.subtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {businessAutomation.products.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <div
                key={i}
                className="group shadow-brand-one border-brand-one rounded-7 relative border bg-white p-10 shadow-[0px_0px_0px] duration-150 hover:shadow-[0px_0px_30px]"
              >
                {/* Icon */}
                {Icon && (
                  <div className="relative mb-8">
                    <div className="from-brand-one to-brand-one relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                )}

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-5 text-base leading-relaxed text-gray-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
