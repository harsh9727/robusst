import React from "react";
import Image from "next/image";
import { platform } from "public";
import { CheckCircle } from "lucide-react";

const keyModules = [
  "Unified Customer 360° View",
  "Segmentation Engine (behavioral + demographic)",
  "Campaign Management & Personalization",
  "Churn Prediction & Offer Optimization",
  "Integration APIs with CRM, Billing, and DWH",
];

const clientBenefits = [
  "Increased ARPU & reduced churn",
  "Faster time-to-market for offers",
  "Data-driven marketing efficiency",
];

export const Cdp: React.FC = () => {
  return (
    <section className="px-6 py-20 sm:px-12 xl:px-25">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div>
          <h3 className="mb-5 text-4xl leading-tight font-bold text-black">
            AI-Powered Customer Value Management (CVM) & Customer Data Platform
            (CDP)
          </h3>

          <p className="text-md mb-5 w-[90%] leading-relaxed text-gray-600">
            Telcos have fragmented customer data across billing, CRM, usage, and
            network systems — making personalized engagement nearly impossible.
          </p>

          <h4 className="mb-3 text-lg font-bold text-pink-600">
            Key Modules :
          </h4>

          <ul className="mb-5 space-y-1 text-black">
            {keyModules.map((item, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-pink-600" />
                {item}
              </li>
            ))}
          </ul>

          <h4 className="mb-3 text-lg font-bold text-pink-600">
            Client Benefits :
          </h4>

          <ul className="mt-4 space-y-1 text-black">
            {clientBenefits.map((item, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-pink-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Image */}
        <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-pink-50 to-purple-50">
          <Image
            src={platform.cdp1}
            alt="Cdp"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};
