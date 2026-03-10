"use client";

import Image from "next/image";
import { Button } from "~/components/ui/button";
import { Brain, TrendingDown, Zap, LineChart } from "lucide-react";
import { platform } from "public";
export const AIInsightSuite = () => {
  return (
    <section className="relative overflow-hidden bg-[#070B14] px-6 py-28">
      {/* Ambient gradients */}
      <div className="blur-[120px] absolute -top-40 left-1/3 h-130 w-130 bg-cyan-500/20" />
      <div className="blur-[120px] absolute -right-40 bottom-0 h-130 w-130 bg-purple-600/20" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-20 lg:grid-cols-12">
        {/* LEFT – Content */}
        <div className="lg:col-span-6">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-cyan-400">
            <Brain size={16} /> AI-Powered Intelligence
          </span>

          <h2 className="mb-6 text-4xl leading-tight font-extrabold text-white md:text-5xl">
            Robusst AI <br />
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Insight Suite
            </span>
          </h2>

          <div className="mb-6 border-l-2 border-pink-500 pl-6">
            <p className="mb-2 font-semibold text-pink-400">Problem Solved</p>
            <p className="leading-relaxed text-gray-300">
              Lack of predictive intelligence forces teams into reactive
              marketing, missed opportunities, and lost revenue.
            </p>
          </div>

          <p className="mb-10 max-w-xl leading-relaxed text-gray-400">
            Built-in AI models predict churn, calculate customer lifetime value,
            and recommend next-best actions — enabling proactive, data-driven
            marketing and smarter customer service.
          </p>

          <Button className="rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-10 py-6 text-base text-white shadow-xl shadow-cyan-500/20 transition hover:scale-105">
            Learn More
          </Button>
        </div>

        {/* RIGHT – Visual + Capability Stack */}
        <div className="relative lg:col-span-6">
          {/* Glass Card */}
          <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
            {/* Image */}
            <div className="relative mb-8 h-64 w-full overflow-hidden rounded-2xl">
              <Image
                src={platform.cmp}
                alt="AI Insight Suite"
                fill
                className="object-cover"
              />
            </div>

            {/* Feature grid */}
            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  icon: TrendingDown,
                  label: "Churn Prediction",
                },
                {
                  icon: LineChart,
                  label: "Customer Lifetime Value",
                },
                {
                  icon: Zap,
                  label: "Next-Best Action",
                },
                {
                  icon: Brain,
                  label: "Predictive Intelligence",
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 px-4 py-3 transition hover:bg-white/10"
                  >
                    <Icon size={18} className="text-cyan-400" />
                    <span className="text-sm font-medium text-gray-200">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
