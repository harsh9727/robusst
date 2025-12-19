import React from "react";
import Link from "next/link";

// data
import { footerLinksData } from "./data";

// components
import { Button } from "~/components/ui/button";

export const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col items-center justify-center bg-[#262626]">
      <div className="container flex flex-col sm:flex-row">
        <div className="mt-9 w-full border-white/20 pr-8 sm:mt-0 sm:max-w-75 sm:border-r sm:py-9">
          <div className="">
            <h1 className="text-lg text-white">Robousst</h1>

            <p className="text-sm leading-tight font-light text-white/70">
              AI powered telecom solutions provider
            </p>

            <div className="mt-3 flex items-center gap-2">
              <Button
                variant="default"
                size="icon-sm"
                className="bg-primary-foreground hover:bg-primary-foreground/80 [active]:bg-primary-foreground/70"
              >
                <svg
                  height="800px"
                  width="800px"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 382 382"
                >
                  <path
                    fill="#000"
                    d="M347.445,0H34.555C15.471,0,0,15.471,0,34.555v312.889C0,366.529,15.471,382,34.555,382h312.889
	C366.529,382,382,366.529,382,347.444V34.555C382,15.471,366.529,0,347.445,0z M118.207,329.844c0,5.554-4.502,10.056-10.056,10.056
	H65.345c-5.554,0-10.056-4.502-10.056-10.056V150.403c0-5.554,4.502-10.056,10.056-10.056h42.806
	c5.554,0,10.056,4.502,10.056,10.056V329.844z M86.748,123.432c-22.459,0-40.666-18.207-40.666-40.666S64.289,42.1,86.748,42.1
	s40.666,18.207,40.666,40.666S109.208,123.432,86.748,123.432z M341.91,330.654c0,5.106-4.14,9.246-9.246,9.246H286.73
	c-5.106,0-9.246-4.14-9.246-9.246v-84.168c0-12.556,3.683-55.021-32.813-55.021c-28.309,0-34.051,29.066-35.204,42.11v97.079
	c0,5.106-4.139,9.246-9.246,9.246h-44.426c-5.106,0-9.246-4.14-9.246-9.246V149.593c0-5.106,4.14-9.246,9.246-9.246h44.426
	c5.106,0,9.246,4.14,9.246,9.246v15.655c10.497-15.753,26.097-27.912,59.312-27.912c73.552,0,73.131,68.716,73.131,106.472
	L341.91,330.654L341.91,330.654z"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-8 sm:flex-row sm:pl-8">
          <div className="flex w-full flex-row gap-8 sm:pl-8">
            {footerLinksData.map((data, index) => (
              <div key={index} className="mt-9 min-w-fit">
                <h3 className="text-sm font-medium text-white">
                  {data.category}
                </h3>
                <ul className="">
                  {data.links.map((link, index) => (
                    <li key={index}>
                      <Link href={link.href} className="text-xs text-white/70">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-center border-t border-white/20 py-4 text-xs text-white/70">
        <p className="">&copy; Copyright 2024. All rights reserved.</p>
      </div>
    </footer>
  );
};
