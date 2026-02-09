"use client";

import { Card } from "~/components/ui/card";
import { TrendingUp, Clock, Users, Target } from "lucide-react";

const stats = [
  {
    value: "30%",
    label: "Increase in average revenue per user (ARPU)",
    icon: TrendingUp,
  },
  {
    value: "41%+",
    label: "Conversion uplift on campaigns",
    icon: Target,
  },
  {
    value: "25%",
    label: "Reduction in churn rate",
    icon: Users,
  },
  {
    value: "< 3 months",
    label: "Time to first use case",
    icon: Clock,
  },
];

export const ProvenImpact = () => {
  return (
  <section className="relative bg-[#0A0F1C] py-24 overflow-hidden">

      {/* Background glow */}
      <div className="absolute -top-40 -right-40 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute bottom-0 -left-32 h-[360px] w-[360px] rounded-full bg-indigo-500/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Proven Impact & <br />
            <span className="text-pink-500">Quick Deployment</span>
          </h2>

          <p className="mt-6 text-lg text-slate-400 max-w-xl">
            Achieve real business outcomes faster. Our platform helps
            teams move from experimentation to production with
            measurable impact.
          </p>

          {/* Highlight Callout */}
          <div className="mt-10 inline-flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur">
            <Clock className="h-6 w-6 text-pink-500" />
            <p className="text-white font-semibold">
              First production use case in under{" "}
              <span className="text-pink-500">3 months</span>
            </p>
          </div>
        </div>

        {/* RIGHT STATS GRID */}
        <div className="grid grid-cols-2 gap-6">
          {stats.map((item, i) => {
            const Icon = item.icon;
            return (
              <Card
                key={i}
                className="group border border-white/10 bg-white/5 backdrop-blur p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(236,72,153,0.35)]"
              >
                <Icon className="h-7 w-7 text-pink-500 mb-4" />

                <h3 className="text-3xl font-extrabold text-white">
                  {item.value}
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  {item.label}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
