"use client";

import React from "react";
import Image from "next/image";
import { platform } from "public";
import { CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import type { PlatformsSection } from "~/i18n/types/platforms";
import { motion } from "framer-motion";

export const Cdp: React.FC = () => {
  const t = useTranslations("platforms");
  const cdpSection = t.raw("cdp") as PlatformsSection["cdp"];
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
          className="mx-auto mb-15 w-full max-w-4xl text-center"
        >
          <h3 className="text-brand-one mb-5 text-2xl leading-tight font-extrabold sm:text-3xl md:text-4xl">
            {cdpSection.heading}
          </h3>

          <p className="text-md mx-auto max-w-2xl leading-relaxed text-gray-600">
            {cdpSection.subHeading}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <h4 className="mb-3 text-lg font-bold text-black">
              {commonSection.keyModules}:
            </h4>

            <ul className="mb-5 space-y-2 text-black">
              {cdpSection.keyModules.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center rounded-lg bg-blue-50 p-2"
                >
                  <CheckCircle className="text-brand-one mr-2 h-4 w-4" />
                  {item}
                </motion.li>
              ))}
            </ul>

            <h4 className="mb-3 text-lg font-bold text-black">
              {commonSection.clientBenefits}:
            </h4>

            <ul className="mt-4 space-y-2 text-black">
              {cdpSection.clientBenefits.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center rounded-lg bg-blue-50 p-2"
                >
                  <CheckCircle className="text-brand-one mr-2 h-4 w-4" />
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
            className="order-1 md:order-2"
          >
            <div className="shadow-brand-one h-[300px] w-full overflow-hidden rounded-xl duration-150 hover:shadow-[0px_0px_30px] sm:h-[400px] md:h-[500px]">
              <Image
                src={platform.cdp1}
                alt="Cdp"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
