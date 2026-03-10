"use client";

import Image from "next/image";
import { ArrowRight, Headset, Radar, ShieldCheck } from "lucide-react";
import { platform } from "public";

export default function MDR() {
  return (
    <section className="relative overflow-hidden bg-[#0A0F1C] py-24">
      {/* Background glow */}
      <div className="blur-[100px] absolute -top-40 -right-40 h-105 w-105 rounded-full bg-cyan-500/20" />
      <div className="blur-[100px] absolute bottom-0 -left-32 h-90 w-90 rounded-full bg-indigo-500/20" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* MAIN GRID */}
        <div className="grid items-center gap-14 lg:grid-cols-12">
          {/* LEFT CONTENT */}

          <div className="relative flex justify-center lg:col-span-6">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 blur-2xl" />

            <div className="relative h-150 w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl transition-transform duration-500 hover:-translate-y-2">
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
              <Headset size={16} />
              MDR Module
            </div>

            <h2 className="mb-5 text-4xl leading-tight font-extrabold text-white md:text-5xl">
              Managed Detection & Response
            </h2>

            <p className="mb-10 text-lg text-gray-400">
              24×7 monitoring and guided remediation – your SOC partner
            </p>

            {[
              {
                icon: Radar,
                title: "Threat Hunting as a Service",
                text: "Continuous monitoring, threat hunting and triage without the need for a full in-house SOC.",
              },
              {
                icon: ShieldCheck,
                title: "Actionable Guidance",
                text: "High-risk alerts are prioritised and paired with clear remediation steps to fix issues fast.",
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
            Ideal for organisations needing robust detection + response but not
            the full internal resources.
          </p>
        </div>
      </div>
    </section>
  );
}
