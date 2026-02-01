"use client";

import React, { useRef } from "react";
import { cubicBezier, motion, useInView } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  isCenter?: boolean;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = "",
  delay = 0,
  duration = 0.7,
  once = true,
  as = "h2",
  isCenter = false,
}) => {
  const textContainer = useRef<HTMLDivElement>(null);
  const isInView = useInView(textContainer, { once });

  const Component = as as React.ElementType;

  return (
    <div ref={textContainer} className="overflow-hidden">
      <Component className={`overflow-hidden ${className}`}>
        <motion.span
          variants={{
            show: {
              y: "0",
              opacity: 1,
            },
            hide: {
              y: "100%",
              opacity: 0,
            },
          }}
          initial="hide"
          animate={isInView ? "show" : "hide"}
          transition={{
            duration,
            delay,
            ease: cubicBezier(0.7, 0.1, 0.01, 1),
          }}
          className={`relative -mt-1 inline-flex flex-wrap overflow-hidden py-[6px] leading-none ${isCenter && "justify-center"}`}
        >
          {text.split(" ").map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block">
              {word}&nbsp;
            </span>
          ))}
        </motion.span>
      </Component>
    </div>
  );
};
