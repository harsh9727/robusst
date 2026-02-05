"use client";

import React from "react";
import { MoveRight } from "lucide-react";

const Partner: React.FC = () => {
  const scrollToForm = () => {
    const section = document.getElementById("partner-form");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-24">
      <div className="max-w-7xl mx-auto px-4">

        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Two Ways to Partner
          </h2>

          <div className="flex justify-center items-center gap-2 mt-6">
            <span className="h-3 w-24 rounded-full bg-gradient-to-r from-pink-500 to-rose-500"></span>
            <span className="h-3 w-10 rounded-full bg-gradient-to-r from-blue-500 to-sky-500"></span>
            <span className="h-3 w-3 rounded-full bg-emerald-400"></span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Technology Partner */}
          <div className="group relative bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">

            {/* Gradient Glow */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-pink-500/10 to-transparent pointer-events-none"></div>

            <h3 className="relative z-10 text-3xl font-bold mb-5 text-gray-900">
              Technology partners
            </h3>

            <p className="relative z-10 text-gray-600 text-lg leading-relaxed mb-10 max-w-md mx-auto">
              We work with established technology providers to ensure our
              solutions are secure, scalable, and future-ready.
            </p>

            <button
              onClick={scrollToForm}
              className="relative z-10 inline-flex items-center gap-3 rounded-full border border-pink-500 px-8 py-3 font-semibold text-pink-500 transition-all duration-300 hover:bg-pink-500 hover:text-white"
            >
              Join as tech partner
              <MoveRight />
            </button>
          </div>

          {/* Sales Partner */}
          <div className="group relative bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">

            {/* Gradient Glow */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none"></div>

            <h3 className="relative z-10 text-3xl font-bold mb-5 text-gray-900">
              Sales partners
            </h3>

            <p className="relative z-10 text-gray-600 text-lg leading-relaxed mb-10 max-w-md mx-auto">
              Sales partners help bring Exacaster solutions to new markets
              — with full support every step of the way.
            </p>

            <button
              onClick={scrollToForm}
              className="relative z-10 inline-flex items-center gap-3 rounded-full border border-blue-500 px-8 py-3 font-semibold text-blue-500 transition-all duration-300 hover:bg-blue-500 hover:text-white"
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
