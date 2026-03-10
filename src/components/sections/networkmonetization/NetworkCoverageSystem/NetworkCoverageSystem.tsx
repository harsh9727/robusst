"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { platform } from "public";

const features = [
  "Real-time coverage mapping",
  "Signal strength analytics",
  "Coverage gap identification",
  "Geospatial visualization",
];

const businessImpact = [
  "Optimized network expansion",
  "Reduced capital expenditure",
  "Improved customer retention",
  "Data-driven decision making",
];

export default function NetworkCoverageSystem() {
  return (
    <section className="relative overflow-hidden bg-[#060b1a] py-24 text-white sm:py-32">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-pink-500/10" />
      <div className="absolute -top-40 -left-40 h-125 w-125 rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute -right-40 -bottom-40 h-125 w-125 rounded-full bg-pink-500/20 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-18 text-center"
        >
          <p className="text-md mb-6 inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 font-semibold text-cyan-400">
            Outdoor & Indoor Coverage Intelligence
          </p>
          <h2 className="text-3xl font-bold md:text-5xl">
            <span className="bg-gradient-to-r from-pink-500 to-fuchsia-400 bg-clip-text text-transparent">
              Network Coverage Measurement System (NCS)
            </span>
          </h2>
        </motion.div>

        {/* MAIN GRID */}
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <div className="space-y-8">
            {/* Features */}
            <div>
              <h3 className="mb-6 text-2xl font-semibold">Features</h3>

              <div className="grid gap-4 sm:grid-cols-2">
                {features.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-md transition hover:border-cyan-400"
                  >
                    <CheckCircle2 className="shrink-0 text-cyan-400" />
                    <span className="text-gray-200">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Business Impact */}
            <div>
              <h3 className="mb-6 text-2xl font-semibold">Business Impact</h3>

              <div className="grid gap-4 sm:grid-cols-2">
                {businessImpact.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-md transition hover:border-pink-400"
                  >
                    <CheckCircle2 className="shrink-0 text-pink-400" />
                    <span className="text-gray-200">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative flex justify-center"
          >
            {/* Glow */}
            <div className="absolute h-105 w-105 rounded-full bg-gradient-to-tr from-cyan-500/30 to-pink-500/30 blur-[100px]" />

            <div className="relative h-75 w-full overflow-hidden rounded-2xl sm:h-112.5 md:h-100 lg:h-130">
              <Image
                src={platform.cmp}
                alt="Network Test System"
                fill
                className="h-full w-full object-cover drop-shadow-[0_40px_60px_rgba(0,0,0,0.25)]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
