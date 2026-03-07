"use client";

import {
  Boxes,
  ShoppingCart,
  Users,
  BarChart3,
  Globe,
  Network,
  Percent,
  UserPlus,
  Route,
  Brain,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import type { SalesDistributionSection } from "~/i18n/types/stsAndDms";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Boxes,
  ShoppingCart,
  Users,
  BarChart3,
  Globe,
  Network,
  Percent,
  UserPlus,
  Route,
  Brain,
};

export default function SalesDistribution() {
  const t = useTranslations();
  const salesDistribution = t.raw(
    "sts_and_dms_page.salesDistribution",
  ) as SalesDistributionSection;

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
      <section className="relative overflow-hidden bg-black py-32">
        {/* Ambient glow */}

        <div className="relative mx-auto max-w-7xl px-6">
          {/* Heading */}
          <div className="mb-20 text-center">
            <h2 className="text-4xl font-extrabold tracking-wide text-white lg:text-5xl">
              {salesDistribution.title}{" "}
              <span className="text-cyan-400">
                {salesDistribution.titleHighlight}
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
              {salesDistribution.subtitle}
            </p>
          </div>

          {/* Modules Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {salesDistribution.modules.map((item, idx) => {
              const Icon = iconMap[item.icon];
              return (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all duration-500 ease-out hover:-translate-y-3 hover:border-cyan-400/50 hover:shadow-[0_0_60px_rgba(34,211,238,0.25)]"
                >
                  {/* Gradient hover overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.15),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Icon */}
                  {Icon && (
                    <div className="relative z-10 mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-cyan-400/20">
                      <Icon className="h-6 w-6 text-cyan-400 transition-transform duration-500 group-hover:scale-110" />
                    </div>
                  )}

                  {/* Content */}
                  <h3 className="relative z-10 mb-3 text-lg font-semibold text-white transition-colors duration-300 group-hover:text-cyan-300">
                    {item.title}
                  </h3>

                  <p className="relative z-10 text-sm leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
                    {item.description}
                  </p>

                  {/* Bottom glow line */}
                  <span className="absolute right-6 bottom-0 left-6 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-cyan-400 via-cyan-300 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                </div>
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
}
