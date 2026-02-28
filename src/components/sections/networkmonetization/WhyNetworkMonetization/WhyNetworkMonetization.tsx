"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const points = [
  "5G investments demand faster ROI",
  "Enterprise use cases require SLA-backed performance",
  "Customers expect flawless digital experiences",
  "Networks are becoming multi-vendor and multi-technology",
];

export default function WhyNetworkMonetization() {
  return (
    <section className="relative overflow-hidden bg-black text-white py-24 sm:py-32">

      {/* Gradient Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 via-transparent to-cyan-500/10" />
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-pink-500/20 blur-[140px] rounded-full" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-cyan-500/20 blur-[140px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12"
        >
          <span className="bg-gradient-to-r from-pink-500 to-fuchsia-400 bg-clip-text text-transparent">
            Why Network Monetization Matters Now
          </span>
        </motion.h2>

        {/* Bullet Points */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {points.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 group"
            >
              <CheckCircle2 className="text-cyan-400 mt-1 group-hover:scale-110 transition" />

              <p className="text-gray-300 text-lg leading-relaxed">
                {item}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Highlight Statement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="
            relative rounded-full
            border border-pink-500/40
            bg-gradient-to-r from-cyan-500/10 via-transparent to-pink-500/10
            backdrop-blur-xl
            px-8 py-8 md:px-14
            text-center
          "
        >
          <p className="text-lg md:text-xl font-medium text-cyan-300 leading-relaxed max-w-4xl mx-auto">
            Traditional OSS/BSS tools cannot unlock the full monetization
            potential of modern networks. We provide the intelligence layer
            that connects network performance to revenue strategy.
          </p>
        </motion.div>

      </div>
    </section>
  );
}