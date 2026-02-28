"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { platform } from "public";

const features = [
  "SMO platform",
  "Multi-vendor integration",
  "Open API",
  "50+ automation use cases",
  "rApps ecosystem",
  "Intent-driven management",
];

export default function OpenRANSolutions() {
  return (
    <section className="relative bg-white py-24 overflow-hidden">

      {/* Soft Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50" />

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Open {" "}
              <span className="text-blue-600">
                RAN Solutions
              </span>
            </h2>

            <p className="text-xl text-black font-semibold mb-6 pl-3 border-l-4 border-blue-600">
              Monetize the Future of Disaggregated Networks
            </p>

            <p className="text-gray-600 mb-10 leading-relaxed">
              Seamless orchestration and management for disaggregated RAN architecture
            </p>

            {/* Feature List */}
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-3 p-3 rounded-lg bg-white shadow-sm border border-gray-100 
  hover:shadow-lg hover:-translate-y-1 hover:border-blue-500/50 
  transition-all duration-300 ease-out"
                >
                  <CheckCircle2 className="w-5 h-5 text-blue-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />

                  <span className="text-gray-700 font-medium transition-colors duration-300 group-hover:text-blue-600">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl w-full lg:h-[420px] md:h-[400px] sm:h-[450px] h-[300px]">
              <Image
                src={platform.cmp}
                alt="Open RAN Solutions"
                fill
                className="object-cover h-full w-full drop-shadow-[0_40px_60px_rgba(0,0,0,0.25)]"
              />
            </div>

            {/* Decorative Accent */}
            <div className="absolute -z-10 -top-10 -right-10 w-40 h-40 bg-pink-200 rounded-full blur-3xl opacity-40" />
            <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-40" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}