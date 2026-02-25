"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Home,
  Landmark,
  HeartPulse,
  GraduationCap,
  ShoppingBag,
} from "lucide-react";

const useCases = [
  {
    title: "Enterprises & BPOs",
    description: "Large-scale operations",
    icon: Building2,
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    glow: "group-hover:shadow-blue-500/20",
  },
  {
    title: "Real Estate",
    description: "Lead qualification & follow-ups",
    icon: Home,
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    glow: "group-hover:shadow-emerald-500/20",
  },
  {
    title: "Banking & Finance",
    description: "Customer service & compliance",
    icon: Landmark,
    color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    glow: "group-hover:shadow-purple-500/20",
  },
  {
    title: "Healthcare",
    description: "Appointment & patient support",
    icon: HeartPulse,
    color: "text-pink-400 bg-pink-500/10 border-pink-500/20",
    glow: "group-hover:shadow-pink-500/20",
  },
  {
    title: "Education",
    description: "Enrollment & student support",
    icon: GraduationCap,
    color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    glow: "group-hover:shadow-indigo-500/20",
  },
  {
    title: "E-Commerce",
    description: "Customer service & returns",
    icon: ShoppingBag,
    color: "text-orange-400 bg-orange-500/10 border-orange-500/20",
    glow: "group-hover:shadow-orange-500/20",
  },
];

export default function IdealUseCases() {
  return (
    <section className="relative py-24 bg-black overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-40 -right-40 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute bottom-0 -left-32 h-[360px] w-[360px] rounded-full bg-indigo-500/20 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl text-center font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Ideal Use Cases
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`group relative bg-neutral-900 border border-neutral-800 rounded-3xl p-8 transition-all duration-300 shadow-lg ${item.glow}`}
              >
                {/* Glow Hover Background */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-xl"></div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-xl border mb-5 transition-all duration-300 ${item.color} group-hover:scale-110`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-neutral-400 mt-2">
                    {item.description}
                  </p>

                  {/* Animated bottom line */}
                  <div className="mt-6 h-[2px] w-0 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-400"></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}