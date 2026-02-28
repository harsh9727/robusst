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
    <section className="relative overflow-hidden bg-white py-24">
      {/* Soft Background Gradient */}

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Title */}
            <h2 className="mb-6 text-4xl leading-tight font-bold md:text-5xl">
              Open <span className="text-blue-600">RAN Solutions</span>
            </h2>

            <p className="mb-6 border-l-4 border-blue-600 pl-3 text-xl font-semibold text-black">
              Monetize the Future of Disaggregated Networks
            </p>

            <p className="mb-10 leading-relaxed text-gray-600">
              Seamless orchestration and management for disaggregated RAN
              architecture
            </p>

            {/* Feature List */}
            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-3 rounded-lg border border-gray-100 bg-white p-3 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-lg"
                >
                  <CheckCircle2 className="h-5 w-5 text-blue-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />

                  <span className="font-medium text-gray-700 transition-colors duration-300 group-hover:text-blue-600">
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
            <div className="relative h-[300px] w-full overflow-hidden rounded-2xl sm:h-[450px] md:h-[400px] lg:h-[420px]">
              <Image
                src={platform.cmp}
                alt="Open RAN Solutions"
                fill
                className="h-full w-full object-cover drop-shadow-[0_40px_60px_rgba(0,0,0,0.25)]"
              />
            </div>

            {/* Decorative Accent */}
            <div className="absolute -top-10 -right-10 -z-10 h-40 w-40 rounded-full bg-pink-200 opacity-40 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 -z-10 h-40 w-40 rounded-full bg-blue-200 opacity-40 blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
