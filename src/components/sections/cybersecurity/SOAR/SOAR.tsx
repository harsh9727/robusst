"use client";

import Image from "next/image";
import {
  Cpu,
  Filter,
  ShieldCheck,
  ArrowRight,
  Workflow,
} from "lucide-react";
import { platform } from "public";

export default function SOAR() {
  return (
    <section className="relative bg-white py-32">

      {/* Subtle technical grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:100%_56px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* HEADER */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
  bg-pink-100 border border-pink-500 text-pink-500 text-sm mb-5
  transition-all duration-300
  hover:bg-pink-500 hover:text-white hover:shadow-md">
            <Workflow size={16} />
            SOAR Module
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-black leading-tight">
            Security Orchestration, Automation & Response
          </h2>

          <p className="mt-5 text-xl text-pink-500 font-medium">
            Automate your response — isolate endpoints, handle incidents
            and enforce playbooks at scale.
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="mt-10 grid lg:grid-cols-12 gap-10 items-center">

          {/* LEFT – FLOW */}
          <div className="lg:col-span-6 space-y-12">

            {[
              {
                icon: Cpu,
                title: "Orchestrate Everything",
                text: "Integrate security tools and workflows into a single automated response engine.",
              },
              {
                icon: Filter,
                title: "Reduce Alert Fatigue",
                text: "Filter, triage and prioritise alerts to eliminate noise and false positives.",
              },
              {
                icon: ShieldCheck,
                title: "Respond Automatically",
                text: "Trigger incident response playbooks that connect SIEM detections directly to action.",
              },
            ].map((item, i) => (
              <div key={i} className="relative flex gap-6 items-start">

                {/* ICON + LINE */}
                <div className="relative flex flex-col items-center">
                  <div className="flex h-12 min-w-12 items-center justify-center rounded-full bg-gray-900 text-white">
                    <item.icon size={20} />
                  </div>

                  {i < 2 && (
                    <div className="mt-10 h-16 w-px bg-gray-500" />
                  )}
                </div>

                {/* TEXT */}
                <div className="pt-1">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-gray-600 max-w-md leading-relaxed">
                    {item.text}
                  </p>
                </div>

              </div>
            ))}
          </div>

          {/* RIGHT – IMAGE */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-rose-50 to-indigo-50 blur-xl" />

            <div className="relative w-full h-[500px] overflow-hidden rounded-3xl border border-gray-200 shadow-xl">
              <Image
                src={platform.cmp}
                alt="SOAR Automation Control"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* WHY IT MATTERS */}
        <div className="mt-20 flex items-center gap-3 rounded-2xl bg-gray-50 border border-gray-200 p-5">
          <ArrowRight className="text-rose-600 mt-1" size={28} />
          <p className="text-gray-700 text-lg leading-relaxed">
            <span className="font-bold text-gray-900 uppercase">Why it matters :</span>{" "}
            Your team responds faster with less manual effort, reduces
            operational overhead, and scales security operations confidently.
          </p>
        </div>

      </div>
    </section>
  );
}
