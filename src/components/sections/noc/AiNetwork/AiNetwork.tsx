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

      <div className="relative container mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {/* Badge */}
            <Badge className="rounded-full border border-blue-600 bg-blue-50 px-4 py-2 text-sm text-blue-600">
              AI-Powered Network Intelligence
            </Badge>

            {/* Heading */}
            <h1 className="mt-6 text-2xl leading-tight font-extrabold sm:text-3xl md:text-4xl lg:text-5xl">
              Transform Network Operations with{" "}
              <span className="text-brand-one">Autonomous AI</span>
            </h1>

            {/* Industry Tags */}
            <div className="mt-6 flex flex-wrap gap-3">
              {[
                "Tier-1 Telcos",
                "ISPs",
                "Enterprises",
                "Managed Service Providers",
              ].map((item, index) => (
                <span
                  key={index}
                  className="bg-brand-one/10 border-brand-one text-brand-one rounded-full border px-4 py-2 text-sm font-semibold"
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
                  <div className="bg-brand-one rounded-lg p-2 shadow-md">
                    <CircleCheck className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-base leading-relaxed text-gray-700">
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
            <div className="relative overflow-hidden bg-white">
              <Image
                src="/solutions/noc/1.webp"
                alt="AI Dashboard"
                width={700}
                height={700}
                className="h-auto w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
