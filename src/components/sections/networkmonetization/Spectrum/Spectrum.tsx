"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { platform } from "public";

const features = [
  "AI-driven Spectrum Refarming for maximum spectrum utilization",
  "Enables smooth transition to next-gen technologies like 5G",
  "Identifies underutilized carriers and optimizes configurations",
  "Automated frequency planning using AFP & AFR tools",
  "Phased implementation with minimal service disruption",
  "Continuous post-refarming optimization for sustained ROI",
  "Increases capacity, spectral efficiency, and network future-readiness",
];

export default function Spectrum() {
  return (
    <section className="relative overflow-hidden bg-[#0B0F1A] py-24">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-pink-500/10" />
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[140px]" />
      <div className="absolute -right-40 -bottom-40 h-[500px] w-[500px] rounded-full bg-pink-500/20 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-7xl text-center"
        >
          <h2 className="mb-6 bg-gradient-to-r from-pink-500 to-fuchsia-400 bg-clip-text text-4xl leading-tight font-bold text-transparent md:text-5xl">
            Spectrum Refarming
          </h2>
        </motion.div>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* LEFT CONTENT */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-[350px] w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.6)] sm:h-[450px] md:h-[500px] lg:h-[570px]">
              <Image
                src={platform.cmp}
                alt="Smart Energy"
                fill
                className="h-full w-full object-cover"
              />
            </div>

            {/* Decorative Neon Glow */}
            <div className="absolute -top-10 -right-10 -z-10 h-40 w-40 rounded-full bg-blue-500 opacity-20 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 -z-10 h-40 w-40 rounded-full bg-purple-500 opacity-20 blur-3xl" />
          </motion.div>
          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Title */}
            <h2 className="mb-6 text-4xl leading-tight font-bold text-white md:text-5xl">
              <span className="text-blue-500"></span>
            </h2>

            {/* Feature List */}
            <div className="grid gap-4 sm:grid-cols-1">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1 hover:border-blue-500/50 hover:bg-white/10 hover:shadow-[0_10px_40px_rgba(59,130,246,0.25)]"
                >
                  <CheckCircle2 className="mt-1 h-6 min-w-6 text-cyan-400 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />

                  <span className="text-md leading-relaxed font-medium text-gray-300 transition-colors duration-300 group-hover:text-white">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
