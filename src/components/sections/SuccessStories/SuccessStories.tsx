"use client";

import React, { useRef } from "react";

// icons
import { ChevronLeft, ChevronRight } from "lucide-react";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";

// components
import { IndustriesWeServe } from "../IndustriesWeServe";
import { Button } from "~/components/ui/button";
import { TechStack } from "../TechStack";

const IndustriesWeServeData = [
  {
    title: "Airtel India Pvt. Ltd.",
    description:
      "Network Monetization Tools deployed to enhance User Service Experience lorem Network Monetization Tools deployed to enhance User Service Experience lorem Network Monetization Tools deployed to enhance User Service Experience lorem Network Monetization Tools deployed to enhance User Service Experience lorem Network Monetization Tools deployed to enhance User Service Experience lorem",
  },
  {
    title: "Chili India Pvt. Ltd.",
    description:
      "Network Monetization Tools deployed to enhance User Service Experience lorem Network Monetization Tools deployed to enhance User Service Experience lorem Network Monetization Tools deployed to enhance User Service Experience lorem Network Monetization Tools deployed to enhance User Service Experience lorem Network Monetization Tools deployed to enhance User Service Experience lorem",
  },
  {
    title: "VI India Pvt. Ltd.",
    description:
      "Network Monetization Tools deployed to enhance User Service Experience lorem Network Monetization Tools deployed to enhance User Service Experience lorem Network Monetization Tools deployed to enhance User Service Experience lorem Network Monetization Tools deployed to enhance User Service Experience lorem Network Monetization Tools deployed to enhance User Service Experience lorem",
  },
  {
    title: "IU India Pvt. Ltd.",
    description:
      "Network Monetization Tools deployed to enhance User Service Experience lorem Network Monetization Tools deployed to enhance User Service Experience lorem Network Monetization Tools deployed to enhance User Service Experience lorem Network Monetization Tools deployed to enhance User Service Experience lorem Network Monetization Tools deployed to enhance User Service Experience lorem",
  },
];

export const SuccessStories: React.FC = () => {
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="bg-primary flex flex-col gap-20 px-25 py-25">
      <div className="flex flex-col gap-9">
        <div className="flex justify-between">
          <p className="text-primary-foreground text-4xl font-medium">
            Telecom Success Stories (0{IndustriesWeServeData.length})
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

        <div className="relative h-full w-full">
          <Swiper
            modules={[Autoplay, Navigation]}
            loop
            slidesPerView={1}
            spaceBetween={50}
            autoplay={{
              delay: 8000,
              disableOnInteraction: false,
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
            className="h-full w-full"
          >
            {IndustriesWeServeData.map((data, index) => (
              <SwiperSlide key={index}>
                <div className="flex h-full w-full items-center gap-5 rounded-xl">
                  <div className="bg-primary-foreground/20 h-120 w-100 rounded-xl" />

                  <div className="px-1">
                    <p className="text-primary-foreground max-w-4xl text-xl">
                      {data.description}
                    </p>
                    <p className="text-muted-foreground mt-8 text-xl leading-tight">
                      {data.title}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="bg-muted-foreground h-[0.5px] w-full" />

      <IndustriesWeServe />

      <div className="bg-muted-foreground h-[0.5px] w-full" />

      <TechStack />
    </div>
  );
};
