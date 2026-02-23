"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, BarChart3, Cpu } from "lucide-react";
import { platform } from "public";

export default function IntelligentNOC() {
  return (
    <section className="relative overflow-hidden bg-gray-50 py-28">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid items-center gap-20 lg:grid-cols-2">
          {/* LEFT CONTENT */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative h-[400px] w-full overflow-hidden rounded-2xl border bg-white shadow-xl">
              <Image
                src={platform.cmp}
                alt="Intelligent NOC Dashboard"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Subtle Background Accent */}
            <div className="absolute -top-10 -right-10 -z-10 h-72 w-72 rounded-full bg-blue-100 opacity-60 blur-3xl" />
          </motion.div>
          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Section Label */}
            <span className="rounded-full border border-blue-600 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
              What Is Intelligent NOC?
            </span>

            {/* Heading */}
            <h2 className="mt-6 text-2xl leading-tight font-extrabold text-pink-500 sm:text-3xl md:text-4xl lg:text-5xl">
              <span>One Platform</span>
              <br />
              <span>Total Visibility</span>
              <br />
              <span>Zero Operational Silos</span>
            </h2>

            {/* Description */}
            <p className="mt-6 text-lg leading-relaxed text-black">
              Intelligent NOC is a unified AI-powered platform that consolidates
              network operations into a single pane of glass. It delivers
              real-time visibility, predictive analytics, and autonomous
              remediation across multi-vendor, multi-technology environments.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
