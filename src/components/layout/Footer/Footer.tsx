"use client";

import React from "react";
import Link from "next/link";

// data
import { Button } from "~/components/ui/button";

// icons
import { FaFacebook as Facebook } from "react-icons/fa";
import { BsTwitterX as Twitter } from "react-icons/bs";
import { FaInstagram as Instagram } from "react-icons/fa";
import { FaLinkedinIn as Linkedin } from "react-icons/fa";
import { IoLogoYoutube as Youtube } from "react-icons/io";
import type { FooterSection } from "~/i18n/types/footer";
import { useTranslations } from "next-intl";

export const Footer: React.FC = () => {
  const t = useTranslations();
  const footerSection = t.raw("footer") as FooterSection;

  return (
    <footer className="bg-primary relative flex flex-col items-center justify-center overflow-hidden">
      <div className="mt-12 flex flex-col items-center justify-center gap-2 px-6 sm:mt-32 sm:gap-3 sm:px-12 lg:mt-50 lg:gap-1 lg:px-25">
        <p className="text-primary-foreground text-center text-2xl leading-tight font-medium sm:text-4xl lg:text-6xl">
          {footerSection.cta.heading}
        </p>

        <p className="text-muted-foreground max-w-3xl text-center text-sm sm:text-lg lg:text-xl">
          {footerSection.cta.subheading}
        </p>
      </div>

      <div className="mt-12 flex w-full flex-col justify-between gap-10 px-6 sm:mt-20 sm:px-12 lg:mt-30 lg:flex-row lg:gap-0 lg:px-25">
        <div className="flex flex-col gap-2 lg:text-left">
          <div>
            <p className="text-primary-foreground text-xl font-medium sm:text-2xl">
              {footerSection.branding.companyName}
            </p>
            <p className="text-muted-foreground">
              {footerSection.branding.tagline}
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="bg-primary border-border/30 hover:bg-primary rounded-full border"
            >
              <Facebook className="text-primary-foreground h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="bg-primary border-border/30 hover:bg-primary rounded-full border"
            >
              <Twitter className="text-primary-foreground h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="bg-primary border-border/30 hover:bg-primary rounded-full border"
            >
              <Linkedin className="text-primary-foreground h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="bg-primary border-border/30 hover:bg-primary rounded-full border"
            >
              <Instagram className="text-primary-foreground h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="bg-primary border-border/30 hover:bg-primary rounded-full border"
            >
              <Youtube className="text-primary-foreground h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-20 lg:gap-x-10">
          {footerSection.linkCategories.map((data, index) => (
            <div key={index}>
              <p className="text-primary-foreground mb-3 text-base font-medium sm:text-lg">
                {data.category}
              </p>

              <section className="flex flex-col gap-2">
                {data.links.map((link, linkIndex) => (
                  <div key={linkIndex}>
                    <Link
                      href={link.href}
                      className="group flex w-fit items-center gap-2 text-sm"
                    >
                      <span className="text-muted-foreground relative">
                        {link.label}
                        <div className="bg-muted-foreground absolute bottom-0 h-px w-0 duration-150 group-hover:w-full" />
                      </span>
                    </Link>
                  </div>
                ))}
              </section>
            </div>
          ))}
        </div>
      </div>

      <p className="text-primary-foreground/10 mt-12 text-center text-[80px] leading-none font-semibold select-none sm:mt-16 sm:text-[200px] lg:mt-20 lg:text-[300px] xl:text-[400px]">
        ROBUSST
      </p>
    </footer>
  );
};
