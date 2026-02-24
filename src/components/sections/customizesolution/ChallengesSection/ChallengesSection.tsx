"use client";

import { CircleCheck } from "lucide-react";
import Image from "next/image";

const challenges = [
  {
    title: "Business & Strategic Challenges",
    points: [
      "Declining ARPU due to OTT players",
      "High market competition",
      "Customer churn and loyalty issues",
      "Evolving business models (IoT, cloud, fintech, etc.)",
    ],
  },
  {
    title: "Operational & Process Challenges",
    points: [
      "Legacy OSS/BSS systems",
      "Siloed customer and network data",
      "Manual, error-prone workflows",
      "Inefficient network operations",
    ],
  },
  {
    title: "Technological Challenges",
    points: [
      "Pressure for digital transformation",
      "5G readiness and monetization hurdles",
      "Cybersecurity and data privacy risks",
      "Integration gaps in emerging technologies (AI, IoT, blockchain)",
    ],
  },
  {
    title: "Customer Experience & Marketing Challenges",
    points: [
      "Low product and service differentiation",
      "Limited personalization and data utilization",
      "Inconsistent omnichannel engagement",
      "Stricter consent and privacy management requirements",
    ],
  },
  {
    title: "Financial & Regulatory Challenges",
    points: [
      "High CapEx and OpEx costs",
      "Complex and evolving regulatory compliance",
      "Managing partner ecosystems and SLAs",
    ],
  },
  {
    title: "Emerging Strategic Imperatives",
    points: [
      "Data monetization through AI and analytics",
      "Automation and AI adoption in operations",
      "Customer-centric digital platforms (CDPs, consent management)",
      "Green and sustainable telecom initiatives",
    ],
  },
];

export default function ChallengesSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-15 text-center">
          <h2 className="mb-5 text-4xl font-extrabold text-gray-900 lg:text-5xl">
            Challenges
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Key obstacles organizations face while scaling operations and
            adopting next-generation technologies.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
          <div className="flex flex-col gap-3">
            {challenges.slice(0, 3).map((item, i) => (
              <div
                key={i}
                className="group shadow-brand-one relative overflow-hidden rounded-[0_18px_18px_0] border border-gray-200 bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_35px]"
              >
                <div className="bg-brand-one shadow-brand-one absolute top-0 left-0 h-0 w-1 shadow-[0_0_20px] transition-all duration-500 group-hover:h-full" />
                <div className="pointer-events-none absolute inset-0 bg-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                <h3 className="text-brand-one relative mb-6 text-xl leading-snug font-bold">
                  {item.title}
                </h3>

                <ul className="relative list-disc pl-4">
                  {item.points.map((point, idx) => (
                    <li key={idx}>
                      <span className="text-sm leading-relaxed font-medium text-gray-900">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="group-hover:ring-brand-one/25 pointer-events-none absolute inset-0 rounded-[0_18px_18px_0] ring-1 ring-transparent transition duration-500" />
              </div>
            ))}
          </div>

          <div className="relative hidden h-fit w-130 xl:block">
            <Image
              src="/solutions/customized/3.webp"
              alt="men"
              width={1000}
              height={1000}
              unoptimized
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-3">
            {challenges.slice(2, 5).map((item, i) => (
              <div
                key={i}
                className="group shadow-brand-one relative overflow-hidden rounded-[0_18px_18px_0] border border-gray-200 bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_35px]"
              >
                <div className="bg-brand-one shadow-brand-one absolute top-0 left-0 h-0 w-1 shadow-[0_0_20px] transition-all duration-500 group-hover:h-full" />
                <div className="pointer-events-none absolute inset-0 bg-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                <h3 className="text-brand-one relative mb-6 text-xl leading-snug font-bold">
                  {item.title}
                </h3>

                <ul className="relative list-disc pl-4">
                  {item.points.map((point, idx) => (
                    <li key={idx}>
                      <span className="text-sm leading-relaxed font-medium text-gray-900">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="group-hover:ring-brand-one/25 pointer-events-none absolute inset-0 rounded-[0_18px_18px_0] ring-1 ring-transparent transition duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
