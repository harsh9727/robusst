"use client";

import React, { useEffect, useRef, useState } from "react";
import { TransitionLink } from "~/components/common";
import { Button } from "~/components/ui/button";
import { FadeIn } from "~/components/ui/FadeIn";
import { cn } from "~/lib/utils";
import { voiceDemoIcons } from "./icons";
import { localizedHref } from "./localizedHref";
import { SectionHeading } from "./SectionHeading";
import type { VoiceDemoData } from "./types";

interface CapabilitiesProps {
  capabilities: VoiceDemoData["capabilities"];
  cta: VoiceDemoData["cta"];
  locale: string;
}

export const Capabilities: React.FC<CapabilitiesProps> = ({
  capabilities,
  cta,
  locale,
}) => {
  const items = capabilities.items ?? [];
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  // On touch screens there is no hover, so highlight the card nearest the
  // middle of the screen while the visitor scrolls.
  useEffect(() => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let frame = 0;
    const pick = () => {
      frame = 0;
      const cards = listRef.current?.children;
      if (!cards) return;
      const middle = window.innerHeight / 2;
      let best = 0;
      let bestDistance = Infinity;
      Array.from(cards).forEach((card, index) => {
        const box = card.getBoundingClientRect();
        const distance = Math.abs((box.top + box.bottom) / 2 - middle);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = index;
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(pick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      aria-labelledby="voice-demo-capabilities"
      className="bg-primary relative isolate overflow-hidden px-6 py-15 sm:px-12 md:py-20 xl:px-25"
    >
      <div
        aria-hidden="true"
        className="bg-brand-one/15 pointer-events-none absolute -top-20 -right-40 -z-10 size-130 rounded-full blur-[160px]"
      />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12">
        <FadeIn>
          <SectionHeading
            id="voice-demo-capabilities"
            tone="dark"
            eyebrow={capabilities.eyebrow}
            title={capabilities.title}
            titleHighlight={capabilities.titleHighlight}
          />
        </FadeIn>

        <ul ref={listRef} className="flex flex-wrap justify-center gap-3.5">
          {items.map((item, index) => {
            const Icon = item.icon ? voiceDemoIcons[item.icon] : undefined;
            const isActive = index === active;
            return (
              <li
                key={item.title}
                onMouseEnter={() => setActive(index)}
                className={cn(
                  "flex min-h-60 w-full flex-col rounded-2xl border p-6 transition-colors duration-300 sm:w-[calc(50%-0.4375rem)] lg:min-h-70 lg:w-[calc(25%-0.65625rem)]",
                  isActive
                    ? "bg-brand-one border-brand-one"
                    : "border-white/10 bg-[#0b1018]",
                )}
              >
                {Icon && (
                  <Icon
                    aria-hidden="true"
                    className={cn(
                      "size-5 transition-colors duration-300",
                      isActive ? "text-white" : "text-brand-one",
                    )}
                  />
                )}
                {item.badge && (
                  <p className="mt-5 font-serif text-3xl text-white italic">
                    {item.badge}
                  </p>
                )}
                <h3
                  className={cn(
                    "text-lg font-semibold text-white",
                    item.badge ? "mt-2" : "mt-8",
                  )}
                >
                  {item.title}
                </h3>
                <p
                  className={cn(
                    "mt-3 text-sm leading-relaxed transition-colors duration-300 sm:text-base",
                    isActive ? "text-white/90" : "text-white/65",
                  )}
                >
                  {item.description}
                </p>
              </li>
            );
          })}
        </ul>

        {cta.title && cta.label && (
          <div className="relative mt-6 flex flex-col items-start gap-6 overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_85%_20%,rgba(76,157,255,0.22)_0%,transparent_55%)] px-8 py-10 sm:px-12 md:flex-row md:items-center md:justify-between md:py-12">
            <div className="max-w-2xl">
              <h2 className="text-primary-foreground text-2xl leading-tight font-bold sm:text-3xl md:text-4xl">
                {cta.title}
              </h2>
              <p className="text-muted-foreground mt-3 text-lg">
                {cta.description}
              </p>
            </div>
            <Button
              asChild
              size="extra-lg"
              className="bg-brand-one hover:bg-brand-one/90 text-primary-foreground shrink-0 rounded-full font-bold uppercase"
            >
              <TransitionLink href={localizedHref(cta.href, locale)}>
                {cta.label}
              </TransitionLink>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
