"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import type { Aicall_JsonType } from "~/types/api/aicall_json.types";

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

/* ---------- Main Component ---------- */
export default function KeyValueProposition({
  data,
}: {
  data?: Aicall_JsonType["ai_call_page"]["keyValueProposition"];
}) {
  if (!data) return null;

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

      <section className="relative overflow-hidden bg-black py-28 text-white">
        {/* Background Glow */}

        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-around gap-16 px-6 text-center">
          {/* RIGHT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-4xl font-extrabold text-transparent md:text-5xl">
              {data.title}
            </h2>

            <p className="mb-12 text-lg text-gray-400">{data.subtitle}</p>

            {/* Stats Grid */}
            <div className="grid gap-14 md:grid-cols-3">
              {data.stats.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="group relative rounded-3xl border border-white/10 bg-white/5 px-8 py-12 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-white/20"
                >
                  <h3 className={`mb-4 text-5xl font-extrabold ${item.color}`}>
                    <Counter to={Number(item.number)} suffix={item.suffix} />
                  </h3>

                  <p className="text-lg leading-relaxed font-medium text-gray-300">
                    {item.label}
                  </p>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 transition duration-300 group-hover:opacity-100"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
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
    </>
  );
}
