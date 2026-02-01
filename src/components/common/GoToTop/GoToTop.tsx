"use client";
import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const GoToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / height) * 100;

      setScrollProgress(progress);

      if (scrolled > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    toggleVisibility(); // Initial check

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`bg-brand-one fixed right-8 bottom-8 z-50 h-14 w-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-10 opacity-0"
      }`}
      aria-label="Go to top"
    >
      {/* Progress Ring */}
      <svg className="absolute inset-0 h-full w-full -rotate-90">
        <circle
          cx="28"
          cy="28"
          r="26"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-white/30"
        />
        <circle
          cx="28"
          cy="28"
          r="26"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeDasharray={`${2 * Math.PI * 26}`}
          strokeDashoffset={`${2 * Math.PI * 26 * (1 - scrollProgress / 100)}`}
          className="text-white transition-all duration-150"
          strokeLinecap="round"
        />
      </svg>

      {/* Arrow Icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <ArrowUp className="h-6 w-6 text-white" />
      </div>
    </button>
  );
};

export default GoToTop;
