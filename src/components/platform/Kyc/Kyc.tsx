import React from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { platform } from "public";

const keyModules = [
  "OCR & AI-based Document Verification",
  "eSignature & Consent Management",
  "Face & ID Matching (via 3rd party APIs)",
  "Onboarding Workflow Automation",
  "Integration with Core CRM / Billing"
];

const clientBenefits = [
  "Faster activations",
  "Reduced fraud",
  "Enhanced customer experience",
];

const Kyc: React.FC = () => {
  return (
    <section className="bg-primary px-6 py-20 sm:px-12 xl:px-25 relative overflow-hidden">
      <div className="bg-brand-two absolute -top-60 -right-20 h-40 w-100 rotate-6 blur-[200px] sm:h-50 sm:w-180" />
      <div className="bg-brand-two absolute -bottom-30 left-1/2 size-40 -translate-x-1/2 rounded-full blur-[140px] sm:size-50" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-2">
        {/* Image */}
        <div className="w-full h-full bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl flex items-center justify-center overflow-hidden">
          <Image src={platform.kyc} alt="Kyc" className="w-full h-full object-cover" />
        </div>
        {/* Content */}
        <div>
          <h3 className="mb-5 text-4xl font-bold leading-tight text-white">
            Digital Onboarding & eKYC Platform
          </h3>

          <p className="mb-5 w-[90%] text-md leading-relaxed text-gray-300">
            Onboarding new subscribers, agents, or
            enterprise customers securely and quickly
            remains a bottleneck for Telcos.
          </p>

          <h4 className="mb-3 text-lg font-bold text-pink-600">
            Key Modules :
          </h4>

          <ul className="mb-5 space-y-1 text-white">
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

          <ul className="mt-4 space-y-1 text-white">
            {clientBenefits.map((item, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-pink-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Kyc;
