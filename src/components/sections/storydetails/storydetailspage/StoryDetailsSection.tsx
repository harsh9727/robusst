"use client";

import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";

interface ContentItem {
  title: string;
  description: string;
}

interface StoryDetailsSectionProps {
  title: string;
  subtitle: string;
  challenge: ContentItem[];
  solution: ContentItem[];
  benefits?: ContentItem[];
}

export default function StoryDetailsSection({
  title,
  subtitle,
  challenge,
  solution,
  benefits = [],
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
        <div
          className={`grid gap-8 ${
            benefits.length > 0 ? "md:grid-cols-3" : "md:grid-cols-2"
          }`}
        >
          {/* Challenge */}
          <Card className="border-0 shadow-lg transition-all duration-300 hover:shadow-xl">
            <CardContent className="space-y-6 p-6">
              <h3 className="text-primary text-xl font-semibold">
                Challenge
              </h3>

              {challenge.map((item, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Solution */}
          <Card className="border-0 shadow-lg transition-all duration-300 hover:shadow-xl">
            <CardContent className="space-y-6 p-6">
              <h3 className="text-primary text-xl font-semibold">
                Solution
              </h3>

              {solution.map((item, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Benefits (Optional) */}
          {benefits.length > 0 && (
            <Card className="border-0 shadow-lg transition-all duration-300 hover:shadow-xl">
              <CardContent className="space-y-6 p-6">
                <h3 className="text-primary text-xl font-semibold">
                  Benefits
                </h3>

                {benefits.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}