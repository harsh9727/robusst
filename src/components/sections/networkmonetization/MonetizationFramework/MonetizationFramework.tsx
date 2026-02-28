"use client";

import { motion } from "framer-motion";
import { Users, Cpu, BarChart3, Settings2 } from "lucide-react";

const frameworks = [
  {
    title: "User Experience Monetization",
    desc: "Transform QoE into revenue opportunities",
    icon: Users,
    color: "bg-blue-500",
    glow: "from-blue-400 to-blue-600",
  },
  {
    title: "Coverage & Performance Intelligence",
    desc: "Real-time network visibility",
    icon: BarChart3,
    color: "bg-orange-500",
    glow: "from-orange-400 to-orange-600",
  },
  {
    title: "AI-Driven Network Automation",
    desc: "Autonomous operations at scale",
    icon: Cpu,
    color: "bg-purple-500",
    glow: "from-purple-400 to-purple-600",
  },

  {
    title: "Operational Transformation",
    desc: "Maximize efficiency and ROI",
    icon: Settings2,
    color: "bg-emerald-500",
    glow: "from-emerald-400 to-emerald-600",
  },
];

export default function MonetizationFramework() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-50 via-white to-gray-50" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold text-blue-600 sm:text-4xl md:text-5xl">
            Our Intelligent Monetization Framework
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {frameworks.map((item, i) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative"
              >
                {/* Glow Border */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${item.glow} opacity-0 blur transition duration-500 group-hover:opacity-100`}
                />

                {/* Card */}
                <div className="relative h-full rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-xl">
                  {/* Icon */}
                  <div
                    className={`mb-6 inline-flex rounded-xl p-4 text-white ${item.color}`}
                  >
                    <Icon size={26} />
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="leading-relaxed text-gray-600">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
