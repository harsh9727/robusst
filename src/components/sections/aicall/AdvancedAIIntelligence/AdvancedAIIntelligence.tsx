"use client";

import { motion } from "framer-motion";
import { Brain, Link2, Star, Target } from "lucide-react";

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
    description: "Automated QC with granular scoring for agent performance.",
    icon: Star,
    color: "text-pink-400 bg-pink-500/10",
    gradient: "from-pink-400 to-rose-400",
  },
  {
    title: "Predictive Insights",
    description: "Forecast call outcomes and optimize campaign performance.",
    icon: Target,
    color: "text-indigo-400 bg-indigo-500/10",
    gradient: "from-indigo-400 to-blue-400",
  },
];

export default function AdvancedAIIntelligence() {
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

      <section className="relative overflow-hidden bg-black py-28 text-white">
        {/* Background Glow Effects */}
        <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6">
          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <h2 className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-4xl font-extrabold text-transparent md:text-5xl">
              Advanced AI Intelligence
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
              Enterprise-grade AI capabilities designed to enhance automation,
              integration, and predictive decision-making.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid gap-10 md:grid-cols-2">
            {features.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="group relative rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-white/20"
                >
                  {/* Icon */}
                  <div
                    className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${item.color}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Title */}
                  <h3
                    className={`mb-4 bg-gradient-to-r text-2xl font-semibold ${item.gradient} bg-clip-text text-transparent`}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="leading-relaxed text-gray-400">
                    {item.description}
                  </p>

                  {/* Hover Glow Overlay */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 transition duration-300 group-hover:opacity-100"></div>
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
