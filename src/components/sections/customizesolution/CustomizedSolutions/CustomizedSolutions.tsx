"use client";

import Image from "next/image";
import { platform } from "public";
import { Button } from "~/components/ui/button";


export default function CustomizedSolutions() {
  return (
    <section className="relative bg-[#0A0F1C] py-24 overflow-hidden">

      {/* Background glow */}
      <div className="absolute -top-40 -right-40 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute bottom-0 -left-32 h-[360px] w-[360px] rounded-full bg-indigo-500/20 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT – Image Block */}
        <div className="relative overflow-hidden rounded-xl border border-white/10 h-[350px] w-full">
          <Image
            src={platform.cmp}
            alt="Robusst Cyber Security"
            className="object-cover w-full h-full"
          />
        </div>

        {/* RIGHT – Content */}
        <div>

          <h2 className="mt-4 text-4xl font-extrabold text-white leading-tight">
            Customized Solutions Built Around Your Challenges
          </h2>

          <p className="mt-6 text-gray-400 max-w-xl">
            Every operator’s journey is different. Robusst co‑creates digital frameworks that solve your specific telecom challenges – from operational gaps to data silos – through agility, AI, and innovation.
          </p>

          <Button className="mt-10 rounded-full px-10 py-6 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white transition">
            Talk to a solution expert
          </Button>
        </div>

      </div>
    </section>
  );
}
