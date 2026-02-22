"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const steps = [
  { title: "Planning" },
  { title: "Provisioning" },
  { title: "Validation" },
  { title: "Diagnostics" },
  { title: "Optimization" },
];

export default function LifecycleAutomation() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl lg:text-[2.7rem] font-extrabold">
            <span className="bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
              End-to-End Lifecycle Automation
            </span>
          </h2>
        </motion.div>

        <p className="text-center text-gray-600 text-lg mb-20">
          Complete automation from network design through continuous improvement
        </p>

        <div className="relative">

          {/* Horizontal Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 relative">

            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative flex flex-col items-center group"
              >
                {/* Tracker Dot */}
                <div className="hidden lg:flex items-center justify-center w-6 h-6 rounded-full bg-white border-4 border-blue-500 z-10 mb-6 transition-all duration-300 group-hover:bg-pink-500 group-hover:border-pink-200 scale-100 group-hover:scale-110 shadow-md group-hover:shadow-pink-200" />
                {/* Card */}
                <div className="relative w-full text-center bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-xl transition duration-300 hover:-translate-y-2 overflow-hidden">

                  {/* Hover Glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-r from-blue-500/10 to-pink-500/10 rounded-xl" />

                  <h3 className="text-xl font-semibold text-pink-500 relative z-10">
                    {step.title}
                  </h3>
                </div>

                {/* Arrow (Mobile only) */}
                {index !== steps.length - 1 && (
                  <ArrowRight className="lg:hidden mt-6 text-blue-500" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}