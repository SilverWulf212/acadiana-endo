import Image from "next/image";
import Link from "next/link";
import { cn } from "@/app/lib/utils";
import type { Doctor } from "@/app/lib/types";

export type DoctorCardProps = {
  doctor: Doctor;
  /**
   * Controls which side the portrait sits on at the lg breakpoint.
   * DOM order is fixed (image first) so screen-reader narration is consistent
   * regardless of visual layout — see plan §10 accessibility rule.
   *
   * - `"image-left"`  → portrait on the left, copy on the right (default).
   * - `"image-right"` → portrait visually moves right via `.component-row.reverse`,
   *                     but stays first in the DOM.
   */
  align?: "image-left" | "image-right";
};

/**
 * Highland-style full-width zig-zag content row for a single doctor:
 *   portrait on one side, copy (eyebrow + name + bio + education + memberships + CTA)
 *   on the other.
 *
 * NOT a small avatar card. Composed inside `<section className="section">` and
 * uses the `.component-row` / `.component-row.reverse` primitives from globals.css.
 *
 * Server Component.
 */
export default function DoctorCard({
  doctor,
  align = "image-left",
}: DoctorCardProps) {
  const { name, credentials, bio, imageUrl, education, memberships } = doctor;
  const eyebrow = `${credentials.toUpperCase()} · BOARD-CERTIFIED ENDODONTIST`;
  const bioParagraphs = bio.split("\n\n").filter((p) => p.trim().length > 0);
  const lastName = name.split(" ").slice(-1)[0] || name;
  const isReverse = align === "image-right";

  return (
    <section className="section">
      <div className="container">
        {/*
          DOM order: image element ALWAYS first child.
          `.component-row.reverse` flips visual order at lg via CSS `order: 2`,
          so screen-reader narration stays: image → copy regardless of visual side.
        */}
        <div className={cn("component-row", isReverse && "reverse")}>
          {/* Portrait */}
          <div className="relative aspect-[5/6] overflow-hidden rounded-xl">
            <Image
              src={imageUrl}
              alt={`${name}, ${credentials} — board-certified endodontist at Acadiana Endodontics`}
              fill
              className="object-cover object-top image-grade"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>

          {/* Copy */}
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="heading-section mt-3">{name}</h2>

            {/* Bio — first paragraph as lead, remaining as body */}
            <div className="mt-6">
              {bioParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={cn(
                    index === 0
                      ? "text-lead text-gray-700"
                      : "mt-4 text-base leading-relaxed text-gray-700"
                  )}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Education */}
            {education && education.length > 0 && (
              <div className="mt-8">
                <h3 className="heading-subsection text-lg">Education</h3>
                <ul className="mt-3 list-disc list-inside space-y-1.5 text-gray-700">
                  {education.map((edu, index) => (
                    <li key={index}>
                      {edu.degree}, {edu.institution}
                      {edu.year ? ` (${edu.year})` : ""}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Memberships */}
            {memberships && memberships.length > 0 && (
              <div className="mt-8">
                <h3 className="heading-subsection text-lg">
                  Professional Memberships
                </h3>
                <ul className="mt-3 list-disc list-inside space-y-1.5 text-gray-700">
                  {memberships.map((membership, index) => (
                    <li key={index}>{membership}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA */}
            <div className="mt-8">
              <Link href="/contact" className="btn btn-primary">
                Request an appointment with {lastName}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
