"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Cdp_JsonType } from "~/types/api/cdp_json.types";
import Link from "next/link";

/* ✅ Animation Variants */
const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 60,
      damping: 12,
    },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 60,
      damping: 12,
    },
  },
};

interface CtaSectionProps {
  data?: Cdp_JsonType["cdp_page"]["ctaSection"];
}

export const CtaSection = ({ data }: CtaSectionProps) => {
  if (!data) return null;

  return (
    <section className="relative overflow-hidden bg-white px-6 py-28">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2"
      >
        {/* LEFT CONTENT */}
        <motion.div>
          <motion.h2
            variants={fadeUp}
            className="mb-6 text-4xl leading-tight font-extrabold text-black md:text-5xl"
          >
            {data.heading.split("Data-Driven Transformation")[0]}
            <br />
            <span className="text-pink-500">
              Data-Driven Transformation
            </span>{" "}
            Today
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mb-10 max-w-xl text-lg text-black"
          >
            {data.description}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center gap-4"
          >
            {/* Primary CTA */}
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-3 rounded-full bg-pink-500 px-5 py-2 font-semibold text-white shadow-lg"
              >
                {data.primaryCta}
                <span className="flex h-9 min-w-9 items-center justify-center rounded-full bg-black/20 transition group-hover:translate-x-1">
                  <ArrowRight className="h-5 w-5" />
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div variants={fadeRight} className="relative">
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative h-50 w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur sm:h-100 lg:h-125"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative h-full w-full"
            >
              <Image
                src="/solutions/cdp/2.webp"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                alt="Robust CDP Platform"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
