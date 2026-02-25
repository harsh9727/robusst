"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Link2,
  Star,
  Target,
} from "lucide-react";

const features = [
  {
    title: "Natural Language Understanding",
    description:
      "Context-aware conversation flows that adapt to customer needs.",
    icon: Brain,
    color: "text-blue-400 bg-blue-500/10",
    gradient: "from-blue-400 to-cyan-400",
  },
  {
    title: "CRM & ERP Integration",
    description:
      "Seamless API integration with Salesforce, Zoho, and custom systems.",
    icon: Link2,
    color: "text-emerald-400 bg-emerald-500/10",
    gradient: "from-emerald-400 to-teal-400",
  },
  {
    title: "AI Quality Scoring",
    description:
      "Automated QC with granular scoring for agent performance.",
    icon: Star,
    color: "text-pink-400 bg-pink-500/10",
    gradient: "from-pink-400 to-rose-400",
  },
  {
    title: "Predictive Insights",
    description:
      "Forecast call outcomes and optimize campaign performance.",
    icon: Target,
    color: "text-indigo-400 bg-indigo-500/10",
    gradient: "from-indigo-400 to-blue-400",
  },
];

export default function AdvancedAIIntelligence() {
  return (
    <section className="relative py-28 bg-gradient-to-b from-[#050816] to-[#0b1120] text-white overflow-hidden">
      
      {/* Background Glow Effects */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Advanced AI Intelligence
          </h2>
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg">
            Enterprise-grade AI capabilities designed to enhance automation,
            integration, and predictive decision-making.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2  gap-10">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 hover:-translate-y-2 hover:border-white/20 transition-all duration-300"
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 flex items-center justify-center rounded-2xl mb-6 ${item.color}`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                {/* Title */}
                <h3
                  className={`text-2xl font-semibold mb-4 bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed">
                  {item.description}
                </p>

                {/* Hover Glow Overlay */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 transition duration-300"></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}