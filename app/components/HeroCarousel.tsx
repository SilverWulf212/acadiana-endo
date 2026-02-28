"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/app/lib/utils";

interface HeroSlide {
  heading: string;
  subtitle: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA: { label: string; href: string };
  image: string;
  alt: string;
}

const slides: HeroSlide[] = [
  {
    heading: "Expert Endodontic Care You Can Trust",
    subtitle:
      "Board-certified specialists providing gentle, precise root canal treatment",
    primaryCTA: { label: "Request Appointment", href: "/contact" },
    secondaryCTA: { label: "Our Services", href: "/services" },
    image: "/images/hero/bayou-cypress-1.jpg",
    alt: "Cypress trees draped with Spanish moss in a Louisiana bayou",
  },
  {
    heading: "Advanced Technology, Better Outcomes",
    subtitle:
      "CBCT 3D imaging for precise diagnosis with 90% less radiation",
    primaryCTA: {
      label: "Learn About Our Technology",
      href: "/services/cbct-imaging",
    },
    secondaryCTA: { label: "Meet Our Doctors", href: "/about" },
    image: "/images/hero/bayou-moss-2.jpg",
    alt: "Tranquil water surrounded by Spanish moss trees in Acadiana",
  },
  {
    heading: "Saving Natural Teeth is Our Passion",
    subtitle:
      "Over 20 years of specialized experience serving Acadiana",
    primaryCTA: { label: "Patient Information", href: "/patient-information" },
    secondaryCTA: { label: "Referring Doctors", href: "/referring-doctors" },
    image: "/images/hero/bayou-water-3.jpg",
    alt: "Trees standing in calm swamp waters of the Louisiana bayou",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;

    intervalRef.current = setInterval(goNext, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, goNext]);

  return (
    <section
      className="relative min-h-[600px] overflow-hidden lg:min-h-[700px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Hero highlights"
    >
      {/* Slides */}
      <div aria-live="polite" aria-atomic="true" className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-in-out",
              index === current ? "z-10 opacity-100" : "z-0 opacity-0"
            )}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} of ${slides.length}`}
            aria-hidden={index !== current}
          >
            {/* Background image */}
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              sizes="100vw"
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              className="object-cover object-center"
              quality={85}
            />

            {/* Navy gradient overlay for text readability */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-navy-900) 0%, color-mix(in oklch, var(--color-navy-800) 60%, transparent) 50%, var(--color-navy-900) 100%)",
                opacity: 0.7,
              }}
            />

            {/* Additional edge vignette for extra depth */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 30%, var(--color-navy-900) 100%)",
                opacity: 0.4,
              }}
            />

            {/* Top gold accent line */}
            <div className="absolute left-0 right-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />

            {/* Content */}
            <div className="container relative z-10 flex h-full min-h-[600px] items-center lg:min-h-[700px]">
              <div className="max-w-3xl py-20 lg:py-28">
                {/* Gold accent bar */}
                <div
                  className={cn(
                    "mb-6 h-1 w-16 rounded-full bg-gold-400 transition-all duration-700 delay-200",
                    index === current
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-4 opacity-0"
                  )}
                />

                {/* Heading */}
                <h1
                  className={cn(
                    "mb-6 font-heading text-4xl font-extrabold leading-[1.1] tracking-tight text-white transition-all duration-700 delay-100 sm:text-5xl lg:text-6xl xl:text-7xl",
                    index === current
                      ? "translate-y-0 opacity-100"
                      : "translate-y-6 opacity-0"
                  )}
                  style={{
                    textShadow: "0 2px 12px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {slide.heading}
                </h1>

                {/* Subtitle */}
                <p
                  className={cn(
                    "mb-10 max-w-xl text-lg leading-relaxed text-navy-200 transition-all duration-700 delay-200 sm:text-xl",
                    index === current
                      ? "translate-y-0 opacity-100"
                      : "translate-y-6 opacity-0"
                  )}
                  style={{
                    textShadow: "0 1px 8px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  {slide.subtitle}
                </p>

                {/* CTAs */}
                <div
                  className={cn(
                    "flex flex-col gap-4 transition-all duration-700 delay-300 sm:flex-row",
                    index === current
                      ? "translate-y-0 opacity-100"
                      : "translate-y-6 opacity-0"
                  )}
                >
                  <Link
                    href={slide.primaryCTA.href}
                    className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-gold-400 px-7 py-3.5 font-heading text-base font-semibold text-navy-900 shadow-lg shadow-gold-400/20 transition-all duration-300 hover:bg-gold-500 hover:shadow-xl hover:shadow-gold-400/30"
                    tabIndex={index === current ? 0 : -1}
                  >
                    {/* Shimmer */}
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    <span className="relative">{slide.primaryCTA.label}</span>
                  </Link>
                  <Link
                    href={slide.secondaryCTA.href}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/25 px-7 py-3.5 font-heading text-base font-semibold text-white transition-all duration-300 hover:border-white/50 hover:bg-white/10"
                    tabIndex={index === current ? 0 : -1}
                  >
                    {slide.secondaryCTA.label}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={cn(
              "h-2.5 rounded-full transition-all duration-300",
              index === current
                ? "w-10 bg-gold-400"
                : "w-2.5 bg-white/40 hover:bg-white/70"
            )}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === current ? "true" : undefined}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-20 hidden animate-float lg:block">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-widest text-white/50">
            Scroll
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5 text-white/50"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
