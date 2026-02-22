"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Card, CardContent } from "~/components/ui/card";

interface Outcome {
  value: number;
  suffix?: string;
  label: string;
  gradient: string;
}

const outcomes: Outcome[] = [
  {
    value: 40,
    suffix: "%",
    label: "OPEX Reduction",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    value: 70,
    suffix: "%",
    label: "Productivity Increase",
    gradient: "from-blue-400 to-cyan-400",
  },
  {
    value: 3,
    suffix: "x",
    label: "Engineer Productivity",
    gradient: "from-fuchsia-500 to-pink-500",
  },
  {
    value: 85,
    suffix: "%",
    label: "Faster MTTR",
    gradient: "from-pink-500 to-purple-500",
  },
  {
    value: 50,
    suffix: "%",
    label: "Operational Efficiency",
    gradient: "from-indigo-400 to-blue-500",
  },
  {
    value: 18,
    suffix: " Mo",
    label: "Average ROI",
    gradient: "from-rose-500 to-orange-400",
  },
];

export default function BusinessOutcomesSection() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-28 bg-[#050816] overflow-hidden">
      
      {/* Background Glow (lighter for mobile performance) */}
      <div className="hidden sm:block absolute -top-40 -left-40 w-[400px] lg:w-[500px] h-[400px] lg:h-[500px] bg-pink-600/20 blur-[120px] rounded-full" />
      <div className="hidden sm:block absolute bottom-0 right-0 w-[400px] lg:w-[500px] h-[400px] lg:h-[500px] bg-blue-600/20 blur-[120px] rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
            <span className="bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent">
              Measurable Business Outcomes
            </span>
          </h2>

          <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-gray-400 px-2">
            Delivering quantifiable results that drive operational excellence,
            engineering efficiency, and sustainable growth.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {outcomes.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group relative h-full bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl transition-all duration-500 hover:scale-[1.03] hover:border-transparent">
                
                {/* Hover Gradient Glow */}
                <div
                  className={`absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-20 blur-xl transition duration-500`}
                />

                <CardContent className="relative p-6 sm:p-8 lg:p-10 text-center flex flex-col justify-center h-full">
                  
                  {/* Animated Number */}
                  <h3
                    className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}
                  >
                    <CountUp
                      end={item.value}
                      duration={2}
                      enableScrollSpy
                      scrollSpyOnce
                    />
                    {item.suffix}
                  </h3>

                  {/* Label */}
                  <p className="text-sm sm:text-base lg:text-lg text-gray-300 font-medium tracking-wide">
                    {item.label}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}