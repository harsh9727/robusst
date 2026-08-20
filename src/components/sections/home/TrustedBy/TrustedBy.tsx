"use client";

import React, { useRef } from "react";
import { cubicBezier, motion, useInView } from "framer-motion";
import Image from "next/image";
import type { SanityHomeSection } from "~/types/sanity/home";
import { AnimatedText } from "~/components/ui/TextAnimation";

import Marquee from "react-fast-marquee";

const LogoRow = ({
  reverse = false,
  reverseLogo = false,
  speed = 30,
  delay = 0,
  isInView,
  logos,
}: {
  reverse?: boolean;
  reverseLogo?: boolean;
  speed?: number;
  delay?: number;
  isInView: boolean;
  logos: SanityHomeSection<"trustedBy">["logos"];
}) => {
  const orderedLogos = reverseLogo
    ? [...(logos ?? [])].reverse()
    : (logos ?? []);

  // Duplicate logos for seamless loop
  const duplicatedLogos = [...orderedLogos, ...orderedLogos];

  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
      }}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: cubicBezier(0.7, 0.1, 0.01, 1),
      }}
    >
      <Marquee direction={reverse ? "right" : "left"} gradient speed={speed}>
        {duplicatedLogos.map((logo, idx) =>
          logo.image ? (
            <div key={`${logo.name}-${idx}`} className="relative h-20 w-40">
              <Image
                src={logo.image}
                alt={logo.alt ?? logo.name}
                fill
                sizes="160px"
                className="object-contain p-2"
              />
            </div>
          ) : null,
        )}
      </Marquee>
    </motion.div>
  );
};

interface TrustedByProps {
  data: SanityHomeSection<"trustedBy">;
}

export const TrustedBy: React.FC<TrustedByProps> = ({ data }) => {
  const textContainer = useRef<HTMLDivElement>(null);
  const isInView = useInView(textContainer, { once: true });

  const heading = data?.heading ?? "";

  return (
    <>
      <section className="6 sm:12 lg:25 relative flex w-full justify-center pt-12 sm:pt-16 lg:pt-25">
        <div
          className="flex w-full flex-col items-center gap-6 sm:gap-8 lg:gap-10"
          ref={textContainer}
        >
          <AnimatedText
            text={heading}
            className="text-center text-2xl font-black sm:text-3xl lg:text-5xl"
            as="p"
          />

          <div className="relative w-full overflow-hidden">
            <div className="flex flex-col gap-3 sm:gap-4">
              <LogoRow
                logos={data.logos}
                speed={50}
                delay={0.2}
                isInView={isInView}
              />
              <LogoRow
                logos={data.logos}
                reverse
                speed={50}
                delay={0.4}
                isInView={isInView}
              />
              <LogoRow
                logos={data.logos}
                reverseLogo
                speed={50}
                delay={0.6}
                isInView={isInView}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
