"use client";

import { useSpring, useTransform } from "framer-motion";
import { motion } from "framer-motion";
import { useRef } from "react";

interface AnimatedCharProps {
  char: string;
  index: number;
  mouseX: import("framer-motion").MotionValue<number>;
  springConfig: import("framer-motion").SpringOptions;
  containerRef: React.RefObject<HTMLParagraphElement | null>;
}

import { Instrument_Serif } from "next/font/google";

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const AnimatedChar: React.FC<AnimatedCharProps> = ({
  char,
  mouseX,
  springConfig,
  containerRef,
}) => {
  const charRef = useRef<HTMLSpanElement>(null);

  // Calculate distance from mouse with smooth spring animation
  const distance = useTransform(mouseX, (latest: number) => {
    if (!charRef.current || !containerRef.current) return 1000;

    const charRect = charRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    const charCenterX = charRect.left + charRect.width / 2 - containerRect.left;

    return Math.abs(latest - charCenterX);
  });

  // Calculate relative position within character
  const relativePosition = useTransform(mouseX, (latest: number) => {
    if (!charRef.current || !containerRef.current) return 0;

    const charRect = charRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    const charLeft = charRect.left - containerRect.left;
    const charRight = charRect.right - containerRect.left;

    if (latest < charLeft || latest > charRight) return 0;

    const relativeX = latest - charLeft;
    const progress = (relativeX / charRect.width) * 100;
    return Math.max(0, Math.min(100, progress));
  });

  // Ultra-smooth spring animations for each property
  const strokeWidth = useSpring(
    useTransform([distance, relativePosition], (values) => {
      const dist = values[0] as number;
      const pos = values[1] as number;
      const maxDistance = 100;
      if (dist > maxDistance) return 0;

      // Direct hover effect
      if (dist < 50) {
        const easeInOutQuart = (t: number) => {
          if (t < 0.5) {
            return 8 * t * t * t * t;
          }
          const u = 1 - t;
          return 1 - 8 * u * u * u * u;
        };

        let intensity: number;
        if (pos <= 50) {
          intensity = easeInOutQuart(pos / 50);
        } else {
          intensity = easeInOutQuart((100 - pos) / 50);
        }
        return intensity * 0.1;
      }

      // Proximity effect
      const proximityEffect = (1 - dist / maxDistance) ** 3;
      return proximityEffect * 0.04;
    }),
    springConfig,
  );

  const scaleX = useSpring(
    useTransform([distance, relativePosition], (values) => {
      const dist = values[0] as number;
      const pos = values[1] as number;
      const maxDistance = 100;
      if (dist > maxDistance) return 1;

      if (dist < 50) {
        const easeInOutQuart = (t: number) => {
          if (t < 0.5) {
            return 8 * t * t * t * t;
          }
          const u = 1 - t;
          return 1 - 8 * u * u * u * u;
        };

        let intensity: number;
        if (pos <= 50) {
          intensity = easeInOutQuart(pos / 50);
        } else {
          intensity = easeInOutQuart((100 - pos) / 50);
        }
        return 1 + intensity * 0.12;
      }

      const proximityEffect = (1 - dist / maxDistance) ** 3;
      return 1 + proximityEffect * 0.05;
    }),
    springConfig,
  );

  const scaleY = useSpring(
    useTransform([distance, relativePosition], (values) => {
      const dist = values[0] as number;
      const pos = values[1] as number;
      const maxDistance = 100;
      if (dist > maxDistance) return 1;

      if (dist < 50) {
        const easeInOutQuart = (t: number) => {
          if (t < 0.5) {
            return 8 * t * t * t * t;
          }
          const u = 1 - t;
          return 1 - 8 * u * u * u * u;
        };

        let intensity: number;
        if (pos <= 50) {
          intensity = easeInOutQuart(pos / 50);
        } else {
          intensity = easeInOutQuart((100 - pos) / 50);
        }
        return 1 - intensity * 0.06;
      }

      const proximityEffect = (1 - dist / maxDistance) ** 3;
      return 1 - proximityEffect * 0.02;
    }),
    springConfig,
  );

  const paddingX = useSpring(
    useTransform([distance, relativePosition], (values) => {
      const dist = values[0] as number;
      const pos = values[1] as number;
      const maxDistance = 100;
      if (dist > maxDistance) return 0;

      if (dist < 50) {
        const easeInOutQuart = (t: number) => {
          if (t < 0.5) {
            return 8 * t * t * t * t;
          }
          const u = 1 - t;
          return 1 - 8 * u * u * u * u;
        };

        let intensity: number;
        if (pos <= 50) {
          intensity = easeInOutQuart(pos / 50);
        } else {
          intensity = easeInOutQuart((100 - pos) / 50);
        }
        return intensity * 0.2;
      }

      const proximityEffect = (1 - dist / maxDistance) ** 3;
      return proximityEffect * 0.08;
    }),
    springConfig,
  );

  return (
    <motion.span
      ref={charRef}
      className={`mt-12 inline-block leading-none font-semibold text-[#222222] select-none sm:mt-16 lg:mt-20`}
      style={{
        WebkitTextStroke: useTransform(
          strokeWidth,
          (value: number) => `${value}em #222222`,
        ),

        paddingLeft: useTransform(paddingX, (value: number) => `${value}em`),
        paddingRight: useTransform(paddingX, (value: number) => `${value}em`),
        scaleX,
        scaleY,
        fontSize: "clamp(80px, 20vw, 400px)",
      }}
    >
      {char}
    </motion.span>
  );
};
