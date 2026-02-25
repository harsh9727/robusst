"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "~/components/ui/button";

const FutureAutomation = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-indigo-50 py-28 sm:py-36">

      {/* Animated Background Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-32 -left-32 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] bg-indigo-200/40 rounded-full blur-3xl"
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8 flex justify-center"
          >
            <span className="rounded-full bg-blue-100/70 backdrop-blur-md px-4 py-1.5 text-sm font-semibold text-blue-700 ring-1 ring-blue-600/20 shadow-sm">
               Next-Gen Voice Automation
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl leading-tight"
          >
            Build the Future of{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Voice Automation
            </span>
          </motion.h1>

          {/* Sub Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-lg font-semibold text-pink-600 uppercase tracking-widest"
          >
            with ROBUST AI Call Center
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-lg leading-8 text-slate-600"
          >
            Enterprise-grade intelligence, bank-level security, and limitless scalability.
            Ready to transform your customer interactions?
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            {/* Primary Button */}
            <Button
              size="lg"
              className="group relative overflow-hidden px-8 py-6 text-lg font-semibold shadow-lg transition-all duration-300 hover:shadow-blue-300/40 hover:scale-105"
            >
              <Calendar className="h-5 w-5 mr-2 transition-transform group-hover:rotate-6" />
              Schedule a Demo
            </Button>

            {/* Secondary Button */}
            <Button
              variant="outline"
              size="lg"
              className="group px-8 py-6 text-lg border-slate-300 hover:bg-slate-900 hover:text-white transition-all duration-300"
            >
              See it in action
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FutureAutomation;