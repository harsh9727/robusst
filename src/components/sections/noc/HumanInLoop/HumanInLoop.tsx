"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { platform } from "public";

export default function HumanInLoop() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {/* Title */}
            <div className="inline-block mb-8 relative group">

              <h2 className="relative leading-tight text-3xl md:text-4xl lg:text-[2.7rem] font-extrabold px-5 py-3 border border-purple-300 rounded-md">
                <span className="bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
                  Human-in-the-Loop. <br /> AI-at-Scale.
                </span>
              </h2>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
              Intelligent NOC doesn't replace your engineers—it empowers them.
              By automating the routine, we free your team to focus on
              innovation, strategy, and delivering exceptional customer
              experiences.
            </p>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden border border-gray-200 shadow-xl bg-white">

              <Image
                src={platform.cmp}
                alt="AI NOC Engineer"
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition duration-500" />
            </div>

            {/* Soft Accent Glow */}
            <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-pink-200/40 blur-3xl rounded-full" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}