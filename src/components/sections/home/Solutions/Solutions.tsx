"use client";

import React, { useRef, useState } from "react";

// icons
import { ChevronLeft, ChevronRight } from "lucide-react";

// components
import { Button } from "~/components/ui/button";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import { solutions } from "public";
import Image from "next/image";
import type { SolutionsSection } from "~/i18n/types/home";
import { useTranslations } from "next-intl";
import { AnimatedText } from "~/components/ui/TextAnimation";

const SolutionsImage = [
  solutions.antispam.src,
  solutions.cdp.src,
  solutions.cyberSecurity.src,
  solutions.networkMonitorization.src,
  solutions.customizedSolution.src,
  solutions.salesData.src,
  solutions.voice.src,
];

export const Solutions: React.FC = () => {
  const t = useTranslations();
  const solutionsSection = t.raw("solutions") as SolutionsSection;

  const [, setSwiper] = useState<SwiperType | null>(null);
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative flex w-full items-center justify-center gap-6 overflow-hidden px-6 py-16 sm:gap-8 sm:px-12 sm:py-20 lg:px-25 lg:py-25">
      <div className="bg-brand-one absolute -top-60 -right-20 h-40 w-100 rotate-6 blur-[200px] sm:h-50 sm:w-180" />
      <div className="bg-brand-one absolute -bottom-30 left-1/2 size-40 -translate-x-1/2 rounded-full blur-[140px] sm:size-50" />

      <section className="flex w-full flex-col justify-between gap-4 sm:gap-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-0">
          <section className="flex flex-col">
            <AnimatedText
              text={solutionsSection.heading}
              className="text-primary-foreground text-2xl font-medium sm:text-3xl lg:text-4xl"
              as="h2"
            />
            <p className="text-muted-foreground text-base font-medium sm:text-lg">
              {solutionsSection.subheading}
            </p>
          </section>

          {/*<div className="flex items-center gap-2">
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
          </div>*/}
        </div>
        <div className="relative grid h-full w-full grid-cols-3 gap-8">
          {solutionsSection.items.map((data, index) => (
            <div
              key={index}
              className="group flex h-full w-full flex-col gap-4 rounded-xl sm:gap-5"
            >
              <div className="bg-primary relative h-50 w-full overflow-hidden rounded-xl duration-150 group-hover:-translate-y-3.5 sm:h-50 lg:h-80">
                <div className="bg-primary-foreground absolute -bottom-full left-0 z-10 w-full p-3 duration-150 group-hover:bottom-0">
                  <p className="text-brand-three font-semibold">
                    {data.description}
                  </p>
                </div>

                <Image
                  src={SolutionsImage[index] as string}
                  alt="image"
                  fill
                  className="object-cover duration-150 group-hover:scale-110 group-hover:opacity-50"
                />
              </div>

              <div className="px-1">
                <p className="text-primary-foreground text-center text-base leading-tight font-medium sm:text-lg">
                  {data.title}
                </p>

                {/*<p className="text-muted-foreground text-sm sm:text-base">
                  {data.description}
                </p>*/}
              </div>
            </div>
          ))}
          {/*<Swiper
            modules={[Autoplay, Navigation]}
            loop
            spaceBetween={20}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 50,
              },
            }}
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
            {solutionsSection.items.map((data, index) => (
              <SwiperSlide key={index}>
                <div className="flex h-full w-full flex-col gap-4 rounded-xl sm:gap-5">
                  <div className="bg-primary-foreground/20 relative h-50 w-full overflow-hidden rounded-xl sm:h-60 lg:h-70">
                    <Image
                      src={SolutionsImage[index] as string}
                      alt="image"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="px-1">
                    <p className="text-primary-foreground text-base leading-tight font-medium sm:text-lg">
                      {data.title}
                    </p>

                    <p className="text-muted-foreground text-sm sm:text-base">
                      {data.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>*/}
        </div>
      </section>
    </div>
  );
};
