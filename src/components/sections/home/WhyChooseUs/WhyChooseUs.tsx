"use client";
import type { WhyChooseUsSection } from "~/i18n/types/home";
import { AnimatedText } from "~/components/ui/TextAnimation";
import React, { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useMotionValue, useTransform } from "framer-motion";

import { FaChartLine } from "react-icons/fa";
import { FaTags } from "react-icons/fa6";
import { MdFeedback } from "react-icons/md";
import { LuBrainCircuit } from "react-icons/lu";
import { MdSecurity } from "react-icons/md";
import { LuNetwork } from "react-icons/lu";

const Icons = [
  FaChartLine,
  FaTags,
  MdFeedback,
  LuBrainCircuit,
  MdSecurity,
  LuNetwork,
];

export const WhyChooseUs: React.FC = () => {
  const t = useTranslations();
  const whyChooseUsSection = t.raw("whyChooseUs") as WhyChooseUsSection;

  const containerRef = useRef<HTMLDivElement>(null);
  const sliderX = useMotionValue(0);
  const [containerWidth, setContainerWidth] = useState(0);

  // Calculate percentage from pixel position
  const sliderPercentage = useTransform(sliderX, (x) => {
    if (!containerWidth) return 50;
    return Math.min(Math.max((x / containerWidth) * 100, 0), 100);
  });

  // Update container width on mount and resize
  React.useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setContainerWidth(width);
        sliderX.set(width / 2); // Set initial position to center
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [sliderX]);

  return (
    <div className="bg-primary-foreground flex w-full flex-col items-center justify-center gap-6 px-6 pt-16 sm:gap-8 sm:px-12 sm:pt-32 lg:px-25 lg:pt-25">
      <section className="flex flex-col justify-center gap-1 text-center">
        <AnimatedText
          text={whyChooseUsSection.heading}
          className="text-3xl font-black sm:text-4xl lg:text-5xl"
          as="h2"
        />
      </section>

      <section className="flex w-full flex-col items-center gap-6 px-0 sm:px-12 lg:px-25">
        {/* Impact Comparison Slider */}
        <div
          ref={containerRef}
          className="bg-primary/90 relative h-100 w-full max-w-2xl overflow-hidden rounded-xl border select-none"
        >
          {/* Without Us Section - Full width, clipped by slider */}
          <motion.div
            className="absolute inset-0 flex flex-col items-start justify-center bg-linear-to-br from-red-900/20 to-red-950/40 p-4 sm:p-8"
            style={{
              clipPath: useTransform(
                sliderPercentage,
                (p) => `inset(0 ${100 - p}% 0 0)`,
              ),
            }}
          >
            <h3 className="text-primary-foreground mb-8 text-2xl font-bold sm:text-3xl">
              Without Us
            </h3>
            <svg
              className="h-50 w-full px-8 sm:h-60 sm:px-12"
              viewBox="0 0 400 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              {/* Declining/Poor Performance Line */}
              <path
                d="M 20 120 Q 80 100 120 130 Q 160 150 200 140 Q 240 135 280 160 Q 320 180 380 170"
                stroke="#ef4444"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
              {/* Data points */}
              <circle cx="20" cy="120" r="4" fill="#ef4444" />
              <circle cx="120" cy="130" r="4" fill="#ef4444" />
              <circle cx="200" cy="140" r="4" fill="#ef4444" />
              <circle cx="280" cy="160" r="4" fill="#ef4444" />
              <circle cx="380" cy="170" r="4" fill="#ef4444" />
            </svg>
            <p className="text-primary-foreground/70 mt-4 text-xs sm:text-sm">
              Declining performance & inefficiency
            </p>
          </motion.div>

          {/* With Us Section - Full width, revealed by slider */}
          <motion.div
            className="absolute inset-0 flex flex-col items-end justify-center bg-linear-to-br from-green-900/20 to-emerald-950/40 p-4 sm:p-8"
            style={{
              clipPath: useTransform(
                sliderPercentage,
                (p) => `inset(0 0 0 ${p}%)`,
              ),
            }}
          >
            <h3 className="text-primary-foreground mb-8 text-2xl font-bold sm:text-3xl">
              With Us
            </h3>
            <svg
              className="h-50 w-full px-8 sm:h-60 sm:px-12"
              viewBox="0 0 400 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              {/* Growing/Good Performance Line */}
              <path
                d="M 20 170 Q 80 150 120 130 Q 160 100 200 80 Q 240 60 280 50 Q 320 35 380 20"
                stroke="#22c55e"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
              {/* Data points */}
              <circle cx="20" cy="170" r="4" fill="#22c55e" />
              <circle cx="120" cy="130" r="4" fill="#22c55e" />
              <circle cx="200" cy="80" r="4" fill="#22c55e" />
              <circle cx="280" cy="50" r="4" fill="#22c55e" />
              <circle cx="380" cy="20" r="4" fill="#22c55e" />
            </svg>
            <p className="text-primary-foreground/70 mt-4 text-right text-xs sm:text-sm">
              Exponential growth & optimization
            </p>
          </motion.div>

          {/* Draggable Divider */}
          <motion.div
            className="absolute top-0 bottom-0 z-10 flex cursor-ew-resize items-center"
            style={{
              x: sliderX,
              left: 0,
            }}
            drag="x"
            dragConstraints={containerRef}
            dragElastic={0}
            dragMomentum={false}
            _dragX={sliderX}
          >
            {/* Vertical Line */}
            <div className="h-full w-1 bg-white/80" />

            {/* Draggable Handle */}
            <div className="bg-primary-foreground absolute top-1/2 left-0 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white shadow-lg sm:h-16 sm:w-16">
              {/* Left Arrow */}
              <svg
                className="absolute left-1 h-3 w-3 text-gray-600 sm:left-2 sm:h-4 sm:w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M15 19l-7-7 7-7"
                />
              </svg>

              {/* Right Arrow */}
              <svg
                className="absolute right-1 h-3 w-3 text-gray-600 sm:right-2 sm:h-4 sm:w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Why Choose Us Points */}
        {/*<section className="grid w-full max-w-full grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2 xl:max-w-6xl">
          {whyChooseUsSection.points.map((data, index) => {
            return (
              <div
                key={index}
                className="shadow-brand-one/50 w-full rounded-lg border p-4 shadow-[0px_0px_0px] duration-150 hover:shadow-[-5px_5px_10px] sm:p-5 lg:p-4"
              >
                <p className="text-lg font-semibold">{data.title}</p>
                <p className="text-muted-foreground text-sm leading-tight">
                  {data.description}
                </p>
              </div>
            );
          })}
        </section>*/}

        <section className="grid w-full grid-cols-1 gap-4 px-6 sm:gap-5 sm:px-12 lg:grid-cols-2 lg:px-25 xl:grid-cols-3">
          {whyChooseUsSection.points.map((data, index) => {
            const IconComponent = Icons[index];

            return (
              <div
                key={index}
                className="shadow-brand-one w-full rounded-lg border p-4 shadow-[0px_0px_0px] duration-150 hover:shadow-[0px_0px_10px] sm:p-5 lg:p-4"
              >
                <div className="text-brand-one relative h-7 w-7 overflow-hidden rounded-sm">
                  {IconComponent && <IconComponent className="h-full w-full" />}
                </div>
                <p className="mt-4 text-lg font-medium sm:mt-5 sm:text-xl">
                  {data.title}
                </p>
                <p className="text-muted-foreground mt-1 text-lg leading-tight">
                  {data.description}
                </p>
              </div>
            );
          })}
        </section>
      </section>
    </div>
  );
};
