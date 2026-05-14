import Image from "next/image";
import dynamic from "next/dynamic";
import type { Service } from "@/app/lib/types";
import PageHero from "@/app/components/PageHero";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import CTASection from "@/app/components/CTASection";
import FeaturedCardRow from "@/app/components/FeaturedCardRow";
import { ServiceSchema, FAQPageSchema } from "@/app/components/SchemaMarkup";
import { services, servicesAsFeaturedCards } from "@/app/data/services";
import { PHONE_LAFAYETTE } from "@/app/lib/constants";

const FAQAccordion = dynamic(() => import("@/app/components/FAQAccordion"));

// Map service slugs to their schema.org procedureType
const PROCEDURE_TYPES: Record<
  string,
  "NoninvasiveProcedure" | "SurgicalProcedure" | undefined
> = {
  "root-canal": "NoninvasiveProcedure",
  retreatment: "NoninvasiveProcedure",
  apicoectomy: "SurgicalProcedure",
};

interface ServicePageLayoutProps {
  service: Service;
}

// SchemaMarkup wiring per plan §12:
// - BreadcrumbList → emitted by <Breadcrumbs> below
// - MedicalWebPage + about=MedicalProcedure → emitted by <ServiceSchema> below
// - FAQPage → emitted by <FAQPageSchema> below (only when service.faqs.length > 0)
// TODO(§12): consider promoting the inner `about` block to a standalone
// MedicalProcedure entity with @id once we have per-procedure detail data
// (sameAs medical refs, expectedPrognosis, etc.).

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="mt-0.5 h-5 w-5 shrink-0 text-gold-500"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function ServicePageLayout({ service }: ServicePageLayoutProps) {
  // Split the fullDescription into paragraphs
  const paragraphs = service.fullDescription
    .split("\n\n")
    .filter((p) => p.trim().length > 0);

  const [introParagraph, ...remainingParagraphs] = paragraphs;

  // Pick up to 3 sibling services for the related row
  const relatedServices = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const relatedCards = servicesAsFeaturedCards(relatedServices);

  return (
    <>
      {/* ─── Service Schema ─────────────────────────────────────────────── */}
      <ServiceSchema
        name={service.title}
        description={service.shortDescription}
        slug={service.slug}
        procedureType={PROCEDURE_TYPES[service.slug]}
      />

      {/* ─── FAQ Page Schema (only if this service has FAQs) ─────────────── */}
      <FAQPageSchema faqs={service.faqs} />

      {/* 1. PAGE HERO ─────────────────────────────────────────────────────── */}
      <PageHero
        title={service.title}
        description={service.shortDescription.split(". ")[0] + "."}
        backgroundImage={service.image}
        overlay={service.heroOverlay ?? "soft"}
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: service.title },
            ]}
          />
        }
      />

      {/* 2. INTRO BLOCK ────────────────────────────────────────────────────── */}
      {introParagraph && (
        <section className="section">
          <div className="container">
            <div className="intro-block">
              <p>{introParagraph}</p>
            </div>
          </div>
        </section>
      )}

      {/* 3. COMPONENT ROW (image + remaining paragraphs) ──────────────────── */}
      {remainingParagraphs.length > 0 && (
        <section className="section bg-gray-50">
          <div className="container">
            <div className="component-row">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-card-soft)]">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="space-y-5">
                {remainingParagraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-base leading-relaxed text-gray-700 lg:text-lg lg:leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. BENEFITS ───────────────────────────────────────────────────────── */}
      {service.benefits.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <div className="text-center">
                <p className="eyebrow">WHY CHOOSE US</p>
                <h2 className="heading-section mt-3">
                  Benefits of {service.title.toLowerCase()} with our specialists
                </h2>
              </div>

              <div className="card-flat mt-10">
                <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {service.benefits.map((benefit, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-base text-navy-800"
                    >
                      <CheckIcon />
                      <span className="leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. FAQ ────────────────────────────────────────────────────────────── */}
      {service.faqs.length > 0 && (
        <section className="section bg-gray-50">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <div className="text-center">
                <p className="eyebrow">FREQUENTLY ASKED</p>
                <h2 className="heading-section mt-3">
                  Questions about {service.title}
                </h2>
              </div>

              <div className="mt-10">
                <FAQAccordion faqs={service.faqs} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. QUIET FINAL CTA ────────────────────────────────────────────────── */}
      <CTASection
        title={`Schedule your ${service.title} consultation`}
        description="Speak with our specialists or request an appointment online — we'll help you understand your options."
        primaryCTA={{ label: "Request an Appointment", href: "/contact" }}
        secondaryCTA={{
          label: `Call ${PHONE_LAFAYETTE}`,
          href: "tel:+13379810144",
        }}
      />

      {/* 7. RELATED SERVICES ───────────────────────────────────────────────── */}
      {relatedCards.length > 0 && (
        <FeaturedCardRow
          eyebrow="RELATED TREATMENTS"
          heading="Explore other services"
          items={relatedCards}
          columns={3}
        />
      )}
    </>
  );
}
