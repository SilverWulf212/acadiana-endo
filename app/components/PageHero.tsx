import Image from "next/image";
import { useId, type ReactNode } from "react";
import { cn } from "@/app/lib/utils";

interface PageHeroProps {
  /** Path or URL of the hero background image. */
  backgroundImage: string;
  /** Alt text for the hero image. Defaults to "" (decorative) since the
   *  heading already conveys context. */
  imageAlt?: string;
  /** Optional small uppercase label above the heading. */
  eyebrow?: string;
  /** H1 of the page. */
  title: string;
  /** Optional supporting line under the heading. */
  description?: string;
  /** Optional breadcrumb element rendered at the top of the hero. Kept as a
   *  ReactNode so existing callers can continue passing <Breadcrumbs .. /> directly. */
  breadcrumbs?: ReactNode;
  /** Optional CTA row rendered under the heading/description. */
  children?: ReactNode;
  /** Overlay strength. Use "deep" for bright photos where H1 contrast suffers;
   *  default "soft" works for mid-tone photos. */
  overlay?: "soft" | "deep";
}

/**
 * Subpage hero — same visual language as Banner, but shorter and image-first.
 *
 * Server Component. Uses next/image with priority + sizes="100vw" so the hero
 * is a viable LCP candidate (plan §11). Overlay defaults to
 * `.banner-overlay-left-soft`; pass `overlay="deep"` for bright photos where
 * the H1 needs extra contrast.
 */
export default function PageHero({
  backgroundImage,
  imageAlt = "",
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
  overlay = "soft",
}: PageHeroProps) {
  const reactId = useId();
  const headingId = `page-hero-h-${reactId}`;

  return (
    <section
      className="relative isolate min-h-[60svh] md:min-h-[55svh]"
      aria-labelledby={headingId}
    >
      <Image
        src={backgroundImage}
        alt={imageAlt}
        fill
        priority
        fetchPriority="high"
        loading="eager"
        sizes="100vw"
        className="object-cover image-grade"
      />

      <div
        className={
          overlay === "deep"
            ? "banner-overlay banner-overlay-left"
            : "banner-overlay banner-overlay-left-soft"
        }
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-h-[inherit] items-center">
        <div className="container py-16 sm:py-20">
          {breadcrumbs}

          <div className="flex max-w-2xl flex-col gap-4">
            {eyebrow && (
              <p className="eyebrow eyebrow-on-dark">{eyebrow}</p>
            )}

            <h1
              id={headingId}
              className="heading-display text-white hero-h1-shadow"
            >
              {title}
            </h1>

            {description && (
              <p className="text-lead text-white/85">{description}</p>
            )}

            {children && (
              <div className={cn("mt-2 flex flex-wrap gap-4")}>
                {children}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
