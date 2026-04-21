"use client";

import Image from "next/image";
import React from "react";

import { FaTags } from "react-icons/fa6";
import { MdFeedback } from "react-icons/md";
import { LuBrainCircuit } from "react-icons/lu";
import { MdSecurity } from "react-icons/md";
import { LuNetwork } from "react-icons/lu";
import { FaChartLine } from "react-icons/fa";
import type { Aboutpage_JsonType } from "~/types/api/about_json.types";

// A map to get the Icon component by its string name
const IconComponents: { [key: string]: React.ElementType } = {
  FaChartLine: FaChartLine,
  FaTags: FaTags,
  MdFeedback: MdFeedback,
  LuBrainCircuit: LuBrainCircuit,
  MdSecurity: MdSecurity,
  LuNetwork: LuNetwork,
  // Add other icons if they are used in the JSON and need dynamic rendering
};

interface AboutContentProps {
  data?: Aboutpage_JsonType["aboutPage"];
}

const AboutContent: React.FC<AboutContentProps> = ({ data }) => {
  if (!data) return null;

  return (
    <>
      <div className="bg-primary relative flex h-screen w-full flex-col items-center overflow-hidden sm:items-start">
        <Image
          src="/about/team.webp"
          alt="hero image"
          width={5000}
          height={1000}
          // fill
          className="absolute bottom-0 h-100 w-full object-cover object-top opacity-40 lg:h-125 xl:h-200"
        />

        <div className="text-primary-foreground relative z-10 mt-30 flex w-full flex-col items-center justify-center px-5 py-12 text-center text-left sm:text-center lg:mt-60 lg:max-w-3xl lg:pl-25 lg:text-left">
          <h1 className="text-primary-foreground text-3xl font-medium lg:text-5xl xl:text-6xl">
            {data.hero.title}
          </h1>
          <p className="text-primary-foreground mt-2 max-w-2xl text-lg">
            {data.hero.description}
          </p>
        </div>
      </div>

      <section className="bg-primary-foreground px-6 py-15 sm:px-12 md:py-20 xl:px-25">
        <div className="mx-auto flex w-full max-w-7xl flex-col-reverse items-start justify-start gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="text-base lg:text-xl">
            <h3 className="mb-5 text-2xl leading-tight font-bold text-black sm:text-3xl md:text-4xl">
              {data.mission.heading}
            </h3>

            {data.mission.paragraphs.map((paragraph, index) => (
              <p key={index} className={index > 0 ? "mt-2" : ""}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="relative flex h-80 w-full max-w-130 overflow-hidden rounded-xl bg-linear-to-r from-pink-50 to-purple-50 sm:h-100 sm:min-w-130">
            <Image
              src={data.mission.image}
              alt="Mission image"
              fill
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-primary-foreground px-6 py-15 sm:px-12 md:py-20 xl:px-25">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-start gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex h-80 w-full max-w-130 overflow-hidden rounded-xl bg-linear-to-r from-pink-50 to-purple-50 sm:h-100 sm:min-w-130">
            <Image
              src={data.vision.image}
              alt="Vision image"
              fill
              className="h-full w-full object-cover"
            />
          </div>
          <div className="text-base lg:text-xl">
            <h3 className="mb-5 text-2xl leading-tight font-bold text-black sm:text-3xl md:text-4xl">
              {data.vision.heading}
            </h3>

            <ul className="list-disc pl-4">
              {data.vision.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-primary-foreground px-6 py-15 sm:px-12 md:py-20 xl:px-25">
        <div className="mx-auto flex w-full max-w-7xl flex-col-reverse items-start justify-start gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="text-base lg:text-xl">
            <h3 className="mb-5 text-2xl leading-tight font-bold text-black sm:text-3xl md:text-4xl">
              {data.ourPurpose.heading}
            </h3>

            {data.ourPurpose.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-primary mt-2 text-lg">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="relative flex h-80 w-full max-w-130 overflow-hidden rounded-xl bg-linear-to-r from-pink-50 to-purple-50 sm:h-100 sm:min-w-130">
            <Image
              src="/pics/about_office.webp"
              alt="Purpose image"
              fill
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <div className="w-full overflow-hidden bg-white sm:-mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 150">
          <path
            d="M0,80 C300,50 400,50 600,80 C800,110 900,110 1200,80 L1200,200 L0,200 Z"
            fill="#000000"
          />
        </svg>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-6 px-6 py-12 sm:gap-8 sm:px-12 sm:py-16 lg:px-25 lg:py-25">
        <section className="flex flex-col justify-center gap-1 px-4 text-center">
          <h3 className="mb-5 text-2xl leading-tight font-bold text-white sm:text-3xl md:text-4xl">
            {data.values.heading}
          </h3>
        </section>

        <section className="grid w-full grid-cols-1 gap-4 px-6 sm:gap-5 sm:px-12 lg:grid-cols-2 lg:px-25 xl:grid-cols-3">
          {data.values.items.map((item, index) => {
            const IconComponent = IconComponents[item.icon]; // Get the icon component dynamically

            return (
              <div
                key={index}
                className="shadow-brand-one border-border/40 w-full rounded-lg border p-4 shadow-[0px_0px_0px] duration-150 hover:shadow-[0px_0px_10px] sm:p-5 lg:p-4"
              >
                <div className="text-brand-one relative h-7 w-7 overflow-hidden rounded-sm">
                  {IconComponent && <IconComponent className="h-full w-full" />}
                </div>
                <p className="text-primary-foreground mt-4 text-lg font-medium sm:mt-5 sm:text-xl">
                  {item.title} {item.description}
                </p>
              </div>
            );
          })}
        </section>
      </div>

      <div className="z-10 w-full overflow-hidden bg-white">
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

      <section className="bg-primary-foreground px-6 py-15 sm:px-12 md:py-20 xl:px-25">
        <div className="mx-auto flex w-full max-w-7xl flex-col-reverse items-start justify-start gap-10 lg:items-center lg:justify-between">
          <div className="text-base lg:text-xl">
            <h3 className="mb-5 text-2xl leading-tight font-bold text-black sm:text-3xl md:text-4xl">
              {data.whatDefinesUs.heading}
            </h3>

            {data.whatDefinesUs.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-primary mt-2 text-lg">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="relative flex h-80 w-full max-w-7xl overflow-hidden rounded-xl bg-linear-to-r from-pink-50 to-purple-50 sm:h-100 sm:min-w-130">
            <Image
              src="/pics/full_office.webp"
              alt="What Defines Us image"
              fill
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-primary-foreground px-6 py-15 sm:px-12 md:py-20 xl:px-25">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-start gap-10 lg:items-center lg:justify-between">
          <div className="text-base lg:text-xl">
            <h3 className="mb-5 text-2xl leading-tight font-bold text-black sm:text-3xl md:text-4xl">
              {data.challenges.heading}
            </h3>

            {data.challenges.paragraphs.map((paragraph, index) => (
              <p key={index} className={index > 0 ? "mt-2" : ""}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="grid w-full gap-3 sm:grid-cols-2">
            {data.challenges.items.map((item, index) => {
              const IconComponent = IconComponents[item.icon];
              return (
                <div
                  key={index}
                  className="shadow-brand-three border-border w-full rounded-lg border p-4 shadow-[0px_0px_0px] duration-150 hover:shadow-[0px_0px_10px] sm:p-5 lg:p-4"
                >
                  <div className="text-brand-three relative h-7 w-7 overflow-hidden rounded-sm">
                    {IconComponent && (
                      <IconComponent className="h-full w-full" />
                    )}
                  </div>
                  <p className="text-primary mt-4 text-lg font-medium sm:mt-5 sm:text-xl">
                    {item.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutContent;
