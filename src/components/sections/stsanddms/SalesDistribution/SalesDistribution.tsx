"use client";

import {
  Boxes,
  ShoppingCart,
  Users,
  BarChart3,
  Globe,
  Network,
  Percent,
  UserPlus,
  Route,
  Brain,
} from "lucide-react";

const modules = [
  {
    title: "Inventory Management",
    desc: "Managing and tracking stock levels efficiently.",
    icon: Boxes,
  },
  {
    title: "Point of Sale",
    desc: "Managing transactions and sales at customer locations.",
    icon: ShoppingCart,
  },
  {
    title: "Field Force Mgmt",
    desc: "Coordinating and supervising mobile workforce activities.",
    icon: Users,
  },
  {
    title: "Smart Inventory Planner",
    desc: "Optimizing stock levels using intelligent forecasting tools.",
    icon: BarChart3,
  },
  {
    title: "Geo Business Visibility",
    desc: "Visualizing business data on a geographical map.",
    icon: Globe,
  },
  {
    title: "Channel Partner Mgmt",
    desc: "Overseeing relationships with distribution partners effectively.",
    icon: Network,
  },
  {
    title: "Commission Management",
    desc: "Calculating and distributing commissions to sales teams.",
    icon: Percent,
  },
  {
    title: "Digital Onboarding",
    desc: "Seamless onboarding and registration of new users.",
    icon: UserPlus,
  },
  {
    title: "Route Plan Mgmt",
    desc: "Optimizing delivery routes for operational efficiency.",
    icon: Route,
  },
  {
    title: "Knowledge Mgmt",
    desc: "Organizing and sharing company knowledge effectively.",
    icon: Brain,
  },
];

export default function SalesDistribution() {
  return (
    <section className="relative overflow-hidden bg-[#05070d] py-32">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[160px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-20 text-center">
          <h2 className="text-4xl font-extrabold tracking-wide text-white lg:text-5xl">
            Sales & Distribution{" "}
            <span className="text-cyan-400">| Key Modules</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            A comprehensive suite of intelligent modules built to power modern
            telecom sales, distribution, and partner ecosystems.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {modules.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all duration-500 ease-out hover:-translate-y-3 hover:border-cyan-400/50 hover:shadow-[0_0_60px_rgba(34,211,238,0.25)]"
              >
                {/* Gradient hover overlay */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.15),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Icon */}
                <div className="relative z-10 mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-cyan-400/20">
                  <Icon className="h-6 w-6 text-cyan-400 transition-transform duration-500 group-hover:scale-110" />
                </div>

                {/* Content */}
                <h3 className="relative z-10 mb-3 text-lg font-semibold text-white transition-colors duration-300 group-hover:text-cyan-300">
                  {item.title}
                </h3>

                <p className="relative z-10 text-sm leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
                  {item.desc}
                </p>

                {/* Bottom glow line */}
                <span className="absolute right-6 bottom-0 left-6 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-cyan-400 via-cyan-300 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
