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
    <section className="relative bg-[#060b1a] text-white py-24 sm:py-32 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-pink-500/10" />
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-cyan-500/20 blur-[140px] rounded-full" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-pink-500/20 blur-[140px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-18 text-center"
        >

          <p className="text-md inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 font-semibold text-cyan-400 mb-6">
            Outdoor & Indoor Coverage Intelligence
          </p>
          <h2 className="text-3xl md:text-5xl font-bold ">
            <span className="bg-gradient-to-r from-pink-500 to-fuchsia-400 bg-clip-text text-transparent">
              Network Coverage Measurement System (NCS)
            </span>
          </h2>


        </motion.div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div className="space-y-8">

            {/* Features */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">
                Features
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="
          flex items-center gap-4
          bg-white/5
          border border-white/10
          rounded-xl
          px-6 py-4
          backdrop-blur-md
          hover:border-cyan-400
          transition
        "
                  >
                    <CheckCircle2 className="text-cyan-400 shrink-0" />
                    <span className="text-gray-200">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Business Impact */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">
                Business Impact
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                {businessImpact.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="
          flex items-center gap-4
          bg-white/5
          border border-white/10
          rounded-xl
          px-6 py-4
          backdrop-blur-md
          hover:border-pink-400
          transition
        "
                  >
                    <CheckCircle2 className="text-pink-400 shrink-0" />
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
            <div className="absolute w-[420px] h-[420px] bg-gradient-to-tr from-cyan-500/30 to-pink-500/30 blur-[120px] rounded-full" />

            <div className="relative overflow-hidden rounded-2xl w-full lg:h-[520px] md:h-[400px] sm:h-[450px] h-[300px]">
              <Image
                src={platform.cmp}
                alt="Network Test System"
                fill
                className="object-cover h-full w-full drop-shadow-[0_40px_60px_rgba(0,0,0,0.25)]"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}