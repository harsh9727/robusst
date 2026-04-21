"use client";

import {
  ShoppingCart,
  Car,
  Paintbrush,
  Cable,
  Milk,
  Tv,
  Wine,
  Building2,
  Shirt,
  Sparkles,
  Pill,
  Pencil,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Marquee from "react-fast-marquee";
import type { Stsanddms_JsonType } from "~/types/api/stsanddms_json.types";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  ShoppingCart,
  Car,
  Paintbrush,
  Cable,
  Milk,
  Tv,
  Wine,
  Building2,
  Shirt,
  Sparkles,
  Pill,
  Pencil,
};

interface IndustryAgnosticProps {
  data?: Stsanddms_JsonType["sts_and_dms_page"]["industryAgnostic"];
}

export default function IndustryAgnostic({ data }: IndustryAgnosticProps) {
  if (!data) return null;

  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-2">
          {/* Left Content */}
          <div className="">
            <h2 className="text-5xl leading-tight font-extrabold text-pink-500">
              {data.title}
            </h2>

            <p className="text-md mt-1 text-black">{data.subtitle}</p>
          </div>

          {/* Industry Cards */}
          <Marquee className="mt-8">
            {data.industries.map((item, i) => {
              const Icon = iconMap[item.icon];
              return (
                <div key={i} className="group relative mx-5 w-40 rounded-2xl">
                  <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-xl bg-[#0b0f1a]">
                    {Icon && <Icon size={30} className="text-white" />}
                  </div>

                  <p className="mt-2 text-center text-lg font-semibold text-gray-800 transition-colors duration-300 group-hover:text-pink-500">
                    {item.title}
                  </p>
                </div>
              );
            })}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
