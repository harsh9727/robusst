"use client";

import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";

export const WhyChooseRobusst = () => {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-24">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 h-[400px] w-[400px] bg-emerald-500/10 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] bg-blue-500/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT - Image */}
        <div className="relative group">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/30 to-blue-500/30 blur-xl opacity-60 group-hover:opacity-90 transition" />

          <div className="relative rounded-2xl overflow-hidden border border-white/10">
            <Image
              src="/why-choose-robusst.png" // replace with your image path
              alt="Cyber Security Protection"
              width={600}
              height={420}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* RIGHT - Content */}
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              WHY CHOOSE ROBUSST?
            </span>
          </h2>

          <ul className="space-y-3 text-gray-300 mb-10 text-sm md:text-base">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Builds trust",
              "Prevents system damage",
              "Protects sensitive data",
              "Supports business continuity",
            ].map((item, index) => (
              <Card
                key={index}
                className="group bg-gradient-to-r from-[#0a0f1f] to-[#0c1228] border border-white/10 hover:border-emerald-400/40 transition"
              >
                <CardContent className="flex items-center gap-3 p-4">
                  <CheckCircle className="text-emerald-400 w-5 h-5 group-hover:scale-110 transition" />
                  <p className="text-white text-sm font-medium">{item}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
