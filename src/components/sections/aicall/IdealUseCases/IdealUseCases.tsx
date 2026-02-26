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
    <>
      <div className="w-full overflow-hidden bg-white sm:-mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 150">
          <path
            d="M0,80 C300,50 400,50 600,80 C800,110 900,110 1200,80 L1200,200 L0,200 Z"
            fill="#000000"
          />
        </svg>
      </div>

      <section className="relative overflow-hidden bg-black py-24">
        {/* Background Glow */}

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-center text-4xl font-extrabold text-transparent md:text-5xl">
              Ideal Use Cases
            </h2>
          </motion.div>

          {/* Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                  className={`group relative rounded-3xl border border-neutral-800 bg-neutral-900 p-8 shadow-lg transition-all duration-300 ${item.glow}`}
                >
                  {/* Glow Hover Background */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 blur-xl transition duration-500 group-hover:opacity-100"></div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300 ${item.color} group-hover:scale-110`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-white transition group-hover:text-blue-400">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 text-neutral-400">{item.description}</p>

                    {/* Animated bottom line */}
                    <div className="mt-6 h-[2px] w-0 bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-400 group-hover:w-full"></div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      <div className="w-full overflow-hidden bg-white sm:-mt-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 150"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 C300,150 400,150 600,120 C800,90 900,90 1200,120 L1200,0 L0,0 Z"
            fill="#000000"
            stroke="none"
          />
        </svg>
      </div>
    </>
  );
}
