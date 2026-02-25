"use client";

import { motion } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Languages,
} from "lucide-react";

const problems = [
  {
    title: "High Call Center Costs",
    description:
      "Human agents cost ~$1+ per minute with limited scalability.",
    icon: DollarSign,
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Limited Scalability",
    description:
      "Hiring and training agents is time-consuming and expensive.",
    icon: TrendingUp,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Quality Monitoring",
    description:
      "Manual QC is labor-intensive, inconsistent, and difficult to scale.",
    icon: ShieldCheck,
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Multilingual Complexity",
    description:
      "Managing Indian languages and dialects is operationally challenging.",
    icon: Languages,
    color: "from-purple-500 to-pink-500",
  },
];

export default function BusinessProblem() {
  return (
    <section className="relative py-26 bg-gradient-to-b from-[#050816] to-[#0b1120] text-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-40 -right-40 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute bottom-0 -left-32 h-[360px] w-[360px] rounded-full bg-indigo-500/20 blur-[120px]" />
      <div className="relative max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            The Business Problem
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto text-lg">
            Traditional call center operations are expensive, difficult to scale,
            and operationally complex.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {problems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 hover:-translate-y-2"
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${item.color} mb-6 shadow-lg`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-semibold mb-3 group-hover:text-blue-400 transition">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed">
                  {item.description}
                </p>

                {/* Glow Hover Effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 transition duration-300"></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}