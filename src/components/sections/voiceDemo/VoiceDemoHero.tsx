import React from "react";
import Image from "next/image";
import { TransitionLink } from "~/components/common";
import { Button } from "~/components/ui/button";
import { localizedHref } from "./localizedHref";
import type { VoiceDemoData } from "./types";

interface VoiceDemoHeroProps {
  hero: VoiceDemoData["hero"];
  demo: VoiceDemoData["demo"];
  locale: string;
}

export const VoiceDemoHero: React.FC<VoiceDemoHeroProps> = ({
  hero,
  demo,
  locale,
}) => (
  <section
    aria-labelledby="voice-demo-title"
    className="bg-primary relative isolate overflow-hidden"
  >
    <div
      aria-hidden="true"
      className="bg-brand-one/25 pointer-events-none absolute -top-40 left-1/2 -z-10 h-130 w-130 -translate-x-1/2 rounded-full blur-[140px] lg:-right-20 lg:left-auto lg:translate-x-0"
    />
    <div
      aria-hidden="true"
      className="bg-brand-three/15 pointer-events-none absolute bottom-0 -left-40 -z-10 h-100 w-100 rounded-full blur-[140px]"
    />

    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center gap-14 px-6 pt-36 pb-20 sm:px-12 sm:pt-44 lg:flex-row lg:justify-between lg:gap-10 xl:px-0">
      <div className="text-primary-foreground flex w-full max-w-2xl flex-col items-start text-start">
        <p className="border-brand-two/40 text-brand-two flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold tracking-wide uppercase">
          <span
            aria-hidden="true"
            className="bg-brand-two size-2 animate-pulse rounded-full"
          />
          {hero.eyebrow}
        </p>

        <h1
          id="voice-demo-title"
          className="mt-6 text-3xl leading-tight font-medium lg:text-5xl xl:text-6xl"
        >
          {hero.title}{" "}
          <span className="from-brand-one to-brand-two bg-linear-to-r bg-clip-text text-transparent">
            {hero.titleHighlight}
          </span>
        </h1>

        <p className="text-muted-foreground mt-5 max-w-xl text-lg">
          {hero.subtitle}
        </p>

        {hero.ctaLabel && (
          <Button
            asChild
            size="extra-lg"
            className="bg-brand-one hover:bg-brand-one/90 text-primary-foreground mt-8 rounded-full font-bold uppercase"
          >
            <TransitionLink href={localizedHref(hero.ctaHref, locale)}>
              {hero.ctaLabel}
            </TransitionLink>
          </Button>
        )}

        <dl className="border-primary-foreground/15 mt-12 grid w-full grid-cols-3 gap-4 border-t pt-8">
          {(hero.statistics ?? []).map((statistic) => (
            <div key={statistic.label} className="flex flex-col-reverse gap-1">
              <dt className="text-muted-foreground text-sm">
                {statistic.label}
              </dt>
              <dd className="text-xl font-bold sm:text-3xl">
                {statistic.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="border-brand-one/25 relative flex min-h-110 w-full max-w-100 shrink-0 flex-col items-center justify-center overflow-hidden rounded-3xl border bg-[radial-gradient(circle_at_50%_42%,#101a2a_0%,#070a10_62%)] px-5 py-14 shadow-[0_0_90px_rgba(48,128,255,0.16)]">
        <span className="text-primary-foreground/50 absolute start-6 top-6 text-xs font-medium tracking-[0.22em] uppercase">
          {demo.cardLabel}
        </span>

        <div className="relative size-42 sm:size-52">
          <div
            aria-hidden="true"
            className="absolute -inset-8 animate-pulse rounded-full bg-[radial-gradient(circle,rgba(76,157,255,0.22)_0%,rgba(232,49,140,0.06)_45%,transparent_70%)]"
          />
          {demo.orbImage && (
            <div className="absolute inset-4 overflow-hidden rounded-full">
              <Image
                src={demo.orbImage}
                alt={demo.orbImageAlt ?? ""}
                fill
                priority
                sizes="210px"
                className="object-cover"
              />
            </div>
          )}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full border border-white/10 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.09)_0%,rgba(255,255,255,0.02)_40%,transparent_70%)] shadow-[inset_0_0_40px_rgba(76,157,255,0.14),0_0_60px_rgba(76,157,255,0.16)]"
          />
        </div>

        <p className="text-primary-foreground/60 mt-10 text-center text-sm tracking-wide">
          {demo.tagline}
        </p>
      </div>
    </div>
  </section>
);
