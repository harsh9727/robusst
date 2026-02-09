"use client";

import Image from "next/image";
import { Button } from "~/components/ui/button";
import { Brain, TrendingDown, Zap, LineChart } from "lucide-react";
import { platform } from "public";
export const AIInsightSuite = () => {
  return (
    <section className="relative overflow-hidden bg-[#070B14] py-28 px-6">

      {/* Ambient gradients */}
      <div className="absolute -top-40 left-1/3 h-[520px] w-[520px] bg-cyan-500/20 blur-[140px]" />
      <div className="absolute bottom-0 -right-40 h-[520px] w-[520px] bg-purple-600/20 blur-[140px]" />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">

        {/* LEFT – Content */}
        <div className="lg:col-span-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-cyan-400 mb-6">
            <Brain size={16} /> AI-Powered Intelligence
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
            Robusst AI <br />
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Insight Suite
            </span>
          </h2>

          <div className="border-l-2 border-pink-500 pl-6 mb-6">
            <p className="text-pink-400 font-semibold mb-2">
              Problem Solved
            </p>
            <p className="text-gray-300 leading-relaxed">
              Lack of predictive intelligence forces teams into reactive
              marketing, missed opportunities, and lost revenue.
            </p>
          </div>

          <p className="text-gray-400 leading-relaxed mb-10 max-w-xl">
            Built-in AI models predict churn, calculate customer lifetime value,
            and recommend next-best actions — enabling proactive, data-driven
            marketing and smarter customer service.
          </p>

          <Button className="rounded-full px-10 py-6 text-base bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-xl shadow-cyan-500/20 hover:scale-105 transition">
            Learn More
          </Button>
        </div>

        {/* RIGHT – Visual + Capability Stack */}
        <div className="lg:col-span-6 relative">

          {/* Glass Card */}
          <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8">

            {/* Image */}
            <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-8">
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
<<<<<<< HEAD
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 px-4 py-3 transition hover:bg-white/10"
                  >
                    <Icon size={18} className="text-cyan-400" />
                    <span className="text-sm font-medium text-gray-200">
=======
                    className="flex items-center gap-3 rounded-xl bg-black/40 border border-white/10 px-4 py-3 hover:bg-white/10 transition"
                  >
                    <Icon size={18} className="text-cyan-400" />
                    <span className="text-sm text-gray-200 font-medium">
>>>>>>> ce3d5a9a3a00a61546d8ceef8e27901376e4a3a3
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
