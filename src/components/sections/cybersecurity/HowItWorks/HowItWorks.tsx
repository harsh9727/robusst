"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { platform } from "public";

export default function HowItWorks() {
  const steps = [
    {
      title: "Ingest & Correlate",
      text: "Logs and telemetry from endpoints, cloud, identity and network are collected and correlated into SIEM.",
    },
    {
      title: "Decide & Act",
      text: "Automated SOAR playbooks leverage XDR and threat intelligence to drive containment and remediation.",
    },
    {
      title: "Operate 24×7",
      text: "Our MDR team monitors, hunts threats, guides response and continuously improves your security posture.",
    },
    {
      title: "Scale & Adapt",
      text: "Whether mid-size business or enterprise, our security stack scales and evolves with your growth.",
    },
  ];

  return (
    <section className="relative bg-[#0A0F1C] py-24 overflow-hidden">

      {/* Background glow */}
      <div className="absolute -top-40 -right-40 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute bottom-0 -left-32 h-[360px] w-[360px] rounded-full bg-indigo-500/20 blur-[120px]" />
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            HOW IT WORKS
          </h2>
          <p className="mt-4 text-gray-400 text-lg">
            A streamlined security operations workflow
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-14 items-start">

          {/* LEFT TIMELINE */}
          <div className="lg:col-span-6 relative">

            {/* Vertical Line */}
            <div className="absolute left-4 top-0 h-full w-[2px] bg-gradient-to-b from-cyan-400 to-blue-600"></div>

            <div className="space-y-7">

              {steps.map((item, i) => (
                <div key={i} className="flex gap-5">

                  {/* Number Circle */}
                  <div className="relative z-10 flex h-10 min-w-10 items-center justify-center rounded-full 
                    bg-gradient-to-br from-cyan-400 to-blue-600 text-black font-bold">
                    0{i + 1}
                  </div>

                  {/* Content */}
                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 w-full">
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {item.title}
                    </h4>
                    <p className="text-gray-400 leading-relaxed">
                      {item.text}
                    </p>
                  </div>

                </div>
              ))}

            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="lg:col-span-6">
            <div className="relative h-[600px] w-full overflow-hidden rounded-2xl border border-gray-800">
              <Image
                src={platform.cmp}
                alt="Security Workflow"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

        </div>

        {/* Bottom Callout */}
        <div className="mt-16 flex items-start gap-3 rounded-xl border border-gray-800 p-5">
          <ArrowRight className="text-cyan-400 mt-1" size={24} />
          <p className="text-gray-300 text-lg">
            <span className="font-semibold text-white uppercase">
              End-to-End Workflow :
            </span>{" "}
            Unified detection, automated response, and continuous improvement —
            delivering always-on cyber defense.
          </p>
        </div>

      </div>
    </section>
  );
}
