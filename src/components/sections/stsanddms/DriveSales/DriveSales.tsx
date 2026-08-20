"use client";

import Image from "next/image";
import { MapPin, Wallet, TrendingUp, UserCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { SanityStsDmsSection } from "~/types/sanity/stsDms";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  MapPin,
  Wallet,
  TrendingUp,
  UserCheck,
};

interface DriveSalesProps {
  data: SanityStsDmsSection<"driveSales">;
}

export default function DriveSales({ data }: DriveSalesProps) {
  if (!data) return null;

  return (
    <section className="relative bg-white px-6 py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-15 lg:grid-cols-2">
        {/* LEFT CONTENT */}
        <div>
          <h2 className="mb-5 text-4xl leading-tight font-extrabold text-slate-900 md:text-5xl">
            {data.title} <br />
            <span className="text-pink-500">{data.titleHighlight}</span>
          </h2>

          {(data.useCases ?? []).map((item, i) => {
            const Icon = iconMap[item.icon ?? ""];

            return (
              <div
                key={i}
                className="group mb-3 flex items-center gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 transition-all duration-300 hover:border-pink-300 hover:shadow-md"
              >
                {Icon && (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-pink-50 text-pink-500 transition-colors duration-300 group-hover:bg-pink-500 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                )}

                <span className="text-md font-semibold text-slate-700">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
        {/* RIGHT VISUAL */}
        <div className="group">
          <div className="relative h-107.5 w-full overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-300 group-hover:border-pink-300 group-hover:shadow-lg">
            {/* Image */}
            <Image
              src={data.image ?? ""}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
              alt={data.imageAlt ?? data.title ?? ""}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
