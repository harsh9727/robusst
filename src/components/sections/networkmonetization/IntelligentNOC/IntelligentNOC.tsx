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
    icon: <Cpu className="h-5 w-5" />,
    text: "AI-driven automation for multi-vendor networks (5G, LTE, WiFi, Fiber)",
  },
  {
    icon: <Target className="h-5 w-5" />,
    text: "Zero-touch deployment with unified workflows & real-time analytics",
  },
  {
    icon: <Layers className="h-5 w-5" />,
    text: "Flexible orchestration: Cloud, Datacenter, or On-Prem",
  },
  {
    icon: <Network className="h-5 w-5" />,
    text: "Broad compatibility (Cisco, Nokia, Huawei & more)",
  },
  {
    icon: <RefreshCw className="h-5 w-5" />,
    text: "Self-learning optimization & automated troubleshooting",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    text: "Designed for Telcos, ISPs & Enterprise networks",
  },
];

export default function IntelligentNOC() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 py-24">
      {/* Soft Background Glow */}
      <div className="absolute top-0 left-1/2 h-175 w-175 -translate-x-1/2 rounded-full bg-gradient-to-r from-pink-100 via-blue-100 to-purple-100 opacity-40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* ================= HEADER (CENTERED) ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500 bg-white px-4 py-2 shadow-sm">
            <Zap className="h-4 w-4 fill-blue-500 text-blue-500" />
            <span className="text-md font-semibold text-blue-500">
              Autonomous Network Operations
            </span>
          </div>
          <h2 className="mb-4 text-4xl leading-tight font-bold md:text-5xl">
            Intelligent <span className="text-blue-600">Dark NOC</span>
          </h2>

          <p className="text-lg leading-relaxed text-slate-600">
            Empower your infrastructure with AI-driven intelligence that
            automates workflows and ensures 24/7 autonomous reliability across
            every network layer.
          </p>
        </motion.div>

        {/* ================= MAIN GRID ================= */}
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* LEFT SIDE - FEATURES */}

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 shadow-2xl">
              <div className="h-87.5 w-full md:h-100 lg:h-100">
                <Image
                  src={platform.cmp}
                  alt="Intelligent NOC Dashboard"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="absolute right-0 bottom-6 left-0 text-center">
                <span className="rounded-full bg-black/60 px-6 py-2 text-sm font-semibold tracking-wide text-white backdrop-blur-md">
                  AI-Powered Autonomous Control
                </span>
              </div>
            </div>
            {/* Impact Cards */}
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {highlights.map((card, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-md transition-all hover:scale-[1.03] hover:shadow-xl"
                >
                  <p className="mb-2 text-sm font-bold text-slate-500 uppercase">
                    {card.title}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-4xl font-black text-transparent">
                      Up to {card.value}
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-pink-600" />
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Decorative Glow */}
            <div className="absolute -top-10 -right-10 -z-10 h-40 w-40 rounded-full bg-pink-200 opacity-60 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 -z-10 h-40 w-40 rounded-full bg-blue-200 opacity-60 blur-3xl" />
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
                  className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500 text-white shadow-md transition group-hover:scale-110">
                    {item.icon}
                  </div>
                  <p className="leading-relaxed font-medium text-slate-700">
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
