"use client";
import { TrendingUp, Clock, Users, Target } from "lucide-react";
import Image from "next/image";

const stats = [
  {
    icon: Clock,
    value: "< 3 months",
    label: "Achieve first use case",
    description: "From kickoff to your first production use case live.",
  },
  {
    icon: TrendingUp,
    value: "30%",
    label: "Increase in ARPU",
    description: "Average revenue per user growth across deployments.",
  },
  {
    icon: Users,
    value: "25%",
    label: "Reduction in churn rate",
    description: "Retain more customers with smarter engagement.",
  },
  {
    icon: Target,
    value: "41%+",
    label: "Conversion uplift",
    description: "Measurable lift across campaigns.",
  },
];

const positions = [
  "absolute top-1/5 -right-[80%] flex w-full -translate-y-1/2 items-center gap-6",
  "absolute top-4/5 -right-[80%] flex w-full -translate-y-1/2 items-center gap-6",
  "absolute top-1/5 -left-[80%] flex w-full -translate-y-1/2 items-center gap-6 flex-row-reverse",
  "absolute top-4/5 -left-[80%] flex w-full -translate-y-1/2 items-center gap-6 flex-row-reverse",
];

export const ProvenImpact = () => {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-12 sm:py-16">
      {/* Title */}
      <h2 className="mb-10 text-center text-3xl font-black tracking-tight text-black uppercase sm:mb-16 sm:text-5xl">
        Proven Impact &amp; Quick
        <br />
        Deployment
      </h2>

      <div className="relative flex w-full items-center justify-center">
        <div className="relative h-80 w-80 rounded-full bg-[#29ABE2] p-12 lg:h-120 lg:w-120">
          {/* Floating stat items — hidden on mobile */}
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className={`hidden lg:flex ${positions[index]}`}>
                <div className="aspect-square w-40 rounded-full border-3">
                  <div className="relative flex aspect-square w-full items-center justify-center rounded-full border-8 border-[#29ABE2] bg-black">
                    <Icon size={30} className="text-white" />
                  </div>
                </div>
                <p className="text-brand-one w-80 text-2xl leading-tight font-semibold">
                  {stat.value} {stat.label}
                </p>
              </div>
            );
          })}

          <div className="absolute top-0 left-1/2 h-full w-1 -translate-x-1/2 bg-white" />
          <div className="absolute top-1/2 left-0 h-1 w-full -translate-y-1/2 bg-white" />
          <div className="h-full w-full rounded-full bg-[#0F61A5] p-12">
            <div className="h-full w-full rounded-full bg-[#0A162E] p-4">
              <div className="h-full w-full rounded-full bg-white p-2 lg:p-8">
                <div className="relative z-20 flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[#1B1918] p-4 lg:p-8">
                  <Image
                    src="/solutions/cdp/11.png"
                    alt=""
                    width={200}
                    height={200}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile cards — visible only below sm */}
      <div className="mt-8 grid grid-cols-2 gap-3 lg:hidden">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="flex flex-col gap-2 rounded-2xl border border-gray-100 bg-gray-50 p-4"
            >
              <div className="flex items-center justify-center self-start rounded-full border-4 border-[#29ABE2] bg-black p-2">
                <Icon className="h-5 w-5 text-[#29ABE2]" />
              </div>
              <p className="text-brand-one text-xl leading-tight font-black">
                {stat.value}
              </p>
              <p className="text-sm font-semibold text-gray-800">
                {stat.label}
              </p>
              <p className="text-xs text-gray-500">{stat.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
