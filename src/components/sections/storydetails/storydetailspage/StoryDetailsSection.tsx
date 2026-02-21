"use client";

import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";

interface StoryDetailsSectionProps {
  title: string;
  subtitle: string;
  challenge: string[];
  solution: string[];
  benefits: string[];
}

export default function StoryDetailsSection({
  title,
  subtitle,
  challenge,
  solution,
  benefits,
}: StoryDetailsSectionProps) {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto max-w-6xl px-4 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <Badge className="bg-primary/10 text-primary mb-4 px-4 py-1 text-sm">
            Case Study
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            {title}
          </h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-3xl text-lg">
            {subtitle}
          </p>
        </div>

        <Separator className="mb-12" />

        {/* Content Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Challenge */}
          <Card className="border-0 shadow-lg transition-all duration-300 hover:shadow-xl">
            <CardContent className="space-y-4 p-6">
              <h3 className="text-primary text-xl font-semibold">Challenge</h3>
              <ul className="text-muted-foreground space-y-3 text-sm leading-relaxed">
                {challenge.map((item, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Solution */}
          <Card className="border-0 shadow-lg transition-all duration-300 hover:shadow-xl">
            <CardContent className="space-y-4 p-6">
              <h3 className="text-primary text-xl font-semibold">Solution</h3>
              <ul className="text-muted-foreground space-y-3 text-sm leading-relaxed">
                {solution.map((item, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card className="border-0 shadow-lg transition-all duration-300 hover:shadow-xl">
            <CardContent className="space-y-4 p-6">
              <h3 className="text-primary text-xl font-semibold">Benefits</h3>
              <ul className="text-muted-foreground space-y-3 text-sm leading-relaxed">
                {benefits.map((item, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
