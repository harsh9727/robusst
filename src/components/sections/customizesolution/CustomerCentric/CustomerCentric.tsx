"use client";

import { MessageCircle, Headphones, Wifi, BarChart3 } from "lucide-react";
import Image from "next/image";

const features = [
  {
    title: "Communication",
    desc: "Clear, real-time interactions across every customer channel.",
    icon: MessageCircle,
  },
  {
    title: "Support",
    desc: "Proactive assistance that builds trust and loyalty.",
    icon: Headphones,
  },
  {
    title: "Data & Insights",
    desc: "Actionable intelligence to optimize every decision.",
    icon: BarChart3,
  },
  {
    title: "Connectivity",
    desc: "Seamless integration across platforms and touchpoints.",
    icon: Wifi,
  },
];

export default function CustomerCentric() {
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
                Customer-Centric
                <span className="text-brand-one block">by Design</span>
              </h2>

              <p className="mt-6 max-w-xl text-lg text-gray-300">
                Every solution we create begins with your business goals and
                delivers consistent, connected customer experiences.
              </p>

              <ul className="mt-8 space-y-4 text-gray-300">
                <li className="flex gap-3">
                  <span className="bg-brand-one mt-2 h-2 w-2 rounded-full" />
                  Built around your customers, not just technology.
                </li>
                <li className="flex gap-3">
                  <span className="bg-brand-one mt-2 h-2 w-2 rounded-full" />
                  From engagement to revenue management, every touchpoint
                  matters.
                </li>
                <li className="flex gap-3">
                  <span className="bg-brand-one mt-2 h-2 w-2 rounded-full" />
                  Inspired by global best practices and proven CX frameworks.
                </li>
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
