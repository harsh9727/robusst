"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { platform } from "public";

const features = [
  "AI-powered Special Event Network Management",
  "Ensures seamless connectivity in high-density venues (concerts, stadiums)",
  "Real-time monitoring and intelligent traffic optimization",
  "Prevents congestion without temporary infrastructure investment",
  "Closed-loop automation with AI-based load prediction",
  "Delivers premium mobile experience across multi-vendor networks",
  "Optimizes performance during peak crowd scenarios",
];

export default function SpecialEventManagement() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
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
            Special Event Management
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
            <div className="relative h-87.5 w-full overflow-hidden rounded-2xl border border-gray-200 shadow-xl sm:h-112.5 md:h-125 lg:h-142.5">
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
