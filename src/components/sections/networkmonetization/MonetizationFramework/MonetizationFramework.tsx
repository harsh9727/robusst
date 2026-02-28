"use client";

import { motion } from "framer-motion";
import {
  Users,
  Cpu,
  BarChart3,
  Settings2,
} from "lucide-react";

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
    <section className="relative bg-white py-24 sm:py-32 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50 -z-10" />

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600">
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
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${item.glow} opacity-0 group-hover:opacity-100 blur transition duration-500`}
                />

                {/* Card */}
                <div className="relative h-full bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl transition-all duration-300">

                  {/* Icon */}
                  <div
                    className={`inline-flex p-4 rounded-xl text-white mb-6 ${item.color}`}
                  >
                    <Icon size={26} />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}