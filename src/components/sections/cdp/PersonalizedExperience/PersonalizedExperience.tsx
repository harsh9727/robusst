"use client";

import Image from "next/image";
import { Card, CardContent } from "~/components/ui/card";
import {
  Globe,
  RefreshCcw,
  TrendingUp,
  Gift,
  ShoppingBag,
  MessageSquare,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";
import type { SanityCustomerDataPlatformSection } from "~/types/sanity/customerDataPlatform";

const iconMap = [
  Globe,
  RefreshCcw,
  TrendingUp,
  Gift,
  ShoppingBag,
  MessageSquare,
];

// ✅ Animations
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

interface PersonalizedExperienceProps {
  data: SanityCustomerDataPlatformSection<"personalizedExperience">;
}

export const PersonalizedExperience = ({
  data,
}: PersonalizedExperienceProps) => {
  if (!data) return null;

  return (
    <section className="relative bg-white px-6 pb-20">
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2">
        {/* 🔥 LEFT – Image */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="group"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="shadow-brand-one relative h-62.5 w-full overflow-hidden rounded-xl bg-white shadow-[0px_0px_10px] transition-all duration-300 hover:shadow-[0px_0px_50px] sm:h-112.5 lg:h-137.5"
          >
            <Image
              src={data.image ?? ""}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
              alt={data.imageAlt ?? data.heading ?? ""}
              className="h-full w-full object-cover transition-transform ease-out group-hover:scale-105"
            />
          </motion.div>
        </motion.div>

        {/* 🔥 RIGHT – Content */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Badge */}
          <motion.p
            variants={fadeUp}
            className="text-md mb-3 w-fit rounded-xl border border-pink-500 bg-pink-50 px-6 py-2 font-semibold text-black"
          >
            {data.badge}
          </motion.p>

          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            className="mb-6 text-4xl leading-tight font-extrabold text-gray-900 md:text-5xl"
          >
            <span className="text-pink-500">{data.heading}</span>
          </motion.h2>

          {/* Cards */}
          <motion.div
            variants={stagger}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2"
          >
            {(data.useCases ?? []).map((item, i) => {
              if (!item) return null;
              const Icon = iconMap[i];
              if (!Icon) return null;

              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 120 }}
                >
                  <Card className="group border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
                    <CardContent className="flex items-center gap-4">
                      {/* Icon */}
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        className="flex h-10 min-w-10 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-purple-500 text-white"
                      >
                        <Icon size={18} />
                      </motion.div>

                      {/* Text */}
                      <p className="text-md font-semibold text-gray-800">
                        {item}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
