"use client";

import Image from "next/image";
import { Radar, Database, ShieldCheck, ArrowRight } from "lucide-react";
import { platform } from "public";

export default function ThreatIntelligence() {
  return (
    <section className="relative bg-white py-32 overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-6">

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-12 gap-14 items-center">

          {/* LEFT IMAGE */}

          <div className="lg:col-span-6">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full
              text-pink-50 border border-pink-500 text-pink-500 text-sm font-semibold mb-5"
            >
          <Radar size={16} />
              Threat Intelligence
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5">
           Real-Time Threat Intelligence
            </h2>

            {/* Subtitle */}
            <p className="mt-5 text-lg text-pink-500 font-medium mb-10">
          Real-time adversary insights, dark-web monitoring and threat feeds
              powering SIEM / XDR / SOAR
            </p>

            {/* Feature Cards */}
            {[
              {
                icon: Database,
                title: "Comprehensive Threat Collection",
                text: "Collects threat data across surface, deep and dark web and feeds detection and response tools.",
              },
              {
                icon: ShieldCheck,
                title: "Faster & Smarter Response",
                text: "Provides context so alerts are meaningful, response is faster and smarter.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group flex gap-5 items-start p-6 rounded-2xl
                bg-white border border-gray-200
                transition-all duration-300
                hover:border-pink-500 hover:shadow-lg mb-5"
              >
                {/* Icon */}
                <div
                  className="flex h-12 min-w-12 items-center justify-center rounded-xl
                  bg-gradient-to-br from-pink-400 to-pink-500
                  text-white transition-transform duration-300
                  group-hover:scale-110"
                >
                  <item.icon size={20} />
                </div>

                {/* Text */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 group-hover:text-pink-500 transition-colors">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-gray-600 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}

          </div>
          {/* RIGHT CONTENT */}
          <div className="lg:col-span-6">
            <div
              className="relative h-[600px] w-full overflow-hidden rounded-3xl
              border border-gray-200 shadow-xl
              transition-transform duration-500 hover:-translate-y-2"
            >
              <Image
                src={platform.cmp}
                alt="MDM Mobile Device Management"
                className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* WHY IT MATTERS */}
        <div className="mt-20 flex items-start gap-3 rounded-2xl bg-gray-50 border border-gray-200 p-5">
          <ArrowRight className="text-pink-500 mt-1" size={28} />
          <p className="text-gray-700 text-lg leading-relaxed">
            <span className="font-bold text-gray-900 uppercase">
              Why it matters :
            </span>{" "}
          Knowing what threats are already targeting your organization or
            industry gives you the proactive edge.
          </p>
        </div>

      </div>
    </section>
  );
}
