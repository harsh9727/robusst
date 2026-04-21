"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import type { Networkmonetization_JsonType } from "~/types/api/networkmonetization_json.types";

interface UserExperienceManagementProps {
  data?: Networkmonetization_JsonType["network_monetization_page"];
}

export default function UserExperienceManagement({
  data,
}: UserExperienceManagementProps) {
  const section = data?.userExperienceManagement;

  if (!section) return null;

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

      <section className="relative overflow-hidden bg-black py-24 text-white sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-20 text-center">
            <span className="text-md border-brand-two/30 bg-brand-two/10 inline-flex rounded-full border px-4 py-2 font-semibold text-white">
              {section.badge}
            </span>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="my-6 text-3xl font-bold sm:text-4xl md:text-5xl"
            >
              <span className="text-brand-two">{section.title}</span>
            </motion.h2>
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <div>
            <p className="border-brand-two mb-10 border-l-4 pl-3 text-lg font-medium text-gray-300">
              {section.subtitle}
            </p>

            {/* Feature List */}
            <div className="space-y-6">
              {section.features.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="group border-brand-two/40 hover:border-brand-two flex items-center gap-4 rounded-full border bg-white/5 px-8 py-5 backdrop-blur-md transition-all duration-300 hover:bg-white/10"
                >
                  <CheckCircle2 className="text-brand-two group-hover:text-brand-two transition" />

                  <span className="text-xl font-semibold">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative flex justify-center"
          >
            {/* Glow */}
            <div className="from-brand-two/30 to-brand-two/30 absolute h-105 w-105 rounded-full bg-gradient-to-tr blur-[100px]" />

            {/* Circle Image */}
            <div className="relative h-95 w-95 overflow-hidden rounded-full border border-white/10 shadow-2xl">
              <Image
                src={section.image}
                alt={section.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
