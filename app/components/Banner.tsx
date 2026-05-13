import Image from "next/image";
import Link from "next/link";
import { cn } from "@/app/lib/utils";

type BannerProps = {
  image: string;
  imageAlt: string;
  eyebrow?: string;
  heading: string;
  tagline?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  align?: "left" | "center";
  overlay?: "left" | "bottom";
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
  // Stable id derived from heading, used for aria-labelledby.
  const headingId = `banner-${heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}`;

  const alignClasses =
    align === "center"
      ? "items-center text-center mx-auto"
      : "items-start text-left";

  const overlayClass =
    overlay === "bottom" ? "banner-overlay-bottom" : "banner-overlay-left";

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
        loading={priority ? "eager" : undefined}
        sizes="100vw"
        className="object-cover"
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

            <h1 id={headingId} className="heading-display text-white">
              {heading}
            </h1>

            {tagline && (
              <p className="text-lead text-white/85">{tagline}</p>
            )}

            <div
              className={cn(
                "mt-2 flex flex-wrap gap-4",
                align === "center" && "justify-center"
              )}
            >
              <Link
                href={primaryCta.href}
                className="btn btn-secondary btn-lg"
              >
                {primaryCta.label}
              </Link>
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center gap-2 px-2 py-3 font-heading text-base font-semibold text-white underline underline-offset-4 transition-colors hover:text-gold-300"
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
