"use client";

import React from "react";
import Image from "next/image";

import { about } from "public";
import { useTranslations } from "next-intl";
import type { AboutSection } from "~/i18n/types/home";
import { AnimatedText } from "~/components/ui/TextAnimation";
import { useRouter } from "next/navigation";
import { Play } from "lucide-react";

export const About: React.FC = () => {
  const t = useTranslations();
  const aboutSection = t.raw("about") as AboutSection;
  const router = useRouter();

  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-6 overflow-hidden px-6 py-16 sm:gap-8 sm:px-12 sm:py-32 lg:px-25 lg:py-25">
      {/*<svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        className=" top-10 -right-[800px] h-20 w-full absolute -rotate-45 "
      >
        <path
          d="M0,50 Q150,-40 300,50 T600,50 T900,50 T1200,50"
          fill="none"
          stroke="#4c4c4c"
          strokeWidth="2"
          strokeDasharray="6,10"
          strokeLinecap="round"
        />
      </svg>*/}
      <section className="flex flex-col justify-center gap-1 text-center">
        <AnimatedText
          text={aboutSection.heading}
          className="text-2xl font-black sm:text-3xl lg:text-5xl"
          as="h2"
        />

        <p className="text-muted-foreground px-4 text-base font-medium sm:text-lg">
          {aboutSection.subheading}
        </p>
      </section>

      <section className="grid items-center gap-6 px-0 sm:gap-9 xl:grid-cols-2">
        <div
          className="shadow-brand-one group relative aspect-video h-full cursor-pointer overflow-hidden rounded-xl shadow-[0px_0px_10px] duration-150 hover:-translate-y-4 hover:shadow-[0px_0px_50px]"
          onClick={() => router.push("https://youtu.be/RPumOdbAfPY")}
        >
          <div className="absolute top-1/2 left-1/2 z-10 flex aspect-square w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white">
            <Play fill="#000000" />
          </div>

          {/*<div className="bg-brand-three absolute top-0 left-0 w-full h-full z-10" />*/}
          <Image
            src={about}
            alt="about"
            fill
            className="object-cover object-top duration-150 group-hover:brightness-50"
          />
        </div>

        <div className="flex w-full flex-col gap-4 sm:gap-5">
          {aboutSection.paragraphs.map((para, index) => (
            <p
              key={index}
              className="mx-auto max-w-full px-4 text-base leading-relaxed sm:max-w-160 sm:px-0 sm:text-lg sm:leading-tight lg:max-w-200 lg:text-xl"
            >
              {para}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
};
