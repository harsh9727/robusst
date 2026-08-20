"use client";

import { motion } from "framer-motion";
import type { SanityIntelligentNocSection } from "~/types/sanity/intelligentNoc";

type Props = {
  data: SanityIntelligentNocSection<"frameworkADAA">;
};

export default function FrameworkADAA({ data }: Props) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

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
      <section className="relative overflow-hidden bg-black py-16 sm:py-20 lg:py-28">
        <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-5 text-center text-2xl leading-tight font-extrabold sm:text-3xl md:text-4xl lg:text-5xl">
            <span className="text-brand-one">{data.title}</span>
          </h2>

          <p className="mb-12 text-center text-lg font-light text-gray-300">
            <span className="text-brand-one font-bold">{data.subtitle}</span>{" "}
            {data.subtitleDescription}
          </p>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-10 sm:grid-cols-2"
          >
            {(data.features ?? []).map((feature, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -6 }}
                className="group hover:border-brand-one relative rounded-xl border border-purple-500/40 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_30px_rgba(236,72,153,0.25)]"
              >
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 rounded-xl opacity-0 transition duration-500 group-hover:opacity-100">
                  <div className="to-brand-one/10 absolute inset-0 animate-[pulse_3s_linear_infinite] rounded-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10" />
                </div>

                <h3 className="text-brand-one relative z-10 mb-3 text-xl font-bold sm:text-2xl">
                  {feature.title}
                </h3>
                <p className="relative z-10 text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
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
