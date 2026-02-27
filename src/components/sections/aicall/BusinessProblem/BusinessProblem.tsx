"use client";

import { motion } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Languages,
  X,
  Play,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { YT_VIDEOS } from "~/constants";

const problems = [
  {
    title: "High Call Center Costs",
    description: "Human agents cost ~$1+ per minute with limited scalability.",
    icon: DollarSign,
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Limited Scalability",
    description: "Hiring and training agents is time-consuming and expensive.",
    icon: TrendingUp,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Quality Monitoring",
    description:
      "Manual QC is labor-intensive, inconsistent, and difficult to scale.",
    icon: ShieldCheck,
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Multilingual Complexity",
    description:
      "Managing Indian languages and dialects is operationally challenging.",
    icon: Languages,
    color: "from-purple-500 to-pink-500",
  },
];

export default function BusinessProblem() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden bg-black py-26 text-white">
        <div className="relative mx-auto max-w-7xl px-6">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <div
              className="relative mx-auto aspect-video h-100 bg-white"
              onClick={() => setIsVideoOpen(true)}
            >
              <div className="absolute bottom-5 left-5 z-10 flex items-center justify-center gap-2 rounded-full bg-black px-3 py-1 pr-2">
                Play
                <Play fill="#000000" />
              </div>
              <Image
                src="/solutions/aicall/15.webp"
                alt="about"
                fill
                className="object-cover object-top duration-150 group-hover:brightness-50"
              />
            </div>

            <h2 className="mt-8 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-4xl font-extrabold text-transparent md:text-5xl">
              The Business Problem
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-gray-400">
              Traditional call center operations are expensive, difficult to
              scale, and operationally complex.
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid gap-8 md:grid-cols-2">
            {problems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-white/20"
                >
                  {/* Icon */}
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} mb-6 shadow-lg`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-2xl font-semibold transition group-hover:text-blue-400">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="leading-relaxed text-gray-400">
                    {item.description}
                  </p>

                  {/* Glow Hover Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 transition duration-300 group-hover:opacity-100"></div>
                </motion.div>
              );
            })}
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

      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative aspect-video w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute -top-12 right-0 text-white transition-colors hover:text-gray-300"
              aria-label="Close video"
            >
              <X size={32} />
            </button>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${YT_VIDEOS.aiCallCenter}?autoplay=1&playsinline=1&rel=0&enablejsapi=1&origin=${typeof window !== "undefined" ? window.location.origin : ""}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="rounded-xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
