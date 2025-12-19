import React from "react";
import { Button } from "~/components/ui/button";

const IndustriesWeServeData = [
  {
    title: "5 Ways AI Is Transforming Telecom CX",
  },
  {
    title: "CDP: Why Every Telco Needs One",
  },
  {
    title: "Digital BSS Migration: 50+ Successes",
  },
];

export const BlogsGrid: React.FC = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 px-50 py-25">
      <section className="flex flex-col justify-center gap-1 text-center">
        <p className="text-4xl font-medium">Latest AI Insights and Blogs</p>
      </section>

      <section className="grid w-full grid-cols-3 gap-5 px-50">
        {IndustriesWeServeData.map((data, index) => (
          <div
            key={index}
            className="flex w-full flex-col rounded-lg border p-3"
          >
            <div className="bg-primary/20 min-h-50 rounded-sm" />
            <section className="mt-2 flex h-full flex-col justify-between px-1">
              <div className="h-full">
                <p className="text-muted-foreground text-sm">
                  December 20, 2025 | Robusst
                </p>
                <p className="text-md mt-1 leading-tight font-medium">
                  {data.title}
                </p>
              </div>

              <Button size="sm" variant="default" className="mt-3 w-fit">
                Read More
              </Button>
            </section>
          </div>
        ))}
      </section>
    </div>
  );
};
