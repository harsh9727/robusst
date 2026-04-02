"use client";
import React, { memo } from "react";

import { Link } from "~/i18n/routing";
import type { Home_JsonType } from "~/types/api/home_json.types";

// icons
import { ChevronRight } from "lucide-react";

// assets
import { heroOne, heroTwo, heroThree, heroFour } from "public";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Swiper styles are loaded dynamically after mount so they don't block the
// initial render (eliminates render-blocking CSS chunks — §1.1 fix).

import { motion } from "framer-motion";
import Image from "next/image";
// Hero images array
const heroImages = [heroOne.src, heroTwo.src, heroThree.src, heroFour.src];

// Video path for first slide
const heroVideo = "/home/hero/hero-one-video.mp4";
const heroTwoVideo = "/home/hero/hero-two-video.mp4";

interface HeroProps {
  data?: Home_JsonType["hero"];
}

const HeroInner: React.FC<HeroProps> = ({ data }) => {
  // Load Swiper CSS after the component mounts so it doesn't block rendering
  React.useEffect(() => {
    void import("swiper/css");
    void import("swiper/css/pagination");
    void import("swiper/css/navigation");
  }, []);

  const handleScrollToOurSolution = (
    e: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    e.preventDefault();
    const section = document.getElementById("ourSolution");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const slides = data?.slides ?? [];

  return (
    <div className="relative">
      <div className="bottom-0 left-0 z-20 hidden w-full overflow-hidden bg-transparent sm:absolute sm:-mb-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 150"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 C300,50 400,50 600,80 C800,110 900,110 1200,80 L1200,200 L0,200 Z"
            fill="#ffffff"
            stroke="none"
          />

          {/*<path
            d="M0,100 C300,70 400,70 600,100 C800,130 900,130 1200,100"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeDasharray="10 5"
          />*/}
        </svg>
      </div>
      <div className="h-screen w-full lg:h-[calc(100vh+200px)]">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          loop
          slidesPerView={1}
          autoplay={{
            delay: 8000,
            disableOnInteraction: false,
          }}
          pagination={{
            enabled: true,
            clickable: true,
          }}
          className="h-full w-full"
        >
          {slides.map((slide, index) => {
            // Only the first slide in the DOM gets an <h1>; all others use <h2>
            // so the page has exactly one H1 even though Swiper keeps all slides mounted.
            const MotionHeading = (
              index === 0 ? motion.h1 : motion.h2
            ) as typeof motion.h1;
            return (
              <SwiperSlide key={index} className="w-full">
                <div className="flex h-full w-full flex-col items-center justify-center lg:flex-row">
                  <div className="bg-primary relative order-2 flex h-[70%] w-full flex-col gap-2 overflow-hidden px-8 lg:order-1 lg:h-full lg:w-fit lg:min-w-[40%] lg:justify-center lg:px-12 lg:pl-25">
                    <div className="bg-brand-one absolute top-full -right-40 h-20 w-50 -translate-y-1/2 rotate-6 animate-pulse blur-[150px] lg:top-1/2 lg:-left-40 lg:h-120" />
                    <div className="bg-brand-one absolute -bottom-5 -left-12 h-20 w-120 animate-pulse blur-[100px]" />

                    <MotionHeading
                      variants={{
                        initial: { opacity: 0, y: 10 },
                        animate: { opacity: 1, y: 0 },
                      }}
                      initial="initial"
                      animate="animate"
                      className="text-primary-foreground mt-10 text-3xl font-medium lg:-mt-20 lg:text-4xl xl:text-5xl"
                    >
                      {slide.title}
                    </MotionHeading>
                    <motion.p
                      variants={{
                        initial: { opacity: 0, y: 10 },
                        animate: { opacity: 1, y: 0 },
                      }}
                      initial="initial"
                      animate="animate"
                      className="text-muted-foreground mt-2"
                    >
                      {slide.description}
                    </motion.p>

                    <motion.div
                      variants={{
                        initial: { opacity: 0, y: 10 },
                        animate: { opacity: 1, y: 0 },
                      }}
                      initial="initial"
                      animate="animate"
                      className="mt-8"
                    >
                      <Link
                        href="#ourSolution"
                        onClick={handleScrollToOurSolution}
                        className="group text-primary-foreground flex w-fit items-center gap-2 transition-colors"
                      >
                        <span className="text-md relative lg:text-lg">
                          {slide.ctaText}
                          <div className="bg-primary-foreground absolute bottom-0 h-px w-0 duration-300 group-hover:w-full" />
                        </span>
                        <p className="bg-brand-one flex size-7 items-center justify-center rounded-full">
                          <ChevronRight className="w-4" />
                        </p>
                      </Link>
                    </motion.div>
                  </div>

                  <div className="relative order-1 min-h-100 w-full items-center justify-center overflow-hidden sm:h-full lg:order-2 lg:min-w-[50%]">
                    <div className="bg-primary absolute -bottom-15 -left-4 z-10 h-20 w-[120vw] rotate-6 sm:h-20 lg:-top-9 lg:-left-28 lg:h-[120vh] lg:w-50 lg:rotate-12" />
                    <div className="relative h-full w-full bg-black">
                      {index === 0 || index === 3 ? (
                        <video
                          src={index === 0 ? heroVideo : heroTwoVideo}
                          autoPlay
                          loop
                          muted
                          playsInline
                          // Show a still frame instantly; suppress video decode blocking LCP
                          poster={
                            index === 0
                              ? "/home/hero/hero-1.webp"
                              : "/home/hero/hero-3.webp"
                          }
                          preload="none"
                          // Decorative background video — no spoken content
                          aria-hidden="true"
                          className="h-full w-full object-cover object-top"
                        />
                      ) : (
                        <>
                          <Image
                            src={heroImages[index] as string}
                            alt="hero image"
                            fill
                            sizes="(max-width: 1024px) 100vw, 60vw"
                            className="object-cover object-top"
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export const Hero = memo(HeroInner);
Hero.displayName = "Hero";
