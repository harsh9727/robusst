"use client";

import { MessageCircle, Headphones, Wifi, BarChart3 } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { CustomerCentricSection } from "~/i18n/types/customizeSolution";

export default function CustomerCentric() {
  const t = useTranslations();
  const customerCentricSection = t.raw("customized_solution_page")
    .customerCentric as CustomerCentricSection;
  return (
    <>
      <section className="relative overflow-hidden bg-black py-24">
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-20 lg:grid-cols-2">
            {/* Image */}
            <div className="animate-float shadow-brand-one relative order-1 mx-auto flex aspect-square h-[300px] overflow-hidden rounded-full shadow-[0_0_30px] duration-200 hover:shadow-[0_0_50px] sm:h-[500px] lg:order-2">
              <Image
                src="/solutions/customized/2.webp"
                fill
                alt="Robusst Cyber Security"
                className="aspect-square h-fit w-fit object-cover"
              />
            </div>

            {/* Content */}
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl leading-tight font-extrabold text-white lg:text-5xl">
                {customerCentricSection.heading.split("by Design")[0]}
                <span className="text-brand-one block">by Design</span>
              </h2>

              <p className="mt-6 max-w-xl text-lg text-gray-300">
                {customerCentricSection.description}
              </p>

              <ul className="mt-8 space-y-4 text-gray-300">
                {customerCentricSection.points.map((point, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="bg-brand-one mt-2 h-2 w-2 rounded-full" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
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
}
