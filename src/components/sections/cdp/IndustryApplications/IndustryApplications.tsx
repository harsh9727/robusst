"use client";

import { Card, CardContent } from "~/components/ui/card";
import { Wifi, Landmark, ShoppingCart, HeartPulse } from "lucide-react";
import { useTranslations } from "next-intl";
import type { IndustryApplicationsSection } from "~/i18n/types/cdp";

const iconMap = [Wifi, Landmark, ShoppingCart, HeartPulse];
const gradientMap = [
  "from-cyan-400 to-blue-600",
  "from-yellow-400 to-orange-500",
  "from-emerald-400 to-teal-600",
  "from-pink-400 to-purple-600",
];

export const IndustryApplications = () => {
  const t = useTranslations();
  const industrySection = t.raw("cdp_page")
    .industryApplications as IndustryApplicationsSection;
  return (
    <>
      <div className="w-full overflow-hidden bg-white sm:-mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 150">
          <path
            d="M0,80 C300,50 400,50 600,80 C800,110 900,110 1200,80 L1200,200 L0,200 Z"
            fill="#000000"
          />
        </svg>
      </div>
      <section className="relative overflow-hidden bg-black py-24">
        {/* Background glow */}
        <div className="absolute -top-40 -right-40 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[120px]" />
        <div className="absolute bottom-0 -left-32 h-[360px] w-[360px] rounded-full bg-indigo-500/20 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl">
          {/* Heading */}
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-extrabold text-white md:text-5xl">
              {industrySection.heading.split(" ").map((word, idx) =>
                word === "Applications" ? (
                  <span key={idx} className="text-pink-500">
                    {word}
                  </span>
                ) : idx === 0 ? (
                  word + " "
                ) : (
                  word
                ),
              )}
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              {industrySection.subheading}
            </p>
          </div>

          {/* Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {industrySection.industries.map((item, i) => {
              const Icon = iconMap[i];
              const gradient = gradientMap[i];
              if (!Icon) return null;
              return (
                <Card
                  key={i}
                  className="group relative overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(59,130,246,0.35)]"
                >
                  {/* Glow Border */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${gradient}`}
                  />
                  <div className="absolute inset-[1px] rounded-xl bg-slate-950" />

                  <CardContent className="relative z-10 p-6">
                    {/* Icon */}
                    <div
                      className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${gradient}`}
                    >
                      <Icon className="h-7 w-7 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="mb-2 text-xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-400">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      <div className="w-full overflow-hidden bg-white sm:-mt-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 150"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 C300,150 400,150 600,120 C800,90 900,90 1200,120 L1200,0 L0,0 Z"
            fill="#000000"
            stroke="none"
          />
        </svg>
      </div>
    </>
  );
};
