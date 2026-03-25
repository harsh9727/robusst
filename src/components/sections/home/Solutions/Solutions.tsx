"use client";
import React, { useRef } from "react";
import "swiper/css";
import Image from "next/image";
import type { SolutionsSection } from "~/i18n/types/home";
import { useTranslations } from "next-intl";
import { AnimatedText } from "~/components/ui/TextAnimation";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Button } from "~/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export const Solutions: React.FC = () => {
  const t = useTranslations();
  const solutionsSection = t.raw("solutions") as SolutionsSection;

  const swiperRefLarge = useRef<SwiperType | null>(null);
  const swiperRefSmall = useRef<SwiperType | null>(null);

  // Helper function to reset autoplay timer
  const resetAutoplay = () => {
    if (swiperRefLarge.current?.autoplay) {
      swiperRefLarge.current.autoplay.stop();
      swiperRefLarge.current.autoplay.start();
    }
    if (swiperRefSmall.current?.autoplay) {
      swiperRefSmall.current.autoplay.stop();
      swiperRefSmall.current.autoplay.start();
    }
  };

  // Uncomment and use this function for arc selector when implemented
  // const goToSlide = (index: number) => {
  //   if (swiperRefLarge.current) {
  //     swiperRefLarge.current.slideTo(index);
  //   }
  //   if (swiperRefSmall.current) {
  //     swiperRefSmall.current.slideTo(index);
  //   }
  //   resetAutoplay();
  // };

  const handlePrev = () => {
    if (swiperRefLarge.current) {
      swiperRefLarge.current.slidePrev();
    }
    if (swiperRefSmall.current) {
      swiperRefSmall.current.slidePrev();
    }
    resetAutoplay();
  };

  const handleNext = () => {
    if (swiperRefLarge.current) {
      swiperRefLarge.current.slideNext();
    }
    if (swiperRefSmall.current) {
      swiperRefSmall.current.slideNext();
    }
    resetAutoplay();
  };

  return (
    <div
      id="ourSolution"
      className="relative flex w-full items-center justify-center gap-6 overflow-hidden px-6 py-16 sm:gap-8 sm:px-12 sm:py-20 lg:px-25 lg:py-25"
    >
      <section className="flex w-full flex-col justify-between gap-4 sm:gap-8">
        <div className="flex flex-row items-center justify-between gap-4 max-[450px]:flex-col max-[450px]:items-start lg:flex-col lg:justify-center">
          <section className="flex w-full flex-col lg:items-center lg:text-center">
            <AnimatedText
              text={solutionsSection.heading}
              className="text-primary-foreground text-2xl font-black sm:text-3xl lg:text-6xl"
              as="h2"
            />
            <p className="text-muted-foreground text-base font-medium sm:text-lg">
              {solutionsSection.subheading}
            </p>
          </section>

          <section className="flex items-center gap-5">
            <Button
              size="icon-lg"
              variant="ghost"
              className="border-border/40 border text-white"
              onClick={handlePrev}
              aria-label="Previous solution"
            >
              <ChevronLeft aria-hidden="true" />
            </Button>
            <Button
              size="icon-lg"
              variant="ghost"
              className="border-border/40 border text-white"
              onClick={handleNext}
              aria-label="Next solution"
            >
              <ChevronRight aria-hidden="true" />
            </Button>
          </section>
        </div>

        <div className="relative hidden select-none lg:block">
          <Swiper
            modules={[Autoplay]}
            loop
            centeredSlides
            spaceBetween={12}
            // allowTouchMove={false}
            speed={3000}
            autoplay={{
              delay: 7000,
              disableOnInteraction: false,
            }}
            onSwiper={(swiper) => {
              swiperRefLarge.current = swiper;
            }}
            breakpoints={{
              0: {
                slidesPerView: 2,
                spaceBetween: 8,
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 12,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 12,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 12,
              },
            }}
            className="w-full"
          >
            {solutionsSection.items.map((solution, index) => (
              <SwiperSlide key={index}>
                {({ isActive }) => (
                  <div
                    className={`group flex h-full w-full flex-col gap-4 rounded-xl py-8 duration-3000 ease-in-out sm:gap-5 ${
                      isActive ? "scale-100 opacity-100" : "scale-80 opacity-50"
                    }`}
                  >
                    <div className="bg-primary shadow-brand-one relative h-50 w-full overflow-hidden rounded-xl sm:h-50 lg:h-100">
                      <Image
                        src={solution.image}
                        alt="image"
                        fill
                        className="object-cover duration-150"
                      />
                    </div>
                    <div className="px-3">
                      <p className="text-primary-foreground text-lg leading-tight font-medium sm:text-3xl">
                        {solution.title}
                      </p>

                      <p className="text-muted-foreground mt-3 text-base leading-tight font-medium sm:text-lg">
                        {solution.description}
                      </p>

                      <ul className="mt-3 list-disc pl-4">
                        {solution.points.map((point, index) => (
                          <li
                            key={index}
                            className="text-muted-foreground text-sm leading-tight font-medium sm:text-lg"
                          >
                            {point}
                          </li>
                        ))}
                      </ul>

                      <Button
                        asChild
                        className="bg-brand-three hover:bg-brand-three/90 text-primary-foreground mt-5 rounded-full font-semibold uppercase"
                      >
                        <Link href={`/solutions/${solution.slug}`}>
                          Learn More
                          <span className="sr-only">
                            {" "}
                            about {solution.title}
                          </span>
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="relative block lg:hidden">
          <Swiper
            modules={[Autoplay]}
            loop
            spaceBetween={12}
            speed={3000}
            autoplay={{
              delay: 7000,
              disableOnInteraction: false,
            }}
            onSwiper={(swiper) => {
              swiperRefSmall.current = swiper;
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 8,
              },
              480: {
                slidesPerView: 1,
                spaceBetween: 10,
              },

              768: {
                slidesPerView: 1,
                spaceBetween: 12,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 12,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 12,
              },
            }}
            className="w-full"
          >
            {solutionsSection.items.map((solution, index) => (
              <SwiperSlide key={index}>
                {({ isActive }) => (
                  <div
                    className={`group flex h-full w-full flex-col gap-4 rounded-xl py-8 duration-3000 ease-in-out sm:gap-5 ${
                      isActive ? "scale-100 opacity-100" : "scale-80 opacity-50"
                    }`}
                  >
                    <div className="bg-primary shadow-brand-one relative h-90 w-full max-w-full overflow-hidden rounded-xl md:max-w-sm lg:h-50 lg:max-w-full">
                      <Image
                        src={solution.image}
                        alt="image"
                        fill
                        className="object-cover duration-150"
                      />
                    </div>
                    <div className="px-3">
                      <p className="text-primary-foreground text-lg leading-tight font-medium sm:text-3xl">
                        {solution.title}
                      </p>

                      <p className="text-muted-foreground mt-3 text-base leading-tight font-medium sm:text-lg">
                        {solution.description}
                      </p>

                      <ul className="mt-3 list-disc pl-4">
                        {solution.points.map((point, index) => (
                          <li
                            key={index}
                            className="text-muted-foreground text-sm leading-tight font-medium sm:text-lg"
                          >
                            {point}
                          </li>
                        ))}
                      </ul>

                      <Button
                        asChild
                        className="bg-brand-three hover:bg-brand-three/90 text-primary-foreground mt-5 rounded-full font-semibold uppercase"
                      >
                        <Link href={`/solutions/${solution.slug}`}>
                          Learn More
                          <span className="sr-only">
                            {" "}
                            about {solution.title}
                          </span>
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
};
