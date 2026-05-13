"use client";

import Image from "next/image";
import Link from "next/link";
import type { MouseEvent } from "react";
import { cn } from "@/app/lib/utils";

type FeaturedCardItemBase = {
  title: string;
  image: string;
  imageAlt: string;
  description?: string;
};

export type FeaturedCardItem =
  | (FeaturedCardItemBase & { mode: "link"; href: string; ctaLabel?: string })
  | (FeaturedCardItemBase & { mode: "info" });

type FeaturedCardRowProps = {
  eyebrow?: string;
  heading?: string;
  items: FeaturedCardItem[];
  columns?: 2 | 3;
  /**
   * Outer section background. Used to create alternating white/cream rhythm
   * across the page. Defaults to "default" (transparent — inherits page bg).
   */
  surface?: "default" | "cream" | "gray";
};

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5 10a.75.75 0 0 1 .75-.75h6.638L10.23 7.29a.75.75 0 1 1 1.04-1.08l3.5 3.25a.75.75 0 0 1 0 1.08l-3.5 3.25a.75.75 0 1 1-1.04-1.08l2.158-1.96H5.75A.75.75 0 0 1 5 10Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CardBody({ item }: { item: FeaturedCardItem }) {
  return (
    <div className="featured-card-body">
      <h3 className="heading-subsection text-white">{item.title}</h3>
      {item.description && (
        <p className="mt-2 text-sm leading-relaxed text-white/85">
          {item.description}
        </p>
      )}
      {item.mode === "link" && (
        <span className="featured-card-link mt-3">
          {item.ctaLabel ?? `Learn more about ${item.title}`}
          <ArrowIcon />
        </span>
      )}
    </div>
  );
}

/**
 * Set CSS variables --hover-x / --hover-y (0..1) on the card so the radial
 * glow originates at the cursor's entry point. Cheap, runs on enter/move only.
 */
function setHoverVars(
  e: MouseEvent<HTMLElement>,
  el: HTMLElement | null
): void {
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width;
  const y = (e.clientY - rect.top) / rect.height;
  el.style.setProperty("--hover-x", String(Math.max(0, Math.min(1, x))));
  el.style.setProperty("--hover-y", String(Math.max(0, Math.min(1, y))));
}

/**
 * Highland-style photo-led card row.
 * Client Component — needs DOM access for directional hover glow.
 * The glow originates at the cursor's entry edge and tracks subtly on move.
 */
export default function FeaturedCardRow({
  eyebrow,
  heading,
  items,
  columns = 3,
  surface = "default",
}: FeaturedCardRowProps) {
  if (items.length === 0) return null;

  const gridCols =
    columns === 2
      ? "grid grid-cols-1 sm:grid-cols-2 gap-6"
      : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";

  const surfaceClass =
    surface === "cream"
      ? "section-cream"
      : surface === "gray"
        ? "bg-gray-50"
        : "";

  return (
    <section className={cn("section", surfaceClass)}>
      {(eyebrow || heading) && (
        <div className="container mb-10 text-center sm:mb-14">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          {heading && (
            <h2 className="heading-section mt-3">{heading}</h2>
          )}
          {heading && <div className="accent-bar mx-auto mt-4" />}
        </div>
      )}

      <div className="container">
        <div className={gridCols}>
          {items.map((item, index) => {
            const sizes =
              "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";

            const onEnter = (e: MouseEvent<HTMLElement>) =>
              setHoverVars(e, e.currentTarget);
            const onMove = (e: MouseEvent<HTMLElement>) =>
              setHoverVars(e, e.currentTarget);

            if (item.mode === "link") {
              return (
                <Link
                  key={`${item.title}-${index}`}
                  href={item.href}
                  onMouseEnter={onEnter}
                  onMouseMove={onMove}
                  style={{ animationDelay: `${index * 80}ms` }}
                  className={cn(
                    "featured-card group animate-fade-up",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
                  )}
                >
                  <div
                    className="featured-card-glow"
                    aria-hidden="true"
                  />
                  <div className="featured-card-image">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes={sizes}
                      className="image-grade"
                    />
                  </div>
                  <CardBody item={item} />
                </Link>
              );
            }

            return (
              <article
                key={`${item.title}-${index}`}
                onMouseEnter={onEnter}
                onMouseMove={onMove}
                style={{ animationDelay: `${index * 80}ms` }}
                className="featured-card animate-fade-up"
              >
                <div className="featured-card-glow" aria-hidden="true" />
                <div className="featured-card-image">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes={sizes}
                    className="image-grade"
                  />
                </div>
                <CardBody item={item} />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
