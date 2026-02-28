"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/app/lib/utils";
import type { Testimonial } from "@/app/lib/types";

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={i < rating ? 0 : 1.5}
          className={cn(
            "h-5 w-5",
            i < rating ? "text-gold-400" : "text-gray-300"
          )}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialCarousel({
  testimonials,
}: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const goPrev = useCallback(() => {
    setCurrent((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  }, [testimonials.length]);

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;

    intervalRef.current = setInterval(goNext, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, goNext]);

  return (
    <div
      className="relative mx-auto max-w-3xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Patient testimonials"
    >
      {/* Quote icon */}
      <div className="mx-auto mb-8 flex justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-12 w-12 text-gold-300/60"
          aria-hidden="true"
        >
          <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.71 11 13.264 11 15.152 11 16.122 10.631 17.051 9.956 17.73c-.67.68-1.584 1.06-2.537 1.06-.992 0-1.91-.414-2.836-1.47ZM14.583 17.321C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.71 21 13.264 21 15.152c0 .97-.369 1.899-1.044 2.578-.67.68-1.584 1.06-2.537 1.06-.992 0-1.91-.414-2.836-1.47Z" />
        </svg>
      </div>

      {/* Testimonial cards */}
      <div className="relative min-h-[260px] sm:min-h-[220px]">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 flex flex-col items-center text-center transition-all duration-500 ease-in-out",
              index === current
                ? "z-10 translate-y-0 opacity-100"
                : "z-0 translate-y-4 opacity-0"
            )}
            role="group"
            aria-roledescription="slide"
            aria-label={`Testimonial ${index + 1} of ${testimonials.length}`}
            aria-hidden={index !== current}
          >
            {/* Stars */}
            <div className="mb-6">
              <StarRating rating={testimonial.rating} />
            </div>

            {/* Quote text */}
            <blockquote className="mb-8 text-lg leading-relaxed text-navy-700 sm:text-xl">
              &ldquo;{testimonial.text}&rdquo;
            </blockquote>

            {/* Attribution */}
            <div className="flex flex-col items-center gap-2">
              <p className="font-heading text-sm font-semibold text-navy-800">
                {testimonial.author}
              </p>
              {testimonial.source && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-50 px-3 py-1 text-xs font-medium text-gold-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Verified on {testimonial.source}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goPrev}
        className="absolute left-0 top-1/2 z-20 -translate-x-2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-steel-200 bg-white text-navy-600 shadow-sm transition-all duration-200 hover:border-gold-300 hover:text-gold-600 hover:shadow-md sm:-translate-x-6 lg:-translate-x-14"
        aria-label="Previous testimonial"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <button
        onClick={goNext}
        className="absolute right-0 top-1/2 z-20 -translate-y-1/2 translate-x-2 flex h-10 w-10 items-center justify-center rounded-full border border-steel-200 bg-white text-navy-600 shadow-sm transition-all duration-200 hover:border-gold-300 hover:text-gold-600 hover:shadow-md sm:translate-x-6 lg:translate-x-14"
        aria-label="Next testimonial"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="mt-8 flex justify-center gap-2.5">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              index === current
                ? "w-8 bg-gold-400"
                : "w-2 bg-navy-200 hover:bg-navy-400"
            )}
            aria-label={`Go to testimonial ${index + 1}`}
            aria-current={index === current ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
