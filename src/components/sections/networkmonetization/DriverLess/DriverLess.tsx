"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { platform } from "public";

const features = [
  "AI-powered Driveless Tuning for smarter network optimization",
  "Eliminates costly and time-consuming drive tests",
  "360° visibility of real user experience across environments",
  "Automated data collection with multi-source correlation",
  "Intelligent site selection and future-ready network planning",
  "Faster expansion, lower costs, accelerated service launches",
  "User-controlled optimization with AI-driven forecasting",
];

export default function DriverLess() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      {/* Soft Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50" />
      <div className="blur-[120px] absolute -top-40 -left-40 h-125 w-125 rounded-full bg-blue-100 opacity-40" />
      <div className="blur-[120px] absolute -right-40 -bottom-40 h-125 w-125 rounded-full bg-indigo-100 opacity-40" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <h2 className="text-4xl leading-tight font-bold text-blue-600 md:text-5xl">
            DriverLess
          </h2>
        </motion.div>

        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* LEFT IMAGE */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="grid gap-4 sm:grid-cols-1">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-lg"
                >
                  <CheckCircle2 className="mt-1 h-6 min-w-6 text-blue-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />

                  <span className="text-md leading-relaxed font-medium text-gray-700 transition-colors duration-300 group-hover:text-blue-600">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
          {/* RIGHT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-87.5 w-full overflow-hidden rounded-2xl border border-gray-200 shadow-xl sm:h-112.5 md:h-125 lg:h-137.5">
              <Image
                src={platform.cmp} // replace with stadium image if needed
                alt="Special Event Management"
                fill
                className="h-full w-full object-cover"
              />
            </div>

            {/* Soft Accent Glow */}
            <div className="absolute -top-10 -right-10 -z-10 h-40 w-40 rounded-full bg-blue-200 opacity-40 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 -z-10 h-40 w-40 rounded-full bg-indigo-200 opacity-40 blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
