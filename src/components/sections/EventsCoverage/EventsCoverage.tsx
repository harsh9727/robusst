"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const logos = Array.from({ length: 12 });

const LogoRow = ({ reverse = false }: { reverse?: boolean }) => {
  return (
    <Swiper
      modules={[Autoplay]}
      loop
      spaceBetween={12}
      allowTouchMove={false}
      speed={3000}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        reverseDirection: reverse,
      }}
      breakpoints={{
        0: {
          slidesPerView: 1.5,
          spaceBetween: 8,
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 12,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 12,
        },
      }}
      className="w-full"
    >
      {logos.map((_, idx) => (
        <SwiperSlide key={idx}>
          <div className="bg-primary/20 h-32 w-full rounded-lg sm:h-40 lg:h-45" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export const EventsCoverage: React.FC = () => {
  return (
    <section className="relative flex w-full justify-center px-6 py-12 sm:px-12 sm:py-16 lg:px-25 lg:py-25">
      <div className="container flex w-full flex-col items-center gap-6 sm:gap-8 lg:gap-10">
        <section className="flex flex-col justify-center gap-1 px-4 text-center">
          <p className="text-2xl font-medium sm:text-3xl lg:text-4xl">
            Events Coverage
          </p>
          <p className="text-muted-foreground text-base font-medium sm:text-lg">
            Where You&apos;ll Find Us Cards with event thumbnails
          </p>
        </section>
        <div className="relative w-full overflow-hidden">
          <div className="from-background pointer-events-none absolute top-0 left-0 z-10 h-full w-20 bg-linear-to-r to-transparent sm:w-32 lg:w-150" />
          <div className="from-background pointer-events-none absolute top-0 right-0 z-10 h-full w-20 bg-linear-to-l to-transparent sm:w-32 lg:w-150" />

          <div className="flex flex-col gap-3 px-4 sm:gap-4 sm:px-8 lg:px-12">
            <LogoRow />
            <LogoRow reverse />
          </div>
        </div>
      </div>
    </section>
  );
};
