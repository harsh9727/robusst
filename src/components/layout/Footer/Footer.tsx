"use client";
import React from "react";
import Link from "next/link";
// data
import { Button } from "~/components/ui/button";
import { LinkedinFollowButton, TransitionLink } from "~/components/common";
// icons
import { FaInstagram as Instagram } from "react-icons/fa";
import { FaLinkedinIn as Linkedin } from "react-icons/fa";
import { IoLogoYoutube as Youtube } from "react-icons/io";
import type { SiteSettingsQueryResult } from "~/sanity/types";
import Image from "next/image";
import { motion, useMotionValue } from "framer-motion";
import { useCallback, useRef } from "react";
import { AnimatedChar } from "~/components/ui/AnimatedChar";

interface FooterProps {
  data: NonNullable<SiteSettingsQueryResult>;
  locale: string;
}

function localizedHref(href: string | null, locale: string) {
  if (!href?.startsWith("/")) return href ?? "/";
  if (href === "/") return `/${locale}`;
  return `/${locale}${href}`;
}

export const Footer: React.FC<FooterProps> = ({ data, locale }) => {
  const footerSection = data;

  const containerRef = useRef<HTMLParagraphElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring configuration for ultra-smooth animations
  const springConfig = {
    damping: 25,
    stiffness: 200,
    mass: 0.5,
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLParagraphElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(-1000); // Move mouse far away to reset all effects
  }, [mouseX]);

  const text = footerSection.footerHashtag ?? "";
  const linkCategories = [
    {
      category: footerSection.quickLinksHeading,
      links: footerSection.quickLinks ?? [],
    },
    {
      category: footerSection.solutionLinksHeading,
      links: footerSection.solutionLinks ?? [],
    },
  ];
  const socialLinks = footerSection.socialLinks ?? [];
  const linkedin = socialLinks.find((link) => link.label === "LinkedIn");
  const instagram = socialLinks.find((link) => link.label === "Instagram");
  const youtube = socialLinks.find((link) => link.label === "YouTube");

  if (!footerSection.logo.url) return null;

  return (
    <div>
      {/*<div className="-mb-4 w-full overflow-hidden bg-white">
        <div className="relative shadow-[0px_-10px_50px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 200"
            preserveAspectRatio="none"
          >
            <path
              d="M0,80 C300,50 400,50 600,80 C800,110 900,110 1200,80 L1200,200 L0,200 Z"
              fill="#000000"
              stroke="none"
            />
          </svg>
        </div>
      </div>*/}

      <footer className="bg-primary relative flex flex-col items-center justify-center overflow-hidden">
        <div className="mt-12 flex flex-col items-center justify-center gap-2 px-6 sm:gap-3 sm:px-12 lg:gap-1 lg:px-25">
          <p className="text-primary-foreground text-center text-2xl leading-tight font-medium sm:text-4xl lg:text-6xl">
            {footerSection.footerHeading}
          </p>
          <p className="text-muted-foreground max-w-3xl text-center text-sm sm:text-lg lg:text-xl">
            {footerSection.footerDescription}
          </p>
        </div>

        <div className="mt-12 flex w-full flex-col justify-between gap-10 px-6 sm:mt-20 sm:px-12 lg:mt-30 lg:flex-row lg:gap-0 lg:px-25">
          <div className="flex flex-col gap-2 lg:text-left">
            <div>
              <TransitionLink href={`/${locale}`}>
                <Image
                  src={footerSection.logo.url}
                  alt={footerSection.logo.alt}
                  width={200}
                  height={80}
                  className="h-20 w-auto object-cover"
                />
              </TransitionLink>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="bg-primary-foreground border-border/30 hover:bg-primary-foreground rounded-full border"
              >
                <Link
                  href={linkedin?.href ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={linkedin?.ariaLabel ?? linkedin?.label}
                >
                  <Linkedin className="h-5 w-5 text-[#0072B1]" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="bg-primary-foreground border-border/30 hover:bg-primary-foreground rounded-full border"
              >
                <Link
                  href={instagram?.href ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={instagram?.ariaLabel ?? instagram?.label}
                >
                  <Instagram className="h-5 w-5 text-[#C13584]" />
                </Link>
              </Button>
              {/* Use asChild so the Button renders as <a>, not <button><a> (invalid HTML) */}
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="bg-primary-foreground border-border/30 hover:bg-primary-foreground rounded-full border"
              >
                <Link
                  href={youtube?.href ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={youtube?.ariaLabel ?? youtube?.label}
                >
                  <Youtube className="h-5 w-5 text-[#FD1D1D]" />
                </Link>
              </Button>
              <LinkedinFollowButton />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-20 lg:gap-x-10">
            {linkCategories.map((data, index) => (
              <div key={index}>
                <p className="text-primary-foreground mb-3 text-base font-medium sm:text-lg">
                  {data.category}
                </p>
                <section className="flex flex-col gap-2">
                  {data.links.map((link, linkIndex) => (
                    <div key={linkIndex}>
                      <Link
                        href={localizedHref(link.href, locale)}
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

        <motion.p
          ref={containerRef}
          className="z-50 inline-flex"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {text.split("").map((char, index) => (
            <AnimatedChar
              key={index}
              char={char}
              index={index}
              mouseX={mouseX}
              springConfig={springConfig}
              containerRef={containerRef}
            />
          ))}
        </motion.p>
      </footer>
    </div>
  );
};
