"use client";
import React, { useState, useEffect, useRef } from "react";
// components
import { Button } from "~/components/ui/button";
import { TechStack } from "../TechStack";
import { successStories } from "public";
import Image from "next/image";
import type { Home_JsonType } from "~/types/api/home_json.types";
import type { Common_JsonType } from "~/types/api/common_json.types";
import { TransitionLink } from "~/components/common";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { IndustriesWeServe } from "../IndustriesWeServe";

const SuccessStoriesImages = [
  successStories.mnt,
  successStories.airtel,
  successStories.mobily,
  successStories.smart,
  successStories.claro,
  successStories.movistar,
  successStories.ireland,
  successStories.belgium,
  successStories.tt,
  successStories.iu,
];

const DRAG_THRESHOLD = 50; // px needed to trigger a slide change

interface SuccessStoriesProps {
  data?: Home_JsonType["successStories"];
  techStack?: Home_JsonType["techStack"];
  commonData?: Common_JsonType["common"];
  industriesWeServe?: Home_JsonType["industriesWeServe"];
}

export const SuccessStories: React.FC<SuccessStoriesProps> = ({
  data,
  techStack,
  commonData,
  industriesWeServe,
}) => {
  const commomSection = commonData;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const totalSlides = data?.items.length ?? 0;
  const visibleSlides = 5;

  // Touch tracking refs for the arc slider
  const sliderTouchStartX = useRef<number | null>(null);
  const sliderTouchStartY = useRef<number | null>(null);

  // Touch tracking refs for the card
  const cardTouchStartX = useRef<number | null>(null);
  const cardTouchStartY = useRef<number | null>(null);

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, 7000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  if (!data) return null;

  const goNext = () => setActiveIndex((prev) => (prev + 1) % totalSlides);
  const goPrev = () =>
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);

  // Calculate position for vertical arc (lg and above)
  const getVerticalSlidePosition = (position: number) => {
    const distance = Math.abs(position);
    const arcRadius = 100;
    const verticalSpacing = 100;
    const normalizedPosition = position / 2;
    const angle = (normalizedPosition * Math.PI) / 3;

    const x = (1 - Math.cos(angle)) * arcRadius;
    const y = position * verticalSpacing;
    const scale = position === 0 ? 1.1 : 1 - distance * 0.2;
    const opacity = position === 0 ? 1 : 0.6 - distance * 0.15;
    const zIndex = 30 - distance;

    return { x, y, scale, opacity, zIndex };
  };

  // Calculate position for horizontal arc (below lg) - lower half circle
  const getHorizontalSlidePosition = (position: number) => {
    const distance = Math.abs(position);
    const arcRadius = 80;
    const horizontalSpacing = 100;
    const normalizedPosition = position / 2;

    const angle = Math.PI / 2 + (normalizedPosition * Math.PI) / 3;

    const x = position * horizontalSpacing;
    const y = Math.sin(angle) * arcRadius;
    const scale = position === 0 ? 1.1 : 1 - distance * 0.2;
    const opacity = position === 0 ? 1 : 0.6 - distance * 0.15;
    const zIndex = 50 - distance;

    return { x, y, scale, opacity, zIndex };
  };

  const getSlidePosition = (position: number) => {
    return isLargeScreen
      ? getVerticalSlidePosition(position)
      : getHorizontalSlidePosition(position);
  };

  const getVisibleSlides = () => {
    const slides = [];
    const half = Math.floor(visibleSlides / 2);

    for (let i = -half; i <= half; i++) {
      const index = (activeIndex + i + totalSlides) % totalSlides;
      slides.push({
        index,
        position: i,
        isActive: i === 0,
        data: data.items[index],
      });
    }

    return slides;
  };

  const handleSlideClick = (index: number) => {
    setActiveIndex(index);
  };

  // ─── Arc Slider touch handlers ───────────────────────────────────────────────
  const handleSliderTouchStart = (e: React.TouchEvent) => {
    if (isLargeScreen) return;
    sliderTouchStartX.current = e.touches[0]!.clientX;
    sliderTouchStartY.current = e.touches[0]!.clientY;
  };

  const handleSliderTouchEnd = (e: React.TouchEvent) => {
    if (isLargeScreen) return;
    if (
      sliderTouchStartX.current === null ||
      sliderTouchStartY.current === null
    )
      return;

    const deltaX = e.changedTouches[0]!.clientX - sliderTouchStartX.current;
    const deltaY = e.changedTouches[0]!.clientY - sliderTouchStartY.current;

    // Only trigger if horizontal swipe is dominant
    if (
      Math.abs(deltaX) > Math.abs(deltaY) &&
      Math.abs(deltaX) > DRAG_THRESHOLD
    ) {
      if (deltaX < 0) {
        goNext();
      } else {
        goPrev();
      }
    }

    sliderTouchStartX.current = null;
    sliderTouchStartY.current = null;
  };

  // ─── Card touch handlers ─────────────────────────────────────────────────────
  const handleCardTouchStart = (e: React.TouchEvent) => {
    if (isLargeScreen) return;
    cardTouchStartX.current = e.touches[0]!.clientX;
    cardTouchStartY.current = e.touches[0]!.clientY;
  };

  const handleCardTouchEnd = (e: React.TouchEvent) => {
    if (isLargeScreen) return;
    if (cardTouchStartX.current === null || cardTouchStartY.current === null)
      return;

    const deltaX = e.changedTouches[0]!.clientX - cardTouchStartX.current;
    const deltaY = e.changedTouches[0]!.clientY - cardTouchStartY.current;

    if (
      Math.abs(deltaX) > Math.abs(deltaY) &&
      Math.abs(deltaX) > DRAG_THRESHOLD
    ) {
      if (deltaX < 0) {
        goNext();
      } else {
        goPrev();
      }
    }

    cardTouchStartX.current = null;
    cardTouchStartY.current = null;
  };

  const visibleSlidesData = getVisibleSlides();

  return (
    <div>
      <div className="relative flex flex-col gap-12 overflow-hidden px-6 py-12 select-none sm:gap-16 sm:px-12 sm:py-16 lg:gap-20 lg:px-25 lg:py-25">
        <div className="bg-brand-one absolute top-1/2 -left-40 hidden h-120 w-150 -translate-y-1/2 rotate-6 animate-pulse opacity-20 blur-[150px] md:block" />
        <div className="bg-brand-one absolute -top-30 right-0 h-50 w-40 rotate-6 animate-pulse opacity-20 blur-[90px] sm:top-0 sm:h-100 sm:w-80 sm:blur-[150px]" />

        <div className="container mx-auto flex w-full flex-col items-center gap-8 xl:flex-row">
          {/* Left Section */}
          <div className="flex h-full w-full max-w-xl flex-col justify-center">
            <div className="flex items-center gap-1">
              <div className="bg-brand-two h-20 w-8" />
              <p className="text-primary-foreground text-2xl font-black sm:text-3xl lg:text-4xl">
                {data.heading}
              </p>
            </div>
            <div className="mt-8 flex items-center gap-5">
              <Button
                asChild
                size="extra-lg"
                className="bg-brand-two hover:bg-brand-two/90 text-primary w-fit rounded-full font-bold uppercase"
              >
                <TransitionLink href="/stories">
                  {commomSection?.viewAll}
                </TransitionLink>
              </Button>
            </div>
          </div>

          {/* Right Section - Card and Arc Slider */}
          <div className="mg:mt-0 mt-15 flex h-full w-full max-w-full flex-col items-center justify-center gap-x-15 lg:flex-row lg:gap-30">
            {/* Display Card — swipeable on mobile */}
            <div
              className="w-fit"
              onTouchStart={handleCardTouchStart}
              onTouchEnd={handleCardTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="relative h-120 w-full max-w-125"
                >
                  <motion.div
                    className="from-brand-two/50 to-brand-two absolute top-0 left-0 h-full w-full bg-linear-to-t"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 6 }}
                    transition={{
                      delay: 0.1,
                      duration: 0.5,
                      ease: "easeInOut",
                    }}
                  />
                  <div className="relative z-10 flex h-full w-full flex-col justify-start bg-[#1a1a1a] p-8 lg:p-15">
                    <Image
                      src={SuccessStoriesImages[activeIndex]!}
                      alt={`Success Story ${activeIndex + 1}`}
                      width={500}
                      height={400}
                      className="h-25 w-fit object-contain"
                    />
                    <p className="text-primary-foreground mt-8 text-2xl">
                      {data.items[activeIndex]?.title}
                    </p>
                    <p className="text-muted-foreground mt-2 line-clamp-4 overflow-hidden text-base text-ellipsis lg:text-lg">
                      {data.items[activeIndex]?.description}
                    </p>

                    <Link
                      href="/success-stories"
                      className="text-primary-foreground unfo mt-2 mt-8 overflow-hidden text-sm underline underline-offset-4 lg:text-base"
                    >
                      Learn More.
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Arc Slider — swipeable on mobile */}
            <div
              className={`relative flex items-center justify-center overflow-visible ${
                isLargeScreen ? "h-125 w-auto" : "h-30 w-125"
              }`}
              onTouchStart={handleSliderTouchStart}
              onTouchEnd={handleSliderTouchEnd}
            >
              <div className="relative h-full w-full">
                <AnimatePresence initial={false}>
                  {visibleSlidesData.map(({ index, position, isActive }) => {
                    const pos = getSlidePosition(position);

                    return (
                      <motion.div
                        key={index}
                        layout
                        initial={{
                          x: isLargeScreen ? -pos.x : pos.x,
                          y: isLargeScreen ? -pos.y : pos.y,
                          scale: pos.scale,
                          opacity: 0,
                        }}
                        animate={{
                          x: isLargeScreen ? -pos.x : pos.x,
                          y: isLargeScreen ? -pos.y : pos.y,
                          scale: pos.scale,
                          opacity: pos.opacity,
                          zIndex: pos.zIndex,
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.5,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                          opacity: { duration: 0.2 },
                        }}
                        className={`absolute ${
                          isLargeScreen
                            ? "top-1/2 left-0 -translate-y-1/2"
                            : "top-0 left-1/2 -translate-x-1/2"
                        }`}
                        style={{ zIndex: pos.zIndex }}
                      >
                        <motion.div
                          className={`bg-primary-foreground flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 transition-colors duration-300 ${
                            isActive
                              ? "shadow-lg"
                              : "border-white/20 hover:border-white/40"
                          }`}
                          onClick={() => handleSlideClick(index)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Image
                            src={SuccessStoriesImages[index]!}
                            alt={
                              data.items[index]?.title ??
                              `Success Story ${index + 1}`
                            }
                            width={300}
                            height={300}
                            className="h-full w-full object-contain"
                          />
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <IndustriesWeServe data={industriesWeServe} />
        <TechStack data={techStack} />
      </div>
    </div>
  );
};
