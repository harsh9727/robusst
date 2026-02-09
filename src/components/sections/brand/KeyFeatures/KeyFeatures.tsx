"use client";

import Image from "next/image";
import {
  BadgeCheck,
  MessageSquareText,
  ShieldCheck,
  Network,
} from "lucide-react";
import { platform } from "public";

/* Icon mapper */
const featureIcons: Record<string, React.ReactNode> = {
  "Verified Business Identity": (
    <BadgeCheck className="h-7 w-7 text-emerald-400" />
  ),
  "Dynamic Call Messaging": (
    <MessageSquareText className="h-7 w-7 text-emerald-400" />
  ),
  "Real-Time Authentication": (
    <ShieldCheck className="h-7 w-7 text-emerald-400" />
  ),
  "Multi-Network Coverage": (
    <Network className="h-7 w-7 text-emerald-400" />
  ),
};

export const KeyFeatures = () => {
  return (
    <section className="relative w-full bg-white px-4 py-14 sm:px-6 lg:px-16">

      {/* Heading */}
      <h2 className="mb-12 text-center text-3xl font-extrabold uppercase tracking-wide text-pink-500">
        Key Features & Benefits
      </h2>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-12 items-center">

        {/* LEFT FEATURES */}
        <div className="flex flex-col gap-6 lg:col-span-3">
          <FeatureCard
            title="Verified Business Identity"
            desc="Authenticated company information with logo display increases answer rates by up to 300%"
          />
          <FeatureCard
            title="Dynamic Call Messaging"
            desc='Customize call purpose displays like "Security Alert" or "Delivery Update"'
          />
        </div>

        {/* CENTER IMAGE */}
        <div className="relative h-[300px] sm:h-[400px] lg:min-h-[450px] overflow-hidden rounded-2xl shadow-xl lg:col-span-6">
          <Image
            src={platform.cmp}
            alt="Business Calling"
            className="object-cover h-full w-full"
          />
        </div>

        {/* RIGHT FEATURES */}
        <div className="flex flex-col gap-6 lg:col-span-3">
          <FeatureCard
            title="Real-Time Authentication"
            desc="STIR/SHAKEN compliance prevents spoofing and confirms legitimate communications"
          />
          <FeatureCard
            title="Multi-Network Coverage"
            desc="Consistent display across all major regional carriers"
          />
        </div>

      </div>
    </section>
  );
};

/* Feature Card */
const FeatureCard = ({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) => {
  return (
    <div className="flex h-auto lg:min-h-[200px] flex-col rounded-2xl border border-white/10 bg-black px-6 lg:px-4 py-7 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-emerald-400">
          {title}
        </h3>
        {featureIcons[title]}
      </div>

      <p className="text-sm leading-relaxed text-white/80">
        {desc}
      </p>
    </div>
  );
};
