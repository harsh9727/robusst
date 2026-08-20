"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { SanityIntelligentNocSection } from "~/types/sanity/intelligentNoc";

interface Props {
  data: SanityIntelligentNocSection<"lifecycleAutomation">;
}

export default function LifecycleAutomation({ data }: Props) {
  if (!data) return null;

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <h2 className="text-3xl font-extrabold md:text-4xl lg:text-[2.7rem]">
            <span className="text-brand-three">{data.title}</span>
          </h2>
        </motion.div>

        <p className="mb-20 text-center text-lg text-gray-600">
          {data.description}
        </p>

        <div className="relative">
          {/* Horizontal Line */}
          <div className="absolute top-1/2 left-0 hidden h-0.5 w-full bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 lg:block" />

          <div className="relative grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
            {(data.steps ?? []).map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group relative flex flex-col items-center"
              >
                {/* Tracker Dot */}
                <div className="z-10 mb-6 hidden h-6 w-6 scale-100 items-center justify-center rounded-full border-4 border-blue-500 bg-white shadow-md transition-all duration-300 group-hover:scale-110 group-hover:border-pink-200 group-hover:bg-pink-500 group-hover:shadow-pink-200 lg:flex" />
                {/* Card */}
                <div className="relative w-full overflow-hidden rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">
                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-pink-500/10 opacity-0 transition duration-300 group-hover:opacity-100" />

                  <h3 className="relative z-10 text-xl font-semibold text-pink-500">
                    {step.title}
                  </h3>
                </div>

                {/* Arrow (Mobile only) */}
                {index !== (data.steps?.length ?? 0) - 1 && (
                  <ArrowRight className="mt-6 text-blue-500 lg:hidden" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
