"use client";

import Image from "next/image";
import { Cpu, Filter, ShieldCheck, ArrowRight, Workflow } from "lucide-react";
import { platform } from "public";

export default function SOAR() {
  return (
    <section className="relative bg-white py-32">
      {/* Subtle technical grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:100%_56px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-pink-500 bg-pink-100 px-4 py-2 text-sm text-pink-500 transition-all duration-300 hover:bg-pink-500 hover:text-white hover:shadow-md">
            <Workflow size={16} />
            SOAR Module
          </div>

          <h2 className="text-4xl leading-tight font-extrabold text-black md:text-5xl">
            Security Orchestration, Automation & Response
          </h2>

          <p className="mt-5 text-xl font-medium text-pink-500">
            Automate your response — isolate endpoints, handle incidents and
            enforce playbooks at scale.
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="mt-10 grid items-center gap-10 lg:grid-cols-12">
          {/* LEFT – FLOW */}
          <div className="space-y-12 lg:col-span-6">
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
              <div key={i} className="relative flex items-start gap-6">
                {/* ICON + LINE */}
                <div className="relative flex flex-col items-center">
                  <div className="flex h-12 min-w-12 items-center justify-center rounded-full bg-gray-900 text-white">
                    <item.icon size={20} />
                  </div>

                  {i < 2 && <div className="mt-10 h-16 w-px bg-gray-500" />}
                </div>

                {/* TEXT */}
                <div className="pt-1">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h4>
                  <p className="mt-2 max-w-md leading-relaxed text-gray-600">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT – IMAGE */}
          <div className="relative flex justify-center lg:col-span-6">
            <div className="absolute -inset-6 rounded-3xl bg-linear-to-br from-rose-50 to-indigo-50 blur-xl" />

            <div className="relative h-125 w-full overflow-hidden rounded-3xl border border-gray-200 shadow-xl">
              <Image
                src={platform.cmp}
                alt="SOAR Automation Control"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* WHY IT MATTERS */}
        <div className="mt-20 flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-5">
          <ArrowRight className="mt-1 text-rose-600" size={28} />
          <p className="text-lg leading-relaxed text-gray-700">
            <span className="font-bold text-gray-900 uppercase">
              Why it matters :
            </span>{" "}
            Your team responds faster with less manual effort, reduces
            operational overhead, and scales security operations confidently.
          </p>
        </div>
      </div>
    </section>
  );
}
