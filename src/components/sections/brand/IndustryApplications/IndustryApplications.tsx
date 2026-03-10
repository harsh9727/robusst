"use client";

import {
  Plane,
  Cpu,
  HeartPulse,
  Landmark,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import Marquee from "react-fast-marquee";
import { useTranslations } from "next-intl";
import type { IndustryApplicationsSection } from "~/i18n/types/brand";

const iconMap = [Landmark, HeartPulse, ShoppingBag, Plane, ShieldCheck, Cpu];

export const IndustryApplications = () => {
  const t = useTranslations();
  const industrySection = t.raw("brand_page")
    .industryApplications as IndustryApplicationsSection;
  return (
    <section className="w-full overflow-hidden bg-white px-4 py-16 sm:px-6 lg:px-16">
      <div className="relative mx-auto max-w-7xl">
        <div className="lg:col-span-3">
          <h2 className="mb-4 text-3xl font-extrabold text-gray-900 uppercase">
            {industrySection.heading}
          </h2>

          <p className="text-base leading-relaxed text-gray-700">
            {industrySection.subheading}
          </p>
        </div>

        <Marquee className="mt-9">
          {industrySection.industries.map((industry, index) => {
            const Icon = iconMap[index];
            const colors = [
              "bg-indigo-500",
              "bg-sky-500",
              "bg-teal-500",
              "bg-purple-500",
              "bg-red-500",
              "bg-orange-500",
            ];
            const color = colors[index % colors.length] ?? "bg-indigo-500";
            return (
              <IndustryCard
                key={index}
                icon={Icon ? <Icon /> : null}
                title={industry.title}
                desc={industry.description}
                color={color}
              />
            );
          })}
        </Marquee>
      </div>
    </section>
  );
};

/* Industry Card */
const IndustryCard = ({
  icon,
  title,
  desc,
  color,
}: {
  icon: React.ReactNode | null;
  title: string;
  desc: string;
  color: string;
}) => {
  return (
    <div className="group mx-5 rounded-2xl border border-gray-200 bg-white p-5 transition hover:shadow-lg">
      <div
        className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-white ${color}`}
      >
        {icon}
      </div>

      <h3 className="mb-2 text-sm font-semibold text-black">{title}</h3>

      <p className="text-sm leading-relaxed text-gray-600">{desc}</p>
    </div>
  );
};
