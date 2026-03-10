"use client";

import Image from "next/image";
import { Radar, Activity, ShieldAlert, LineChart } from "lucide-react";
import { platform } from "public";

export default function SIEM() {
  return (
    <section className="relative overflow-hidden bg-[#0A0F1C] py-24">
      {/* Background glow */}
      <div className="blur-30 absolute -top-40 -right-40 h-105 w-105 rounded-full bg-cyan-500/20" />
      <div className="blur-30 absolute bottom-0 -left-32 h-90 w-90 rounded-full bg-indigo-500/20" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-12">
        {/* LEFT – DATA PANEL */}
        <div className="relative lg:col-span-6">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 blur-xl" />

          <div className="relative h-150 w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            <Image
              src={platform.cmp}
              alt="SIEM Command Center"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Floating HUD label */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-cyan-400/30 bg-[#020617] px-6 py-2 text-sm text-cyan-400 shadow-lg">
            Real-Time Threat Intelligence
          </div>
        </div>

        {/* RIGHT – COMMAND VISUAL */}
        <div className="lg:col-span-6">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cyan-400">
            <Radar size={16} />
            SIEM MODULE
          </div>

          <h2 className="text-4xl leading-tight font-extrabold text-white md:text-5xl">
            Security Information <br />& Event Management
          </h2>

          <p className="mt-6 max-w-xl text-lg text-gray-400">
            Centralised log and event intelligence designed for modern SOCs —
            providing real-time visibility, behavioural analytics and compliance
            insights across your entire digital estate.
          </p>

          {/* Feature Grid */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              {
                icon: Activity,
                text: "Unified log & event ingestion across endpoints, networks, applications and cloud.",
              },
              {
                icon: ShieldAlert,
                text: "Advanced analytics (UEBA & behaviour tracking) to identify anomalies and threats.",
              },
              {
                icon: LineChart,
                text: "Compliance dashboards, audit trails and regulatory reporting built-in.",
              },
              {
                icon: Radar,
                text: "Single pane of glass for faster detection, response and reduced blind spots.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group flex gap-4 rounded-xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
              >
                <item.icon className="shrink-0 text-cyan-400" size={22} />
                <p className="text-sm leading-relaxed text-gray-300">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
