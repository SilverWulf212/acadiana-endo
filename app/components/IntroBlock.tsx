import type { ReactNode } from "react";
import { cn } from "@/app/lib/utils";

type IntroBlockProps = {
  eyebrow?: string;
  heading?: string;
  children: ReactNode;
};

/**
 * Centered intro block: optional eyebrow + optional H2 + body slot.
 * Server Component.
 */
export default function IntroBlock({
  eyebrow,
  heading,
  children,
}: IntroBlockProps) {
  return (
    <section className="section">
      <div className="container">
        <div className="intro-block">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          {heading && (
            <h2 className={cn("heading-section", eyebrow && "mt-3")}>
              {heading}
            </h2>
          )}
          <div className={cn((eyebrow || heading) && "mt-5")}>{children}</div>
        </div>
      </div>
    </section>
  );
}
