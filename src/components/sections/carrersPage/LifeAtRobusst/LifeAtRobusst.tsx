"use client";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useTranslations } from "next-intl";
import type { CareersSection } from "~/i18n/types/careers";

export const LifeAtRobusst: React.FC = () => {
  const t = useTranslations("careers");
  const lifeAtRobusstSection = t.raw(
    "lifeAtRobusst",
  ) as CareersSection["lifeAtRobusst"];

  return (
    <div className="flex flex-col items-start justify-between gap-8">
      <p className="text-primary-foreground text-2xl font-medium sm:text-3xl lg:text-4xl">
        {lifeAtRobusstSection.heading}
      </p>

      <Swiper
        modules={[Autoplay]}
        loop
        slidesPerView={3}
        spaceBetween={12}
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
        {Array.from({ length: 12 }).map((_, idx) => (
          <SwiperSlide key={idx}>
            <div className="h-60 w-full rounded-lg bg-pink-50" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
