"use client";

import React from "react";
import AnimatedCounter from "@/app/components/AnimatedCounter";

const stats = [
  { end: 98, suffix: "%", label: "Success Rate" },
  { end: 25, suffix: "+", label: "Years of Experience" },
  { end: 50, suffix: "K+", label: "Teeth Saved" },
];

export default function ParallaxStats() {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-gold-200 lg:gap-12">
      {stats.map((stat, i) => (
        <React.Fragment key={stat.label}>
          {i > 0 && (
            <div className="hidden h-8 w-px bg-gold-400/30 sm:block" />
          )}
          <div className="flex flex-col items-center">
            <AnimatedCounter
              end={stat.end}
              suffix={stat.suffix}
              className="font-heading text-3xl font-bold text-white"
            />
            <span className="mt-1">{stat.label}</span>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
