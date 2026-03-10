"use client";

import Image from "next/image";
import { Cloud, Server, Layers } from "lucide-react";
import { Button } from "~/components/ui/button";
import { platform } from "public";

export const DeploymentFlex = () => {
  return (
    <section className="relative overflow-hidden bg-[#0A0F1C] py-24">
      {/* Background glow */}
      <div className="blur-[100px] absolute -top-40 -right-40 h-105 w-105 rounded-full bg-cyan-500/20" />
      <div className="blur-[100px] absolute bottom-0 -left-32 h-90 w-90 rounded-full bg-indigo-500/20" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* CONTENT SIDE */}
          <div>
            <h2 className="text-4xl leading-tight font-extrabold text-white md:text-5xl">
              Robusst <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Deployment Flex
              </span>
            </h2>

            <p className="mt-6 max-w-xl font-semibold text-pink-400">
              Problem Solved: Rigid platforms that don’t fit existing IT
              infrastructure or data residency needs.
            </p>

            <p className="mt-4 max-w-xl leading-relaxed text-slate-300">
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

            <Button className="mt-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-10 py-6 text-white transition hover:from-cyan-600 hover:to-purple-700">
              Learn More
            </Button>
          </div>
          {/* IMAGE SIDE */}
          <div className="group relative h-132.5 overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
            <Image
              src={platform.cmp}
              alt="Robusst Deployment Flex"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/30 to-transparent" />

            {/* Floating tag */}
            <div className="absolute right-0 bottom-6 left-0 mx-auto w-fit rounded-xl border border-white/15 bg-white/10 px-5 py-3 backdrop-blur">
              <p className="text-sm font-semibold text-cyan-400">
                Cloud · Hybrid · On-Prem
              </p>
              <p className="text-xs text-slate-300">
                Deploy anywhere with confidence
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
