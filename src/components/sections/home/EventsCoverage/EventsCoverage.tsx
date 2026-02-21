"use client";
import React, { useRef } from "react";
import { events } from "public";
import Image from "next/image";
import type { EventsCoverageSection } from "~/i18n/types/home";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { motion, useInView } from "framer-motion";
import { AnimatedText } from "~/components/ui/TextAnimation";

const EventRow = ({ reverse = false }: { reverse?: boolean }) => {
  const eventsList = reverse
    ? Object.entries(events).reverse()
    : Object.entries(events);

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
          slidesPerView: 2,
          spaceBetween: 8,
        },
        480: {
          slidesPerView: 3,
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
        1280: {
          slidesPerView: 5,
          spaceBetween: 12,
        },
      }}
      className="w-full"
    >
      {eventsList.map(([key, image], idx) => (
        <SwiperSlide key={idx}>
          <div className="bg-primary-foreground relative h-32 w-full overflow-hidden rounded-lg p-6 sm:h-40 lg:h-50">
            <Image
              src={image}
              alt={key}
              width={300}
              height={200}
              className="h-full w-full object-contain"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export const EventsCoverage: React.FC = () => {
  const t = useTranslations();
  const eventsCoverageSection = t.raw(
    "eventsCoverage",
  ) as EventsCoverageSection;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="relative flex w-full justify-center px-5 py-12 sm:px-12 sm:py-5 lg:px-5 lg:py-25">
      <div className="flex w-full flex-col items-center gap-6 sm:gap-8 lg:gap-10">
        <motion.section
          ref={ref}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center gap-1 px-4 text-center"
        >
          <AnimatedText
            text={eventsCoverageSection.heading}
            className="text-primary-foreground text-2xl font-black sm:text-3xl lg:text-5xl"
            as="h2"
          />
          <p className="text-muted-foreground text-base font-medium sm:text-lg">
            {eventsCoverageSection.subheading}
          </p>
        </motion.section>
        <div className="relative w-full overflow-hidden">
          <div className="relative flex flex-col gap-3 px-4 sm:gap-4 sm:px-8 lg:px-12">
            <div className="absolute top-0 left-0 z-10 h-full w-30 bg-linear-to-r from-black from-10% to-black/0 max-[450px]:w-20 sm:w-50 lg:w-80 xl:w-100" />
            <div className="absolute top-0 right-2.5 z-10 h-full w-30 bg-linear-to-l from-black to-black/0 to-95% max-[450px]:w-20 sm:right-5 sm:w-50 lg:right-10 lg:w-80 xl:w-100" />
            <EventRow />
            <EventRow reverse />
          </div>
        </div>
      </div>
    </section>
  );
};
