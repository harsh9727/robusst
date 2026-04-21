"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CheckCircle, ChevronDown } from "lucide-react";
import { platform } from "public";
import type { Platforms_JsonType } from "~/types/api/platforms_json.types";
import { motion, AnimatePresence } from "framer-motion";

interface CpmProps {
  data?: Platforms_JsonType["platforms"];
}

export const Cpm: React.FC<CpmProps> = ({ data }) => {
  const cpmSection = data?.cpm;
  const commonSection = data?.common;
  const [open, setOpen] = useState<null | string>(null);

  if (!cpmSection || !commonSection) return null;

  return (
    <>
      {/* Top Wave */}
      <div className="w-full overflow-hidden bg-white sm:-mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 150">
          <path
            d="M0,80 C300,50 400,50 600,80 C800,110 900,110 1200,80 L1200,200 L0,200 Z"
            fill="#000000"
          />
        </svg>
      </div>

      <section className="bg-primary relative overflow-hidden px-6 py-15 sm:px-12 md:py-20 xl:px-25">
        <div className="mx-auto w-full max-w-7xl">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto mb-10 w-full max-w-4xl text-center"
          >
            <h3 className="mb-5 text-2xl leading-tight font-extrabold text-white sm:text-3xl md:text-4xl">
              {cpmSection.heading}
            </h3>
            <p className="text-md mx-auto max-w-2xl leading-relaxed text-gray-300">
              {cpmSection.subHeading}
            </p>
          </motion.div>

          {/* Image + Overlay */}
          <div className="relative h-[350px] w-full overflow-hidden rounded-xl md:h-[400px] lg:h-[600px]">
            {/* Image Animation */}
            <motion.div
              initial={{ scale: 1.1, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="h-full w-full"
            >
              <Image
                src={platform.cmp}
                alt="Cpm"
                className="h-full w-full object-cover"
              />
            </motion.div>

            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="absolute right-4 bottom-4 left-4 rounded-xl bg-white p-4 shadow-lg sm:right-6 sm:bottom-6 sm:left-6 md:right-auto md:bottom-[50px] md:left-[50px] md:w-[70%] md:p-6 lg:bottom-[70px] lg:left-[70px] lg:w-[60%]"
            >
              {/* Accordion 1 */}
              <div className="mb-3 border-b border-gray-200 pb-3">
                <button
                  onClick={() => setOpen(open === "modules" ? null : "modules")}
                  className="text-brand-one flex w-full items-center justify-between font-bold"
                >
                  {commonSection.keyModules}
                  <motion.div
                    animate={{ rotate: open === "modules" ? 180 : 0 }}
                  >
                    <ChevronDown />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {open === "modules" && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-2 space-y-2 overflow-hidden text-sm"
                    >
                      {cpmSection.keyModules.map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center text-black"
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          {item}
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              {/* Accordion 2 */}
              <div>
                <button
                  onClick={() =>
                    setOpen(open === "benefits" ? null : "benefits")
                  }
                  className="text-brand-one flex w-full items-center justify-between font-bold"
                >
                  {commonSection.clientBenefits}
                  <motion.div
                    animate={{ rotate: open === "benefits" ? 180 : 0 }}
                  >
                    <ChevronDown />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {open === "benefits" && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-2 space-y-2 overflow-hidden text-sm"
                    >
                      {cpmSection.clientBenefits.map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center text-black"
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          {item}
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom Wave */}
      <div className="w-full overflow-hidden bg-white sm:-mt-5">
        <svg viewBox="0 0 1200 150">
          <path
            d="M0,120 C300,150 400,150 600,120 C800,90 900,90 1200,120 L1200,0 L0,0 Z"
            fill="#000000"
          />
        </svg>
      </div>
    </>
  );
};
