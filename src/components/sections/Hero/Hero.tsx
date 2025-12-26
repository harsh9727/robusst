"use client";

import React from "react";
import Link from "next/link";

// icons
import { ChevronRight } from "lucide-react";

// assets
import { heroOne, heroTwo, heroThree, heroFour } from "public";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { motion } from "framer-motion";
import Image from "next/image";

const heroSectionData = [
  {
    title: "AI Solutions to Skyrocket Revenue & Delight Customers",
    description: "We help companies to monetize their power of data using AI",
    image: heroOne,
    ctaText: "Learn More",
    ctaLink: "/dashboard/home",
  },
  {
    title: "Transform Your Business with Intelligent Automation",
    description:
      "Leverage cutting-edge AI to streamline operations and boost efficiency",
    image: heroTwo,
    ctaText: "Get Started",
    ctaLink: "/dashboard/home",
  },
  {
    title: "Data-Driven Insights for Smarter Decisions",
    description:
      "Unlock the full potential of your data with our AI analytics platform",
    image: heroThree,
    ctaText: "Explore",
    ctaLink: "/dashboard/home",
  },
  {
    title: "Scale Your Success with AI-Powered Tools",
    description:
      "From startups to enterprises, we deliver solutions that grow with you",
    image: heroFour,
    ctaText: "Contact Us",
    ctaLink: "/dashboard/home",
  },
];

export const Hero: React.FC = () => {
  return (
    <div className="relative">
      <div className="bg-primary h-screen w-full">
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
          {heroSectionData.map((data, index) => (
            <SwiperSlide key={index} className="w-full">
              <div className="flex h-full w-full flex-col items-center justify-center lg:flex-row">
                <div className="bg-primary relative order-2 flex h-full w-full flex-col justify-center gap-2 overflow-hidden px-8 sm:px-12 lg:order-1 lg:min-w-[50%] lg:pl-25">
                  <div className="bg-brand-three absolute top-full -right-40 h-20 w-50 -translate-y-1/2 rotate-6 animate-pulse blur-[150px] sm:h-120 lg:top-1/2 lg:-left-40" />
                  <div className="bg-brand-three absolute -bottom-5 -left-12 h-20 w-120 animate-pulse blur-[120px]" />

                  <motion.h1
                    variants={{
                      initial: { opacity: 0, y: 10 },
                      animate: { opacity: 1, y: 0 },
                    }}
                    initial="initial"
                    animate="animate"
                    className="text-primary-foreground text-3xl font-medium lg:text-4xl xl:text-6xl"
                  >
                    {data.title}
                  </motion.h1>
                  <motion.p
                    variants={{
                      initial: { opacity: 0, y: 10 },
                      animate: { opacity: 1, y: 0 },
                    }}
                    initial="initial"
                    animate="animate"
                    className="text-muted-foreground mt-2"
                  >
                    {data.description}
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
                      href={data.ctaLink}
                      className="group text-primary-foreground flex w-fit items-center gap-2 transition-colors"
                    >
                      <span className="text-md relative lg:text-lg">
                        {data.ctaText}
                        <div className="bg-primary-foreground absolute bottom-0 h-px w-0 duration-300 group-hover:w-full" />
                      </span>
                      <p className="bg-brand-three flex size-7 items-center justify-center rounded-full">
                        <ChevronRight className="w-4" />
                      </p>
                    </Link>
                  </motion.div>
                </div>

                <div className="relative order-1 h-full w-full items-center justify-center overflow-hidden lg:order-2 lg:min-w-[50%]">
                  <div className="bg-primary absolute -bottom-15 -left-4 z-10 h-20 w-[120vw] rotate-6 sm:h-30 lg:-top-9 lg:-left-28 lg:h-[120vh] lg:w-50 lg:rotate-12" />
                  <div className="relative h-full w-full bg-gray-500">
                    <Image
                      src={data.image.src}
                      alt="image"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
