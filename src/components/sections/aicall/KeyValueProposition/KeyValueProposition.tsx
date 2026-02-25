"use client";

import Image from "next/image";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { platform } from "public";

/* ---------- Counter Component ---------- */
function Counter({
  from = 0,
  to,
  duration = 2,
  suffix = "",
  className = "",
}: {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const motionValue = useMotionValue(from);
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(to);
    }
  }, [isInView, motionValue, to]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        (ref.current as HTMLElement).textContent =
          Math.floor(latest).toLocaleString() + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref} className={className} />;
}

/* ---------- Stats Data ---------- */
const stats = [
  {
    number: 70,
    suffix: "%",
    label: "Cost Reduction vs Human Agents",
    color: "text-blue-500",
  },
  {
    number: 1000,
    suffix: "+",
    label: "Concurrent AI Agents",
    color: "text-emerald-400",
  },
  {
    number: 20,
    suffix: "+",
    label: "Global Languages Supported",
    color: "text-pink-500",
  },
];

/* ---------- Main Component ---------- */
export default function KeyValueProposition() {
  return (
    <section className="relative py-28 bg-gradient-to-b from-[#050816] to-[#0b1120] text-white overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute -top-40 -right-40 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute bottom-0 -left-32 h-[360px] w-[360px] rounded-full bg-indigo-500/20 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="rounded-3xl overflow-hidden shadow-2xl w-full sm:h-[400px] h-[300px] border border-white/10">
            <Image
              src={platform.cmp}
              alt="AI Voice Performance"
              className="object-cover w-full h-full"
            />
          </div>

          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"></div>
        </motion.div>

        {/* RIGHT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Key Value Proposition
          </h2>

          <p className="text-gray-400 text-lg mb-12">
            Enterprise-grade quality, intelligent filtering, and real-time
            insights — built for high-performance AI voice operations.
          </p>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl px-5 py-6 text-center hover:-translate-y-2 hover:border-white/20 transition duration-300"
              >
                <h3 className={`text-4xl font-extrabold mb-4 ${item.color}`}>
                  <Counter to={item.number} suffix={item.suffix} />
                </h3>

                <p className="text-gray-300 text-md font-medium leading-relaxed">
                  {item.label}
                </p>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 transition duration-300"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}