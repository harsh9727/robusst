"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Home,
  DollarSign,
  ShoppingCart,
  Heart,
  Phone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Marquee from "react-fast-marquee";
import type { SanityAiCallSection } from "~/types/sanity/aiCallCenter";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Building2,
  Home,
  DollarSign,
  ShoppingCart,
  Heart,
  Phone,
};

interface IdealUseCasesProps {
  data: SanityAiCallSection<"idealUseCases">;
}

export default function IdealUseCases({ data }: IdealUseCasesProps) {
  if (!data) return null;

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
          >
            <h2 className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-center text-4xl font-extrabold text-transparent md:text-5xl">
              {data.title}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-gray-400">
              {data.subtitle}
            </p>
          </motion.div>

          {/* Grid */}
          <Marquee className="h-80">
            {(data.useCases ?? []).map((item, index) => {
              const Icon = iconMap[item.icon ?? ""];

              return (
                <motion.div
                  key={index}
                  className={`group relative mx-8 w-100 rounded-3xl border border-neutral-800 bg-neutral-900 p-8 shadow-lg transition-all duration-300 ${item.glow}`}
                >
                  {/* Glow Hover Background */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 blur-xl transition duration-500 group-hover:opacity-100"></div>

                  <div className="relative z-10">
                    {/* Icon */}
                    {Icon && (
                      <div
                        className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300 ${item.color} group-hover:scale-110`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-white transition group-hover:text-blue-400">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 text-neutral-400">{item.description}</p>

                    {/* Animated bottom line */}
                    <div className="mt-6 h-0.5 w-0 bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-400 group-hover:w-full"></div>
                  </div>
                </motion.div>
              );
            })}
          </Marquee>
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
