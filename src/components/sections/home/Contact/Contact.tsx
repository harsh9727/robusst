"use client";

import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { CalendlyFormEmbed } from "~/components/feature";
import { Button } from "~/components/ui/button";
import type { ContactSection } from "~/i18n/types/home";
import { AnimatedText } from "~/components/ui/TextAnimation";
import { TransitionLink } from "~/components/common";

export const Contact: React.FC = () => {
  const t = useTranslations();
  const contactSection = t.raw("contact") as ContactSection;

  return (
    <div className="bg-primary-foreground flex justify-center px-6 py-12 sm:px-12 sm:py-16 lg:px-0 lg:py-25">
      <div className="container flex w-full flex-col items-center justify-center gap-4 sm:gap-5 lg:gap-4">
        <section className="flex flex-col items-center justify-center px-4 text-center">
          <div className="flex justify-center">
            <AnimatedText
              text={contactSection.heading}
              className="text-3xl font-black sm:text-4xl lg:text-5xl"
              as="h2"
              isCenter
            />
          </div>
          <p className="text-muted-foreground mt-1 text-base font-medium sm:text-lg">
            {contactSection.subheading}
          </p>
        </section>

        <Button asChild className="w-fit text-sm sm:text-base">
          <TransitionLink href="/contact">
            {contactSection.ctaText}{" "}
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </TransitionLink>
        </Button>

        <div className="h-212.5 w-full p-0 lg:-mt-10">
          <CalendlyFormEmbed url="https://calendly.com/contact-robusst/30min" />
        </div>
      </div>
    </div>
  );
};
