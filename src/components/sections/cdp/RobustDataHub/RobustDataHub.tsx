"use client";

import Image from "next/image";
import { Button } from "~/components/ui/button";
import { platform } from "public";

export const RobustDataHub = () => {
  return (
    <section className="relative overflow-hidden bg-[#050816] px-6 py-24">
      {/* Background glows */}
      <div className="blur-30 absolute -top-32 -left-32 h-125 w-125 bg-cyan-500/20" />
      <div className="blur-30 absolute right-0 bottom-0 h-125 w-125 bg-purple-600/20" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* LEFT CONTENT */}
        <div>
          <h2 className="mb-8 text-4xl leading-tight font-extrabold text-white md:text-5xl">
            ROBUSST
            <span className="ml-4 font-extrabold text-pink-500">DATA HUB</span>
          </h2>

          <p className="mb-6 leading-relaxed text-gray-300">
            <strong className="text-pink-500">Problem Solved : </strong>
            Siloed customer data scattered across multiple systems leads to
            fragmented views and inconsistent customer experiences.
          </p>

          <p className="leading-relaxed text-gray-300">
            <strong className="text-pink-500">Robusst Data Hub </strong>{" "}
            ingests, cleanses, and unifies customer data from CRM, billing,
            network, digital channels, and offline sources — delivering a single
            source of truth for real-time, accurate customer intelligence.
          </p>

          <Button className="mt-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-10 py-6 text-white transition hover:from-cyan-600 hover:to-purple-700">
            Learn More
          </Button>
        </div>

        {/* RIGHT VISUAL CARD */}
        <div className="relative flex justify-center">
          <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
            {/* Image */}
            <div className="relative h-72 w-full overflow-hidden rounded-2xl">
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
                <span className="font-semibold text-cyan-300">Connected</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Billing</span>
                <span className="font-semibold text-cyan-300">Unified</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Network</span>
                <span className="font-semibold text-cyan-300">Real-Time</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Digital Channels</span>
                <span className="font-semibold text-cyan-300">Synced</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
