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
    <div className="bg-primary flex h-screen w-full items-center justify-center gap-8 px-50 py-25">
      <section className="flex w-full flex-col justify-between gap-5">
        <div className="flex items-center justify-between">
          <section className="flex flex-col">
            <p className="text-primary-foreground text-4xl font-medium">
              Latest AI Insights and Blogs
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
            slidesPerView={3}
            spaceBetween={50}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
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
                <div className="flex h-full w-full flex-col gap-2 rounded-xl">
                  <div className="bg-primary-foreground/20 h-90 w-full rounded-xl" />

                  <div className="px-1">
                    <p className="text-muted-foreground">
                      December 20, 2025 | Robusst
                    </p>
                    <p className="text-primary-foreground mt-1 text-lg leading-tight font-medium">
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
