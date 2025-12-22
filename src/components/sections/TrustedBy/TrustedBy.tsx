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
      slidesPerView={6}
      spaceBetween={12}
      allowTouchMove={false}
      speed={3000}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        reverseDirection: reverse,
      }}
      className="w-full"
    >
      {logos.map((_, idx) => (
        <SwiperSlide key={idx}>
          <div className="bg-primary/20 h-26 w-full rounded-lg" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export const TrustedBy: React.FC = () => {
  return (
    <section className="relative flex w-full justify-center px-25 pt-25">
      <div className="container flex w-full flex-col items-center gap-10">
        <p className="text-4xl font-medium">Solutions trusted by</p>

        <div className="relative w-full overflow-hidden">
          <div className="from-background pointer-events-none absolute top-0 left-0 z-10 h-full w-150 bg-linear-to-r to-transparent" />
          <div className="from-background pointer-events-none absolute top-0 right-0 z-10 h-full w-150 bg-linear-to-l to-transparent" />

          <div className="flex flex-col gap-4 px-12">
            <LogoRow />
            <LogoRow reverse />
            <LogoRow />
          </div>
        </div>
      </div>
    </section>
  );
};
