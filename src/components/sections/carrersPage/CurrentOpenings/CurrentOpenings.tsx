import React from "react";
import { currentOpenings } from "./data";
import { Badge } from "~/components/ui/badge";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export const CurrentOpenings: React.FC = () => {
  return (
    <div className="relative container mx-auto flex w-full flex-col gap-5 px-6 py-12 sm:px-12 sm:py-16 lg:px-25 lg:py-25">
      <h3 className="text-4xl font-semibold">Current Openings</h3>

      <div className="grid w-full gap-5 md:grid-cols-2">
        {currentOpenings.map((role, index) => (
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
                <Link href={`/careers/roles/${role.id}`}>View Job</Link>
              </Button>

              <Button size="sm">
                Apply Now
                <ChevronRight />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
