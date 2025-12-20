import React from "react";
import Link from "next/link";

// data
import { footerLinksData } from "./data";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary relative flex flex-col items-center justify-center overflow-hidden">
      <div className="mt-50 flex flex-col items-center justify-center gap-1">
        <p className="text-primary-foreground text-6xl font-medium">
          Ready to monetize AI?
        </p>
        <p className="text-muted-foreground text-xl">
          Bring our AI solutions to your Telecom business and provide reliable
          services to your customers.
        </p>
      </div>

      <div className="mt-30 flex w-full justify-between px-50">
        <div>
          <p className="text-primary-foreground">Robusst</p>
        </div>

        <div className="grid grid-cols-2 gap-x-10">
          {footerLinksData.map((data, index) => (
            <div key={index}>
              <p className="text-primary-foreground">{data.category}</p>

              <section className="mt-3 flex flex-col gap-2">
                {data.links.map((link, index) => (
                  <div key={index}>
                    <Link
                      key={index}
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

      <p className="text-primary-foreground/10 mt-20 -mb-35 text-[400px] leading-none font-semibold">
        ROBUSST
      </p>
    </footer>
  );
};
