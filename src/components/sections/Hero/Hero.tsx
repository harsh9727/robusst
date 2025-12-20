"use client";

import React from "react";

// icons
import { ChevronRight } from "lucide-react";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";

const heroSectionData = [
  {
    title: "AI Solutions to Skyrocket Revenue & Delight Customers",
    description: "We help companies to monetize their power of data using AI",
    image: "",
    ctaText: "Learn More",
    ctaLink: "/dashboard/home",
  },
  {
    title: "Transform Your Business with Intelligent Automation",
    description:
      "Leverage cutting-edge AI to streamline operations and boost efficiency",
    image: "",
    ctaText: "Get Started",
    ctaLink: "/dashboard/home",
  },
  {
    title: "Data-Driven Insights for Smarter Decisions",
    description:
      "Unlock the full potential of your data with our AI analytics platform",
    image: "",
    ctaText: "Explore",
    ctaLink: "/dashboard/home",
  },
  {
    title: "Scale Your Success with AI-Powered Tools",
    description:
      "From startups to enterprises, we deliver solutions that grow with you",
    image: "",
    ctaText: "Contact Us",
    ctaLink: "/dashboard/home",
  },
];

export const Hero: React.FC = () => {
  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        loop
        slidesPerView={1}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        pagination={{
          enabled: true,
          clickable: true,
        }}
        className="h-screen w-full"
      >
        {heroSectionData.map((data, index) => (
          <SwiperSlide key={index} className="w-full">
            <div className="flex h-full w-full items-center justify-center">
              <div className="bg-primary flex h-full w-[50%] flex-col justify-center gap-2 pl-50">
                <h1 className="text-primary-foreground text-4xl font-medium md:text-6xl">
                  {data.title}
                </h1>
                <p className="text-muted-foreground mt-2 text-xl">
                  {data.description}
                </p>

                <div className="mt-8">
                  <Link
                    href={data.ctaLink}
                    className="group text-primary-foreground flex w-fit items-center gap-2 transition-colors"
                  >
                    <span className="relative text-lg">
                      {data.ctaText}
                      <div className="bg-primary-foreground absolute bottom-0 h-px w-0 duration-300 group-hover:w-full" />
                    </span>
                    <ChevronRight className="w-4" />
                  </Link>
                </div>
              </div>
              <div className="bg-primary/80 flex h-full min-w-[50%] items-center justify-center"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
