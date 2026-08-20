"use client";

import Image from "next/image";
import { ShieldAlert, Network, Star, Ban } from "lucide-react";
import { motion } from "framer-motion";
import type { SanityBrandedCallingSection } from "~/types/sanity/brandedCalling";

const iconMap = [ShieldAlert, Network, Star, Ban];

interface CoreProtectionFeaturesProps {
  data: SanityBrandedCallingSection<"coreProtectionFeatures">;
}

export const CoreProtectionFeatures = ({
  data,
}: CoreProtectionFeaturesProps) => {
  if (!data) return null;

  return (
    <section className="overflow-hidden bg-white px-4 py-16 sm:px-6 lg:px-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center md:grid-cols-2 md:gap-10 lg:gap-25">
        {/* LEFT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -80, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative mb-10 flex h-75 justify-center overflow-hidden rounded-3xl md:mb-0 md:h-100 lg:h-137.5"
          >
            <Image
              src={data.image ?? ""}
              alt={data.imageAlt ?? data.heading ?? ""}
              width={500}
              height={500}
              priority
              className="h-full w-fit object-cover"
            />
          </motion.div>
        </motion.div>

        {/* RIGHT CONTENT */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {/* Heading */}
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            className="mb-10 text-2xl font-extrabold text-pink-500 uppercase md:text-3xl"
          >
            {data.heading}
          </motion.h2>

          {/* Features */}
          <div className="space-y-6">
            {(data.features ?? []).map((feature, index) => {
              const Icon = iconMap[index];
              if (!Icon) return null;
              return (
                <FeatureRow
                  key={index}
                  icon={<Icon />}
                  title={feature.title}
                  desc={feature.description ?? ""}
                  index={index}
                />
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* Feature Row */
const FeatureRow = ({
  icon,
  title,
  desc,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.15 }}
      viewport={{ once: true }}
      whileHover={{ x: 5 }}
      className="group flex gap-4"
    >
      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.2, rotate: 8 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="shadow-brand-three flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pink-500/10 text-pink-500 shadow-[0px_0px_0px] duration-150 hover:shadow-[0px_0px_10px]"
      >
        {icon}
      </motion.div>

      {/* Text */}
      <div>
        <h3 className="font-semibold text-pink-600">{title}</h3>
        <p className="text-sm leading-relaxed text-black">{desc}</p>
      </div>

      {/* Hover Glow */}
      <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition group-hover:opacity-100">
        <div className="absolute inset-0 rounded-xl bg-pink-500/5 blur-xl" />
      </div>
    </motion.div>
  );
};
