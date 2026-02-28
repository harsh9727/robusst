"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { platform } from "public";

const features = [
  "Service Availability",
  "Service Quality",
  "Network Coverage",
];

export default function UserExperienceManagement() {
  return (
    <section className="relative bg-black text-white overflow-hidden py-24 sm:py-32">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 via-transparent to-cyan-500/10" />
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-pink-500/20 blur-[140px] rounded-full" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-cyan-500/20 blur-[140px] rounded-full" />

      <div className=" max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center">
          <span className="text-md inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 font-semibold text-cyan-400">
            Make Your Network More Powerful
          </span>

         <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold my-6"
          >
            <span className="bg-gradient-to-r from-pink-500 to-fuchsia-400 bg-clip-text text-transparent">
              User Experience Management
            </span>
          </motion.h2>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div>

          <p className="text-gray-300 text-lg font-medium mb-10 pl-3 border-l-4 border-cyan-500">
            Improving mobile user experience is driven by:
          </p>

          {/* Feature List */}
          <div className="space-y-6">
            {features.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                className="
                  group flex items-center gap-4
                  border border-cyan-500/40
                  rounded-full
                  px-8 py-5
                  bg-white/5
                  backdrop-blur-md
                  hover:border-pink-500
                  hover:bg-white/10
                  transition-all duration-300
                "
              >
                <CheckCircle2 className="text-cyan-400 group-hover:text-pink-400 transition" />

                <span className="text-xl font-semibold">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative flex justify-center"
        >
          {/* Glow */}
          <div className="absolute w-[420px] h-[420px] bg-gradient-to-tr from-pink-500/30 to-cyan-500/30 blur-[120px] rounded-full" />

          {/* Circle Image */}
          <div className="relative w-[380px] h-[380px] rounded-full overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src={platform.cmp}
              alt="User Experience Management"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}