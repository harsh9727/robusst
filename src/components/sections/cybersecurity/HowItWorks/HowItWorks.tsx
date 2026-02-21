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
    <section className="relative overflow-hidden bg-[#0A0F1C] py-24">
      {/* Background glow */}
      <div className="absolute -top-40 -right-40 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute bottom-0 -left-32 h-[360px] w-[360px] rounded-full bg-indigo-500/20 blur-[120px]" />
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-extrabold text-white md:text-5xl">
            How it Works
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            A streamlined security operations workflow
          </p>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-8">
          <div className="grid gap-7 sm:grid-cols-2">
            {steps.map((item, i) => (
              <div key={i} className="flex gap-5">
                {/* Content */}
                <div className="w-full rounded-xl border border-gray-800 bg-gray-900 p-5">
                  <h4 className="mb-2 text-lg font-semibold text-white">
                    {item.title}
                  </h4>
                  <p className="leading-relaxed text-gray-400">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
          {/* RIGHT IMAGE */}
          <Image
            src="/solutions/cybersecurity/howitworks.webp"
            width={500}
            height={450}
            alt="Security Workflow"
            className="animate-float h-full w-full object-cover sm:w-[70%]"
          />
        </div>
      </div>
    </section>
  );
}
