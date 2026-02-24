"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { platform } from "public";
import { useTranslations } from "next-intl";
import type { CtaSection as CtaSectionType } from "~/i18n/types/cdp";

export const CtaSection = () => {
  const t = useTranslations();
  const ctaSection = t.raw("cdp_page").ctaSection as CtaSectionType;
  return (
    <section className="relative overflow-hidden bg-white px-6 py-28">
      {/* Glow Accents */}

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* LEFT CONTENT */}
        <div>
          <h2 className="mb-6 text-4xl leading-tight font-extrabold text-black md:text-5xl">
            {ctaSection.heading.split("Data-Driven Transformation")[0]}
            <br />
            <span className="text-pink-500">
              Data-Driven Transformation
            </span>{" "}
            Today
          </h2>

          <p className="mb-10 max-w-xl text-lg text-black">
            {ctaSection.description}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            {/* Primary CTA */}
            <button className="group inline-flex items-center gap-3 rounded-full bg-pink-500 px-5 py-2 font-semibold text-[#050914] shadow-lg transition hover:bg-pink-500">
              {ctaSection.primaryCta}
              <span className="flex h-9 min-w-9 items-center justify-center rounded-full bg-black/20 transition group-hover:translate-x-1">
                <ArrowRight className="h-5 w-5" />
              </span>
            </button>

            {/* Secondary CTA */}
            <button className="rounded-full border border-white/20 px-7 py-4 font-semibold text-black transition hover:border-pink-500 hover:text-pink-500">
              {ctaSection.secondaryCta}
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          {/* Image Glow */}
          <div className="absolute -inset-6 rounded-3xl bg-pink-500/20 blur-[90px]" />

          <div className="relative h-[500px] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur">
            <Image
              src="/solutions/cdp/2.webp"
              fill
              alt="Robust CDP Platform"
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
