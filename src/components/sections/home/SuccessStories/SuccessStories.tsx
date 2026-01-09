"use client";

import React, { useRef, useState } from "react";

// icons
import { ChevronLeft, ChevronRight } from "lucide-react";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";

// components
import { IndustriesWeServe } from "../IndustriesWeServe";
import { Button } from "~/components/ui/button";
import { TechStack } from "../TechStack";
import { successStories } from "public";
import Image from "next/image";
import type { SuccessStoriesSection } from "~/i18n/types/home";
import { useTranslations } from "next-intl";
import Link from "next/link";

const SuccessStoriesImages = [
  successStories.airtel.src,
  successStories.chili.src,
  successStories.vi.src,
  successStories.iu.src,
];

export const SuccessStories: React.FC = () => {
  const t = useTranslations();
  const successStoriesSection = t.raw(
    "successStories",
  ) as SuccessStoriesSection;

  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  const handleCardClick = (index: number) => {
    if (index === activeIndex || !swiperRef.current) return;
    swiperRef.current.slideToLoop(index);
  };

  return (
    <div className="bg-primary relative flex flex-col gap-12 overflow-hidden px-6 py-12 sm:gap-16 sm:px-12 sm:py-16 lg:gap-20 lg:px-25 lg:py-25">
      <div className="bg-brand-one absolute top-1/2 -left-40 hidden h-120 w-150 -translate-y-1/2 rotate-6 animate-pulse blur-[350px] md:block" />
      <div className="bg-brand-one absolute -top-30 right-0 h-50 w-40 rotate-6 animate-pulse blur-[150px] sm:top-0 sm:h-100 sm:w-80 sm:blur-[250px]" />
      <div className="bg-brand-one absolute right-0 -bottom-20 left-1/2 h-30 w-100 -translate-x-1/2 rotate-6 blur-[150px]" />

      <div className="z-10 flex flex-col gap-6 sm:gap-9">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-0">
          <p className="text-primary-foreground text-2xl font-medium sm:text-3xl lg:text-4xl">
            {successStoriesSection.heading}
          </p>

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

            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              asChild
            >
              <Link href="/stories">Read More</Link>
            </Button>
          </div>
        </div>

        <div className="relative h-full w-full">
          <Swiper
            modules={[Autoplay, Navigation]}
            loop
            slidesPerView={1}
            spaceBetween={20}
            autoplay={{
              delay: 8000,
              disableOnInteraction: false,
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex);
              setAnimationKey((prev) => prev + 1);
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
            className="h-full w-full"
          >
            {successStoriesSection.items.map((data, index) => (
              <SwiperSlide key={index}>
                <div className="flex h-full w-full flex-col items-start gap-5 rounded-xl sm:gap-6 lg:flex-row lg:items-center lg:gap-5">
                  <div className="bg-primary-foreground/20 relative h-40 w-40 shrink-0 overflow-hidden rounded-xl sm:h-60 sm:w-60 lg:h-70 lg:w-70">
                    <Image
                      src={SuccessStoriesImages[index] as string}
                      alt="image"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="px-1 lg:px-1">
                    <p className="text-primary-foreground max-w-full text-sm sm:text-lg lg:max-w-4xl lg:text-xl">
                      {data.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="flex max-w-3xl items-center gap-3">
          {successStoriesSection.items.map((data, index) => {
            const isActive = activeIndex === index;
            return (
              <button
                key={index}
                onClick={() => handleCardClick(index)}
                className={`border-border/40 relative flex h-10 w-full cursor-pointer items-center justify-center overflow-hidden rounded-sm border transition-colors duration-500 ${
                  isActive ? "text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                <div
                  key={
                    isActive ? `active-${animationKey}` : `inactive-${index}`
                  }
                  className={`bg-primary-foreground absolute bottom-0 left-0 h-px w-full origin-left transition-opacity duration-500 ${
                    isActive ? "animate-progress-fill" : "scale-x-0"
                  } ${isActive ? "opacity-100" : "opacity-0"}`}
                />
                <p className="z-10 text-sm sm:text-base">{data.title}</p>
              </button>
            );
          })}
        </div>
      </div>

      <IndustriesWeServe />

      <TechStack />
    </div>
  );
};
