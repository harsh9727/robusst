import React from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { role } from "~/components/sections/carrersPage/CurrentOpenings/data";
import { Briefcase, MapPin, Building2, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  role: role;
}

const RoleInfoPage: React.FC<Props> = ({ role }) => {
  return (
    <div className="min-h-screen w-full pt-25">
      <div className="border-b bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-6">
          <Link href="/careers">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Careers
            </Button>
          </Link>

          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-gray-50">
                {role.positionTitle}
              </h1>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
                {role.shortDesc}
              </p>
            </div>

            <Button size="lg" className="md:mt-0">
              Apply Now
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Building2 className="h-4 w-4" />
              <span>{role.department}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Briefcase className="h-4 w-4" />
              <Badge variant="secondary" className="capitalize">
                {role.roleType.replace("-", " ")}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <MapPin className="h-4 w-4" />
              <Badge variant="outline" className="capitalize">
                {role.localtion}
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
                Role Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {role.roleOverView.map((item, index) => (
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
                Key Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {role.responsibilities.map((item, index) => (
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
                Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="">
              <ul className="list-disc space-y-1 pl-5">
                {role.requirements.map((item, index) => (
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
