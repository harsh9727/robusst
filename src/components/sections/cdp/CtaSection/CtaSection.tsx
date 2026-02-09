"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { platform } from "public";

export const CtaSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#050914] px-6 py-28">

      {/* Glow Accents */}
      <div className="absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-pink-500/15 blur-[180px]" />
      <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-indigo-500/15 blur-[180px]" />

      <div className="relative mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
            Begin Your <br />
            <span className="text-pink-500">
              Data-Driven Transformation
            </span>{" "}
            Today
          </h2>

          <p className="text-lg text-white max-w-xl mb-10">
            Discover how Robust CDP’s modular, enterprise-ready solutions
            drive measurable business results. Book your demo or contact
            our experts now.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            {/* Primary CTA */}
            <button className="group inline-flex items-center gap-3 rounded-full bg-pink-500 px-5 py-2 text-[#050914] font-semibold shadow-lg transition hover:bg-pink-500">
              Book a Demo
              <span className="flex h-9 min-w-9 items-center justify-center rounded-full bg-black/20 transition group-hover:translate-x-1">
                <ArrowRight className="h-5 w-5" />
              </span>
            </button>

            {/* Secondary CTA */}
            <button className="rounded-full border border-white/20 px-7 py-4 font-semibold text-white transition hover:border-pink-500 hover:text-pink-500">
              Get a Consultation
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          {/* Image Glow */}
          <div className="absolute -inset-6 rounded-3xl bg-pink-500/20 blur-[90px]" />

          <div className="relative w-full h-[500px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur shadow-2xl">
            <Image
              src={platform.cmp}
              alt="Robust CDP Platform"
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
