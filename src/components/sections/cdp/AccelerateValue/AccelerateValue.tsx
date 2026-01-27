"use client";

import Image from "next/image";
import { Rocket, Plug, RefreshCw } from "lucide-react";
import { platform } from "public";

export const AccelerateValue = () => {
  return (
    <section className="relative overflow-hidden bg-[#050816] py-24 px-6">

      {/* Background glows */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-cyan-500/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/20 blur-[120px]" />

      {/* Subtle Grid Texture */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="relative mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-10">
            Accelerates time-to-value and supports
            complex telecom use cases
          </h2>

          <div className="space-y-6">

            {[
              {
                icon: Rocket,
                title: "Fast Commercial Use Case Implementation",
                desc: "Ready modules for personalized pricing, cross-sell, upsell, renewals, and retention.",
                color: "cyan",
              },
              {
                icon: Plug,
                title: "API Integration",
                desc: "Real-time access to customer data without middleware.",
                color: "pink",
              },
              {
                icon: RefreshCw,
                title: "Continuous Data Flow",
                desc: "Keeps every system updated with the latest customer insights.",
                color: "emerald",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur transition-all hover:bg-white/10"
              >
                {/* Hover Glow */}
                <div className={`absolute inset-0 rounded-xl opacity-0 blur-xl transition-opacity group-hover:opacity-100 bg-${item.color}-500/10`} />

                <div className={`relative flex h-12 w-12 items-center justify-center rounded-lg bg-${item.color}-500/10`}>
                  <item.icon className={`h-6 w-6 text-${item.color}-400`} />
                </div>

                <div className="relative">
                  <h4 className="font-semibold text-white mb-1">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-400">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT IMAGE WITH AURA */}
        <div className="group overflow-hidden rounded-2xl w-full h-[550px]">
          <Image
            src={platform.cmp}
            alt="AI Powered Customer Data Platform"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
        </div>


      </div>
    </section>
  );
};
