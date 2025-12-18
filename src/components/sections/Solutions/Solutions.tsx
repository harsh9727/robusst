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

export const Solutions: React.FC = () => {
  const [, setSwiper] = useState<SwiperType | null>(null);
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="container mx-auto flex w-full items-center justify-center gap-8 px-50 py-25">
      <div className="bg-secondary h-120 min-w-80 rounded-xl" />

      <section className="flex h-120 w-full flex-col justify-between gap-5">
        <div className="flex items-center justify-between">
          <section className="flex flex-col">
            <p className="text-4xl font-medium">Our Solutions</p>
            <p className="text-muted-foreground text-lg font-medium">
              Comprehensive Solutions that drive success
            </p>
          </section>

          <div className="flex items-center gap-2">
            <Button ref={navigationPrevRef} variant="outline" size="icon">
              <ChevronLeft />
            </Button>
            <Button ref={navigationNextRef} variant="outline" size="icon">
              <ChevronRight />
            </Button>
          </div>
        </div>
        <div className="relative h-full w-full">
          <Swiper
            modules={[Autoplay, Navigation]}
            loop
            slidesPerView={3}
            spaceBetween={20}
            autoplay={{
              delay: 3000,
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
            <SwiperSlide>
              <div className="bg-secondary h-full w-full rounded-xl" />
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-secondary h-full w-full rounded-xl" />
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-secondary h-full w-full rounded-xl" />
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-secondary h-full w-full rounded-xl" />
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-secondary h-full w-full rounded-xl" />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </div>
  );
};
