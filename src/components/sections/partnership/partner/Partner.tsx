"use client";

import React from "react";
import { MoveRight } from "lucide-react";

const Partner: React.FC = () => {
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
            Two Ways to Partner
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Technology Partner */}
          <div className="group relative rounded-3xl border flex flex-col justify-between items-center border-gray-100 bg-white p-12 text-center shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
            {/* Gradient Glow */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 transition duration-500 group-hover:opacity-100"></div>

            <section>
              <h3 className="relative z-10 mb-5 text-3xl font-bold text-gray-900">
                Technology partners
              </h3>

              <p className="relative z-10 mx-auto mb-10 max-w-md text-lg leading-relaxed text-gray-600">
                We work with established technology providers to ensure our
                solutions are secure, scalable, and future-ready.
              </p>
            </section>
            <button
              onClick={scrollToForm}
              className="relative z-10 inline-flex items-center w-fit gap-3 rounded-full border border-pink-500 px-8 py-3 font-semibold text-pink-500 transition-all duration-300 hover:bg-pink-500 hover:text-white"
            >
              Join as tech partner
              <MoveRight />
            </button>
          </div>

          {/* Sales Partner */}
          <div className="group relative rounded-3xl flex flex-col justify-between items-center border border-gray-100 bg-white p-12 text-center shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
            {/* Gradient Glow */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 transition duration-500 group-hover:opacity-100"></div>

            <section>
              <h3 className="relative z-10 mb-5 text-3xl font-bold text-gray-900">
                Sales partners
              </h3>
  
              <p className="relative z-10 mx-auto mb-10 max-w-md text-lg leading-relaxed text-gray-600">
                Sales partners help bring Robusst solutions to new markets — with
                full support every step of the way.
              </p>
           </section>

            <button
              onClick={scrollToForm}
              className="relative z-10 inline-flex items-center w-fit gap-3 rounded-full border border-blue-500 px-8 py-3 font-semibold text-blue-500 transition-all duration-300 hover:bg-blue-500 hover:text-white"
            >
              Join as sales partner
              <MoveRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partner;
