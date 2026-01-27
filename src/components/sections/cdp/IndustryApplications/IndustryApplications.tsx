"use client";

import { Card, CardContent } from "~/components/ui/card";
import { Wifi, Landmark, ShoppingCart, HeartPulse } from "lucide-react";

const industries = [
  {
    title: "Telecom",
    desc: "Reduce churn, increase ARPU, enable data monetization",
    icon: Wifi,
    gradient: "from-cyan-400 to-blue-600",
  },
  {
    title: "BFSI",
    desc: "Deliver risk-aware, compliant personalization",
    icon: Landmark,
    gradient: "from-yellow-400 to-orange-500",
  },
  {
    title: "Retail",
    desc: "Drive loyalty and omnichannel marketing effectiveness",
    icon: ShoppingCart,
    gradient: "from-emerald-400 to-teal-600",
  },
  {
    title: "Healthcare",
    desc: "Enable secure, patient-centric care journeys",
    icon: HeartPulse,
    gradient: "from-pink-400 to-purple-600",
  },
];

export const IndustryApplications = () => {
  return (
   <section className="relative bg-[#0A0F1C] py-24 overflow-hidden">

      {/* Background glow */}
      <div className="absolute -top-40 -right-40 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute bottom-0 -left-32 h-[360px] w-[360px] rounded-full bg-indigo-500/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Industry <span className="text-pink-500">Applications</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Purpose-built solutions tailored for high-impact industries
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((item, i) => {
            const Icon = item.icon;
            return (
              <Card
                key={i}
                className="group relative overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(59,130,246,0.35)]"
              >
                {/* Glow Border */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${item.gradient}`}
                />
                <div className="absolute inset-[1px] bg-slate-950 rounded-xl" />

                <CardContent className="relative z-10 p-6">
                  {/* Icon */}
                  <div
                    className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient}`}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
