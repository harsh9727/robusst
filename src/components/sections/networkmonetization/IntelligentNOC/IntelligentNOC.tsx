"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Cpu,
  Zap,
  Target,
  RefreshCw,
  Layers,
  ShieldCheck,
  Network,
  ArrowUpRight,
} from "lucide-react";
import { platform } from "public";

const highlights = [
  {
    title: "OpEx Reduction",
    value: "70%",
    description:
      "Drastic reduction in operational expenses through AI-driven automation.",
  },
  {
    title: "CapEx Optimization",
    value: "40%",
    description:
      "Significant capital expenditure savings via unified, zero-touch workflows.",
  },
];

const capabilities = [
  {
    icon: <Cpu className="w-5 h-5" />,
    text: "AI-driven automation for multi-vendor networks (5G, LTE, WiFi, Fiber)",
  },
  {
    icon: <Target className="w-5 h-5" />,
    text: "Zero-touch deployment with unified workflows & real-time analytics",
  },
  {
    icon: <Layers className="w-5 h-5" />,
    text: "Flexible orchestration: Cloud, Datacenter, or On-Prem",
  },
  {
    icon: <Network className="w-5 h-5" />,
    text: "Broad compatibility (Cisco, Nokia, Huawei & more)",
  },
  {
    icon: <RefreshCw className="w-5 h-5" />,
    text: "Self-learning optimization & automated troubleshooting",
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    text: "Designed for Telcos, ISPs & Enterprise networks",
  },
];

export default function IntelligentNOC() {
  return (
    <section className="relative bg-gradient-to-b from-white to-slate-50 py-24 overflow-hidden">
      {/* Soft Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-r from-pink-100 via-blue-100 to-purple-100 blur-3xl opacity-40 rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* ================= HEADER (CENTERED) ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-500 shadow-sm mb-6">
            <Zap className="w-4 h-4 text-blue-500 fill-blue-500" />
            <span className="text-md font-semibold text-blue-500">
              Autonomous Network Operations
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl leading-tight font-bold mb-4">
            Intelligent{" "}
            <span className="text-blue-600">
              Dark NOC
            </span>
          </h2>

          <p className="text-lg text-slate-600 leading-relaxed">
            Empower your infrastructure with AI-driven intelligence that
            automates workflows and ensures 24/7 autonomous reliability across
            every network layer.
          </p>
        </motion.div>

        {/* ================= MAIN GRID ================= */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE - FEATURES */}

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200">
              <div className="w-full h-[350px] md:h-[400px] lg:h-[400px]">
                <Image
                  src={platform.cmp}
                  alt="Intelligent NOC Dashboard"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute bottom-6 left-0 right-0 text-center">
                <span className="bg-black/60 backdrop-blur-md px-6 py-2 rounded-full text-white text-sm font-semibold tracking-wide">
                  AI-Powered Autonomous Control
                </span>
              </div>
            </div>
            {/* Impact Cards */}
            <div className="grid sm:grid-cols-2 gap-6 mt-8">
              {highlights.map((card, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-slate-200 shadow-md hover:shadow-xl hover:scale-[1.03] transition-all"
                >
                  <p className="text-sm font-bold uppercase text-slate-500 mb-2">
                    {card.title}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-4xl font-black bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
                      Up to {card.value}
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-pink-600" />
                  </div>
                  <p className="text-sm text-slate-600 mt-3">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Decorative Glow */}
            <div className="absolute -z-10 -top-10 -right-10 w-40 h-40 bg-pink-200 rounded-full blur-3xl opacity-60" />
            <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-60" />
          </motion.div>

          {/* RIGHT SIDE - IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid gap-5">
              {capabilities.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="group flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-blue-500 text-white shadow-md group-hover:scale-110 transition">
                    {item.icon}
                  </div>
                  <p className="text-slate-700 font-medium leading-relaxed">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>


          </motion.div>
        </div>
      </div>
    </section>
  );
}