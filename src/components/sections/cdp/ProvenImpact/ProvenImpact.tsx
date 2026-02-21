"use client";
import { TrendingUp, Clock, Users, Target } from "lucide-react";

const stats = [
  {
    icon: Clock,
    value: "< 3 months",
    label: "Achieve first use case",
    description: "From kickoff to your first production use case live.",
  },
  {
    icon: TrendingUp,
    value: "30%",
    label: "Increase in ARPU",
    description: "Average revenue per user growth across deployments.",
  },
  {
    icon: Users,
    value: "25%",
    label: "Reduction in churn rate",
    description: "Retain more customers with smarter engagement.",
  },
  {
    icon: Target,
    value: "41%+",
    label: "Conversion uplift",
    description: "Measurable lift across campaigns.",
  },
];

export const ProvenImpact = () => {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-12 sm:py-16">
      {/* Title */}
      <h2 className="mb-10 text-center text-3xl font-black tracking-tight text-black uppercase sm:mb-16 sm:text-5xl">
        Proven Impact &amp; Quick
        <br />
        Deployment
      </h2>

      {/* ───────────── DESKTOP ───────────── */}
      <div className="relative mx-auto hidden max-w-5xl items-center justify-center sm:flex">
        {/* Left text */}
        <div className="absolute top-1/2 left-0 flex w-52 -translate-y-1/2 flex-col gap-16 text-left">
          <p className="text-xl leading-tight font-bold text-pink-500">
            Achieve first use
            <br />
            case in under 3<br />
            months
          </p>

          <p className="text-xl leading-tight font-bold text-pink-500">
            25% reduction in
            <br />
            churn rate
          </p>
        </div>

        {/* Right text */}
        <div className="absolute top-1/2 right-0 flex w-52 -translate-y-1/2 flex-col gap-16 text-left">
          <p className="text-xl leading-tight font-bold text-pink-500">
            30% increase in
            <br />
            average revenue
            <br />
            per user
          </p>

          <p className="text-xl leading-tight font-bold text-pink-500">
            41%+ conversion
            <br />
            uplift on campaigns
          </p>
        </div>

        <CircleDiagram size={420} iconSize={80} iconInner={32} />
      </div>

      {/* ───────────── MOBILE ───────────── */}
      <div className="flex flex-col items-center sm:hidden">
        {/* Circle */}
        <CircleDiagram size={260} iconSize={54} iconInner={22} />

        {/* Cards */}
        <div className="mt-8 grid w-full max-w-sm grid-cols-2 gap-4">
          {stats.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#0A1628]">
                  <Icon className="h-4 w-4 text-cyan-400" />
                </div>

                <p className="text-xl font-black text-black">{item.value}</p>

                <p className="mt-1 text-xs leading-tight font-semibold text-pink-500">
                  {item.label}
                </p>

                <p className="mt-1 text-xs leading-snug text-slate-500">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

function CircleDiagram({
  size,
  iconSize,
  iconInner,
}: {
  size: number;
  iconSize: number;
  iconInner: number;
}) {
  const gap = Math.round(size * 0.067);
  const coreInset = Math.round(size * 0.214);
  const quadrantSize = Math.round(size / 2 - gap);

  const icons = [
    { Icon: Clock, pos: { top: gap, left: gap } },
    { Icon: TrendingUp, pos: { top: gap, right: gap } },
    { Icon: Users, pos: { bottom: gap, left: gap } },
    { Icon: Target, pos: { bottom: gap, right: gap } },
  ];

  return (
    <div
      className="relative flex-shrink-0"
      style={{ width: size, height: size }}
    >
      {/* Rings */}
      <div className="absolute inset-0 rounded-full bg-cyan-400 opacity-70" />
      <div
        className="absolute rounded-full bg-blue-600"
        style={{ inset: gap }}
      />
      <div
        className="absolute rounded-full bg-blue-800"
        style={{ inset: gap * 2 }}
      />

      {/* Core */}
      <div
        className="absolute flex items-center justify-center rounded-full bg-black"
        style={{ inset: coreInset }}
      >
        <div className="h-3/5 w-3/5 rounded-full bg-white opacity-90" />
      </div>

      {/* Divider lines */}
      <div
        className="pointer-events-none absolute overflow-hidden rounded-full"
        style={{ inset: gap }}
      >
        <div className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 bg-black/30" />
        <div className="absolute top-1/2 right-0 left-0 h-px -translate-y-1/2 bg-black/30" />
      </div>

      {/* Icons */}
      {icons.map(({ Icon, pos }, i) => (
        <div
          key={i}
          className="absolute flex items-center justify-center"
          style={{
            width: quadrantSize,
            height: quadrantSize,
            ...pos,
          }}
        >
          <div
            className="flex items-center justify-center rounded-full border-2 border-cyan-400 bg-[#0A1628] shadow-lg shadow-cyan-400/40"
            style={{
              width: iconSize,
              height: iconSize,
            }}
          >
            <Icon
              style={{
                width: iconInner,
                height: iconInner,
              }}
              className="text-cyan-400"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
