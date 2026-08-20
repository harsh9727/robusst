"use client";

import {
  Database,
  Smartphone,
  ShieldCheck,
  FileSearch,
  Settings,
  Plug,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { SanityStsDmsSection } from "~/types/sanity/stsDms";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Database,
  Smartphone,
  ShieldCheck,
  FileSearch,
  Settings,
  Plug,
};

type Props = {
  data: SanityStsDmsSection<"erpHrisIntegration">;
};

export default function ErpHrisIntegration({ data }: Props) {
  if (!data) return null;

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

      <section className="relative overflow-hidden bg-black py-28">
        <div className="relative mx-auto max-w-7xl px-6">
          {/* Header */}
          <div className="mb-20 text-center">
            <span className="text-md inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 font-semibold text-emerald-400">
              {data.badge}
            </span>

            <h2 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
              {data.title}
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-gray-400">
              {data.subtitle}
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {(data.features ?? []).map((item, i) => {
              const Icon = iconMap[item.icon ?? ""];
              return (
                <div
                  key={i}
                  className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]"
                >
                  {Icon && (
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400/20 to-blue-500/20 text-emerald-400">
                      <Icon className="h-6 w-6" />
                    </div>
                  )}

                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-400">
                    {item.description}
                  </p>
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
