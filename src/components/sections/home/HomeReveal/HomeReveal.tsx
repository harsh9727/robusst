"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface HomeRevealProps {
  children: React.ReactNode;
  backgroundColor?: string;
  className?: string;
  delay?: number;
  effect?: "fade" | "up" | "left" | "right";
}

/**
 * A deliberately subtle, home-page-only scroll reveal.
 *
 * Keeping this component alongside the home sections prevents these motion
 * choices from leaking into the rest of the site. The fade-only option is
 * used for sections containing fixed overlays so transforms do not change
 * their containing block.
 */
export const HomeReveal: React.FC<HomeRevealProps> = ({
  children,
  backgroundColor = "",
  className = "",
  delay = 0,
  effect = "up",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: false,
    amount: 0.1,
    margin: "-4% 0px -8% 0px",
  });
  const reduceMotion = useReducedMotion();
  const isVisible = Boolean(reduceMotion) || isInView;
  const distance = reduceMotion ? 0 : 48;
  const offset = {
    fade: {},
    up: { y: distance },
    left: { x: -distance },
    right: { x: distance },
  }[effect];
  const hiddenState = { opacity: 0, ...offset };
  const visibleState = {
    opacity: 1,
    ...(effect === "up" ? { y: 0 } : {}),
    ...(effect === "left" || effect === "right" ? { x: 0 } : {}),
  };

  return (
    <div className={`${backgroundColor} overflow-x-clip ${className}`.trim()}>
      <motion.div
        ref={ref}
        initial={hiddenState}
        animate={isVisible ? visibleState : hiddenState}
        transition={
          reduceMotion
            ? { duration: 0 }
            : isVisible
              ? {
                  duration: 0.8,
                  delay,
                  ease: [0.22, 1, 0.36, 1],
                }
              : {
                  duration: 0.42,
                  ease: [0.4, 0, 1, 1],
                }
        }
      >
        {children}
      </motion.div>
    </div>
  );
};
