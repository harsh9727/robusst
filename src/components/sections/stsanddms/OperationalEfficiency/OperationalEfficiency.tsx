"use client";

import { Cpu, Users, BarChart3, Globe, Network, Percent, Route, Brain, ShoppingCart, Boxes } from "lucide-react";

const features = [
  {
    title: "Architecture",
    desc: "Microservices Architecture for faster development and best-in-class tech integration.",
    icon: Cpu,
  },
  {
    title: "SmartStart",
    desc: "AI-Powered Onboarding with biometrics & OCR for seamless, digital enrollment.",
    icon: Users,
  },
  {
    title: "Insight",
    desc: "Smart Knowledge Hub for ongoing learning and field team assessments",
    icon: BarChart3,
  },
  {
    title: "SimChain",
    desc: "End-to-End SIM Management from raw SIM creation to quality control and delivery.",
    icon: Globe,
  },
  {
    title: "Visibility",
    desc: "Smart Inventory Management to track and automate stock across the distribution chain.",
    icon: Network,
  },
  {
    title: "Intelligence",
    desc: "AI-Powered Insights for accurate forecasting, real-time alerts, and efficient field routing.",
    icon: Brain,
  },
  {
    title: "Integration",
    desc: "Seamless Channel Integration with flexible hierarchies and full field force control",
    icon: ShoppingCart,
  },
  {
    title: "Acceleration",
    desc: "Faster Go-to-Market with automated workflows and pre-built user journeys",
    icon: Boxes,
  },
];

export default function OperationalEfficiency() {
  return (
    <section className="relative bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-extrabold text-black leading-tight lg:text-5xl">
            Enhance Operational Efficiency with <br /> <span className="text-pink-500">Our World-Class Sales and Distribution Platform </span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <div
  key={i}
  className="relative group rounded-2xl p-[1px] bg-gradient-to-br from-transparent via-transparent to-transparent 
             hover:from-pink-500/40 hover:via-purple-500/30 hover:to-indigo-500/40 transition-all duration-500"
>
  <div
    className="relative h-full rounded-2xl bg-white p-6 
               shadow-md group-hover:shadow-2xl 
               transform group-hover:-translate-y-2 
               transition-all duration-500"
  >
    {/* Icon */}
    <div
      className="mb-5 w-14 h-14 flex items-center justify-center rounded-xl 
                 bg-gradient-to-br from-pink-100 to-purple-100 
                 text-pink-500 
                 group-hover:from-pink-500 group-hover:to-purple-500 
                 group-hover:text-white 
                 transform group-hover:scale-110 group-hover:-rotate-3
                 transition-all duration-500"
    >
      <feature.icon size={26} />
    </div>

    {/* Title */}
    <h3
      className="text-lg font-semibold text-gray-900 mb-3 
                 group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-purple-500 
                 group-hover:bg-clip-text group-hover:text-transparent
                 transition-all duration-300"
    >
      {feature.title}
    </h3>

    {/* Description */}
    <p className="text-gray-600 text-sm leading-relaxed">
      {feature.desc}
    </p>

    {/* Subtle hover glow */}
    <div
      className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 
                 group-hover:opacity-100 
                 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-indigo-500/10
                 transition-opacity duration-500"
    />
  </div>
</div>
          ))}
        </div>
      </div>
    </section>
  );
}
