"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/app/lib/utils";

type Animation = "fade-up" | "slide-in-left" | "slide-in-right" | "scale-in";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: Animation;
  delay?: number;
  threshold?: number;
}

const initialStyles: Record<Animation, string> = {
  "fade-up": "translate-y-[30px] opacity-0",
  "slide-in-left": "-translate-x-[30px] opacity-0",
  "slide-in-right": "translate-x-[30px] opacity-0",
  "scale-in": "scale-95 opacity-0",
};

export default function ScrollReveal({
  children,
  className,
  animation = "fade-up",
  delay = 0,
  threshold = 0.1,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Apply delay then reveal
          if (delay > 0) {
            setTimeout(() => setIsVisible(true), delay);
          } else {
            setIsVisible(true);
          }
          // Only trigger once
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay, threshold, prefersReducedMotion]);

  // If reduced motion is preferred, render children directly with no animation
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-600 ease-out",
        isVisible ? "translate-y-0 translate-x-0 scale-100 opacity-100" : initialStyles[animation],
        className
      )}
      style={{ transitionDuration: "600ms" }}
    >
      {children}
    </div>
  );
}
