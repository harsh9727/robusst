"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { platform } from "public";

const features = [
  "AI-driven Smart Energy Saving solution",
  "Reduces network energy consumption without impacting user experience",
  "Centralized platform across multi-vendor, multi-technology networks",
  "AI-based traffic prediction and automated energy optimization",
  "Minimizes coverage gaps and call drops",
  "Lowers operational costs and carbon emissions",
  "Maintains high service quality with intelligent control",
];

export default function SmartEnergy() {
  return (
    <>
      <div className="w-full overflow-hidden bg-white sm:-mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 150">
          <path
            d="M0,80 C300,50 400,50 600,80 C800,110 900,110 1200,80 L1200,200 L0,200 Z"
            fill="#000000"
          />
        </svg>
      </div>

      <section className="relative overflow-hidden bg-black">
        <div className="relative mx-auto max-w-7xl px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-16 max-w-7xl text-center"
          >
            <p className="text-md border-brand-two/30 bg-brand-two/10 text-brand-two mb-6 inline-flex rounded-full border px-4 py-2 font-semibold">
              Smart Energy
            </p>
            <h2 className="text-brand-two mb-6 text-4xl leading-tight font-bold md:text-5xl">
              Bridging Innovation & Connection
            </h2>
          </motion.div>
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* LEFT CONTENT */}

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative h-[350px] w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.6)] sm:h-[450px] md:h-[500px] lg:h-[570px]">
                <Image
                  src={platform.cmp}
                  alt="Smart Energy"
                  fill
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Decorative Neon Glow */}
              <div className="bg-brand-two absolute -top-10 -right-10 -z-10 h-40 w-40 rounded-full opacity-20 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 -z-10 h-40 w-40 rounded-full bg-purple-500 opacity-20 blur-3xl" />
            </motion.div>
            {/* RIGHT IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Title */}
              <h2 className="mb-6 text-4xl leading-tight font-bold text-white md:text-5xl">
                <span className="text-brand-two"></span>
              </h2>

              {/* Feature List */}
              <div className="grid gap-4 sm:grid-cols-1">
                {features.map((item, index) => (
                  <div
                    key={index}
                    className="group hover:border-brand-two/50 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/10 hover:shadow-[0_10px_40px_rgba(59,130,246,0.25)]"
                  >
                    <CheckCircle2 className="text-brand-two mt-1 h-6 min-w-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />

                    <span className="text-md leading-relaxed font-medium text-gray-300 transition-colors duration-300 group-hover:text-white">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <div className="w-full overflow-hidden bg-white sm:-mt-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 150"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 C300,150 400,150 600,120 C800,90 900,90 1200,120 L1200,0 L0,0 Z"
            fill="#000000"
            stroke="none"
          />
        </svg>
      </div>
    </>
  );
}
