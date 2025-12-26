"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import { motion, useInView } from "framer-motion";
import { trustedBy } from "public";
import Image from "next/image";

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
      effect="fade"
      fadeEffect={{
        crossFade: true,
      }}
      breakpoints={{
        0: {
          slidesPerView: 2,
          spaceBetween: 5,
        },
        480: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 12,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 12,
        },
        1280: {
          slidesPerView: 6,
          spaceBetween: 12,
        },
      }}
      className="w-full"
    >
      {Object.entries(trustedBy).map(([key, image], idx) => (
        <SwiperSlide key={idx}>
          <div className="bg-primary/20 relative h-20 w-full rounded-lg sm:h-24 lg:h-26">
            <Image
              src={image}
              alt={key}
              fill
              className="h-full w-fit"
              unoptimized
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export const TrustedBy: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="relative flex w-full justify-center px-6 pt-12 sm:px-12 sm:pt-16 lg:px-25 lg:pt-25">
      <div className="container flex w-full flex-col items-center gap-6 sm:gap-8 lg:gap-10">
        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
          className="text-center text-2xl font-medium sm:text-3xl lg:text-4xl"
        >
          Solutions trusted by
        </motion.p>

        <div className="relative w-full overflow-hidden">
          {/* <div className="from-background pointer-events-none absolute top-0 left-0 z-10 h-full w-0 bg-linear-to-r to-transparent sm:w-32 lg:w-150" /> */}
          {/* <div className="from-background pointer-events-none absolute top-0 right-0 z-10 h-full w-0 bg-linear-to-l to-transparent sm:w-32 lg:w-150" /> */}

          <div className="flex flex-col gap-3 px-4 sm:gap-4 sm:px-8 lg:px-12">
            <LogoRow />
            <LogoRow reverse />
          </div>
        </div>
      </div>
    </section>
  );
};
