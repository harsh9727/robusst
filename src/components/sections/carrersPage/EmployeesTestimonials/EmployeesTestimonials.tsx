"use client";
import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { useTranslations } from "next-intl";
import type { CareersSection } from "~/i18n/types/careers";

export const EmployeesTestimonials: React.FC = () => {
  const t = useTranslations("careers");
  const employeesTestimonialsSection = t.raw(
    "employeesTestimonials",
  ) as CareersSection["employeesTestimonials"];

  const [, setSwiper] = useState<SwiperType | null>(null);
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="flex flex-col items-start justify-between gap-8">
      <div className="flex w-full flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-0">
        <p className="text-primary-foreground text-2xl font-medium sm:text-3xl lg:text-4xl">
          {employeesTestimonialsSection.heading}
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
        </div>
      </div>

      <Swiper
        modules={[Autoplay, Navigation]}
        loop
        spaceBetween={20}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        slidesPerView={3}
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
        {employeesTestimonialsSection.testimonials.map((data, idx) => (
          <SwiperSlide key={idx}>
            <div className="bg-primary-foreground border-border/20 h-full w-full rounded-lg border p-5">
              <p className="text-lg leading-normal font-medium">
                {data.message}
              </p>
              <p className="mt-5">
                {data.name}, {data.designation}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
