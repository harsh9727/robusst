"use client";

import Image from "next/image";
import { BarChart3, ShieldCheck, Brain } from "lucide-react";
import { platform } from "public";

export default function DataIntelligence() {
  return (
    <>
      <div className="w-full overflow-hidden bg-white sm:-mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 150">
          <path
            d="M0,80 C300,50 400,50 600,80 C800,110 900,110 1200,80 L1200,200 L0,200 Z"
            fill="#000000"
          />
        </svg>
      </div>

      <section className="relative overflow-hidden bg-black py-24">
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left Content */}
            <div>
              <h2 className="text-4xl leading-tight font-extrabold text-white lg:text-5xl">
                Data-Driven Intelligence for
                <span className="ml-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Smarter Decisions
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-lg text-slate-400">
                We empower organizations to turn raw data into meaningful
                insights — driving measurable business impact.
              </p>

              {/* Feature List */}
              <div className="mt-10 space-y-6">
                {[
                  {
                    icon: BarChart3,
                    title: "Predictive Analytics",
                    desc: "Churn prevention, ARPU growth, and trend forecasting with precision.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Secure & Reliable",
                    desc: "Enterprise-grade security ensures data integrity and trust.",
                  },
                  {
                    icon: Brain,
                    title: "Self-Learning Automation",
                    desc: "AI-driven optimization keeps systems adaptive and efficient.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="group flex gap-4 rounded-xl border border-white/10 bg-white/5 p-5 transition-all hover:border-cyan-400/40 hover:bg-white/10"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 transition group-hover:bg-cyan-500/20">
                      <item.icon size={22} />
                    </div>

                    <div>
                      <h4 className="font-semibold text-white">{item.title}</h4>
                      <p className="mt-1 text-sm text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="animate-float shadow-brand-one relative order-1 mx-auto flex aspect-square h-[300px] overflow-hidden shadow-[0_0_0px] duration-200 hover:shadow-[0_0_20px] sm:h-[500px] lg:order-2">
              <Image
                src="/solutions/customized/4.webp"
                fill
                alt="Robusst Cyber Security"
                className="aspect-square h-fit w-fit object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="w-full overflow-hidden bg-white sm:-mt-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 150"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 C300,150 400,150 600,120 C800,90 900,90 1200,120 L1200,0 L0,0 Z"
            fill="#000000"
            stroke="none"
          />
        </svg>
      </div>
    </>
  );
}
