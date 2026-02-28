"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { platform } from "public";

const features = [
  "Accurate IPv4 & IPv6 inventory through live SNMP/CLI network scanning",
  "Eliminates configuration errors with real-time visibility",
  "Reduces provisioning time from 5 days to 1 day",
  "Automated allocation & de-allocation workflows",
  "Real-time KPI monitoring (TG-wise & Partner-wise traffic visibility)",
  "Traffic-correlated gateway performance monitoring",
  "Faster traffic switchovers & quota management (reduced TAT)",
  "Higher ROI through improved efficiency, spam detection & revenue protection",
];

export default function Telcos() {
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
      <section className="relative overflow-hidden bg-black py-24">
        <div className="relative mx-auto max-w-7xl px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-16 max-w-7xl text-center"
          >
            <h2 className="text-brand-two mb-6 text-4xl leading-tight font-bold md:text-5xl">
              Benefits to Telcos
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
              <div className="relative h-[350px] w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.6)] sm:h-[450px] md:h-[500px] lg:h-[650px]">
                <Image
                  src="/solutions/network/1.webp"
                  alt="Smart Energy"
                  fill
                  className="h-full w-full object-cover"
                />
              </div>
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
    </>
  );
}
