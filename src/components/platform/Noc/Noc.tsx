import React from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { platform } from "public";

const keyModules = [
  "Network Health Monitoring",
  "AI/ML-based Fault Prediction",
  "Automated Ticketing & Escalations",
  "Visualization Dashboards",
  "Integration with OSS/BSS",
];

const clientBenefits = [
  "Reduced downtime & OPEX",
  "Improved service reliability",
  "Faster issue resolution",
];

const Noc: React.FC = () => {
  return (
    <section className="px-6 py-20 sm:px-12 xl:px-25">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-2">

        {/* Content */}
        <div>
          <h3 className="mb-5 text-4xl font-bold leading-tight text-black">
            AI-Enabled Intelligent NOC (Network Operations Center)
          </h3>

          <p className="mb-5 w-[90%] text-md leading-relaxed text-gray-600">
            Telcos struggle with network fault detection, root cause analysis,
            and performance prediction using traditional NOC setups.
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
        <div className="w-full h-full bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl flex items-center justify-center overflow-hidden">
          <Image src={platform.noc} alt="Noc" className="w-full h-full object-cover" />
        </div>

      </div>
    </section>
  );
};

export default Noc;
