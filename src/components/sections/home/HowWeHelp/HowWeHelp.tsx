"use client";
import React from "react";
import type { SanityHomeSection } from "~/types/sanity/home";
import { FaChartLine } from "react-icons/fa";
import { FaTags } from "react-icons/fa6";
import { MdFeedback } from "react-icons/md";
import { LuBrainCircuit } from "react-icons/lu";
import { MdSecurity } from "react-icons/md";
import { LuNetwork } from "react-icons/lu";
import { AnimatedText } from "~/components/ui/TextAnimation";
import { motion, type Variants, useReducedMotion } from "framer-motion";

const HowWeHelpIcons = [
  FaChartLine,
  FaTags,
  MdFeedback,
  LuBrainCircuit,
  MdSecurity,
  LuNetwork,
];

interface HowWeHelpProps {
  data: SanityHomeSection<"howWeHelp">;
}

export const HowWeHelp: React.FC<HowWeHelpProps> = ({ data }) => {
  const reduceMotion = useReducedMotion();

  if (!data.heading) return null;

  const cardVariants: Variants = {
    hidden: {
      opacity: reduceMotion ? 1 : 0,
      y: reduceMotion ? 0 : 18,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 px-6 py-12 sm:gap-8 sm:px-12 sm:py-16 lg:px-25 lg:py-25">
      <section className="flex flex-col justify-center gap-1 px-4 text-center">
        <AnimatedText
          text={data.heading}
          className="text-2xl font-black sm:text-3xl lg:text-5xl"
          as="h2"
        />
        <p className="text-muted-foreground text-base font-medium sm:text-xl">
          {data.subheading}
        </p>
      </section>
      <motion.section
        className="grid w-full grid-cols-1 gap-4 px-6 sm:gap-5 sm:px-12 lg:grid-cols-2 lg:px-25 xl:grid-cols-3"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: reduceMotion ? 0 : 0.09,
              delayChildren: reduceMotion ? 0 : 0.08,
            },
          },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {(data.items ?? []).map((item, index) => {
          const IconComponent = HowWeHelpIcons[index];

          return (
            <motion.div
              key={index}
              variants={cardVariants}
              className="shadow-brand-three w-full rounded-lg border p-4 shadow-[0px_0px_0px] duration-150 hover:shadow-[0px_0px_10px] sm:p-5 lg:p-4"
            >
              <div className="text-brand-three relative h-7 w-7 overflow-hidden rounded-sm">
                {IconComponent && <IconComponent className="h-full w-full" />}
              </div>
              <p className="mt-4 text-lg font-medium sm:mt-5 sm:text-xl">
                {item.title}
              </p>
              <p className="text-muted-foreground mt-1 text-lg leading-tight">
                {item.description}
              </p>
            </motion.div>
          );
        })}
      </motion.section>
    </div>
  );
};
