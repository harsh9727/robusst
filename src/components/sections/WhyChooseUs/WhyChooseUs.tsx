import React from "react";

export const WhyChooseUs: React.FC = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 px-50 py-25">
      <section className="flex flex-col justify-center gap-1 text-center">
        <p className="text-4xl font-medium">Why Telecom Leaders Choose Us</p>
      </section>

      <section className="flex w-full justify-between gap-20 px-50">
        <div className="bg-primary/20 h-80 w-full rounded-xl" />
        <div className="flex w-full flex-col gap-5 py-2">
          <ul className="list-disc space-y-3 pl-6">
            <li>
              Built by industry experts who understand real{" "}
              <strong>Telco</strong> challenges
            </li>
            <li>
              Agile, flexible, and innovative — always adapting to customer
              needs
            </li>
            <li>
              Every product is customized to your business and technology stack
            </li>
            <li>From design to deployment, we take complete ownership</li>
            <li>
              Our solutions are future-ready, scalable, and secure — built for
              tomorrow’s networks
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};
