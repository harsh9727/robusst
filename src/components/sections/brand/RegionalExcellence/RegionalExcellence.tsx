"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import type { Brand_JsonType } from "~/types/api/brand_json.types";

interface RegionalExcellenceProps {
  data?: Brand_JsonType["brand_page"]["regionalExcellence"];
}

export const RegionalExcellence = ({ data }: RegionalExcellenceProps) => {
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

      <section className="bg-primary relative flex w-full items-center justify-center overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-16 lg:py-25">
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            {/* Heading */}
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-brand-one mb-6 text-3xl leading-tight font-extrabold md:text-4xl"
            >
              {data.heading}
            </motion.h2>

            {/* Subheading */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="mb-8 max-w-xl text-base leading-relaxed text-white/80"
            >
              {data.subheading}
            </motion.p>

            {/* Regions List */}
            <ul className="space-y-4">
              {data.regions.map((region, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 text-white/90"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle2 className="text-brand-one mt-1 h-6 w-6" />
                  </motion.div>

                  <span>
                    <strong className="text-white">{region.title}:</strong>{" "}
                    {region.description}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 80, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="shadow-brand-one relative h-75 overflow-hidden rounded-3xl shadow-2xl shadow-[0px_0px_0px] duration-150 hover:shadow-[0px_0px_40px] sm:h-92.5 md:h-100 lg:h-125"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-full w-full"
            >
              <Image
                src="/solutions/brand/4.webp"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
                alt="Regional Business Communication"
                className="h-full w-full object-cover"
              />
            </motion.div>
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
};
