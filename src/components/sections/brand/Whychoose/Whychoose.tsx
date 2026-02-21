"use client";

import {
  ShieldCheck,
  Plug,
  Globe2,
  MapPinned,
  type LucideIcon,
} from "lucide-react";

type WhyChooseItem = {
  title: string;
  description: React.ReactNode;
  Icon: LucideIcon;
};

const whyChooseData: WhyChooseItem[] = [
  {
    title: "Regional Compliance Leadership",
    description: (
      <>
        Enterprise infrastructure with{" "}
        <span className="text-lg font-semibold text-gray-900">
          99.9% uptime
        </span>{" "}
        guarantee, processing millions of calls daily across diverse network
        conditions.
      </>
    ),
    Icon: ShieldCheck,
  },
  {
    title: "Seamless Integration",
    description: (
      <>
        Deploy in days with{" "}
        <span className="text-lg font-semibold text-gray-900">
          RESTful APIs
        </span>{" "}
        and comprehensive SDKs that integrate effortlessly with existing CRM and
        call center platforms.
      </>
    ),
    Icon: Plug,
  },
  {
    title: "Regional Compliance Leadership",
    description: (
      <>
        Full compliance with international telecom standards and{" "}
        <span className="text-lg font-semibold text-gray-900">
          STIR/SHAKEN protocols
        </span>{" "}
        backed by advanced security and governance controls.
      </>
    ),
    Icon: Globe2,
  },
  {
    title: "Local Expertise",
    description: (
      <>
        Deep market understanding with regional support teams providing seamless
        implementation, optimization, and ongoing performance tuning.
      </>
    ),
    Icon: MapPinned,
  },
];

function WhyChooseCard({ title, description, Icon }: WhyChooseItem) {
  return (
    <div className="group border-brand-one relative rounded-3xl border bg-white/70 p-8 shadow-md backdrop-blur-xl transition hover:shadow-2xl">
      <p className="bg-brand-one w-fit rounded-sm p-4">
        <Icon size={30} className="text-white" />
      </p>

      <p className="mt-3 text-2xl font-semibold">{title}</p>

      <p className="leading-tight text-gray-700">{description}</p>
    </div>
  );
}

export const Whychoose = () => {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-20 sm:px-8">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-pink-400/20 blur-[120px]" />
        <div className="absolute right-10 bottom-10 h-72 w-72 rounded-full bg-purple-400/20 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <h2 className="text-brand-one mb-10 text-center text-3xl font-extrabold sm:text-4xl md:mb-16">
          Why Choose Our Solution?
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {whyChooseData.map((item, index) => (
            <WhyChooseCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};
