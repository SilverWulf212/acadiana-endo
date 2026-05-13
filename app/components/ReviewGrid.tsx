import type { Testimonial } from "@/app/lib/types";

type ReviewGridProps = {
  eyebrow?: string;
  heading?: string;
  testimonials: Testimonial[];
  columns?: 2 | 3;
  /**
   * Outer section background. Used to create alternating white/cream rhythm
   * across the page. Defaults to "default" (transparent — inherits page bg).
   */
  surface?: "default" | "cream" | "gray";
};

function initials(name?: string): string {
  if (!name) return "—";
  const parts = name.trim().split(/\s+/);
  const letters =
    parts.length >= 2
      ? parts[0][0] + parts[parts.length - 1][0] // first + last word
      : (parts[0][0] ?? "") + (parts[0][1] ?? ""); // first two letters of single word
  return letters.toUpperCase().slice(0, 2) || "—";
}

function StarRow({ rating }: { rating: number }) {
  const filled = Math.min(5, Math.max(0, Math.round(rating)));
  return (
    <div
      role="img"
      aria-label={`Rating: ${filled} out of 5 stars`}
      className="flex items-center gap-0.5"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className={i < filled ? "text-gold-400" : "text-steel-200"}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 0 0 .95.69h4.158c.969 0 1.371 1.24.588 1.81l-3.363 2.444a1 1 0 0 0-.364 1.118l1.287 3.955c.3.921-.755 1.688-1.539 1.118L10 15.347l-3.357 2.67c-.784.57-1.838-.197-1.539-1.118l1.287-3.955a1 1 0 0 0-.364-1.118L2.664 9.382c-.783-.57-.38-1.81.588-1.81h4.158a1 1 0 0 0 .95-.69l1.286-3.955Z" />
        </svg>
      ))}
    </div>
  );
}

/**
 * Highland-style review grid with optional practice reply.
 * Server Component.
 */
export default function ReviewGrid({
  eyebrow,
  heading,
  testimonials,
  columns = 2,
  surface = "default",
}: ReviewGridProps) {
  if (testimonials.length === 0) return null;

  const gridCols =
    columns === 3
      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      : "grid grid-cols-1 md:grid-cols-2 gap-6";

  const surfaceClass =
    surface === "cream"
      ? "section-cream"
      : surface === "gray"
        ? "bg-gray-50"
        : "";

  return (
    <section className={`section ${surfaceClass}`.trim()}>
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
          {testimonials.map((t, idx) => {
            const displayName = t.name ?? t.author;
            return (
              <figure
                key={t.id ?? `${idx}-${t.author}`}
                style={{ animationDelay: `${idx * 80}ms` }}
                className="review-card animate-fade-up"
              >
                <StarRow rating={t.rating} />

                <blockquote className="mt-4 text-navy-700 leading-relaxed">
                  {`"${t.text}"`}
                </blockquote>

                <div className="mt-5 flex items-center gap-3">
                  <div
                    aria-hidden="true"
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-navy-100 text-[10px] font-semibold text-navy-700"
                  >
                    {initials(t.name)}
                  </div>
                  <div className="flex flex-col">
                    <figcaption className="font-medium text-navy-800">
                      {displayName}
                    </figcaption>
                    {t.source && (
                      <span className="text-xs text-gray-600">
                        {t.source}
                      </span>
                    )}
                  </div>
                </div>

                {t.reply && (
                  <div className="review-reply">
                    <p className="eyebrow">
                      Reply from Acadiana Endodontics
                    </p>
                    <p className="mt-2 italic text-gray-600">{t.reply}</p>
                  </div>
                )}
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
