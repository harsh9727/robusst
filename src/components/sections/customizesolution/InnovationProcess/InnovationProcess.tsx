"use client";

import { Check } from "lucide-react";

const steps = [
  {
    title: "Consultation & Discovery",
    desc: "We analyze your environment, identifying inefficiencies and integration limitations with on-site and virtual workshops.",
  },
  {
    title: "Co-Creation & Mapping",
    desc: "Our experts architect personalized modules aligned with your KPIs—integrating with legacy and new systems alike.",
  },
  {
    title: "Implementation & Integration",
    desc: "Modular rollout via APIs and microservices ensures continuity while adding modern functionality.",
  },
  {
    title: "Optimization & AI-Driven Growth",
    desc: "Post-deployment analytics continuously refine performance and discover new revenue opportunities.",
  },
];

export default function InnovationProcess() {
  return (
    <section className="relative bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h2 className="text-4xl leading-tight font-extrabold text-gray-900 lg:text-5xl">
            How Robusst Turns Pain-Points into
            <span className="block text-pink-500">Scalable Innovation</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            A structured, outcome-driven approach designed for long-term scale.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Horizontal line */}
          <div className="absolute top-7 right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

          <div className="relative grid grid-cols-1 gap-14 md:grid-cols-4">
            {steps.map((item, i) => (
              <div key={i} className="group flex flex-col items-center">
                {/* CHECK DOT */}
                <div className="z-10 flex min-h-14 w-14 items-center justify-center rounded-full bg-pink-500 text-white shadow-[0_0_0_8px_rgba(236,72,153,0.15)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_0_12px_rgba(236,72,153,0.22)]">
                  <Check size={26} />
                </div>

                {/* CARD */}
                <div className="mt-10 flex h-full min-h-[220px] w-full max-w-[280px] flex-col rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-[0_10px_40px_-15px_rgba(0,0,0,0.15)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-pink-400/40 group-hover:shadow-[0_18px_60px_-20px_rgba(236,72,153,0.35)]">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-gray-600">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
