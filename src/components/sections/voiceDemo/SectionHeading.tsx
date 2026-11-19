import React from "react";
import { cn } from "~/lib/utils";

interface SectionHeadingProps {
  id: string;
  eyebrow?: string | null;
  title?: string | null;
  titleHighlight?: string | null;
  tone: "light" | "dark";
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  id,
  eyebrow,
  title,
  titleHighlight,
  tone,
  className,
}) => (
  <div className={cn("flex flex-col gap-4", className)}>
    {eyebrow && (
      <p
        className={cn(
          "flex items-center gap-3 text-sm font-semibold tracking-[0.2em] uppercase",
          tone === "dark" ? "text-brand-two" : "text-brand-one",
        )}
      >
        <span aria-hidden="true" className="h-px w-8 bg-current" />
        {eyebrow}
      </p>
    )}
    <h2
      id={id}
      className={cn(
        "text-2xl leading-tight font-bold sm:text-3xl md:text-4xl lg:text-5xl",
        tone === "dark" ? "text-primary-foreground" : "text-black",
      )}
    >
      {title}
      {titleHighlight && (
        <>
          <br />
          <span className="from-brand-one to-brand-three bg-linear-to-r bg-clip-text text-transparent">
            {titleHighlight}
          </span>
        </>
      )}
    </h2>
  </div>
);
