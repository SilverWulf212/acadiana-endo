"use client";

import Link from "next/link";
import { useRef, type MouseEvent } from "react";
import { cn } from "@/app/lib/utils";

type SpotlightCTAProps = {
  label: string;
  href: string;
  className?: string;
};

/**
 * Primary CTA with a subtle cursor-tracked gold spotlight.
 * Client leaf — Banner can stay a Server Component while only this button
 * carries the interactive effect. Suppressed under prefers-reduced-motion via CSS.
 */
export default function SpotlightCTA({
  label,
  href,
  className,
}: SpotlightCTAProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      className={cn("spotlight-cta btn btn-secondary btn-lg", className)}
    >
      {label}
    </Link>
  );
}
