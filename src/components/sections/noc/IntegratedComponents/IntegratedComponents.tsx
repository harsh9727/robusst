"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import type { SanityIntelligentNocSection } from "~/types/sanity/intelligentNoc";

interface IntegratedComponentsProps {
  data: SanityIntelligentNocSection<"integratedComponents">;
}

export default function IntegratedComponents({
  data,
}: IntegratedComponentsProps) {
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

      <section className="relative overflow-hidden bg-black py-16 sm:py-20 lg:py-28">
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-5 text-2xl leading-tight font-extrabold sm:text-3xl md:text-4xl lg:text-5xl">
              <span className="bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent">
                {data.title}
              </span>
            </h2>

            <p className="text-sm text-gray-300 md:text-lg">{data.subtitle}</p>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid gap-8 md:grid-cols-2">
            {/* Left Card */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition duration-500 hover:border-blue-400/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]"
            >
              <ul className="space-y-5">
                {(data.featuresLeft ?? []).map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-300 transition group-hover:text-white"
                  >
                    <CheckCircle className="mt-1 text-blue-400" size={20} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right Card */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition duration-500 hover:border-pink-400/40 hover:shadow-[0_0_40px_rgba(236,72,153,0.25)]"
            >
              <ul className="space-y-5">
                {(data.featuresRight ?? []).map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-300 transition group-hover:text-white"
                  >
                    <CheckCircle className="mt-1 text-pink-400" size={20} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
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
