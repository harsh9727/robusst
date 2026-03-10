"use client";

import { motion } from "framer-motion";
import { Brain, Database, Users, MessageSquare } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import type { AdvancedAIIntelligenceSection } from "~/i18n/types/aiCall";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Brain,
  Database,
  Users,
  MessageSquare,
};

export default function AdvancedAIIntelligence() {
  const t = useTranslations();
  const advancedAI = t.raw(
    "ai_call_page.advancedAIIntelligence",
  ) as AdvancedAIIntelligenceSection;

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
        <div className="blur-[100px] absolute top-0 right-0 h-100 w-100 rounded-full bg-cyan-500/10" />
        <div className="blur-[100px] absolute bottom-0 left-0 h-100 w-100 rounded-full bg-indigo-500/10" />

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
              {advancedAI.title}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white">
              {advancedAI.subtitle}
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid gap-10 md:grid-cols-2">
            {advancedAI.features.map((item, index) => {
              const Icon = iconMap[item.icon];

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
                  {Icon && (
                    <div
                      className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${item.color}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                  )}

                  {/* Title */}
                  <h3
                    className={`mb-4 bg-gradient-to-r text-2xl font-semibold ${item.gradient} bg-clip-text text-transparent`}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="leading-relaxed text-white">
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
