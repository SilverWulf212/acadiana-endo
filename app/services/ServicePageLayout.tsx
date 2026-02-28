import Link from "next/link";
import dynamic from "next/dynamic";
import type { Service } from "@/app/lib/types";
import PageHero from "@/app/components/PageHero";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import CTASection from "@/app/components/CTASection";
import ScrollReveal from "@/app/components/ScrollReveal";

const FAQAccordion = dynamic(
  () => import("@/app/components/FAQAccordion")
);
import { PHONE_LAFAYETTE } from "@/app/lib/constants";

interface ServicePageLayoutProps {
  service: Service;
  whatToExpect: { step: string; description: string }[];
}

export default function ServicePageLayout({
  service,
  whatToExpect,
}: ServicePageLayoutProps) {
  // Split the fullDescription into paragraphs
  const paragraphs = service.fullDescription
    .split("\n\n")
    .filter((p) => p.trim().length > 0);

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <PageHero
        title={service.title}
        description={service.shortDescription}
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: service.title },
            ]}
          />
        }
      >
        <Link
          href="/contact"
          className="btn btn-lg bg-gold-400 text-navy-900 hover:bg-gold-500 hover:shadow-lg hover:shadow-gold-400/25"
        >
          Schedule a Consultation
        </Link>
        <a
          href="tel:+13379810144"
          className="btn btn-lg border-white/25 text-white hover:bg-white/10"
        >
          Call {PHONE_LAFAYETTE}
        </a>
      </PageHero>

      {/* ─── Full Description ─────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <h2 className="heading-section">
                What is {service.title}?
              </h2>
              <div className="accent-bar mt-4" aria-hidden="true" />
            </ScrollReveal>

            <div className="mt-8 space-y-5">
              {paragraphs.map((paragraph, index) => (
                <ScrollReveal key={index} delay={index * 80}>
                  <p className="text-base leading-relaxed text-gray-600 lg:text-lg lg:leading-relaxed">
                    {paragraph}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Benefits ─────────────────────────────────────────────────────── */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="text-center">
                <h2 className="heading-section">
                  Benefits
                </h2>
                <p className="text-lead mt-3">
                  Why patients choose Acadiana Endodontics for {service.title.toLowerCase()}.
                </p>
              </div>
            </ScrollReveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {service.benefits.map((benefit, index) => (
                <ScrollReveal key={index} delay={index * 80}>
                  <div className="flex items-start gap-4 rounded-xl border border-steel-200 bg-white p-5 transition-all duration-200 hover:shadow-md hover:shadow-navy-800/5">
                    {/* Checkmark icon */}
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-4 w-4 text-gold-600"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-base font-medium text-navy-700">
                      {benefit}
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── What to Expect ───────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <div className="text-center">
                <h2 className="heading-section">
                  What to Expect
                </h2>
                <p className="text-lead mt-3">
                  Your visit, step by step.
                </p>
              </div>
            </ScrollReveal>

            <div className="relative mt-12">
              {/* Vertical connector line */}
              <div
                className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-gold-300 via-gold-400 to-gold-200 sm:block"
                aria-hidden="true"
              />

              <div className="space-y-8">
                {whatToExpect.map((item, index) => (
                  <ScrollReveal key={index} delay={index * 120}>
                    <div className="flex gap-5 sm:gap-6">
                      {/* Step number */}
                      <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-gold-400 bg-white font-heading text-lg font-bold text-navy-800 shadow-sm">
                        {index + 1}
                      </div>

                      {/* Content */}
                      <div className="pt-1.5">
                        <h3 className="font-heading text-lg font-semibold text-navy-800">
                          {item.step}
                        </h3>
                        <p className="mt-1.5 text-base leading-relaxed text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────────────── */}
      {service.faqs.length > 0 && (
        <section className="section bg-gray-50">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <ScrollReveal>
                <div className="text-center">
                  <h2 className="heading-section">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-lead mt-3">
                    Common questions about {service.title.toLowerCase()}.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <div className="mt-10">
                  <FAQAccordion faqs={service.faqs} />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ──────────────────────────────────────────────────────────── */}
      <CTASection
        title="Ready to Get Started?"
        description="Our board-certified specialists are here to help you feel comfortable and confident. Schedule your consultation today."
        primaryCTA={{ label: "Schedule a Consultation", href: "/contact" }}
        secondaryCTA={{
          label: `Call ${PHONE_LAFAYETTE}`,
          href: "tel:+13379810144",
        }}
      />
    </>
  );
}
