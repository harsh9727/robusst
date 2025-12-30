"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";

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

// Extend Window interface for LinkedIn
declare global {
  interface Window {
    IN?: {
      parse?: () => void;
    };
  }
}

export const Footer: React.FC = () => {
  const t = useTranslations();
  const footerSection = t.raw("footer") as FooterSection;
  const [linkedInLoaded, setLinkedInLoaded] = useState(false);

  const LINKEDIN_COMPANY_ID = "106542023";

  useEffect(() => {
    if (linkedInLoaded && window.IN?.parse) {
      window.IN.parse();
    }
  }, [linkedInLoaded]);

  return (
    <footer className="bg-primary relative flex flex-col items-center justify-center overflow-hidden">
      {/* LinkedIn Script */}
      <Script
        id="linkedin-script"
        src="https://platform.linkedin.com/in.js"
        strategy="lazyOnload"
        onLoad={() => setLinkedInLoaded(true)}
      >
        {`lang: en_US`}
      </Script>

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

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="bg-primary-foreground border-border/30 hover:bg-primary-foreground rounded-full border"
            >
              <Facebook className="h-5 w-5 text-[#1877F2]" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="bg-primary-foreground border-border/30 hover:bg-primary-foreground rounded-full border"
            >
              <Twitter className="text-primary h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="bg-primary-foreground border-border/30 hover:bg-primary-foreground rounded-full border"
            >
              <Linkedin className="h-5 w-5 text-[#0072B1]" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="bg-primary-foreground border-border/30 hover:bg-primary-foreground rounded-full border"
            >
              <Instagram className="h-5 w-5 text-[#C13584]" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="bg-primary-foreground border-border/30 hover:bg-primary-foreground rounded-full border"
            >
              <Youtube className="h-5 w-5 text-[#FD1D1D]" />
            </Button>

            {/* LinkedIn Follow Button */}
            <div className="linkedin-follow-button">
              <script
                type="IN/FollowCompany"
                data-id={LINKEDIN_COMPANY_ID}
                data-counter=""
                suppressHydrationWarning
              />
            </div>
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

      <p
        className="text-primary-foreground/10 mt-12 text-center leading-none font-semibold select-none sm:mt-16 lg:mt-20"
        style={{ fontSize: "clamp(80px, 20vw, 400px)" }}
      >
        ROBUSST
      </p>
    </footer>
  );
};
