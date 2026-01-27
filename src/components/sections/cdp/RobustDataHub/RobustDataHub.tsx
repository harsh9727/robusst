"use client";

import Image from "next/image";
import { Button } from "~/components/ui/button";
import { platform } from "public";

export const RobustDataHub = () => {
  return (
    <section className="relative overflow-hidden bg-[#050816] py-24 px-6">

      {/* Background glows */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-cyan-500/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/20 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-8">
            ROBUSST 
            <span className="text-pink-500 font-extrabold ml-4">
              DATA HUB
            </span>
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            <strong className="text-pink-500">Problem Solved : </strong>
            Siloed customer data scattered across multiple systems leads to
            fragmented views and inconsistent customer experiences.
          </p>

          <p className="text-gray-300 leading-relaxed">
            <strong className="text-pink-500">Robusst Data Hub </strong> ingests,
            cleanses, and unifies customer data from CRM, billing, network,
            digital channels, and offline sources — delivering a single source
            of truth for real-time, accurate customer intelligence.
          </p>

          <Button className="mt-10 rounded-full px-10 py-6 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white transition">
            Learn More
          </Button>
        </div>

        {/* RIGHT VISUAL CARD */}
        <div className="relative flex justify-center">
          <div className="relative w-full max-w-md rounded-3xl bg-white/5 backdrop-blur border border-white/10 shadow-2xl p-6">

            {/* Image */}
            <div className="relative h-72   w-full rounded-2xl overflow-hidden">
              <Image
                src={platform.cmp}
                alt="Robust Data Hub"
                fill
                className="object-cover"
              />
            </div>

            {/* Floating data points */}
            <div className="mt-6 space-y-4 text-sm text-gray-300">
              <div className="flex justify-between">
                <span className="font-semibold">CRM</span>
                <span className="text-cyan-300 font-semibold">Connected</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Billing</span>
                <span className="text-cyan-300 font-semibold">Unified</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Network</span>
                <span className="text-cyan-300 font-semibold">Real-Time</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Digital Channels</span>
                <span className="text-cyan-300 font-semibold">Synced</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
