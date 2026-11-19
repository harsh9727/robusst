"use client";

import React, { useId, useRef, useState } from "react";
import { cn } from "~/lib/utils";
import type { VoiceDemoData } from "./types";

/** The original page opens on Africa (the fifth region). */
const DEFAULT_REGION_INDEX = 4;

interface DialectExplorerProps {
  dialects: VoiceDemoData["dialects"];
}

export const DialectExplorer: React.FC<DialectExplorerProps> = ({
  dialects,
}) => {
  const regions = dialects.regions ?? [];
  const [active, setActive] = useState(
    regions.length > DEFAULT_REGION_INDEX ? DEFAULT_REGION_INDEX : 0,
  );
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const baseId = useId();
  const region = regions[active];
  if (!region) return null;

  const select = (index: number) => {
    const next = (index + regions.length) % regions.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const footer = (dialects.footerTemplate ?? "")
    .replace("{count}", String(region.languages?.length ?? 0))
    .replace("{region}", region.name ?? "");

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
      <div className="flex min-w-0 flex-col gap-5">
        <h3 className="text-2xl font-bold break-words text-black sm:text-3xl">
          {dialects.title}
        </h3>
        <p className="text-base text-neutral-600 sm:text-lg">
          {dialects.description}
        </p>
        <ul className="flex flex-wrap gap-2">
          {(dialects.chips ?? []).map((chip) => (
            <li
              key={chip}
              className="border-brand-one/30 bg-brand-one/5 rounded-full border px-4 py-1.5 text-sm font-medium text-black"
            >
              {chip}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex min-w-0 flex-col gap-4">
        <div className="min-w-0 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
          <div
            role="tablist"
            aria-label={dialects.regionsAriaLabel ?? undefined}
            className="flex [scrollbar-width:thin] gap-1 overflow-x-auto overscroll-x-contain border-b border-neutral-200 bg-neutral-50 p-2"
          >
            {regions.map((item, index) => (
              <button
                key={item.name}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                id={`${baseId}-tab-${index}`}
                type="button"
                role="tab"
                aria-selected={index === active}
                aria-controls={`${baseId}-panel`}
                tabIndex={index === active ? 0 : -1}
                onClick={() => setActive(index)}
                onKeyDown={(event) => {
                  const rtl =
                    getComputedStyle(event.currentTarget).direction === "rtl";
                  if (event.key === "ArrowRight")
                    select(index + (rtl ? -1 : 1));
                  else if (event.key === "ArrowLeft")
                    select(index + (rtl ? 1 : -1));
                  else if (event.key === "Home") select(0);
                  else if (event.key === "End") select(regions.length - 1);
                  else return;
                  event.preventDefault();
                }}
                className={cn(
                  "focus-visible:outline-brand-one shrink-0 cursor-pointer rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors focus-visible:outline-2",
                  index === active
                    ? "bg-black text-white"
                    : "text-neutral-600 hover:bg-neutral-200 hover:text-black",
                )}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div
            id={`${baseId}-panel`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${active}`}
            tabIndex={0}
            className="max-h-105 overflow-y-auto"
          >
            {(region.languages ?? []).map((language) => (
              <div
                key={language.name}
                className="grid grid-cols-1 gap-2 border-b border-neutral-100 px-4 py-3.5 last:border-b-0 sm:grid-cols-[minmax(0,2fr)_minmax(0,5fr)] sm:items-center sm:gap-4 sm:px-5"
              >
                <p className="font-semibold text-black">{language.name}</p>
                <ul className="flex flex-wrap gap-1.5">
                  {(language.dialects ?? []).map((dialect) => (
                    <li
                      key={dialect}
                      className="rounded-md bg-neutral-100 px-2.5 py-1 text-sm text-neutral-700"
                    >
                      {dialect}
                    </li>
                  ))}
                  <li className="border-brand-one/30 text-brand-one rounded-md border border-dashed px-2.5 py-1 text-sm">
                    {dialects.moreLabel}
                  </li>
                </ul>
              </div>
            ))}
          </div>

          <p
            aria-live="polite"
            className="border-t border-neutral-200 bg-neutral-50 px-5 py-3 text-sm text-neutral-600"
          >
            {footer}
          </p>
        </div>
        <p className="text-sm text-neutral-500">{dialects.caveat}</p>
      </div>
    </div>
  );
};
