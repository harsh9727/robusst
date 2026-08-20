"use client";

import React from "react";
import Image from "next/image";

import Link from "next/link";
import type { SanityCareersData } from "~/types/sanity/careers";

interface ContactProps {
  data: SanityCareersData;
}

export const Contact: React.FC<ContactProps> = ({ data }) => {
  const contactSection = data?.contact;
  if (!contactSection) return null;
  return (
    <div className="flex justify-center px-6 py-12 sm:px-12 sm:py-16 lg:px-25 lg:py-25">
      <div className="relative container grid min-h-125 grid-cols-1 overflow-hidden rounded-2xl border shadow sm:min-h-150 sm:rounded-3xl lg:h-150 lg:grid-cols-2 lg:rounded-4xl">
        <div className="bg-primary/70 relative order-1 min-h-50 w-full overflow-hidden lg:order-2 lg:min-h-0">
          <Image
            src={contactSection.image ?? ""}
            alt={contactSection.imageAlt ?? contactSection.heading ?? ""}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
            className="p object-cover"
          />
        </div>

        <div className="bg-primary-foreground order-2 flex w-full flex-col gap-6 p-6 sm:gap-8 sm:p-10 lg:order-1 lg:p-15">
          <p className="text-2xl font-black sm:text-3xl lg:text-5xl">
            {contactSection.heading}
          </p>

          <section>
            <p className="text-lg font-medium">
              {contactSection.questionsPrompt}
            </p>

            <p className="text-muted-foreground mt-3">
              {contactSection.emailUs}{" "}
              {(contactSection.emails ?? []).map((email, index) => (
                <React.Fragment key={email.href ?? email.label ?? index}>
                  {index > 0 && <span>&nbsp; | &nbsp;</span>}
                  <Link
                    href={email.href ?? "#"}
                    className="text-primary font-medium underline underline-offset-1"
                  >
                    {email.label}
                  </Link>
                </React.Fragment>
              ))}
            </p>
            {contactSection.linkedin?.href && (
              <p className="text-muted-foreground">
                {contactSection.followUs}{" "}
                <Link
                  href={contactSection.linkedin.href}
                  aria-label={contactSection.linkedin.ariaLabel ?? undefined}
                  target={
                    contactSection.linkedin.openInNewTab ? "_blank" : undefined
                  }
                  rel={
                    contactSection.linkedin.openInNewTab
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="text-primary font-medium underline underline-offset-1"
                >
                  {contactSection.linkedin.label}
                </Link>
                <span>&nbsp; {contactSection.latestJobOpenings}</span>
              </p>
            )}
          </section>

          <p className="text-muted-foreground text-sm sm:text-base">
            {contactSection.description}
          </p>
        </div>
      </div>
    </div>
  );
};
