"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { Lightbulb, Target, Trophy } from "lucide-react";

interface ContentItem {
  title: string;
  description: string;
}

interface StoryDetailsSectionProps {
  title: string;
  subtitle: string;
  challenge: ContentItem[];
  solution: ContentItem[];
  benefits?: ContentItem[];
}

/* ---------------- Animated Block ---------------- */

function AnimatedBlock({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    const current = ref.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {children}
    </div>
  );
}

/* ---------------- Main Component ---------------- */

export default function StoryDetailsSection({
  title,
  subtitle,
  challenge,
  solution,
  benefits = [],
}: StoryDetailsSectionProps) {
  return (
    <section className="relative pt-50 pb-24 bg-white">
      <div className="container mx-auto max-w-6xl px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-pink-50 text-pink-500 border border-pink-400 rounded-full px-5 py-1 uppercase tracking-wider text-sm mb-5">
            Case Study
          </Badge>

          <h1 className="leading-tight text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            {title}
          </h1>

          <p className="text-black mt-4 max-w-2xl mx-auto text-lg">
            {subtitle}
          </p>
        </div>

        <Separator className="mb-20" />

        <div className="space-y-15">

          {/* Challenge */}
          <AnimatedBlock>
            <div className="group relative pl-14 border-l border-slate-200 hover:border-pink-400 transition-colors duration-500">

              <div className="absolute -left-5 top-0 w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Target className="w-5 h-5 text-pink-500" />
              </div>

              <h3 className="text-xl font-bold text-pink-500 relative inline-block mb-6">
                Challenge
                <span className="absolute left-0 -bottom-2 w-0 h-[2px] bg-pink-500 transition-all duration-500 group-hover:w-full"></span>
              </h3>

              <div className="space-y-6">
                {challenge.map((item, index) => (
                  <div key={index}>
                    <h4 className="font-semibold text-md transition-colors duration-300 group-hover:text-pink-500">
                      {item.title}
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed transition-colors duration-300 group-hover:text-black">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedBlock>

          {/* Solution */}
          <AnimatedBlock>
            <div className="group relative pl-14 border-l border-slate-200 hover:border-blue-400 transition-colors duration-500">

              <div className="absolute -left-5 top-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Lightbulb className="w-5 h-5 text-blue-600" />
              </div>

              <h3 className="text-xl font-bold text-blue-600 relative inline-block mb-6">
                Solution
                <span className="absolute left-0 -bottom-2 w-0 h-[2px] bg-blue-600 transition-all duration-500 group-hover:w-full"></span>
              </h3>

              <div className="space-y-6">
                {solution.map((item, index) => (
                  <div key={index}>
                    <h4 className="font-semibold text-md transition-colors duration-300 group-hover:text-blue-600">
                      {item.title}
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed transition-colors duration-300 group-hover:text-black">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedBlock>

          {/* Benefits */}
          {benefits.length > 0 && (
            <AnimatedBlock>
              <div className="group relative pl-14 border-l border-slate-200 hover:border-green-400 transition-colors duration-500">

                <div className="absolute -left-5 top-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <Trophy className="w-5 h-5 text-green-600" />
                </div>

                <h3 className="text-xl font-bold text-green-600 relative inline-block mb-6">
                  Benefits
                  <span className="absolute left-0 -bottom-2 w-0 h-[2px] bg-green-600 transition-all duration-500 group-hover:w-full"></span>
                </h3>

                <div className="space-y-6">
                  {benefits.map((item, index) => (
                    <div key={index}>
                      <h4 className="font-semibold text-md transition-colors duration-300 group-hover:text-green-600">
                        {item.title}
                      </h4>
                      <p className="text-slate-600 text-sm leading-relaxed transition-colors duration-300 group-hover:text-black">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedBlock>
          )}

        </div>
      </div>
    </section>
  );
}