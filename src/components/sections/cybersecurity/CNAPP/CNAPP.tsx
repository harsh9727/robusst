"use client";

import Image from "next/image";
import { Cloud, ShieldCheck, Layers, ArrowRight } from "lucide-react";
import { platform } from "public";

export default function CNAPP() {
  return (
    <section className="relative overflow-hidden bg-[#0A0F1C] py-24">
      {/* Background glow */}
      <div className="absolute -top-40 -right-40 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute bottom-0 -left-32 h-[360px] w-[360px] rounded-full bg-indigo-500/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* MAIN GRID */}
        <div className="grid items-center gap-14 lg:grid-cols-12">
          {/* LEFT CONTENT */}

          <div className="relative flex justify-center lg:col-span-6">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 blur-2xl" />

            <div className="relative h-[600px] w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl transition-transform duration-500 hover:-translate-y-2">
              <Image
                src={platform.cmp}
                alt="Endpoint Detection and Response"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="lg:col-span-6">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400">
              <Cloud size={16} />
              CNAPP Module
            </div>

            <h2 className="mb-5 text-4xl leading-tight font-extrabold text-white md:text-5xl">
              Cloud Security
            </h2>

            <p className="mb-10 text-lg text-gray-400">
              Continuous posture assessment + workload protection in multi-cloud
              and serverless
            </p>

            {[
              {
                icon: Layers,
                title: "Continuous Cloud Visibility",
                text: "Assesses cloud configuration, container and serverless protection with full multi-cloud visibility.",
              },
              {
                icon: ShieldCheck,
                title: "Compliance & Remediation",
                text: "Supports compliance and remediation guidance to secure cloud workloads.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group mt-5 flex items-start gap-5 rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/10"
              >
                <div className="flex h-12 min-w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white transition-transform duration-300 group-hover:scale-110">
                  <item.icon size={20} />
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white transition-colors group-hover:text-cyan-400">
                    {item.title}
                  </h4>
                  <p className="mt-2 leading-relaxed text-gray-400">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-20 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5">
          <ArrowRight className="mt-1 text-pink-500" size={28} />
          <p className="text-lg leading-relaxed text-gray-200">
            <span className="font-bold text-white uppercase">
              Why it matters :
            </span>{" "}
            Cloud infrastructure is dynamic—without continuous monitoring and
            protection you’re exposed.
          </p>
        </div>
      </div>
    </section>
  );
}
