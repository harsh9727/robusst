"use client";

import React from "react";

// components
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

// icons
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import type { CareersSection } from "~/i18n/types/careers";
import { TransitionLink } from "~/components/common";

export const CurrentOpenings: React.FC = () => {
  const t = useTranslations("careers");
  const currentOpeningsSection = t.raw(
    "currentOpenings",
  ) as CareersSection["currentOpenings"];

  const jobOpeningsSection = t.raw(
    "jobOpenings",
  ) as CareersSection["jobOpenings"];

  return (
    <div
      id="open-position"
      className="relative container mx-auto flex w-full flex-col gap-5 px-6 py-12 sm:px-12 sm:py-16 lg:px-25 lg:py-25"
    >
      <h3 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
        {currentOpeningsSection.heading}
      </h3>

      <div className="grid w-full gap-5 md:grid-cols-2">
        {jobOpeningsSection.map((role, index) => (
          <div key={index} className="rounded-lg border p-5">
            <Badge className="bg-brand-two text-primary">
              {role.department}
            </Badge>
            <h3 className="mt-4 text-2xl font-semibold">
              {role.positionTitle}
            </h3>

            <p className="text-primary mt-2 text-sm leading-tight">
              {role.localtion} | {role.roleType}
            </p>

            <p className="text-muted-foreground mt-2 leading-tight">
              {role.shortDesc}
            </p>

            <div className="mt-5 flex justify-end gap-3">
              <Button asChild size="sm">
                <TransitionLink href={`/careers/roles/${role.id}`}>
                  {currentOpeningsSection.viewJobCta}
                </TransitionLink>
              </Button>

              <Button size="sm">
                {currentOpeningsSection.applyNowCta}
                <ChevronRight />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
