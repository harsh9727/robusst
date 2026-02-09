"use client";

import { CircleCheck } from "lucide-react";

const challenges = [
  {
    title: "Business & Strategic Challenges",
    points: [
      "Declining ARPU due to OTT players",
      "High market competition",
      "Customer churn and loyalty issues",
      "Evolving business models (IoT, cloud, fintech, etc.)",
      "Revenue leakage from billing and settlement inefficiencies",
    ],
  },
  {
    title: "Operational & Process Challenges",
    points: [
      "Legacy OSS/BSS systems",
      "Siloed customer and network data",
      "Complex multi-vendor integration",
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
        {/* Heading */}
        <div className="mb-15 text-center">
          <h2 className="mb-5 text-4xl font-extrabold text-gray-900 lg:text-5xl">
            Challenges
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Key obstacles organizations face while scaling operations and
            adopting next-generation technologies.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-12 lg:grid-cols-3">
          {challenges.map((item, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-[0_18px_18px_0] border border-gray-200 bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_35px_80px_-30px_rgba(236,72,153,0.35)]"
            >
              {/* Animated Accent bar */}
              <div className="absolute top-0 left-0 h-0 w-1 bg-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.6)] transition-all duration-500 group-hover:h-full" />

              {/* Soft background glow */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-pink-50/0 via-pink-50/40 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

              {/* Content */}
              <h3 className="relative mb-6 text-xl leading-snug font-bold text-pink-600">
                {item.title}
              </h3>

              <ul className="relative space-y-4">
                {item.points.map((point, idx) => (
                  <li
                    key={idx}
                    className="group/item flex items-start gap-3 transition"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-pink-500/10 text-pink-500 shadow-[0_0_0_rgba(236,72,153,0.0)] transition-all duration-300 group-hover/item:scale-110 group-hover/item:bg-pink-500 group-hover/item:text-white group-hover/item:shadow-[0_0_20px_rgba(236,72,153,0.45)]">
                      <CircleCheck size={16} />
                    </span>

                    <span className="text-sm leading-relaxed font-medium text-gray-900">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Hover outline */}
              <div className="pointer-events-none absolute inset-0 rounded-[0_18px_18px_0] ring-1 ring-transparent transition duration-500 group-hover:ring-pink-500/25" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
