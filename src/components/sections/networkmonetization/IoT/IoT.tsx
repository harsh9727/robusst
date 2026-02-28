"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { platform } from "public";

const features = [
  "Intelligent IoT Network Optimization",
  "Reliable, scalable connectivity across diverse IoT use cases",
  "Service-aware balancing of coverage, battery life & bandwidth",
  "Coverage and capacity assurance for massive device growth",
  "Battery life optimization and signaling load reduction",
  "Self-healing automation for uninterrupted performance",
  "Supports SLA-driven performance in hyperconnected environments",
];

export default function IoT() {
  return (
    <section className="relative bg-white py-24 overflow-hidden">

      {/* Soft Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50" />
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-100 blur-[140px] rounded-full opacity-40" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-indigo-100 blur-[140px] rounded-full opacity-40" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-5xl mx-auto mb-16"
        >

          <h2 className="text-4xl md:text-5xl text-blue-600 font-bold leading-tight">
            IoT Optimization
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT IMAGE */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="grid sm:grid-cols-1 gap-4">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-3 p-4 rounded-xl bg-white border border-gray-200 shadow-sm
                  hover:shadow-lg hover:-translate-y-1 hover:border-blue-500/50
                  transition-all duration-300 ease-out"
                >
                  <CheckCircle2 className="min-w-6 h-6 text-blue-600 mt-1 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />

                  <span className="text-gray-700 text-md font-medium leading-relaxed transition-colors duration-300 group-hover:text-blue-600">
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
            <div className="relative overflow-hidden rounded-2xl w-full lg:h-[550px] md:h-[500px] sm:h-[450px] h-[350px] border border-gray-200 shadow-xl">
              <Image
                src={platform.cmp} // replace with stadium image if needed
                alt="Special Event Management"
                fill
                className="object-cover h-full w-full"
              />
            </div>

            {/* Soft Accent Glow */}
            <div className="absolute -z-10 -top-10 -right-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-40" />
            <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-indigo-200 rounded-full blur-3xl opacity-40" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}