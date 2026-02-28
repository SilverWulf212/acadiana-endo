import type { ReactNode } from "react";
import { cn } from "@/app/lib/utils";

interface PageHeroProps {
  title: string;
  description?: string;
  backgroundImage?: string;
  children?: ReactNode;
  breadcrumbs?: ReactNode;
}

export default function PageHero({
  title,
  description,
  backgroundImage,
  children,
  breadcrumbs,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-navy-800 py-20 lg:py-28"
      )}
    >
      {/* Background image layer */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          aria-hidden="true"
        />
      )}

      {/* Gradient overlay */}
      <div
        className={cn(
          "absolute inset-0",
          backgroundImage
            ? "bg-navy-900/80"
            : "bg-gradient-to-br from-navy-800 via-navy-800 to-navy-900"
        )}
        aria-hidden="true"
      />

      {/* Subtle decorative elements */}
      <div
        className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold-400/5 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-navy-600/20 blur-3xl"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="container relative z-10">
        {breadcrumbs}

        <h1 className="heading-display max-w-3xl !text-white">
          {title}
        </h1>

        {description && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-200 lg:text-xl">
            {description}
          </p>
        )}

        {/* Gold accent bar */}
        <div className="mt-6 h-1 w-16 rounded-full bg-gold-400" aria-hidden="true" />

        {children && (
          <div className="mt-8 flex flex-wrap gap-4">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
