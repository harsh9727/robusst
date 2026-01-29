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
    <section className=" py-28">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-pink-500">
            Business Outcomes
          </h2>
          <p className="mt-4 text-black text-lg">
            Measurable results that strengthen your security posture
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-14 items-start">

          {/* LEFT IMAGES */}
          <div className="lg:col-span-6 space-y-6">

            <div className="relative h-[600px] w-full overflow-hidden rounded-xl border border-gray-800">
              <Image
                src={platform.cmp}
                alt="Security Dashboard"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* RIGHT TIMELINE */}
          <div className="lg:col-span-6 relative">

            {/* Vertical Line */}
            <div className="absolute left-5 top-0 h-full w-[2px] bg-gradient-to-b from-pink-400 to-pink-500"></div>

            <div className="space-y-7">

              {outcomes.map((item, i) => (
                <div key={i} className="flex gap-5">

                  {/* Number Badge */}
                  <div className="relative z-10 flex h-11 min-w-11 items-center justify-center 
                    rounded-full bg-gradient-to-br from-pink-400 to-pink-500 
                    text-white font-bold text-sm">
                    0{i + 1}
                  </div>

                  {/* Content Card */}
                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 w-full">
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {item.title}
                    </h4>
                    <p className="text-gray-400 leading-relaxed">
                      {item.text}
                    </p>
                  </div>

                </div>
              ))}

            </div>
          </div>

        </div>

        {/* Bottom Highlight */}
        <div className="mt-20 flex items-start gap-3 rounded-2xl bg-gray-50 border border-gray-200 p-5">
          <ArrowRight className="text-pink-500 mt-1" size={28} />
          <p className="text-gray-700 text-lg leading-relaxed">
            <span className="font-bold text-gray-900 uppercase">
              Real Business Impact :
            </span> Reduced risk, faster response, and continuous protection for your organization.
          </p>
        </div>

      </div>
    </section>
  );
}
