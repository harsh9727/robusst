"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { platform } from "public";
import { useTranslations } from "next-intl";
import type { PlatformsSection } from "~/i18n/types/platforms";
import { motion } from "framer-motion";

export const Noc: React.FC = () => {
  const t = useTranslations("platforms");
  const nocSection = t.raw("noc") as PlatformsSection["noc"];
  const commonSection = t.raw("common") as PlatformsSection["common"];

  return (
    <section className="bg-primary-foreground px-6 py-15 sm:px-12 md:py-20 xl:px-25">
      <div className="mx-auto w-full max-w-7xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mx-auto max-w-4xl w-full mb-15"
        >
          <h3 className="mb-5 text-2xl leading-tight font-extrabold text-brand-one sm:text-3xl md:text-4xl">
            {nocSection.heading}
          </h3>

          <p className="text-md max-w-2xl mx-auto leading-relaxed text-gray-600">
            {nocSection.subHeading}
          </p>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 items-center">

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:order-1 order-2"
          >
            <h4 className="mb-3 text-lg font-bold text-black">
              {commonSection.keyModules}:
            </h4>

            <ul className="mb-5 space-y-2 text-black">
              {nocSection.keyModules.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center p-2 bg-blue-50 rounded-lg"
                >
                  <CheckCircle className="mr-2 h-4 w-4 text-brand-one" />
                  {item}
                </motion.li>
              ))}
            </ul>

            <h4 className="mb-3 text-lg font-bold text-black">
              {commonSection.clientBenefits}:
            </h4>

            <ul className="mt-4 space-y-2 text-black">
              {nocSection.clientBenefits.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center p-2 bg-blue-50 rounded-lg"
                >
                  <CheckCircle className="mr-2 h-4 w-4 text-brand-one" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:order-2 order-1"
          >
            <div className="shadow-brand-one h-[300px] sm:h-[400px] md:h-[500px] rounded-xl overflow-hidden w-full duration-150 hover:shadow-[0px_0px_30px]">
              <Image
                src={platform.noc}
                alt="Noc"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};