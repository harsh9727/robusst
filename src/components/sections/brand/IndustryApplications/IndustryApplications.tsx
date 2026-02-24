"use client";

import {
  Home,
  Plane,
  Car,
  Cpu,
  HeartPulse,
  Landmark,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import Marquee from "react-fast-marquee";

export const IndustryApplications = () => {
  return (
    <section className="w-full overflow-hidden bg-white px-4 py-16 sm:px-6 lg:px-16">
      <div className="relative mx-auto max-w-7xl">
        <div className="lg:col-span-3">
          <h2 className="mb-4 text-3xl font-extrabold text-gray-900 uppercase">
            Industry Applications+
          </h2>

          <h4 className="text-xl font-semibold text-blue-500">Results:</h4>

          <p className="text-base leading-relaxed text-gray-700">
            Businesses typically see{" "}
            <span className="font-semibold text-gray-900">
              250–400% increase
            </span>{" "}
            in answer rates and{" "}
            <span className="font-semibold text-gray-900">60% reduction</span>{" "}
            in callback attempts.
          </p>
        </div>

        <Marquee className="mt-9">
          <IndustryCard
            icon={<Home />}
            title="Utilities & Home Services"
            desc="Food Delivery, Internet Services, Home & Repair, Construction"
            color="bg-yellow-500"
          />

          <IndustryCard
            icon={<Plane />}
            title="Travel & Entertainment"
            desc="Airlines, Hotels, Travel Agencies, Gaming"
            color="bg-purple-500"
          />

          <IndustryCard
            icon={<Car />}
            title="Automotive"
            desc="Dealerships, Service Centers, Financing"
            color="bg-emerald-500"
          />

          <IndustryCard
            icon={<Cpu />}
            title="Technology"
            desc="Software, Electronics, IT Services"
            color="bg-orange-500"
          />

          <IndustryCard
            icon={<HeartPulse />}
            title="Healthcare"
            desc="Hospitals, Clinics, Pharmacies"
            color="bg-sky-500"
          />

          <IndustryCard
            icon={<Landmark />}
            title="Financial Services"
            desc="Banks, Credit Unions, Insurance"
            color="bg-indigo-500"
          />

          <IndustryCard
            icon={<ShieldCheck />}
            title="Insurance"
            desc="Life, Health, Auto & Property"
            color="bg-red-500"
          />

          <IndustryCard
            icon={<ShoppingBag />}
            title="Retail"
            desc="E-commerce, Apparel, FMCG"
            color="bg-teal-500"
          />
        </Marquee>
      </div>
    </section>
  );
};

/* Industry Card */
const IndustryCard = ({
  icon,
  title,
  desc,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  color: string;
}) => {
  return (
    <div className="group mx-5 rounded-2xl border border-gray-200 bg-white p-5 transition hover:shadow-lg">
      <div
        className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-white ${color}`}
      >
        {icon}
      </div>

      <h3 className="mb-2 text-sm font-semibold text-black">{title}</h3>

      <p className="text-sm leading-relaxed text-gray-600">{desc}</p>
    </div>
  );
};
