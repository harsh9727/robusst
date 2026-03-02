"use client";

import {
  ShieldCheck,
  Star,
  Settings,
  Truck,
  Lock,
  BadgeCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import type { RobusstPlatformSection } from "~/i18n/types/stsAndDms";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  ShieldCheck,
  Star,
  Settings,
  Truck,
  Lock,
  BadgeCheck,
};

const SIZE = 600;
const CX = SIZE / 2;
const CY = SIZE / 2;
const ORBIT_R = 210;
const ICON_R = 38;
const CENTER_R = 100;
const LINE_HEIGHT = 24;
const FONT_SIZE = 20;
const GAP = 14;

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

function getLabelAnchor(cosA: number): "start" | "middle" | "end" {
  if (cosA < -0.2) return "end";
  if (cosA > 0.2) return "start";
  return "middle";
}

function getLabelBaseY(angle: number, lineCount: number): number {
  const rad = toRad(angle);
  const sinA = Math.sin(rad);
  const iy = CY + ORBIT_R * sinA;
  const blockHeight = lineCount * LINE_HEIGHT;

  if (sinA > 0.7) {
    return iy + ICON_R + GAP + LINE_HEIGHT / 2;
  } else if (sinA < -0.7) {
    return iy - ICON_R - GAP - blockHeight + LINE_HEIGHT / 2;
  } else {
    return iy - blockHeight / 2 + LINE_HEIGHT / 2;
  }
}

function getLabelX(angle: number): number {
  const rad = toRad(angle);
  const cosA = Math.cos(rad);
  const ix = CX + ORBIT_R * cosA;

  if (cosA < -0.2) return ix - ICON_R - GAP;
  if (cosA > 0.2) return ix + ICON_R + GAP;
  return ix;
}

export default function RobusstPlatform() {
  const t = useTranslations();
  const platform = t.raw(
    "sts_and_dms_page.robusstPlatform",
  ) as RobusstPlatformSection;

  return (
    <>
      <div className="w-full overflow-hidden bg-white sm:-mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 150">
          <path
            d="M0,80 C300,50 400,50 600,80 C800,110 900,110 1200,80 L1200,200 L0,200 Z"
            fill="#000000"
          />
        </svg>
      </div>

      <section className="relative overflow-hidden bg-black py-20">
        <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-cyan-500 opacity-10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-32 left-0 h-96 w-96 rounded-full bg-fuchsia-600 opacity-10 blur-[120px]" />

        <style>{`
        @media (max-width: 639px) {
          .diagram-label { display: none; }
          .diagram-scale { transform: scale(0.52); transform-origin: top center; }
          .diagram-wrapper { height: 315px; }
        }
      `}</style>

        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <div className="mb-12 text-center">
            <h2 className="text-4xl leading-tight font-extrabold text-white lg:text-5xl">
              {platform.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-400 lg:text-lg">
              {platform.subtitle}
            </p>
          </div>

          {/* Circle diagram — always shown, labels hidden on mobile */}
          <div className="mt-20 hidden justify-center sm:flex">
            <div
              className="diagram-wrapper relative overflow-hidden sm:overflow-visible"
              style={{ width: SIZE, height: SIZE, maxWidth: "100vw" }}
            >
              <div
                className="diagram-scale"
                style={{ width: SIZE, height: SIZE }}
              >
                {/* SVG: ring + connectors + labels */}
                <svg
                  width={SIZE}
                  height={SIZE}
                  className="absolute inset-0"
                  style={{ overflow: "visible" }}
                >
                  {/* Dashed orbit ring */}
                  <circle
                    cx={CX}
                    cy={CY}
                    r={ORBIT_R}
                    fill="none"
                    stroke="rgba(6,182,212,0.3)"
                    strokeWidth="1.5"
                    strokeDasharray="6 5"
                  />

                  {platform.features.map((f, i) => {
                    const rad = toRad(f.angle);
                    const cosA = Math.cos(rad);

                    const x1 = CX + CENTER_R * Math.cos(rad);
                    const y1 = CY + CENTER_R * Math.sin(rad);
                    const x2 = CX + (ORBIT_R - ICON_R) * Math.cos(rad);
                    const y2 = CY + (ORBIT_R - ICON_R) * Math.sin(rad);

                    const lx = getLabelX(f.angle);
                    const baseY = getLabelBaseY(f.angle, f.title.length);
                    const anchor = getLabelAnchor(cosA);

                    return (
                      <g key={i}>
                        <line
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke="rgba(6,182,212,0.35)"
                          strokeWidth="1.5"
                        />
                        {f.title.map((line, li) => (
                          <text
                            key={li}
                            x={lx}
                            y={baseY + li * LINE_HEIGHT}
                            textAnchor={anchor}
                            dominantBaseline="middle"
                            fill="white"
                            fontSize={FONT_SIZE}
                            fontWeight="600"
                            fontFamily="'Segoe UI', system-ui, sans-serif"
                            className="diagram-label"
                          >
                            {line}
                          </text>
                        ))}
                      </g>
                    );
                  })}
                </svg>

                {/* Center circle */}
                <div
                  className="absolute flex flex-col items-center justify-center rounded-full text-center"
                  style={{
                    width: CENTER_R * 2,
                    height: CENTER_R * 2,
                    top: CY - CENTER_R,
                    left: CX - CENTER_R,
                    background:
                      "radial-gradient(circle at 38% 30%, #38bdf8, #0369a1)",
                    zIndex: 20,
                  }}
                >
                  <span className="text-2xl font-black tracking-widest text-white">
                    {platform.centerTitle}
                  </span>
                  <span className="mt-1.5 px-4 text-sm leading-snug font-medium text-sky-100">
                    {platform.centerSubtitle.split("\n").map((line, i) => (
                      <span key={i}>
                        {line}
                        {i === 0 && <br />}
                      </span>
                    ))}
                  </span>
                </div>

                {/* Icon nodes */}
                {platform.features.map((feature, i) => {
                  const rad = toRad(feature.angle);
                  const ix = CX + ORBIT_R * Math.cos(rad);
                  const iy = CY + ORBIT_R * Math.sin(rad);
                  const Icon = iconMap[feature.icon];

                  return (
                    <div
                      key={i}
                      className="absolute flex items-center justify-center rounded-full transition-transform duration-300 hover:scale-110"
                      style={{
                        width: ICON_R * 2,
                        height: ICON_R * 2,
                        top: iy - ICON_R,
                        left: ix - ICON_R,
                        background:
                          "radial-gradient(circle at 35% 30%, #f472b6, #be185d)",
                        zIndex: 30,
                      }}
                    >
                      {Icon && <Icon className="h-6 w-6 text-white" />}
                    </div>
                  );
                })}
              </div>
              {/* end diagram-scale */}
            </div>
          </div>

          {/* Mobile-only feature cards — shown below sm */}
          <div className="mt-10 grid grid-cols-2 gap-4 sm:hidden">
            {platform.features.map((feature, i) => {
              const Icon = iconMap[feature.icon];
              return (
                <div
                  key={i}
                  className="flex flex-col items-start gap-3 rounded-2xl border border-white/10 bg-[#111827] p-4"
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle at 35% 30%, #f472b6, #be185d)",
                    }}
                  >
                    {Icon && <Icon className="h-5 w-5 text-white" />}
                  </div>
                  <div>
                    <h4 className="text-sm leading-snug font-bold text-white">
                      {feature.title.join(" ")}
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="w-full overflow-hidden bg-white sm:-mt-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 150"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 C300,150 400,150 600,120 C800,90 900,90 1200,120 L1200,0 L0,0 Z"
            fill="#000000"
            stroke="none"
          />
        </svg>
      </div>
    </>
  );
}
