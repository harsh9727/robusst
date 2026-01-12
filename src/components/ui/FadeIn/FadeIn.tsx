"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
  y?: number;
  backgroundColor?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  once = true,
  className = "",
  y = 20,
  backgroundColor,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.1 });

  return (
    <div className={`${backgroundColor || ""} ${className}`}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
        transition={{
          duration,
          delay,
          ease: [0.7, 0.1, 0.01, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
