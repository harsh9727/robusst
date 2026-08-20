"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { SanityCustomerDataPlatformSection } from "~/types/sanity/customerDataPlatform";

interface BannerProps {
  data: SanityCustomerDataPlatformSection<"banner">;
}

export const Banner: React.FC<BannerProps> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-primary flex h-screen w-full flex-col items-center justify-center overflow-hidden lg:flex-row">
      {/* LEFT CONTENT */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
        className="bg-primary relative order-2 flex h-full w-full flex-col justify-center gap-2 overflow-hidden px-8 sm:px-12 lg:order-1 lg:min-w-[50%] lg:pl-25"
      >
        {/* Glow Effects */}
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="bg-brand-one absolute top-full -right-40 h-20 w-50 -translate-y-1/2 rotate-6 blur-[150px] sm:h-120 lg:top-1/2 lg:-left-40"
        />
        <motion.div
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="bg-brand-one absolute -bottom-5 -left-12 h-20 w-120 blur-[100px]"
        />

        {/* Heading */}
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6 }}
          className="text-primary-foreground text-3xl font-medium lg:text-4xl xl:text-6xl"
        >
          {data.heading}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
          className="text-primary-foreground mt-2 text-lg"
        >
          {data.subheading}
        </motion.p>

        {/* Description */}
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
          className="text-primary-foreground mt-2 text-lg"
        >
          {data.description}
        </motion.p>
      </motion.div>

      {/* RIGHT IMAGE */}
      <motion.div
        initial={{ opacity: 0, x: 80, scale: 1.05 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative order-1 h-full w-full items-center justify-center overflow-hidden lg:order-2 lg:min-w-[50%]"
      >
        <div className="bg-primary absolute -bottom-15 -left-4 z-10 h-20 w-[120vw] rotate-6 sm:h-30 lg:-top-9 lg:-left-28 lg:h-[120vh] lg:w-50 lg:rotate-12" />

        {/* Image with subtle zoom loop */}
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
            src={data.image ?? ""}
            alt={data.imageAlt ?? data.heading ?? ""}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
