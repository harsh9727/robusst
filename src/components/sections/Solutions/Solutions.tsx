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

const SolutionsData = [
  {
    image: solutions.antispam.src,
    title: "Branded Calling & Anti-SPAM",
    description: "Give a Wow Experience to your Customers",
    points: [
      "Increase answer rates",
      "Improve customer experience by showing your name, logo, and call reason",
      "Build Trusted Communications",
      "Remove Call Barriers and Mitigate Risk",
      "Protect and Amplify your Brand",
      "Optimize Call Performance for ROI",
    ],
  },

  {
    image: solutions.cdp.src,
    title: "Customer Data Platform (CDP)",
    description: "Unlock the Power of Unified Customer Intelligence",
    points: [
      "Precise Segmentation",
      "Instant Data Preparation",
      "Streamlined Data Operations",
      "Proactive Data Quality Assurance",
      "Safe and Secure Critical Customer Data",
    ],
  },

  {
    image: solutions.cyberSecurity.src,
    title: "Cyber Security",
    description: "End-to-end Security Automation",
    points: [
      "Security Operations",
      "Endpoint Security Services",
      "Network Security",
      "Cloud Security",
      "IT Infrastructure Management",
      "Application & Data Security Services",
    ],
  },

  {
    image: solutions.networkMonitorization.src,
    title: "Network Monetization",
    description: "Optimize Network Performance with Intelligence",
    points: [
      "Automates the Complex Testing Process",
      "Outdoor & Indoor Coverage Management System",
      "Proactively Enhance Service & Coverage Quality",
      "Launch New Sites Faster",
      "Get RCA Within Minutes Instead of Weeks",
      "Intelligent Dark NOC",
    ],
  },

  {
    image: solutions.customizedSolution.src,
    title: "Customized Solutions",
    description: "Get a Bespoke Solution for Your Pain Points",
    points: [
      "Streamline Processes, Boost Productivity, and Reduce Costs",
      "Modular Solutions That Grow with Your Business",
      "Tailor-made Systems Aligned to Your Needs",
      "Seamless Integration",
      "Drive Smarter Decisions Through Analytics",
      "Quick Rollout with Minimal Disruption",
      "End-to-end Implementation and Maintenance",
    ],
  },

  {
    image: solutions.salesData.src,
    title: "Sales Tracking & Distributor Management",
    description: "Transform Your Sales Operations",
    points: [
      "Sales Force Automation",
      "Dealer Management System",
      "Influencer Loyalty & Rewards",
      "Inventory & Dispatch",
      "Product Authentication",
      "Warranty & Complaint Management",
    ],
  },

  {
    image: solutions.voice.src,
    title: "VoiceSync Enterprise",
    description: "Bespoke AI Voice Solutions for Enterprise Communication",
    points: [
      "Streamline Voice-driven Processes to Improve Efficiency and Reduce Costs",
      "Modular AI Voice Solutions That Scale with Your Business",
      "Custom Workflows Aligned with Operational, Compliance, and CX Requirements",
      "Seamless Integration with CRMs, Core Banking Systems, and Telecom Infrastructure",
      "Real-time Analytics and Insights for Smarter Decision-making",
      "Fast Deployment with Minimal Operational Disruption",
      "End-to-end Implementation, Optimization, and Ongoing Support",
    ],
  },
];

export const Solutions: React.FC = () => {
  const [, setSwiper] = useState<SwiperType | null>(null);
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="bg-primary relative flex min-h-screen w-full items-center justify-center gap-6 overflow-hidden px-6 py-16 sm:gap-8 sm:px-12 sm:py-20 lg:px-25 lg:py-25">
      <div className="bg-brand-two absolute -top-60 -right-20 h-40 w-100 rotate-6 blur-[200px] sm:h-50 sm:w-180" />
      <div className="bg-brand-two absolute -bottom-30 left-1/2 size-40 -translate-x-1/2 rounded-full blur-[140px] sm:size-50" />

      <section className="flex w-full flex-col justify-between gap-4 sm:gap-5">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-0">
          <section className="flex flex-col">
            <p className="text-primary-foreground text-2xl font-medium sm:text-3xl lg:text-4xl">
              Our Solutions (0{SolutionsData.length})
            </p>
            <p className="text-muted-foreground text-base font-medium sm:text-lg">
              Comprehensive Solutions that drive success
            </p>
          </section>

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
                slidesPerView: 3,
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
            {SolutionsData.map((data, index) => (
              <SwiperSlide key={index}>
                <div className="flex h-full w-full flex-col gap-4 rounded-xl sm:gap-5">
                  <div className="bg-primary-foreground/20 relative h-60 w-full overflow-hidden rounded-xl sm:h-80 lg:h-90">
                    <Image
                      src={data.image}
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
          </Swiper>
        </div>
      </section>
    </div>
  );
};
