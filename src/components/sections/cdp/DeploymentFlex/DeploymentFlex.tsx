"use client";

import Image from "next/image";
import { Cloud, Server, Layers } from "lucide-react";
import { Button } from "~/components/ui/button";
import { platform } from "public";

export const DeploymentFlex = () => {
  return (
    <section className="relative bg-[#0A0F1C] py-24 overflow-hidden">

      {/* Background glow */}
      <div className="absolute -top-40 -right-40 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute bottom-0 -left-32 h-[360px] w-[360px] rounded-full bg-indigo-500/20 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* CONTENT SIDE */}
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Robusst <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Deployment Flex
              </span>
            </h2>

            <p className="mt-6 text-pink-400 font-semibold max-w-xl">
              Problem Solved: Rigid platforms that don’t fit existing IT
              infrastructure or data residency needs.
            </p>

            <p className="mt-4 text-slate-300 max-w-xl leading-relaxed">
              Flexible deployment models across cloud, hybrid, and on-premise
              environments with seamless integration into data warehouses —
              safeguarding control while accelerating time-to-value.
            </p>

            {/* Feature bullets */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-slate-300">
                <Cloud className="h-5 w-5 text-cyan-400" />
                Multi-cloud & private cloud support
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Server className="h-5 w-5 text-cyan-400" />
                On-prem deployment with full control
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Layers className="h-5 w-5 text-cyan-400" />
                Seamless warehouse & data stack integration
              </div>
            </div>

            <Button className="mt-10 rounded-full px-10 py-6 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white transition">
              Learn More
            </Button>
          </div>
          {/* IMAGE SIDE */}
          <div className="relative group h-[530px] rounded-3xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl">
            <Image
              src={platform.cmp}
              alt="Robusst Deployment Flex"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/30 to-transparent" />

            {/* Floating tag */}
            <div className="absolute bottom-6 left-0 right-0 mx-auto w-fit rounded-xl bg-white/10 backdrop-blur px-5 py-3 border border-white/15">
              <p className="text-cyan-400 text-sm font-semibold">
                Cloud · Hybrid · On-Prem
              </p>
              <p className="text-slate-300 text-xs">
                Deploy anywhere with confidence
              </p>
            </div>
          </div>



        </div>
      </div>
    </section>
  );
};
