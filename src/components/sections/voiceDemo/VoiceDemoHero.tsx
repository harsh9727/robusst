"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Mic } from "lucide-react";
import { TransitionLink } from "~/components/common";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { localizedHref } from "./localizedHref";
import type { VoiceDemoData } from "./types";
import { useVoiceDemoCall } from "./useVoiceDemoCall";

export const VOICE_DEMO_CARD_ID = "voice-demo";

interface VoiceDemoHeroProps {
  hero: VoiceDemoData["hero"];
  demo: VoiceDemoData["demo"];
  locale: string;
}

const buttonClassName =
  "bg-brand-one hover:bg-brand-one/90 text-primary-foreground h-auto min-h-13 max-w-full rounded-full py-3 text-center font-bold whitespace-normal uppercase";

export const VoiceDemoHero: React.FC<VoiceDemoHeroProps> = ({
  hero,
  demo,
  locale,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const {
    videoRef,
    canvasRef,
    state,
    status,
    audioActive,
    videoActive,
    connect,
    disconnect,
  } = useVoiceDemoCall(demo);

  const isConnected = state === "connected";
  const isConnecting = state === "connecting";
  // A "#..." button target starts the call; any other target is a link.
  const startsCall = !hero.ctaHref || hero.ctaHref.startsWith("#");

  const startFromHero = (event: React.MouseEvent) => {
    event.preventDefault();
    cardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    if (!isConnected) void connect();
  };

  const tapLabel = isConnected
    ? demo.speaking
    : isConnecting
      ? demo.connecting
      : demo.tapToTalk;

  return (
    <section
      aria-labelledby="voice-demo-title"
      className="bg-primary relative isolate overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="bg-brand-one/25 pointer-events-none absolute -top-40 left-1/2 -z-10 size-80 -translate-x-1/2 rounded-full blur-[140px] sm:size-130 lg:-right-20 lg:left-auto lg:translate-x-0"
      />
      <div
        aria-hidden="true"
        className="bg-brand-three/15 pointer-events-none absolute bottom-0 -left-40 -z-10 size-80 rounded-full blur-[140px] sm:size-100"
      />

      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center gap-12 px-6 pt-32 pb-16 sm:gap-14 sm:px-12 sm:pt-44 sm:pb-20 lg:flex-row lg:justify-between lg:gap-10 xl:px-0">
        <div className="text-primary-foreground flex w-full max-w-2xl min-w-0 flex-col items-start text-start">
          <p className="border-brand-two/40 text-brand-two flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide uppercase sm:text-sm">
            <span
              aria-hidden="true"
              className="bg-brand-two size-2 shrink-0 animate-pulse rounded-full"
            />
            {hero.eyebrow}
          </p>

          <h1
            id="voice-demo-title"
            className="mt-6 text-3xl leading-tight font-medium break-words sm:text-4xl lg:text-5xl xl:text-6xl"
          >
            {hero.title}{" "}
            <span className="from-brand-one to-brand-two bg-linear-to-r bg-clip-text text-transparent">
              {hero.titleHighlight}
            </span>
          </h1>

          <p className="text-muted-foreground mt-5 max-w-xl text-base sm:text-lg">
            {hero.subtitle}
          </p>

          {hero.ctaLabel && (
            <div className="mt-8 flex w-full flex-col items-start gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-5">
              <Button asChild size="extra-lg" className={buttonClassName}>
                {startsCall ? (
                  <a href={`#${VOICE_DEMO_CARD_ID}`} onClick={startFromHero}>
                    <Mic aria-hidden="true" className="size-5" />
                    {hero.ctaLabel}
                  </a>
                ) : (
                  <TransitionLink href={localizedHref(hero.ctaHref, locale)}>
                    {hero.ctaLabel}
                  </TransitionLink>
                )}
              </Button>
              {hero.ctaNote && (
                <span className="text-muted-foreground text-sm">
                  {hero.ctaNote}
                </span>
              )}
            </div>
          )}

          <dl className="border-primary-foreground/15 mt-10 grid w-full grid-cols-3 gap-3 border-t pt-6 sm:mt-12 sm:gap-4 sm:pt-8">
            {(hero.statistics ?? []).map((statistic) => (
              <div
                key={statistic.label}
                className="flex min-w-0 flex-col-reverse gap-1"
              >
                <dt className="text-muted-foreground text-xs sm:text-sm">
                  {statistic.label}
                </dt>
                <dd className="text-base font-bold break-words sm:text-2xl lg:text-3xl">
                  {statistic.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          id={VOICE_DEMO_CARD_ID}
          ref={cardRef}
          className="border-brand-one/25 relative flex min-h-100 w-full max-w-100 shrink-0 scroll-mt-32 flex-col items-center justify-center overflow-hidden rounded-3xl border bg-[radial-gradient(circle_at_50%_42%,#101a2a_0%,#070a10_62%)] px-5 pt-14 pb-20 shadow-[0_0_90px_rgba(48,128,255,0.16)] sm:min-h-110"
        >
          <span className="text-primary-foreground/50 absolute start-6 top-6 text-xs font-medium tracking-[0.22em] uppercase">
            {demo.cardLabel}
          </span>
          <span
            aria-hidden={!isConnected}
            className={cn(
              "text-primary-foreground/70 absolute end-6 top-6 flex items-center gap-2 text-xs font-medium tracking-[0.22em] uppercase transition-opacity duration-500",
              isConnected ? "opacity-100" : "opacity-0",
            )}
          >
            <span className="bg-brand-two size-2 animate-pulse rounded-full shadow-[0_0_8px_var(--brand-two)]" />
            {demo.connected}
          </span>

          <div
            role="button"
            tabIndex={0}
            aria-label={demo.orbAriaLabel ?? undefined}
            aria-busy={isConnecting}
            onClick={() => {
              if (!isConnected) void connect();
            }}
            onKeyDown={(event) => {
              if (
                (event.key === "Enter" || event.key === " ") &&
                !isConnected
              ) {
                event.preventDefault();
                void connect();
              }
            }}
            className="focus-visible:outline-brand-two relative size-40 cursor-pointer rounded-full transition-transform duration-300 hover:scale-[1.04] focus-visible:outline-2 focus-visible:outline-offset-8 active:scale-[0.97] sm:size-52"
          >
            <div
              aria-hidden="true"
              className={cn(
                "absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(76,157,255,0.22)_0%,rgba(232,49,140,0.06)_45%,transparent_70%)]",
                isConnected && "animate-pulse",
              )}
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
            <div
              className={cn(
                "absolute inset-0 overflow-hidden rounded-full transition-opacity duration-500",
                videoActive ? "opacity-100" : "pointer-events-none opacity-0",
              )}
            >
              <video
                ref={videoRef}
                playsInline
                muted
                title={demo.videoTitle ?? undefined}
                className="h-full w-full object-cover"
              />
            </div>
            <div
              aria-hidden="true"
              className={cn(
                "border-t-brand-one border-r-brand-two pointer-events-none absolute -inset-1.5 rounded-full border-2 border-transparent",
                isConnecting ? "animate-spin opacity-100" : "opacity-0",
              )}
            />
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute -inset-3 rounded-full transition-opacity duration-500",
                audioActive ? "opacity-100" : "opacity-0",
              )}
            >
              <canvas ref={canvasRef} className="h-full w-full" />
            </div>
          </div>

          <p className="text-primary-foreground mt-7 text-center text-sm tracking-[0.28em] uppercase sm:text-base">
            {tapLabel}
          </p>
          <div className="relative mt-2 h-12 w-full text-center">
            <p
              className={cn(
                "text-primary-foreground/50 absolute inset-x-0 top-0 text-sm tracking-wide transition-opacity duration-300",
                status || isConnected ? "opacity-0" : "opacity-100",
                isConnecting && "opacity-40",
              )}
            >
              {demo.tagline}
            </p>
            <p
              role="status"
              aria-live="polite"
              className={cn(
                "text-primary-foreground/75 absolute inset-x-0 top-0 text-sm transition-opacity duration-300",
                status ? "opacity-100" : "opacity-0",
              )}
            >
              {status}
            </p>
          </div>

          <button
            type="button"
            tabIndex={isConnected ? 0 : -1}
            aria-hidden={!isConnected}
            onClick={(event) => {
              event.stopPropagation();
              disconnect();
            }}
            className={cn(
              "absolute bottom-5 left-1/2 -translate-x-1/2 cursor-pointer rounded-full border border-white/30 bg-white/10 px-6 py-2.5 text-xs font-semibold tracking-[0.18em] whitespace-nowrap text-white uppercase transition-opacity duration-300 hover:border-white/50 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
              isConnected ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            {demo.endCall}
          </button>
        </div>
      </div>
    </section>
  );
};
