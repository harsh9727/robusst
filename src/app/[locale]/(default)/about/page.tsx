"use client";

import Image from "next/image";
import React from "react";

import { FaTags } from "react-icons/fa6";
import { MdFeedback } from "react-icons/md";
import { LuBrainCircuit } from "react-icons/lu";
import { MdSecurity } from "react-icons/md";
import { LuNetwork } from "react-icons/lu";
import { FaChartLine } from "react-icons/fa";
import { useTranslations } from "next-intl";
import type { AboutPageContent } from "~/i18n/types/aboutPage"; // Assuming this path is correct

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

const About: React.FC = () => {
  const t = useTranslations();
  const aboutPageContentSection = t.raw("aboutPage") as AboutPageContent; // Get the whole 'aboutPage' object

  return (
    <>
      <div className="bg-primary flex h-screen w-full flex-col items-center justify-center xl:flex-row">
        <div className="bg-primary relative order-2 flex h-full w-full flex-col justify-center gap-2 overflow-hidden px-8 sm:px-12 xl:order-1 xl:min-w-[50%] xl:pl-25">
          <div className="bg-brand-three absolute top-full -right-40 h-20 w-50 -translate-y-1/2 rotate-6 animate-pulse blur-[250px] sm:h-120 xl:top-1/2 xl:-left-40" />
          <div className="bg-brand-three absolute -bottom-5 -left-12 h-20 w-120 animate-pulse blur-[120px]" />

          <h1 className="text-primary-foreground text-3xl font-medium lg:text-5xl xl:text-6xl">
            {aboutPageContentSection.hero.title}
          </h1>
          <p className="text-primary-foreground mt-2 text-lg">
            {aboutPageContentSection.hero.description}
          </p>

          {/*<p className="text-primary-foreground mt-2 text-lg">
            {aboutPageContentSection.hero.subDescription}
          </p>*/}
        </div>

        <div className="relative order-1 h-full w-full items-end justify-end overflow-hidden sm:h-350 xl:order-2 xl:h-full xl:min-w-[50%]">
          {/*<div className="bg-primary absolute -bottom-15 -left-4 z-10 h-20 w-[120vw] rotate-6 sm:h-30 xl:-top-9 xl:-left-28 xl:h-[120vh] xl:w-50 xl:rotate-12" />*/}
          <div className="relative h-full w-full bg-black">
            <Image
              src={aboutPageContentSection.hero.image}
              alt="hero image"
              width={1000}
              height={1000}
              className="absolute right-0 -bottom-10 object-cover object-top grayscale-100 sm:-bottom-30 lg:-bottom-50 xl:bottom-0"
              unoptimized
              priority
            />
          </div>
        </div>
      </div>
      <section className="bg-primary-foreground px-6 py-15 sm:px-12 md:py-20 xl:px-25">
        <div className="mx-auto flex w-full max-w-7xl flex-col-reverse items-start justify-start gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="text-base lg:text-xl">
            <h3 className="mb-5 text-2xl leading-tight font-bold text-black sm:text-3xl md:text-4xl">
              {aboutPageContentSection.mission.heading}
            </h3>

            {aboutPageContentSection.mission.paragraphs.map(
              (paragraph, index) => (
                <p key={index} className={index > 0 ? "mt-2" : ""}>
                  {paragraph}
                </p>
              ),
            )}
          </div>

          <div className="relative flex h-80 w-full max-w-130 overflow-hidden rounded-xl bg-linear-to-r from-pink-50 to-purple-50 sm:h-100 sm:min-w-130">
            <Image
              src={aboutPageContentSection.mission.image}
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
              src={aboutPageContentSection.vision.image}
              alt="Vision image"
              fill
              className="h-full w-full object-cover"
            />
          </div>
          <div className="text-base lg:text-xl">
            <h3 className="mb-5 text-2xl leading-tight font-bold text-black sm:text-3xl md:text-4xl">
              {aboutPageContentSection.vision.heading}
            </h3>

            <ul className="list-disc pl-4">
              {aboutPageContentSection.vision.items.map((item, index) => (
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
              {aboutPageContentSection.ourPurpose.heading}
            </h3>

            {aboutPageContentSection.ourPurpose.paragraphs.map(
              (paragraph, index) => (
                <p key={index} className="text-primary mt-2 text-lg">
                  {paragraph}
                </p>
              ),
            )}
          </div>
          <div className="relative flex h-80 w-full max-w-130 overflow-hidden rounded-xl bg-linear-to-r from-pink-50 to-purple-50 sm:h-100 sm:min-w-130">
            <Image
              src={aboutPageContentSection.ourPurpose.image}
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
            {aboutPageContentSection.values.heading}
          </h3>
        </section>

        <section className="grid w-full grid-cols-1 gap-4 px-6 sm:gap-5 sm:px-12 lg:grid-cols-2 lg:px-25 xl:grid-cols-3">
          {aboutPageContentSection.values.items.map((item, index) => {
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
      <section className="bg-primary-foreground px-6 py-15 sm:px-12 md:py-20 xl:px-25">
        <div className="mx-auto flex w-full max-w-7xl flex-col-reverse items-start justify-start gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="text-base lg:text-xl">
            <h3 className="mb-5 text-2xl leading-tight font-bold text-black sm:text-3xl md:text-4xl">
              {aboutPageContentSection.whatDefinesUs.heading}
            </h3>

            {aboutPageContentSection.whatDefinesUs.paragraphs.map(
              (paragraph, index) => (
                <p key={index} className="text-primary mt-2 text-lg">
                  {paragraph}
                </p>
              ),
            )}
          </div>
          <div className="relative flex h-80 w-full max-w-130 overflow-hidden rounded-xl bg-linear-to-r from-pink-50 to-purple-50 sm:h-100 sm:min-w-130">
            <Image
              src={aboutPageContentSection.whatDefinesUs.image}
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
              {aboutPageContentSection.challenges.heading}
            </h3>

            {aboutPageContentSection.challenges.paragraphs.map(
              (paragraph, index) => (
                <p key={index} className={index > 0 ? "mt-2" : ""}>
                  {paragraph}
                </p>
              ),
            )}
          </div>

          <div className="grid w-full gap-3 sm:grid-cols-2">
            {aboutPageContentSection.challenges.items.map((item, index) => {
              const IconComponent = IconComponents[item.icon];
              return (
                <div
                  key={index}
                  className="shadow-brand-three border-border/40 w-full rounded-lg border p-4 shadow-[0px_0px_0px] duration-150 hover:shadow-[0px_0px_10px] sm:p-5 lg:p-4"
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

export default About;
