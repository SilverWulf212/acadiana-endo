"use client";

import { useRef, useState, useEffect } from "react";
import { cn } from "@/app/lib/utils";
import AnimatedCounter from "@/app/components/AnimatedCounter";

interface StatsStripProps {
  className?: string;
}

interface Stat {
  label: string;
  value: number;
  suffix: string;
  staticText: string | null;
  icon: React.ReactNode;
}

const stats: Stat[] = [
  {
    label: "Board-Certified Specialists",
    value: 2,
    suffix: "",
    staticText: null,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8" aria-hidden="true">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4Zm-2 16-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8Z" />
      </svg>
    ),
  },
  {
    label: "Years Experience",
    value: 20,
    suffix: "+",
    staticText: null,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8" aria-hidden="true">
        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2ZM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8Zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7Z" />
      </svg>
    ),
  },
  {
    label: "Faculty",
    value: 0,
    suffix: "",
    staticText: "LSU",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8" aria-hidden="true">
        <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82ZM12 3 1 9l11 6 9-4.91V17h2V9L12 3Z" />
      </svg>
    ),
  },
  {
    label: "Less Radiation",
    value: 90,
    suffix: "%",
    staticText: null,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm1 17.93c-3.95.49-7.4-2.1-7.93-5.95-.26-1.9.24-3.65 1.18-5.04l2.15 2.15c-.34.73-.47 1.57-.3 2.45.36 1.91 2.07 3.22 4.03 3.22.15 0 .29-.01.44-.02l.02 3.19Zm1.49-3.88c-1.11.5-2.43.23-3.24-.73l6.58-6.58c.96.81 1.23 2.13.73 3.24l-4.07 4.07Zm3.27-4.12-2.15-2.15c.34-.73.47-1.57.3-2.45-.36-1.91-2.07-3.22-4.03-3.22-.15 0-.29.01-.44.02l-.02-3.19c3.95-.49 7.4 2.1 7.93 5.95.26 1.9-.24 3.65-1.59 5.04Z" />
      </svg>
    ),
  },
];

/**
 * Horizontal stats bar highlighting key practice differentiators.
 * 2x2 grid on mobile, 4 across on desktop.
 * Features animated counters and staggered fade-in on viewport entry.
 */
export default function StatsStrip({ className }: StatsStripProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(element);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative overflow-hidden bg-navy-800 py-10 lg:py-12",
        className
      )}
    >
      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-navy-900/50 via-transparent to-navy-900/50"
        aria-hidden="true"
      />

      <div className="container relative">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={cn(
                "flex flex-col items-center gap-3 text-center rounded-lg p-4 transition-all duration-500",
                "hover:shadow-[0_0_20px_rgba(200,169,110,0.3)]",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              )}
              style={{
                transitionDelay: isVisible ? `${i * 150}ms` : "0ms",
              }}
            >
              <div className="text-gold-400">{stat.icon}</div>
              {stat.staticText ? (
                <span className="text-3xl font-bold text-white lg:text-4xl">
                  {stat.staticText}
                </span>
              ) : (
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  className="text-3xl font-bold text-white lg:text-4xl"
                />
              )}
              <p className="text-sm font-semibold uppercase tracking-wide text-white lg:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
