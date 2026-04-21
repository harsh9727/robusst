"use client";

import React from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Briefcase, MapPin, Building2 } from "lucide-react";
import { useTranslations } from "next-intl";
import type { CareersSection } from "~/i18n/types/careers";
import type { CommonSection } from "~/i18n/types/common";
import type { Careers_JsonType } from "~/types/api/careers_json.types";
import type { Common_JsonType } from "~/types/api/common_json.types";

interface Props {
  id: string;
  data?: Careers_JsonType["careers"];
  commonData?: Common_JsonType["common"];
}

const RoleInfoPage: React.FC<Props> = ({ id, data, commonData }) => {
  const t = useTranslations("careers");
  const common_t = useTranslations("common");
  const jobOpenings =
    data?.jobOpenings ??
    (t.raw("jobOpenings") as CareersSection["jobOpenings"]);
  const rolePageSection =
    data?.rolePage ?? (t.raw("rolePage") as CareersSection["rolePage"]);

  const notFound =
    commonData?.notFound ??
    (common_t.raw("notFound") as CommonSection["notFound"]);

  const currentJob = jobOpenings.find((job) => job.id === id);

  if (!currentJob) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        {notFound}
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white pt-25 md:pt-35">
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-gray-50">
                {currentJob.positionTitle}
              </h1>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
                {currentJob.shortDesc}
              </p>
            </div>

            <Button size="lg" className="md:mt-0">
              {rolePageSection.applyNowCta}
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Building2 className="h-4 w-4" />
              <span>{currentJob.department}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Briefcase className="h-4 w-4" />
              <Badge variant="secondary" className="capitalize">
                {currentJob.roleType.replace("-", " ")}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <MapPin className="h-4 w-4" />
              <Badge variant="outline" className="capitalize">
                {currentJob.localtion}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl space-y-8">
          <Card className="gap-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                {rolePageSection.overviewHeading}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {currentJob.roleOverView.map((item, index) => (
                  <li key={index}>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="gap-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                {rolePageSection.keyResponsibilitiesHeading}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {currentJob.responsibilities.map((item, index) => (
                  <li key={index}>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="gap-0">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                {rolePageSection.requirementsHeading}
              </CardTitle>
            </CardHeader>
            <CardContent className="">
              <ul className="list-disc space-y-1 pl-5">
                {currentJob.requirements.map((item, index) => (
                  <li key={index}>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RoleInfoPage;
