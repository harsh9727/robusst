"use client";

import React from "react";
import { MoveRight } from "lucide-react";
import type { PartnershipPageQueryResult } from "~/sanity/types";

type PartnerData = NonNullable<
  NonNullable<PartnershipPageQueryResult>["partner"]
>;

interface PartnerProps {
  data: PartnerData;
}

const Partner: React.FC<PartnerProps> = ({ data }) => {
  if (!data.heading || !data.cards?.length) return null;

  const scrollToForm = () => {
    const section = document.getElementById("partner-form");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="partner"
      className="bg-gradient-to-b from-gray-50 to-white py-24"
    >
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Heading */}
        <div className="mb-16 text-center">
          <h2 className="text-brand-one text-4xl font-extrabold md:text-5xl">
            {data.heading}
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Technology Partner */}
          <div className="group relative flex flex-col items-center justify-between rounded-3xl border border-gray-100 bg-white p-12 text-center shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
            {/* Gradient Glow */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 transition duration-500 group-hover:opacity-100"></div>

            <section>
              <h3 className="relative z-10 mb-5 text-3xl font-bold text-gray-900">
                {data.cards[0]?.title}
              </h3>

              <p className="relative z-10 mx-auto mb-10 max-w-md text-lg leading-relaxed text-gray-600">
                {data.cards[0]?.description}
              </p>
            </section>
            <button
              onClick={scrollToForm}
              className="relative z-10 inline-flex w-fit items-center gap-3 rounded-full border border-pink-500 px-8 py-3 font-semibold text-pink-500 transition-all duration-300 hover:bg-pink-500 hover:text-white"
            >
              {data.cards[0]?.buttonText}
              <MoveRight />
            </button>
          </div>

          {/* Sales Partner */}
          <div className="group relative flex flex-col items-center justify-between rounded-3xl border border-gray-100 bg-white p-12 text-center shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
            {/* Gradient Glow */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 transition duration-500 group-hover:opacity-100"></div>

            <section>
              <h3 className="relative z-10 mb-5 text-3xl font-bold text-gray-900">
                {data.cards[1]?.title}
              </h3>

              <p className="relative z-10 mx-auto mb-10 max-w-md text-lg leading-relaxed text-gray-600">
                {data.cards[1]?.description}
              </p>
            </section>

            <button
              onClick={scrollToForm}
              className="relative z-10 inline-flex w-fit items-center gap-3 rounded-full border border-blue-500 px-8 py-3 font-semibold text-blue-500 transition-all duration-300 hover:bg-blue-500 hover:text-white"
            >
              {data.cards[1]?.buttonText}
              <MoveRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partner;
