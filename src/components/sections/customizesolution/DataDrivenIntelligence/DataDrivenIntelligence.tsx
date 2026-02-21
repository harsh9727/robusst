"use client";

import Image from "next/image";
import { BarChart3, ShieldCheck, Brain } from "lucide-react";
import { customizesolution } from "public";

export default function DataIntelligence() {
  return (
    <section className="relative overflow-hidden bg-[#020817] py-24">
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-cyan-500 opacity-20 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-purple-500 opacity-20 blur-3xl" />
      {/* Glow Background */}

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
              We empower organizations to turn raw data into meaningful insights
              — driving measurable business impact.
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
          <div className="group overflow-hidden rounded-xl">
            <Image
              src={customizesolution.DataDriven}
              alt="Data Intelligence"
              className="h-full w-full border border-white/10 object-cover shadow-xl transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
