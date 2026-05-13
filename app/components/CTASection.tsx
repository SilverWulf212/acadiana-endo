import Link from "next/link";
import { cn } from "@/app/lib/utils";

interface CTASectionProps {
  eyebrow?: string;
  title: string;
  description: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  className?: string;
}

/**
 * Quiet, centered final-CTA block — Highland register.
 * Server Component. No background imagery, no gradients, no motion.
 *
 * Renders an optional eyebrow, an H2, a single paragraph, and 1-2 buttons.
 * Secondary CTA auto-switches to <a> when href is a tel:/mailto: link so the
 * browser handles it directly without next/link client navigation.
 */
export default function CTASection({
  eyebrow,
  title,
  description,
  primaryCTA,
  secondaryCTA,
  className,
}: CTASectionProps) {
  const secondaryIsExternalScheme =
    secondaryCTA?.href.startsWith("tel:") ||
    secondaryCTA?.href.startsWith("mailto:");

  return (
    <section className={cn("section", className)}>
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}

          <h2 className={cn("heading-section", eyebrow && "mt-3")}>{title}</h2>

          <p className="text-lead mt-5 text-gray-700">{description}</p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href={primaryCTA.href}
              className="btn btn-primary btn-lg"
            >
              {primaryCTA.label}
            </Link>

            {secondaryCTA && (
              secondaryIsExternalScheme ? (
                <a
                  href={secondaryCTA.href}
                  className="btn btn-outline btn-lg"
                >
                  {secondaryCTA.label}
                </a>
              ) : (
                <Link
                  href={secondaryCTA.href}
                  className="btn btn-outline btn-lg"
                >
                  {secondaryCTA.label}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
