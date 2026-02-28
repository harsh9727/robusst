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
    <section className="relative bg-[#0B0F1A] py-24 overflow-hidden">

      {/* Background Glow Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-pink-500/10" />
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-cyan-500/20 blur-[140px] rounded-full" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-pink-500/20 blur-[140px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-7xl mx-auto mb-16"
        >

          <h2 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-pink-500 to-fuchsia-400 bg-clip-text text-transparent mb-6">
            Spectrum Refarming
          </h2>

        </motion.div>
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl w-full lg:h-[570px] md:h-[500px] sm:h-[450px] h-[350px] border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
              <Image
                src={platform.cmp}
                alt="Smart Energy"
                fill
                className="object-cover h-full w-full"
              />
            </div>

            {/* Decorative Neon Glow */}
            <div className="absolute -z-10 -top-10 -right-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-20" />
            <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-20" />
          </motion.div>
          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-white">

              <span className="text-blue-500">
              </span>
            </h2>



            {/* Feature List */}
            <div className="grid sm:grid-cols-1 gap-4">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 
                  hover:border-blue-500/50 hover:bg-white/10 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(59,130,246,0.25)]
                  transition-all duration-300 ease-out"
                >
                  <CheckCircle2 className="min-w-6 h-6 text-cyan-400 mt-1 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />

                  <span className="text-gray-300 text-md font-medium leading-relaxed transition-colors duration-300 group-hover:text-white">
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