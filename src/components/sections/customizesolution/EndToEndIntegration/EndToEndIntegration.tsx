"use client";

import Image from "next/image";
import { Plug, Cloud, Layers } from "lucide-react";
import { customizesolution } from "public";

export default function EndToEndIntegration() {
  return (
    <section className="relative overflow-hidden bg-[#070B14] py-24">
      {/* Ambient tech glow */}
      <div className="absolute -top-40 left-1/4 h-[520px] w-[520px] rounded-full bg-cyan-400/10 blur-[180px]" />
      <div className="absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[160px]" />

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.04]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-20 lg:grid-cols-2">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl leading-tight font-extrabold text-white lg:text-5xl">
              End-to-End Integration &
              <span className="ml-3 bg-gradient-to-r from-cyan-400 to-cyan-400 bg-clip-text text-transparent">
                Flexibility
              </span>
            </h2>

            <div className="mt-12 space-y-6">
              {[
                {
                  icon: Plug,
                  text: "Proven interoperability across vendors and technologies (Cisco, Nokia, Huawei, etc.).",
                },
                {
                  icon: Cloud,
                  text: "Cloud-native, API-driven architecture designed for flexibility — from BSS/OSS to customer experience systems.",
                },
                {
                  icon: Layers,
                  text: "Scalable integrations that reduce operational complexity and speed up deployment.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group flex gap-5 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all duration-500 hover:border-cyan-400/40 hover:bg-white/10 hover:shadow-[0_0_32px_rgba(52,211,153,0.18)]"
                >
                  <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400 transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_22px_rgba(52,211,153,0.45)]">
                    <item.icon size={22} />
                  </div>

                  <p className="text-sm leading-relaxed text-gray-300">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual */}
          <div className="group relative">
            {/* Glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-400/20 via-transparent to-cyan-400/20 opacity-70 blur-2xl transition group-hover:opacity-100" />

            <div className="relative h-[600px] w-full overflow-hidden rounded-3xl">
              <Image
                src={customizesolution.EndToEndIntegration}
                alt="End to End Integration Architecture"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
