"use client";

import { useRef, useEffect } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    function updateProgress() {
      const el = document.documentElement;
      const scrolled = el.scrollHeight - el.clientHeight;
      const pct = scrolled > 0 ? (el.scrollTop / scrolled) * 100 : 0;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 z-50 h-[2px] bg-gold-400 transition-[width] duration-100"
      style={{ width: "0%" }}
    />
  );
}
