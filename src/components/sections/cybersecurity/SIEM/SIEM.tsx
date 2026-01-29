"use client";

import Image from "next/image";
import {
  Radar,
  Activity,
  ShieldAlert,
  LineChart,
} from "lucide-react";
import { platform } from "public";

export default function SIEM() {
  return (
  <section className="relative bg-[#0A0F1C] py-24 overflow-hidden">

      {/* Background glow */}
      <div className="absolute -top-40 -right-40 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute bottom-0 -left-32 h-[360px] w-[360px] rounded-full bg-indigo-500/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-16 items-center">

        {/* LEFT – DATA PANEL */}
        <div className="lg:col-span-6 relative">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 blur-xl" />

          <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl h-[600px] w-full">
            <Image
              src={platform.cmp} 
              alt="SIEM Command Center"
              className="object-cover h-full w-full"
            />
          </div>

          {/* Floating HUD label */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#020617] border border-cyan-400/30 px-6 py-2 rounded-full text-sm text-cyan-400 shadow-lg">
            Real-Time Threat Intelligence
          </div>
        </div>
        

        {/* RIGHT – COMMAND VISUAL */}
        <div className="lg:col-span-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm mb-6">
            <Radar size={16} />
            SIEM MODULE
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Security Information <br />
            & Event Management
          </h2>

          <p className="mt-6 text-gray-400 text-lg max-w-xl">
            Centralised log and event intelligence designed for modern SOCs —
            providing real-time visibility, behavioural analytics and compliance
            insights across your entire digital estate.
          </p>

          {/* Feature Grid */}
          <div className="mt-10 grid md:grid-cols-2 gap-6">
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
                className="group flex gap-4 p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
              >
                <item.icon className="text-cyan-400 shrink-0" size={22} />
                <p className="text-sm text-gray-300 leading-relaxed">
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
