"use client";

import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { platform } from "public";
const points = [
  {
    title: "Builds Trust",
    desc: "Establishes confidence with enterprise-grade security controls.",
  },
  {
    title: "Prevents System Damage",
    desc: "Stops threats before they impact critical infrastructure.",
  },
  {
    title: "Protects Sensitive Data",
    desc: "Safeguards customer and business data at every layer.",
  },
  {
    title: "Supports Business Continuity",
    desc: "Ensures uninterrupted operations even during cyber incidents.",
  },
];

export default function WhyChooseRobusst() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      {/* Background glow */}
      <div className="absolute -top-40 -right-40 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute bottom-0 -left-32 h-[360px] w-[360px] rounded-full bg-indigo-500/20 blur-[120px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        {/* LEFT – Image Block */}
        <div className="relative h-[300px] w-full overflow-hidden rounded-l-[50%] rounded-r-xl duration-150 sm:h-[450px] lg:h-[550px]">
          <Image
            src="/solutions/cybersecurity/whyus.webp"
            alt="Robusst Cyber Security"
            fill
            className="h-full w-full object-cover"
          />
        </div>

        {/* RIGHT – Content */}
        <div>
          {/*<span className="w-fit rounded-full border border-emerald-400/40 px-3 py-2 text-sm font-semibold text-emerald-400">
            Why Choose Robusst
          </span>*/}
          <h2 className="text-brand-three mt-4 text-4xl leading-tight font-extrabold">
            Why Choose Robusst
          </h2>

          <h2 className="mt-6 text-xl leading-tight font-extrabold">
            Unified Cyber Defense Built for Modern Threats
          </h2>

          <p className="text-muted-foreground mt-1 max-w-xl">
            Robusst delivers unified defence across your entire digital
            infrastructure — combining zero-trust architecture, AI-driven
            intelligence and 24×7 expert monitoring.
          </p>

          {/* Bullet Points */}
          <div className="mt-10 space-y-6">
            {points.map((item, i) => (
              <div key={i} className="group flex gap-4">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-md border transition group-hover:border-emerald-400/40">
                  <ShieldCheck className="text-emerald-400" size={20} />
                </div>

                <div>
                  <h4 className="font-medium text-black">{item.title}</h4>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
