"use client";
import React, { useRef } from "react";
import "swiper/css";
import { solutions } from "public";
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

const SolutionsImage = ["4.webp", "5.webp", "6.webp", "7.webp", "7.webp"];

export const CustomizedSolutionsSlider: React.FC = () => {
  const t = useTranslations();
  const solutionsSection: SolutionsSection[] = [
    {
      heading: "Data-Driven Intelligence for Smarter Decisions",
      countPrefix: "01",
      subheading:
        "We empower organizations to use data for good — turning insights into real-world results. With predictive analytics, churn prevention, and ARPU growth insights, Robusst enables data-backed strategies. Self-learning automation ensures networks stay efficient, secure, and optimized.",
      items: [],
    },
    {
      heading: "The Brain Behind Every Custom Telecom Transformation",
      countPrefix: "02",
      subheading:
        "Real-time monitoring dashboards demo view. Predictive churn prevention scenarios with before/after metric cards. Tooltip callouts highlighting measurable impact such as +35% ARPU and –40% revenue leakage.",
      items: [],
    },
    {
      heading: "End-to-End Integration & Flexibility",
      countPrefix: "03",
      subheading:
        "Proven interoperability across vendors and technologies including Cisco, Nokia, and Huawei. Cloud-native, API-driven architecture designed for flexibility across BSS/OSS and customer experience systems. Scalable integrations reduce operational complexity and accelerate deployment.",
      items: [],
    },

    {
      heading: "Data-Driven Intelligence for Smarter Decisions",
      countPrefix: "01",
      subheading:
        "We empower organizations to use data for good — turning insights into real-world results. With predictive analytics, churn prevention, and ARPU growth insights, Robusst enables data-backed strategies. Self-learning automation ensures networks stay efficient, secure, and optimized.",
      items: [],
    },
    {
      heading: "Data-Driven Intelligence for Smarter Decisions",
      countPrefix: "01",
      subheading:
        "We empower organizations to use data for good — turning insights into real-world results. With predictive analytics, churn prevention, and ARPU growth insights, Robusst enables data-backed strategies. Self-learning automation ensures networks stay efficient, secure, and optimized.",
      items: [],
    },
  ];

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
    <>
      <div className="w-full overflow-hidden bg-white sm:-mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 150">
          <path
            d="M0,80 C300,50 400,50 600,80 C800,110 900,110 1200,80 L1200,200 L0,200 Z"
            fill="#000000"
          />
        </svg>
      </div>
      <div className="relative flex w-full items-center justify-center gap-6 overflow-hidden px-6 py-16 sm:gap-8 sm:px-12 sm:py-20 lg:px-25 lg:py-25">
        <section className="flex w-full flex-col justify-between gap-4 sm:gap-8">
          <div className="flex flex-row items-center justify-between gap-4 max-[450px]:flex-col max-[450px]:items-start lg:flex-col lg:justify-center">
            {/*<section className="flex w-full flex-col lg:items-center lg:text-center">
            <AnimatedText
              text="Customized Solutions"
              className="text-primary-foreground text-2xl font-black sm:text-3xl lg:text-6xl"
              as="h2"
            />
            <p className="text-muted-foreground text-base font-medium sm:text-lg">
              {solutionsSection.subheading}
            </p>
          </section>*/}

            <section className="flex items-center gap-5">
              <Button
                size="icon-lg"
                variant="ghost"
                className="border-border/40 border text-white"
                onClick={handlePrev}
              >
                <ChevronLeft />
              </Button>
              <Button
                size="icon-lg"
                variant="ghost"
                className="border-border/40 border text-white"
                onClick={handleNext}
              >
                <ChevronRight />
              </Button>
            </section>
          </div>

          <div className="relative hidden lg:block">
            <Swiper
              modules={[Autoplay]}
              loop
              centeredSlides
              spaceBetween={12}
              allowTouchMove={false}
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
              {solutionsSection.map((solution, index) => (
                <SwiperSlide key={index}>
                  {({ isActive }) => (
                    <div
                      className={`group flex h-full w-full flex-col gap-4 rounded-xl py-8 duration-3000 ease-in-out sm:gap-5 ${
                        isActive
                          ? "scale-100 opacity-100"
                          : "scale-80 opacity-50"
                      }`}
                    >
                      <div className="bg-primary shadow-brand-one relative h-50 w-full overflow-hidden rounded-xl sm:h-50 lg:h-100">
                        <Image
                          src={`/solutions/customized/${SolutionsImage[index] as string}`}
                          alt="image"
                          fill
                          className="object-cover duration-150"
                        />
                      </div>
                      <div className="px-3">
                        <p className="text-primary-foreground text-lg leading-tight font-medium sm:text-3xl">
                          {solution.heading}
                        </p>

                        <p className="text-muted-foreground mt-3 text-base leading-tight font-medium sm:text-lg">
                          {solution.subheading}
                        </p>
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
              {solutionsSection.map((solution, index) => (
                <SwiperSlide key={index}>
                  {({ isActive }) => (
                    <div
                      className={`group flex h-full w-full flex-col gap-4 rounded-xl py-8 duration-3000 ease-in-out sm:gap-5 ${
                        isActive
                          ? "scale-100 opacity-100"
                          : "scale-80 opacity-50"
                      }`}
                    >
                      <div className="bg-primary shadow-brand-one relative h-90 w-full max-w-full overflow-hidden rounded-xl md:max-w-sm lg:h-50 lg:max-w-full">
                        <Image
                          src={`/solutions/customized/${SolutionsImage[index] as string}`}
                          alt="image"
                          fill
                          className="object-cover duration-150"
                        />
                      </div>
                      <div className="px-3">
                        <p className="text-primary-foreground text-lg leading-tight font-medium sm:text-3xl">
                          {solution.heading}
                        </p>

                        <p className="text-muted-foreground mt-3 text-base leading-tight font-medium sm:text-lg">
                          {solution.subheading}
                        </p>
                      </div>
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      </div>

      <div className="w-full overflow-hidden bg-white sm:-mt-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 150"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 C300,150 400,150 600,120 C800,90 900,90 1200,120 L1200,0 L0,0 Z"
            fill="#000000"
            stroke="none"
          />
        </svg>
      </div>
    </>
  );
};
