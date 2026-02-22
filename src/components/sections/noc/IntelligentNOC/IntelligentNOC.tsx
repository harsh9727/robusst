"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, BarChart3, Cpu } from "lucide-react";
import { platform } from "public";

export default function IntelligentNOC() {
  return (
    <section className="relative py-28 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT CONTENT */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden bg-white border shadow-xl h-[400px] w-full">
              <Image
                src={platform.cmp}
                alt="Intelligent NOC Dashboard"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Subtle Background Accent */}
            <div className="absolute -z-10 -top-10 -right-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-60" />
          </motion.div>
          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Section Label */}
            <span className="bg-blue-50 text-blue-600 border border-blue-600 px-4 py-2 text-sm font-semibold rounded-full">
              What Is Intelligent NOC?
            </span>

            {/* Heading */}
            <h2 className="mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-pink-500 leading-tight">
              <span >
                One Platform
              </span>
              <br />
              <span >
                Total Visibility
              </span>
              <br />
              <span >
                Zero Operational Silos
              </span>
            </h2>

            {/* Description */}
            <p className="mt-6 text-lg text-black leading-relaxed">
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