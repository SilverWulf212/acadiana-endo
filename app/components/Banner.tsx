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
  /**
   * Optional secondary CTA. Kept for backwards compatibility with non-home Banner
   * consumers. Prefer `phones` for multi-location callouts.
   */
  secondaryCta?: { label: string; href: string };
  /**
   * Optional list of location-labeled phone numbers. When present, renders a
   * compact row of tel: chips below the CTA row. Used on the home page to
   * surface both Lafayette and New Iberia numbers above the fold.
   */
  phones?: { location: string; phone: string; tel: string }[];
  align?: "left" | "center";
  overlay?: "left" | "left-soft" | "bottom";
  height?: "full" | "tall";
  priority?: boolean;
  /** Optional small credential badge rendered below the CTA row. */
  credentials?: string;
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
  phones,
  align = "left",
  overlay = "left",
  height = "full",
  priority = true,
  credentials,
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
        className="object-cover image-grade"
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
              className="heading-display animate-fade-up text-white hero-h1-shadow"
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
              {secondaryCta && !phones && (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center gap-2 px-2 py-3 font-heading text-base font-semibold text-white underline underline-offset-4 transition-colors hover:text-gold-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>

            {phones && phones.length > 0 && (
              <div
                className={cn(
                  "mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/90",
                  align === "center" && "justify-center"
                )}
              >
                {phones.map((p) => (
                  <a
                    key={p.tel}
                    href={p.tel}
                    className="link-underline inline-flex items-baseline gap-2 transition-colors hover:text-gold-300"
                  >
                    <span className="font-heading font-semibold text-[11px] uppercase tracking-wider text-white/60">
                      {p.location}
                    </span>
                    <span className="font-medium">{p.phone}</span>
                  </a>
                ))}
              </div>
            )}

            {credentials && (
              <p className="mt-6 inline-flex items-center gap-2 self-start rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-heading font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur-sm">
                <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-gold-400" />
                {credentials}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
