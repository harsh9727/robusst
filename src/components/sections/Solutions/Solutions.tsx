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

const SolutionsData = [
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

export const Solutions: React.FC = () => {
  const [, setSwiper] = useState<SwiperType | null>(null);
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="bg-primary flex min-h-screen w-full items-center justify-center gap-6 px-6 py-16 sm:gap-8 sm:px-12 sm:py-20 lg:px-25 lg:py-25">
      <section className="flex w-full flex-col justify-between gap-4 sm:gap-5">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-0">
          <section className="flex flex-col">
            <p className="text-primary-foreground text-2xl font-medium sm:text-3xl lg:text-4xl">
              Our Solutions (0{SolutionsData.length})
            </p>
            <p className="text-muted-foreground text-base font-medium sm:text-lg">
              Comprehensive Solutions that drive success
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
        <div className="relative h-full w-full">
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
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 50,
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
            {SolutionsData.map((data, index) => (
              <SwiperSlide key={index}>
                <div className="flex h-full w-full flex-col gap-4 rounded-xl sm:gap-5">
                  <div className="bg-primary-foreground/20 h-60 w-full rounded-xl sm:h-80 lg:h-90" />

                  <div className="px-1">
                    <p className="text-primary-foreground text-base leading-tight font-medium sm:text-lg">
                      {data.title}
                    </p>

                    <p className="text-muted-foreground text-sm sm:text-base">
                      {data.description}
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
