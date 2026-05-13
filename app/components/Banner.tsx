import Image from "next/image";
import Link from "next/link";
import { useId } from "react";
import { cn } from "@/app/lib/utils";
import SpotlightCTA from "@/app/components/SpotlightCTA";

type BannerProps = {
  image: string;
  imageAlt: string;
  eyebrow?: string;
  heading: string;
  tagline?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  align?: "left" | "center";
  overlay?: "left" | "left-soft" | "bottom";
  height?: "full" | "tall";
  priority?: boolean;
};

/**
 * Highland-style single-still hero banner.
 * Server Component — no client-side JS.
 */
export default function Banner({
  image,
  imageAlt,
  eyebrow,
  heading,
  tagline,
  primaryCta,
  secondaryCta,
  align = "left",
  overlay = "left",
  height = "full",
  priority = true,
}: BannerProps) {
  // Unique id for aria-labelledby (avoids collisions when two Banners share a heading).
  const reactId = useId();
  const headingId = `banner-h-${reactId}`;

  const alignClasses =
    align === "center"
      ? "items-center text-center mx-auto"
      : "items-start text-left";

  const overlayClass =
    overlay === "bottom"
      ? "banner-overlay-bottom"
      : overlay === "left-soft"
        ? "banner-overlay-left-soft"
        : "banner-overlay-left";

  return (
    <section
      className={cn("banner", height === "tall" && "md:min-h-[72svh]")}
      aria-labelledby={headingId}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority={priority}
        fetchPriority={priority ? "high" : undefined}
        loading={priority ? "eager" : undefined}
        sizes="100vw"
        className="object-cover"
        // TODO(perf): add blurDataURL once a build-time generator is wired up.
        // priority + sizes="100vw" already make this an LCP-friendly image.
      />

      <div
        className={cn("banner-overlay", overlayClass)}
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-h-[inherit] items-center">
        <div className="container py-20 sm:py-24">
          <div
            className={cn(
              "flex max-w-[42rem] flex-col gap-5",
              alignClasses
            )}
          >
            {eyebrow && (
              <p className="eyebrow eyebrow-on-dark">{eyebrow}</p>
            )}

            <h1
              id={headingId}
              className="heading-display animate-fade-up text-white"
            >
              {heading}
            </h1>

            {tagline && (
              <p className="text-lead animate-fade-up delay-120 text-white/85">
                {tagline}
              </p>
            )}

            <div
              className={cn(
                "mt-2 flex flex-wrap gap-4 animate-fade-up delay-240",
                align === "center" && "justify-center"
              )}
            >
              <SpotlightCTA
                href={primaryCta.href}
                label={primaryCta.label}
              />
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center gap-2 px-2 py-3 font-heading text-base font-semibold text-white underline underline-offset-4 transition-colors hover:text-gold-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
