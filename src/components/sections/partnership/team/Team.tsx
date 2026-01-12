"use client";

import { Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import { platform } from "public";
import React from "react";
import { useTranslations } from "next-intl";
import type { PartnershipSection } from "~/i18n/types/partnership";

export const Team: React.FC = () => {
  const t = useTranslations("partnership");
  const teamSection = t.raw("team") as PartnershipSection["team"];

  return (
    <section className="bg-primary-foreground overflow-hidden px-6 py-16 sm:px-12 lg:px-15">
      <h2 className="pb-15 text-center text-4xl font-bold text-pink-500">
        {teamSection.heading}
      </h2>
      <div className="grid grid-cols-1 gap-x-7 gap-y-20 sm:grid-cols-2 md:gap-y-24 lg:grid-cols-4 lg:gap-7">
        {teamSection.members.map((member, index) => (
          <div
            key={index}
            className="group relative flex h-72 flex-col items-center rounded-3xl bg-linear-to-r from-indigo-950 to-slate-300 pt-16 md:h-64 lg:h-72"
          >
            {/* Image */}
            <div className="absolute top-6 z-10 transition-all duration-500 group-hover:-top-13">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-sky-100 shadow-lg">
                <Image
                  src={platform.cdp1}
                  alt={member.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Text */}
            <div className="mt-20 text-center transition-all duration-500 group-hover:-translate-y-5 md:group-hover:-translate-y-6.25 lg:group-hover:-translate-y-5">
              <h5 className="text-xl font-semibold text-white">
                {member.name}
              </h5>
              <p className="mt-1 text-sm text-white/80">{member.role}</p>
            </div>

            {/* Social Icons */}
            <div className="absolute bottom-6 flex translate-y-6 gap-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <a className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow transition hover:scale-110">
                <Instagram />
              </a>
              <a className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow transition hover:scale-110">
                <Twitter />
              </a>
              <a className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow transition hover:scale-110">
                <Linkedin />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
