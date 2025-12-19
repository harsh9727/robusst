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
          <div className="bg-primary/20 h-32 w-full rounded-lg" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export const EventsCoverage: React.FC = () => {
  return (
    <section className="relative flex w-full justify-center px-50 py-25">
      <div className="container flex w-full flex-col items-center gap-10">
        <section className="flex flex-col justify-center gap-1 text-center">
          <p className="text-4xl font-medium">Events Coverage</p>
          <p className="text-muted-foreground text-lg font-medium">
            Where You&apos;ll Find Us Cards with event thumbnails
          </p>
        </section>
        <div className="relative w-full overflow-hidden">
          <div className="from-background pointer-events-none absolute top-0 left-0 z-10 h-full w-150 bg-linear-to-r to-transparent" />
          <div className="from-background pointer-events-none absolute top-0 right-0 z-10 h-full w-150 bg-linear-to-l to-transparent" />

          <div className="flex flex-col gap-4 px-12">
            <LogoRow />
            <LogoRow reverse />
          </div>
        </div>
      </div>
    </section>
  );
};
