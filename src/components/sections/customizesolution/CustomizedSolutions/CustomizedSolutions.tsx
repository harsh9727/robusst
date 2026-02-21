"use client";

import Image from "next/image";
import { customizesolution } from "public";
import { Button } from "~/components/ui/button";

export default function CustomizedSolutions() {
  return (
    <section className="relative overflow-hidden bg-[#0A0F1C] py-24">
      {/* Background glow */}
      <div className="absolute -top-40 -right-40 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute bottom-0 -left-32 h-[360px] w-[360px] rounded-full bg-indigo-500/20 blur-[120px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        {/* LEFT – Image Block */}
        <div className="relative h-[350px] w-full overflow-hidden rounded-xl border border-white/10">
          <Image
            src={customizesolution.CustomizeSolution}
            alt="Robusst Cyber Security"
            className="h-full w-full object-cover"
          />
        </div>

        {/* RIGHT – Content */}
        <div>
          <h2 className="mt-4 text-4xl leading-tight font-extrabold text-white">
            Customized Solutions Built Around Your Challenges
          </h2>

          <p className="mt-6 max-w-xl text-gray-400">
            Every operator’s journey is different. Robusst co‑creates digital
            frameworks that solve your specific telecom challenges – from
            operational gaps to data silos – through agility, AI, and
            innovation.
          </p>

          <Button className="mt-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-10 py-6 text-white transition hover:from-cyan-600 hover:to-purple-700">
            Talk to a solution expert
          </Button>
        </div>
      </div>
    </section>
  );
}
