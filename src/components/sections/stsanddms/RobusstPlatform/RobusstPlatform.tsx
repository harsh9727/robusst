"use client";

import {
  ShieldCheck,
  Star,
  Settings,
  Truck,
  Lock,
  BadgeCheck,
} from "lucide-react";

const features = [
  {
    title: "Product Authentication",
    desc: "Secure product verification to eliminate counterfeits.",
    icon: BadgeCheck,
  },
  {
    title: "Dealer Management System",
    desc: "Centralized dealer operations and performance tracking.",
    icon: Star,
  },
  {
    title: "Warranty & Authentication",
    desc: "Digital warranty lifecycle with secure validation.",
    icon: ShieldCheck,
  },
  {
    title: "Inventory & Dispatch",
    desc: "Real-time inventory monitoring and dispatch control.",
    icon: Lock,
  },
  {
    title: "Influencer Loyalty & Rewards",
    desc: "Incentive-based loyalty programs to drive engagement.",
    icon: Truck,
  },
  {
    title: "Sales Force Automation",
    desc: "Field sales optimization with actionable insights.",
    icon: Settings,
  },
];

export default function RobusstPlatform() {
  return (
    <section className="relative overflow-hidden bg-[#0B0F1A] py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-20 text-center">
          <h2 className="text-4xl leading-tight font-extrabold text-white lg:text-5xl">
            ROBUSST Platform
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-400 lg:text-lg">
            A unified business automation platform designed for scalability,
            security, and operational clarity.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-white/10 bg-[#111827] p-7 transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.25)]"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10">
                  <item.icon className="h-6 w-6 text-cyan-500" />
                </div>
                <div>
                  <h4 className="text-lg leading-snug font-semibold text-white">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-gray-400">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle Background Glow */}
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-cyan-500 opacity-20 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-purple-500 opacity-20 blur-3xl" />
    </section>
  );
}
