"use client";

import Image from "next/image";
import { TrendingUp, BarChart3, Clock, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Stsanddms_JsonType } from "~/types/api/stsanddms_json.types";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  TrendingUp,
  BarChart3,
  Clock,
  Target,
};

type Props = {
  data?: Stsanddms_JsonType["sts_and_dms_page"]["successStories"];
};

export default function SuccessStories({ data }: Props) {
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
      <section className="relative overflow-hidden bg-black py-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Heading */}
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-extrabold text-white md:text-5xl">
              {data.title}
            </h2>
            <p className="mt-4 text-lg text-gray-400">{data.subtitle}</p>
          </div>

          <div className="grid items-start gap-14 lg:grid-cols-12">
            {/* LEFT TIMELINE */}
            <div className="relative lg:col-span-6">
              {/* Vertical Line */}
              <div className="absolute top-0 left-4 h-full w-0.5 bg-gradient-to-b from-cyan-400 to-blue-600"></div>

              <div className="space-y-7">
                {data.stories.map((item, i) => {
                  const Icon = iconMap[item.icon];
                  return (
                    <div key={i} className="flex gap-5">
                      {/* Bullet Circle */}
                      {Icon && (
                        <div className="relative z-10 flex h-10 min-w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-black">
                          <Icon size={20} />
                        </div>
                      )}

                      {/* Content Card */}
                      <div className="w-full rounded-xl border border-gray-800 bg-gray-900 p-5">
                        <h4 className="mb-2 text-lg font-semibold text-white">
                          {item.title}
                        </h4>
                        <p className="leading-relaxed text-gray-400">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="lg:col-span-6">
              <div className="relative h-62.5 w-full overflow-hidden rounded-2xl border border-gray-800 sm:h-125 lg:h-150">
                <Image
                  src={data.image}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
                  alt={data.imageAlt}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
