import React from "react";
import Link from "next/link";

// data
import { footerLinksData } from "./data";
import { Button } from "~/components/ui/button";
import { Sun } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary relative flex flex-col items-center justify-center overflow-hidden">
      <div className="mt-12 flex flex-col items-center justify-center gap-2 px-6 sm:mt-32 sm:gap-3 sm:px-12 lg:mt-50 lg:gap-1 lg:px-25">
        <p className="text-primary-foreground text-center text-2xl leading-tight font-medium sm:text-4xl lg:text-6xl">
          Ready to monetize AI?
        </p>
        <p className="text-muted-foreground max-w-3xl text-center text-sm sm:text-lg lg:text-xl">
          Bring our AI solutions to your Telecom business and provide reliable
          services to your customers.
        </p>
      </div>

      <div className="mt-12 flex w-full flex-col justify-between gap-10 px-6 sm:mt-20 sm:px-12 lg:mt-30 lg:flex-row lg:gap-0 lg:px-25">
        <div className="flex flex-col gap-2 lg:text-left">
          <p className="text-primary-foreground text-xl font-medium sm:text-2xl">
            Robusst
          </p>

          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                className="border-border/20 border"
              >
                <Sun className="text-primary-foreground" />
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-20 lg:gap-x-10">
          {footerLinksData.map((data, index) => (
            <div key={index}>
              <p className="text-primary-foreground mb-3 text-base font-medium sm:text-lg">
                {data.category}
              </p>

              <section className="flex flex-col gap-2">
                {data.links.map((link, linkIndex) => (
                  <div key={linkIndex}>
                    <Link
                      href={link.href}
                      className="group flex w-fit items-center gap-2 text-sm"
                    >
                      <span className="text-muted-foreground relative">
                        {link.label}
                        <div className="bg-muted-foreground absolute bottom-0 h-px w-0 duration-150 group-hover:w-full" />
                      </span>
                    </Link>
                  </div>
                ))}
              </section>
            </div>
          ))}
        </div>
      </div>

      <p className="text-primary-foreground/10 mt-12 text-center text-[80px] leading-none font-semibold select-none sm:mt-16 sm:text-[200px] lg:mt-20 lg:text-[300px] xl:text-[400px]">
        ROBUSST
      </p>
    </footer>
  );
};
