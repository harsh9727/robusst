import { ChevronRight } from "lucide-react";
import React from "react";
import { CalendlyFormEmbed } from "~/components/feature";
import { Button } from "~/components/ui/button";

export const Contact: React.FC = () => {
  return (
    <div className="flex justify-center px-6 py-12 sm:px-12 sm:py-16 lg:px-0 lg:py-25">
      <div className="container flex w-full flex-col items-center justify-center gap-4 sm:gap-5 lg:gap-4">
        <section className="flex flex-col justify-center px-4 text-center">
          <p className="text-2xl font-medium sm:text-3xl lg:text-4xl">
            We help you monetize AI
          </p>
          <p className="text-muted-foreground mt-1 text-base font-medium sm:text-lg">
            Have questions? We are here to help.
          </p>
        </section>

        <Button className="w-fit text-sm sm:text-base">
          Submit a Query <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>

        <div className="mt-8 w-full lg:-mt-10">
          <CalendlyFormEmbed url="https://calendly.com/prashant-s2922/30min" />
        </div>
      </div>
    </div>
  );
};
