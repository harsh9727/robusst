"use client";

import Image from "next/image";
import {
  Layers,
  Fingerprint,
  Megaphone,
  Brain,
  ShieldCheck,
  Cloud,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type { WhyChooseRobusstSection } from "~/i18n/types/cdp";

const iconMap = [Layers, Fingerprint, Megaphone, Brain, ShieldCheck, Cloud];

export const WhyChooseRobusst = () => {
  const t = useTranslations();
  const whyChooseSection = t.raw("cdp_page")
    .whyChooseRobusst as WhyChooseRobusstSection;
  return (
    <section className="relative bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-16">
          <h2 className="text-center text-3xl leading-tight font-extrabold text-slate-900 md:text-4xl">
            <span className="ml-3 text-pink-500">
              {whyChooseSection.heading}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
          {/* LEFT – Feature List */}
          <div className="lg:col-span-5">
            <div className="group">
              <div className="relative h-75 w-full overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-300 group-hover:border-pink-300 group-hover:shadow-lg">
                {/* Image */}
                <Image
                  src="/solutions/cdp/2.webp"
                  fill
                  alt="Telecom Use Cases"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* RIGHT – Illustration */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-7">
            {whyChooseSection.features.map((item, index) => {
              const Icon = iconMap[index];
              if (!Icon) return null;
              return (
                <div
                  key={index}
                  className="group flex items-center gap-4 rounded-full border border-sky-200 px-6 py-4 transition hover:border-pink-400 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-50 text-sky-500 transition group-hover:bg-pink-50 group-hover:text-pink-500">
                    <Icon size={20} />
                  </div>
                  <p className="font-semibold text-gray-900">{item.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
