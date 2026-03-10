"use client";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useTranslations } from "next-intl";
import type { CareersSection } from "~/i18n/types/careers";
import Image from "next/image";

export const LifeAtRobusst: React.FC = () => {
  const t = useTranslations("careers");
  const lifeAtRobusstSection = t.raw(
    "lifeAtRobusst",
  ) as CareersSection["lifeAtRobusst"];

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
        {Array.from({ length: 7 }).map((_, idx) => (
          <SwiperSlide key={idx}>
            <div className="h-60 w-full rounded-lg bg-pink-50">
              <div className="relative h-full w-full overflow-hidden bg-pink-300">
                <Image
                  src={`/career/life/${idx + 1}.webp`}
                  fill
                  alt="life"
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
