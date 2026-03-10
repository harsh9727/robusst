"use client";

import React, { useRef, useState } from "react";

// icons
import { ChevronLeft, ChevronRight } from "lucide-react";

// components
import { Button } from "~/components/ui/button";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";

const BlogsGridData = [
  {
    image: "",
    title: "AI Solutions to Skyrocket Revenue & Delight Customers",
    description: "We help companies to monetize their power of data using AI",
    points: [
      "AI Solutions to Skyrocket Revenue & Delight Customers",
      "We help companies to monetize their power of data using AI",
      "AI Solutions to Skyrocket Revenue & Delight Customers",
      "We help companies to monetize their power of data using AI",
      "AI Solutions to Skyrocket Revenue & Delight Customers",
      "We help companies to monetize their power of data using AI",
    ],
  },
  {
    image: "",
    title: "AI Solutions to Skyrocket Revenue & Delight Customers",
    description: "We help companies to monetize their power of data using AI",
    points: [
      "AI Solutions to Skyrocket Revenue & Delight Customers",
      "We help companies to monetize their power of data using AI",
      "AI Solutions to Skyrocket Revenue & Delight Customers",
      "We help companies to monetize their power of data using AI",
      "AI Solutions to Skyrocket Revenue & Delight Customers",
      "We help companies to monetize their power of data using AI",
    ],
  },
  {
    image: "",
    title: "AI Solutions to Skyrocket Revenue & Delight Customers",
    description: "We help companies to monetize their power of data using AI",
    points: [
      "AI Solutions to Skyrocket Revenue & Delight Customers",
      "We help companies to monetize their power of data using AI",
      "AI Solutions to Skyrocket Revenue & Delight Customers",
      "We help companies to monetize their power of data using AI",
      "AI Solutions to Skyrocket Revenue & Delight Customers",
      "We help companies to monetize their power of data using AI",
    ],
  },
  {
    image: "",
    title: "AI Solutions to Skyrocket Revenue & Delight Customers",
    description: "We help companies to monetize their power of data using AI",
    points: [
      "AI Solutions to Skyrocket Revenue & Delight Customers",
      "We help companies to monetize their power of data using AI",
      "AI Solutions to Skyrocket Revenue & Delight Customers",
      "We help companies to monetize their power of data using AI",
      "AI Solutions to Skyrocket Revenue & Delight Customers",
      "We help companies to monetize their power of data using AI",
    ],
  },
  {
    image: "",
    title: "AI Solutions to Skyrocket Revenue & Delight Customers",
    description: "We help companies to monetize their power of data using AI",
    points: [
      "AI Solutions to Skyrocket Revenue & Delight Customers",
      "We help companies to monetize their power of data using AI",
      "AI Solutions to Skyrocket Revenue & Delight Customers",
      "We help companies to monetize their power of data using AI",
      "AI Solutions to Skyrocket Revenue & Delight Customers",
      "We help companies to monetize their power of data using AI",
    ],
  },
];

export const BlogsGrid: React.FC = () => {
  const [, setSwiper] = useState<SwiperType | null>(null);
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="bg-primary relative flex min-h-screen w-full items-center justify-center gap-6 overflow-hidden px-6 py-16 sm:gap-8 sm:px-12 sm:py-20 lg:px-25 lg:py-25">
      <div className="bg-brand-one absolute top-0 right-0 h-30 w-130 -translate-x-1/2 -translate-y-1/2 blur-[100px]" />

      <section className="flex w-full flex-col justify-between gap-4 sm:gap-5">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-0">
          <section className="flex flex-col">
            <p className="text-primary-foreground text-xl leading-tight font-medium sm:text-2xl lg:text-4xl">
              Latest AI Insights and Blogs (0{BlogsGridData.length})
            </p>
          </section>

          <div className="flex items-center gap-2">
            <Button
              ref={navigationPrevRef}
              variant="ghost"
              size="icon"
              className="text-primary-foreground border-border/70 rounded-full border"
            >
              <ChevronLeft />
            </Button>
            <Button
              ref={navigationNextRef}
              variant="ghost"
              size="icon"
              className="text-primary-foreground border-border/70 rounded-full border"
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
        <div className="h-full w-full">
          <Swiper
            modules={[Autoplay, Navigation]}
            loop
            spaceBetween={20}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            onBeforeInit={(swiper) => {
              if (typeof swiper.params.navigation !== "boolean") {
                const navigation = swiper.params.navigation;
                if (navigation) {
                  navigation.prevEl = navigationPrevRef.current;
                  navigation.nextEl = navigationNextRef.current;
                }
              }
            }}
            onSwiper={setSwiper}
            className="h-full w-full"
          >
            {BlogsGridData.map((data, index) => (
              <SwiperSlide key={index}>
                <div className="flex h-full w-full flex-col gap-2 rounded-xl sm:gap-3">
                  <div className="bg-primary-foreground/20 h-70 w-full rounded-xl sm:h-64 lg:h-80" />

                  <div className="px-1">
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      December 20, 2025 | Robusst
                    </p>
                    <p className="text-primary-foreground mt-1 text-base leading-tight font-medium sm:text-lg">
                      {data.title}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
};
