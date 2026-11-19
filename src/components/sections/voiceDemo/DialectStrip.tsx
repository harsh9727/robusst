"use client";

import React, { useMemo } from "react";
import Marquee from "react-fast-marquee";
import { cn } from "~/lib/utils";
import type { VoiceDemoData } from "./types";

interface DialectStripProps {
  strip: VoiceDemoData["dialectStrip"];
  regions: VoiceDemoData["dialects"]["regions"];
}

/** Builds the strip from the region data, so it never shows an unlisted dialect. */
function collectDialects(regions: DialectStripProps["regions"]) {
  const seen = new Set<string>();
  const all: Array<{ dialect: string; language: string }> = [];
  for (const region of regions ?? [])
    for (const language of region.languages ?? [])
      for (const dialect of language.dialects ?? []) {
        if (seen.has(dialect)) continue;
        seen.add(dialect);
        all.push({ dialect, language: language.name ?? "" });
      }
  // Deterministic shuffle: the server and the browser render the same order.
  for (let index = all.length - 1; index > 0; index--) {
    const swap = (index * 7919 + 104729) % (index + 1);
    const current = all[index]!;
    all[index] = all[swap]!;
    all[swap] = current;
  }
  return all;
}

export const DialectStrip: React.FC<DialectStripProps> = ({
  strip,
  regions,
}) => {
  const rows = useMemo(() => {
    const all = collectDialects(regions);
    const half = Math.ceil(all.length / 2);
    return [all.slice(0, half), all.slice(half)];
  }, [regions]);

  return (
    <section
      aria-label={strip.ariaLabel ?? undefined}
      className="bg-primary border-primary-foreground/10 flex flex-col gap-3 border-y py-6"
    >
      {rows.map((row, rowIndex) => (
        <Marquee
          key={rowIndex}
          speed={30}
          direction={rowIndex === 0 ? "left" : "right"}
          pauseOnHover
          autoFill
        >
          {row.map((item, index) => (
            <span
              key={item.dialect}
              className={cn(
                "text-primary-foreground/60 mx-2 flex items-baseline gap-2 rounded-full border border-white/10 px-4 py-1.5 text-sm whitespace-nowrap",
                index % 9 === 4 && "border-brand-one/40 text-brand-one",
              )}
            >
              <b className="text-primary-foreground font-semibold">
                {item.dialect}
              </b>
              {item.language}
            </span>
          ))}
          <span className="border-brand-two/40 text-brand-two mx-2 flex items-baseline gap-2 rounded-full border px-4 py-1.5 text-sm whitespace-nowrap">
            <b className="font-semibold">{strip.totalValue}</b>
            {strip.totalLabel}
          </span>
        </Marquee>
      ))}
    </section>
  );
};
