"use client";

import Image from "next/image";
import { ShieldAlert, Activity, SearchCheck, ArrowRight } from "lucide-react";
import { platform } from "public";

export default function EDR() {
  return (
    <section className="relative bg-[#0A0F1C] py-24 overflow-hidden">

      {/* Background glow */}
      <div className="absolute -top-40 -right-40 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute bottom-0 -left-32 h-[360px] w-[360px] rounded-full bg-indigo-500/20 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-12 gap-14 items-center">

          {/* LEFT CONTENT */}
          
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="absolute -inset-6 rounded-3xl 
              bg-gradient-to-br from-cyan-500/20 to-purple-500/20 blur-2xl" />

            <div className="relative h-[600px] w-full overflow-hidden rounded-3xl
              border border-white/10 shadow-2xl
              transition-transform duration-500 hover:-translate-y-2">
              <Image
                src={platform.cmp}
                alt="Endpoint Detection and Response"
                className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="lg:col-span-6 ">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
            bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-sm mb-5">
            <ShieldAlert size={16} />
            EDR Module
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5">
            Endpoint Detection & Response
          </h2>

          <p className="mb-10 text-lg text-gray-400">
            Real-time endpoint protection with behaviour analytics and
            rapid remediation across every device.
          </p>

            {[
              {
                icon: Activity,
                title: "Continuous Endpoint Monitoring",
                text: "Monitors endpoint activity across every device and detects suspicious behaviour in real time.",
              },
              {
                icon: SearchCheck,
                title: "Threat Hunting & Investigation",
                text: "Enables real-time investigation, hunting, and containment of threats directly on endpoints.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group flex gap-5 items-start p-5 rounded-2xl
                bg-white/5 border border-white/10
                transition-all duration-300
                hover:bg-white/10 hover:border-cyan-400/30 mt-5"
              >
                <div className="flex h-12 min-w-12 items-center justify-center rounded-xl
                  bg-gradient-to-br from-cyan-500 to-blue-600
                  text-white transition-transform duration-300
                  group-hover:scale-110">
                  <item.icon size={20} />
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-gray-400 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}


          </div>
        </div>
        <div className="mt-20 flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 p-5">
          <ArrowRight className="text-pink-500 mt-1" size={28} />
          <p className="text-gray-200 text-lg leading-relaxed">
            <span className="font-bold text-white uppercase">Why it matters :</span>{" "}
            Your team responds faster with less manual effort, reduces
            operational overhead, and scales security operations confidently.
          </p>
        </div>
      </div>
    </section>
  );
}
