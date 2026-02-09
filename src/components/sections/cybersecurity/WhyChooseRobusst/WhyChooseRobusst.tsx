"use client";

import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";

export const WhyChooseRobusst = () => {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-24">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 h-[400px] w-[400px] bg-emerald-500/10 blur-[140px]" />
      <div className="absolute right-0 bottom-0 h-[400px] w-[400px] bg-blue-500/10 blur-[140px]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* LEFT - Image */}
        <div className="group relative">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/30 to-blue-500/30 opacity-60 blur-xl transition group-hover:opacity-90" />

          <div className="relative overflow-hidden rounded-2xl border border-white/10">
            <Image
              src="/why-choose-robusst.png" // replace with your image path
              alt="Cyber Security Protection"
              width={600}
              height={420}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* RIGHT - Content */}
        <div>
          <h2 className="mb-6 text-4xl font-extrabold md:text-5xl">
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              WHY CHOOSE ROBUSST?
            </span>
          </h2>

          <ul className="mb-10 space-y-3 text-sm text-gray-300 md:text-base">
            <li>
              • Unified defence across your entire digital infrastructure built
              for today’s threat landscape
            </li>
            <li>
              • 24×7 monitoring, automated response & expert analysts on-call
            </li>
            <li>
              • Zero-trust approach, cloud-ready, AI-driven and vendor-agnostic
            </li>
          </ul>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              "Builds trust",
              "Prevents system damage",
              "Protects sensitive data",
              "Supports business continuity",
            ].map((item, index) => (
              <Card
                key={index}
                className="group border border-white/10 bg-gradient-to-r from-[#0a0f1f] to-[#0c1228] transition hover:border-emerald-400/40"
              >
                <CardContent className="flex items-center gap-3 p-4">
                  <CheckCircle className="h-5 w-5 text-emerald-400 transition group-hover:scale-110" />
                  <p className="text-sm font-medium text-white">{item}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
