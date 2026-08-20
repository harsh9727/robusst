"use client";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import type { SanityCareersData } from "~/types/sanity/careers";
import Image from "next/image";

interface LifeAtRobusstProps {
  data: SanityCareersData;
}

export const LifeAtRobusst: React.FC<LifeAtRobusstProps> = ({ data }) => {
  const lifeAtRobusstSection = data?.lifeAtRobusst;

  if (!lifeAtRobusstSection) return null;

  return (
    <div
      id="life-at-robusst"
      className="flex flex-col items-start justify-between gap-8"
    >
      <p className="text-primary-foreground text-2xl font-black sm:text-3xl lg:text-5xl">
        {lifeAtRobusstSection.heading}
      </p>

      <Swiper
        modules={[Autoplay]}
        loop
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 5,
          },
          480: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 12,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        allowTouchMove={false}
        speed={3000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        className="w-full"
      >
        {(lifeAtRobusstSection.images ?? []).map((image, idx) => (
          <SwiperSlide key={idx}>
            <div className="h-60 w-full rounded-lg bg-pink-50">
              <div className="relative h-full w-full overflow-hidden bg-pink-300">
                <Image
                  src={image.url ?? ""}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
                  alt={image.alt ?? lifeAtRobusstSection.heading ?? ""}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
