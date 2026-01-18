"use client";

import Image from "next/image";
import {
  ShieldAlert,
  Network,
  Star,
  Ban,
} from "lucide-react";
import { platform } from "public";

export const CoreProtectionFeatures = () => {
  return (
    <section className="overflow-hidden bg-white px-4 py-16 sm:px-6 lg:px-16">

      <div className=" mx-auto grid max-w-7xl grid-cols-1 lg:gap-14 md:gap-10 md:grid-cols-2 items-center">

        {/* LEFT CONTENT */}
        
        <div className="relative">

          <div className="relative md:h-[400px] h-[300px] lg:h-[450px] mb-10 md:mb-0 overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src={platform.cmp}
              alt="Suspected Spam Call"
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Floating Spam Badge */}
          <div className="absolute left-1/2 top-6 -translate-x-1/2 rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-lg">
            Suspected Spam
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div>
          <h2 className="mb-10 text-2xl font-extrabold uppercase text-pink-500 md:text-3xl">
            Core Protection Features
          </h2>

          <div className="space-y-6">

            <FeatureRow
              icon={<ShieldAlert />}
              title="Intelligent Threat Detection"
              desc="Real-time analysis of caller patterns and behavioral anomalies."
            />

            <FeatureRow
              icon={<Network />}
              title="Carrier-Grade Prevention"
              desc="Network-level protection processing billions of monthly call attempts."
            />

            <FeatureRow
              icon={<Star />}
              title="Dynamic Reputation Scoring"
              desc="Continuously updated database of phone number reputations."
            />

            <FeatureRow
              icon={<Ban />}
              title="Real-Time Blacklist Management"
              desc="Automatic updates from global security and regulatory networks."
            />

          </div>
        </div>

      </div>
    </section>
  );
};

/* Feature Row */
const FeatureRow = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => {
  return (
    <div className="flex gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pink-500/10 text-pink-500">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-pink-600">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-black">
          {desc}
        </p>
      </div>
    </div>
  );
};  
