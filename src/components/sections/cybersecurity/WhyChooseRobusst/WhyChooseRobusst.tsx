"use client";

import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { platform } from "public";
const points = [
  {
    title: "Builds Trust",
    desc: "Establishes confidence with enterprise-grade security controls."
  },
  {
    title: "Prevents System Damage",
    desc: "Stops threats before they impact critical infrastructure."
  },
  {
    title: "Protects Sensitive Data",
    desc: "Safeguards customer and business data at every layer."
  },
  {
    title: "Supports Business Continuity",
    desc: "Ensures uninterrupted operations even during cyber incidents."
  },
];

export default function WhyChooseRobusst() {
  return (
    <section className="relative bg-[#0A0F1C] py-24 overflow-hidden">

      {/* Background glow */}
      <div className="absolute -top-40 -right-40 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute bottom-0 -left-32 h-[360px] w-[360px] rounded-full bg-indigo-500/20 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT – Image Block */}
          <div className="relative overflow-hidden rounded-xl border border-white/10 h-[550px] w-full">
            <Image
              src={platform.cmp}
              alt="Robusst Cyber Security"
              className="object-cover w-full h-full"
            />
        </div>

        {/* RIGHT – Content */}
        <div>
          <span className="text-sm font-semibold text-emerald-400 py-2 px-3 border rounded-full w-fit border-emerald-400/40">
            Why Choose Robusst
          </span>

          <h2 className="mt-4 text-4xl font-extrabold text-white leading-tight">
            Unified Cyber Defense<br />Built for Modern Threats
          </h2>

          <p className="mt-6 text-gray-400 max-w-xl">
            Robusst delivers unified defence across your entire digital
            infrastructure — combining zero-trust architecture, AI-driven
            intelligence and 24×7 expert monitoring.
          </p>

          {/* Bullet Points */}
          <div className="mt-10 space-y-6">
            {points.map((item, i) => (
              <div
                key={i}
                className="flex gap-4 group"
              >
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white/5 border border-white/10 group-hover:border-emerald-400/40 transition">
                  <ShieldCheck className="text-emerald-400" size={20} />
                </div>

                <div>
                  <h4 className="text-white font-medium">
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

      </div>
    </section>
  );
}
