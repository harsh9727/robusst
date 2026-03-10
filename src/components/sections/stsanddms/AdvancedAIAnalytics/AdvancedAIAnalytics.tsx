"use client";

import Image from "next/image";
import { Brain, TrendingUp, Repeat, Wallet } from "lucide-react";
import { platform } from "public";

const features = [
  {
    title: "Predictive Intelligence",
    desc: "AI-driven sales and inventory models that minimize stockouts and reduce excess inventory.",
    icon: TrendingUp,
  },
  {
    title: "Personalized Recommendations",
    desc: "Upsell and cross-sell recommendations tailored for every channel partner.",
    icon: Brain,
  },
  {
    title: "Retention Analytics",
    desc: "Win-back strategies and customer retention insights to maximize lifetime value.",
    icon: Repeat,
  },
  {
    title: "Automated Incentives",
    desc: "Seamless incentive disbursement into digital wallets ensuring timely payouts.",
    icon: Wallet,
  },
];

export default function AdvancedAIAnalytics() {
  return (
    <section className="relative overflow-hidden bg-[#0A0D14] py-28">
      {/* Background Effects */}
      <div className="blur-[100px] absolute -top-40 -left-40 h-105 w-105 rounded-full bg-cyan-500/20" />
      <div className="blur-[100px] absolute -right-40 -bottom-40 h-105 w-105 rounded-full bg-indigo-500/20" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        {/* LEFT CONTENT */}
        <div className="relative h-130 w-full overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={platform.cdp1} // replace with your AI image
            alt="Advanced AI Analytics"
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>

        {/* RIGHT IMAGE */}
        <div>
          <h2 className="text-4xl font-extrabold text-white lg:text-5xl">
            Advanced AI & Analytics
          </h2>

          <p className="mt-6 max-w-xl text-lg text-gray-400">
            Turn data into decisive action with Robusst’s embedded AI/ML
            capabilities.
          </p>

          <div className="mt-10 space-y-6">
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {features.map((item, i) => (
                <div
                  key={i}
                  className="group flex gap-4 rounded-xl border border-white/10 bg-white/5 p-5 transition-all hover:border-cyan-400/40 hover:bg-white/10"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 transition group-hover:bg-cyan-500/20">
                    <item.icon size={22} />
                  </div>

                  <div>
                    <h4 className="font-medium text-white transition group-hover:text-cyan-400">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-sm text-gray-400 transition group-hover:text-gray-300">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
