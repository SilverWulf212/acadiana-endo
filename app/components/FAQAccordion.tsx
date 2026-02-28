"use client";

import { useState } from "react";
import type { FAQ } from "@/app/lib/types";
import { cn } from "@/app/lib/utils";

interface FAQAccordionProps {
  faqs: FAQ[];
  className?: string;
}

export default function FAQAccordion({ faqs, className }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className={cn("divide-y divide-steel-200 rounded-xl border border-steel-200 bg-white", className)}>
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={index} className="relative">
            {/* Gold left accent bar — visible when open */}
            <div
              className={cn(
                "absolute left-0 top-0 h-full w-1 rounded-l-xl bg-gold-400 transition-opacity duration-300",
                isOpen ? "opacity-100" : "opacity-0"
              )}
              aria-hidden="true"
            />

            <button
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              className={cn(
                "flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200",
                "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold-400",
                isOpen
                  ? "bg-navy-50/50"
                  : "hover:bg-gray-50"
              )}
            >
              <span
                className={cn(
                  "font-heading text-base font-semibold leading-snug transition-colors duration-200 lg:text-lg",
                  isOpen ? "text-navy-800" : "text-navy-700"
                )}
              >
                {faq.question}
              </span>

              {/* Chevron icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={cn(
                  "h-5 w-5 shrink-0 text-navy-400 transition-transform duration-300",
                  isOpen && "rotate-180 text-gold-500"
                )}
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Animated content panel using grid-template-rows trick */}
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-in-out"
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
              }}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-5 pt-1">
                  <p className="text-base leading-relaxed text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
