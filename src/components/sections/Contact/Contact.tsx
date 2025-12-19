import { ChevronRight } from "lucide-react";
import React from "react";
import { CalendlyFormEmbed } from "~/components/feature";
import { Button } from "~/components/ui/button";

export const Contact: React.FC = () => {
  return (
    <div className="flex justify-center py-25">
      <div className="container flex w-full flex-col items-center justify-center gap-4">
        <section className="flex flex-col justify-center text-center">
          <p className="text-4xl font-medium">We help you monetize AI</p>
          <p className="text-muted-foreground text-lg font-medium">
            Have questions We are here to help.
          </p>
        </section>

        <Button className="w-fit">
          Submit a Query <ChevronRight />
        </Button>

        <div className="-mt-10 w-full">
          <CalendlyFormEmbed url="https://calendly.com/prashant-s2922/30min" />
        </div>
      </div>
    </div>
  );
};
