"use client";

import Image from "next/image";
import { Handshake, Users, Globe } from "lucide-react";
import { platform } from "public";
import { useTranslations } from "next-intl";
import type { CommitmentToExcellenceSection } from "~/i18n/types/customizeSolution";

const iconMap = [Handshake, Users, Globe];

export default function CommitmentToExcellence() {
  const t = useTranslations();
  const commitmentSection = t.raw("customized_solution_page")
    .commitmentToExcellence as CommitmentToExcellenceSection;
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Left Content */}

          <div className="group relative">
            <div className="relative h-[500px] w-full overflow-hidden rounded-3xl border border-gray-200 bg-white">
              <Image
                src="/solutions/customized/8.webp"
                fill
                alt="Commitment to Excellence and Partnership"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Right Image */}
          <div>
            <h2 className="text-4xl leading-tight font-extrabold text-gray-900 lg:text-5xl">
              {commitmentSection.heading.split("Partnership")[0]}
              <span className="relative inline-block text-pink-500">
                Partnership
              </span>
            </h2>

            <div className="mt-7 space-y-6">
              {commitmentSection.features.map((item, i) => {
                const Icon = iconMap[i];
                if (!Icon) return null;
                return (
                  <div
                    key={i}
                    className="group flex gap-5 rounded-xl border border-gray-200 bg-white p-6 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-pink-500/40 hover:bg-pink-50/40 hover:shadow-[0_16px_36px_rgba(236,72,153,0.14)]"
                  >
                    <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-pink-500/10 text-pink-600 transition-all duration-500 group-hover:scale-110 group-hover:bg-pink-500/15 group-hover:shadow-[0_0_18px_rgba(236,72,153,0.35)]">
                      <Icon size={22} />
                    </div>

                    <p className="text-sm leading-relaxed text-gray-600">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
