"use client";
import React from "react";
import type { PlatformsSection } from "~/i18n/types/platforms";
import { useTranslations } from "next-intl";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";

const chartData = [
  { kpi: "Efficiency", withUs: 95, withoutUs: 45 },
  { kpi: "Cost Savings", withUs: 85, withoutUs: 30 },
  { kpi: "User Satisfaction", withUs: 92, withoutUs: 55 },
  { kpi: "Response Time", withUs: 90, withoutUs: 40 },
  { kpi: "ROI", withUs: 88, withoutUs: 35 },
];

const chartConfig = {
  withUs: {
    label: "With Us",
    color: "hsl(var(--chart-1))",
  },
  withoutUs: {
    label: "Without Us",
    color: "hsl(var(--chart-2))",
  },
};

export const Whychoose: React.FC = () => {
  const t = useTranslations("platforms");
  const whyChooseSection = t.raw("whychoose") as PlatformsSection["whychoose"];

  return (
    <section className="bg-primary-foreground px-6 py-15 sm:px-12 md:py-20 xl:px-25">
      <div className="mx-auto flex w-full max-w-7xl flex-col-reverse items-start justify-start gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <h3 className="mb-5 text-2xl leading-tight font-bold text-black sm:text-3xl md:text-4xl">
            {whyChooseSection.heading}
          </h3>
          <ul className="flex flex-col gap-5">
            {whyChooseSection.benefits.map((benefit, index) => (
              <li
                key={index}
                className="flex flex-col gap-1 rounded-r-lg border-l-4 border-pink-600 bg-pink-50 p-4 pl-4"
              >
                <h4 className="text-lg font-bold text-pink-600 sm:text-xl">
                  {benefit.title}
                </h4>
                <p className="text-black">{benefit.description}</p>
              </li>
            ))}
          </ul>
        </div>

        <Card className="w-full max-w-md border-none bg-linear-to-br from-pink-50 to-purple-50 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-pink-600">
              Performance Comparison
            </CardTitle>
            <CardDescription>
              See the difference we make across key metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-100 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 10, left: 10, bottom: 60 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis
                    dataKey="kpi"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    className="text-xs"
                  />
                  <YAxis
                    domain={[0, 100]}
                    label={{
                      value: "Performance (%)",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend verticalAlign="top" height={36} iconType="rect" />
                  <Bar
                    dataKey="withUs"
                    fill="rgb(219, 39, 119)"
                    radius={[8, 8, 0, 0]}
                    name="With Us"
                  />
                  <Bar
                    dataKey="withoutUs"
                    fill="rgb(156, 163, 175)"
                    radius={[8, 8, 0, 0]}
                    name="Without Us"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
