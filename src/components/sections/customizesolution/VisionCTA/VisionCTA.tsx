"use client";

import Image from "next/image";
import { platform } from "public";

export default function VisionCTA() {
  return (
    <section className="relative overflow-hidden bg-black py-24">
      
      {/* Star / space background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ffffff10_1px,transparent_1px)] bg-[size:28px_28px] opacity-30" />

      {/* Ambient glows */}
      <div className="absolute -top-40 left-1/4 h-[520px] w-[520px] rounded-full bg-blue-500/20 blur-[180px]" />
      <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-pink-500/20 blur-[160px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        
        {/* Text */}
        <div className="mb-14 max-w-3xl">
          <h2 className="text-4xl font-extrabold leading-tight text-white lg:text-5xl">
            Let’s Build the Solution <br />
            <span className="bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent">
              Around Your Vision
            </span>
          </h2>

          <p className="mt-6 text-lg text-gray-300">
            Custom integrations. Scalable outcomes. Infinite possibilities.
          </p>
        </div>

        {/* Visual Card */}
        <div className="group relative">
          
          {/* Glow frame */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/40 via-transparent to-pink-500/40 blur-2xl opacity-70 transition group-hover:opacity-100" />

          <div className="relative h-[600px] w-full overflow-hidden rounded-3xl border border-white/20 bg-white/5 backdrop-blur">
            <Image
              src={platform.cdp1}
              alt="Build the Solution"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* CTA Button */}
          <div className="absolute bottom-6 left-6">
            <button
              className="rounded-full bg-gradient-to-r from-pink-500 to-pink-600 px-8 py-3
              text-sm font-semibold text-white
              transition-all duration-300
              hover:scale-105
              hover:shadow-[0_0_30px_rgba(236,72,153,0.6)]"
            >
              Request a Workshop
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
