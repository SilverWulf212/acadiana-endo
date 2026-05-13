"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
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

// ─── prefers-reduced-motion subscription (SSR-safe) ──────────────────────────
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot(): boolean {
  return false;
}

export default function ScrollReveal({
  children,
  className,
  animation = "fade-up",
  delay = 0,
  threshold = 0.1,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      // Early-returned in render below — no state update needed here.
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
