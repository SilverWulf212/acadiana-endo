import Link from "next/link";
import { cn } from "@/app/lib/utils";

interface CTASectionProps {
  title: string;
  description?: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  className?: string;
}

/**
 * Full-width navy-800 CTA section with centered text and action buttons.
 * Includes a gold decorative accent element.
 */
export default function CTASection({
  title,
  description,
  primaryCTA,
  secondaryCTA,
  className,
}: CTASectionProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-navy-800 py-20 lg:py-28",
        className
      )}
    >
      {/* Gradient background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700"
        aria-hidden="true"
      />

      {/* Decorative elements */}
      <div
        className="absolute left-1/4 top-0 h-px w-1/2 bg-gradient-to-r from-transparent via-gold-400/40 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/4 h-px w-1/2 bg-gradient-to-r from-transparent via-gold-400/20 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-gold-400/5"
        aria-hidden="true"
      />
      <div
        className="absolute -left-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-gold-400/5"
        aria-hidden="true"
      />

      <div className="container relative text-center">
        {/* Gold accent bar */}
        <div
          className="mx-auto mb-6 h-1 w-12 rounded-full bg-gold-400"
          aria-hidden="true"
        />

        <h2 className="heading-section mx-auto max-w-2xl !text-white">
          {title}
        </h2>

        {description && (
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-navy-200">
            {description}
          </p>
        )}

        {(primaryCTA || secondaryCTA) && (
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {primaryCTA && (
              <Link
                href={primaryCTA.href}
                className="group btn btn-lg relative overflow-hidden bg-gold-400 text-navy-900 hover:bg-gold-500 hover:shadow-lg hover:shadow-gold-400/25"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">{primaryCTA.label}</span>
              </Link>
            )}
            {secondaryCTA && (
              secondaryCTA.href.startsWith("tel:") || secondaryCTA.href.startsWith("mailto:") ? (
                <a
                  href={secondaryCTA.href}
                  className="btn btn-lg border-white/25 text-white hover:bg-white/10"
                >
                  {secondaryCTA.label}
                </a>
              ) : (
                <Link
                  href={secondaryCTA.href}
                  className="btn btn-lg border-white/25 text-white hover:bg-white/10"
                >
                  {secondaryCTA.label}
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}
