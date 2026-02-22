"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "~/components/ui/badge";
import { CircleCheck } from "lucide-react";
import { platform } from "public";

export default function AiNetwork() {
  return (
    <section className="relative overflow-hidden bg-white text-gray-900">

      {/* Soft Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.08),transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(236,72,153,0.08),transparent_40%)]" />

      <div className="relative container mx-auto px-6 lg:px-8 py-20 lg:py-28 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {/* Badge */}
            <Badge className="bg-blue-50 text-blue-600 border border-blue-600 px-4 py-2 text-sm rounded-full">
              AI-Powered Network Intelligence
            </Badge>

            {/* Heading */}
            <h1 className="mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
              Transform Network Operations with{" "}
              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-pink-500 bg-clip-text text-transparent">
                Autonomous AI
              </span>
            </h1>

            {/* Industry Tags */}
            <div className="flex flex-wrap gap-3 mt-6">
              {[
                "Tier-1 Telcos",
                "ISPs",
                "Enterprises",
                "Managed Service Providers",
              ].map((item, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-pink-50 border border-pink-500 rounded-full font-semibold text-sm text-pink-500"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Bullet Points */}
            <div className="mt-10 space-y-5">
              {[
                "Shift from reactive firefighting to predictive intelligence",
                "Unify fragmented tools into one autonomous platform",
                "Enable Dark NOC operations with AI-driven automation",
                "Empower engineers with actionable insights, not alert noise",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-blue-500 to-pink-300 p-2 rounded-lg shadow-md">
                    <CircleCheck className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-gray-700 text-base leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Soft Glow */}
            <div className="absolute -inset-6 bg-gradient-to-r from-blue-200 to-pink-200 opacity-40 blur-3xl rounded-3xl" />

            <div className="relative rounded-3xl overflow-hidden border border-gray-200 shadow-xl bg-white">
              <Image
                src={platform.cmp}
                alt="AI Dashboard"
                width={700}
                height={700}
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}