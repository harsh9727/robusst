"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { platform } from "public";

export default function BusinessOutcomes() {
  const outcomes = [
    {
      title: "Reduce Endpoint Attacks",
      text: "Reduce successful endpoint attacks and malware post-infection rates.",
    },
    {
      title: "Faster Threat Containment",
      text: "Decrease detection to containment time (MTTR) via automation and correlation.",
    },
    {
      title: "Maintain Compliance",
      text: "Maintain compliance and reduce audit risk with unified dashboards and continuous monitoring.",
    },
    {
      title: "Secure Multi-Cloud",
      text: "Secure your multi-cloud environment and modern workplace with one integrated stack.",
    },
  ];

  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-extrabold text-pink-500 md:text-5xl">
            Business Outcomes
          </h2>
          <p className="mt-4 text-lg text-black">
            Measurable results that strengthen your security posture
          </p>
        </div>

        <div className="grid items-start gap-14 lg:grid-cols-12">
          {/* LEFT IMAGES */}
          <div className="space-y-6 lg:col-span-6">
            <div className="relative h-[600px] w-full overflow-hidden rounded-xl border border-gray-800">
              <Image
                src={platform.cmp}
                alt="Security Dashboard"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* RIGHT TIMELINE */}
          <div className="relative lg:col-span-6">
            {/* Vertical Line */}
            <div className="absolute top-0 left-5 h-full w-[2px] bg-gradient-to-b from-pink-400 to-pink-500"></div>

            <div className="space-y-7">
              {outcomes.map((item, i) => (
                <div key={i} className="flex gap-5">
                  {/* Number Badge */}
                  <div className="relative z-10 flex h-11 min-w-11 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-pink-500 text-sm font-bold text-white">
                    0{i + 1}
                  </div>

                  {/* Content Card */}
                  <div className="w-full rounded-xl border border-gray-800 bg-gray-900 p-5">
                    <h4 className="mb-2 text-lg font-semibold text-white">
                      {item.title}
                    </h4>
                    <p className="leading-relaxed text-gray-400">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Highlight */}
        <div className="mt-20 flex items-start gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-5">
          <ArrowRight className="mt-1 text-pink-500" size={28} />
          <p className="text-lg leading-relaxed text-gray-700">
            <span className="font-bold text-gray-900 uppercase">
              Real Business Impact :
            </span>{" "}
            Reduced risk, faster response, and continuous protection for your
            organization.
          </p>
        </div>
      </div>
    </section>
  );
}
