import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";

import PageHero from "@/app/components/PageHero";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import ScrollReveal from "@/app/components/ScrollReveal";

const FAQAccordion = dynamic(
  () => import("@/app/components/FAQAccordion")
);
import { faqs, faqCategories } from "@/app/data/faqs";
import { PRACTICE_NAME, PHONE_LAFAYETTE } from "@/app/lib/constants";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: `Find answers to common questions about root canal treatment, insurance, payment options, and what to expect at ${PRACTICE_NAME}. Can't find what you're looking for? Call (337) 981-0144.`,
  alternates: {
    canonical: "/faq",
  },
};

// ─── Category Icons ───────────────────────────────────────────────────────────

function CategoryIcon({ icon, className }: { icon: string; className?: string }) {
  switch (icon) {
    case "info":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={className}
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
            clipRule="evenodd"
          />
        </svg>
      );
    case "tooth":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
            clipRule="evenodd"
          />
        </svg>
      );
    case "card":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={className}
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M2.5 4A1.5 1.5 0 001 5.5V6h18v-.5A1.5 1.5 0 0017.5 4h-15zM19 8.5H1v6A1.5 1.5 0 002.5 16h15a1.5 1.5 0 001.5-1.5v-6zM3 13.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm4.75-.75a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z"
            clipRule="evenodd"
          />
        </svg>
      );
    case "referral":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={className}
          aria-hidden="true"
        >
          <path d="M10 9a3 3 0 100-6 3 3 0 000 6zM6 8a2 2 0 11-4 0 2 2 0 014 0zM1.49 15.326a.78.78 0 01-.358-.442 3 3 0 014.308-3.516 6.484 6.484 0 00-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 01-2.07-.655zM16.44 15.98a4.97 4.97 0 002.07-.654.78.78 0 00.357-.442 3 3 0 00-4.308-3.517 6.484 6.484 0 011.907 3.96 2.32 2.32 0 01-.026.654zM18 8a2 2 0 11-4 0 2 2 0 014 0zM5.304 16.19a.844.844 0 01-.277-.71 5 5 0 019.947 0 .843.843 0 01-.277.71A6.975 6.975 0 0110 18a6.974 6.974 0 01-4.696-1.81z" />
        </svg>
      );
    default:
      return null;
  }
}

// ─── Generate FAQ JSON-LD Schema ──────────────────────────────────────────────
// NOTE: This uses dangerouslySetInnerHTML for JSON-LD structured data only.
// The content is entirely static, sourced from our own data files — not user input.
// This is the standard Next.js pattern for injecting structured data.

function generateFAQSchema() {
  const allFaqs = Object.values(faqs).flat();

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// ─── FAQ Page ─────────────────────────────────────────────────────────────────

export default function FAQPage() {
  const faqSchema = generateFAQSchema();

  return (
    <>
      {/* FAQ Schema JSON-LD — static data from our own data files, safe for injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ════════════════════════════════════════════════════════════════════════
          HERO
          ════════════════════════════════════════════════════════════════════════ */}
      <PageHero
        title="Frequently Asked Questions"
        description="Find answers to common questions about endodontic treatment, insurance, and what to expect at our office"
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "FAQ" },
            ]}
          />
        }
      />

      {/* ════════════════════════════════════════════════════════════════════════
          CATEGORY QUICK-NAV
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="sticky top-0 z-30 border-b border-steel-200 bg-white/95 backdrop-blur-sm">
        <div className="container">
          <nav
            aria-label="FAQ categories"
            className="scrollbar-hide -mx-1.5 flex gap-2 overflow-x-auto py-4"
          >
            {faqCategories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-steel-200 bg-white px-5 py-2.5 text-sm font-semibold text-navy-700 transition-all duration-200 hover:border-gold-300 hover:bg-gold-50 hover:text-navy-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
              >
                <CategoryIcon
                  icon={category.icon}
                  className="h-4 w-4 text-navy-400 transition-colors duration-200 group-hover:text-gold-500"
                />
                {category.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          FAQ SECTIONS
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="mx-auto max-w-3xl space-y-16">
            {faqCategories.map((category, catIndex) => {
              const categoryFaqs = faqs[category.id];
              if (!categoryFaqs || categoryFaqs.length === 0) return null;

              return (
                <ScrollReveal key={category.id} delay={catIndex * 100}>
                  <div
                    id={category.id}
                    className="scroll-mt-24"
                  >
                    {/* Category header */}
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-800">
                        <CategoryIcon
                          icon={category.icon}
                          className="h-5 w-5 text-gold-400"
                        />
                      </div>
                      <h2 className="heading-subsection !text-navy-800">
                        {category.label}
                      </h2>
                    </div>

                    <FAQAccordion faqs={categoryFaqs} />
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          STILL HAVE QUESTIONS? CTA
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="section bg-white">
        <div className="container">
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="accent-bar mx-auto mb-4" />
              <h2 className="heading-section">Still Have Questions?</h2>
              <p className="text-lead mt-4">
                Our friendly team is happy to answer any questions you may have
                about your treatment, insurance coverage, or what to expect.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href={`tel:${PHONE_LAFAYETTE.replace(/[^\d+]/g, "")}`}
                  className="group btn btn-lg relative overflow-hidden bg-navy-800 text-white hover:bg-navy-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Call {PHONE_LAFAYETTE}
                </a>
                <Link
                  href="/contact"
                  className="btn btn-lg border-navy-800 text-navy-800 hover:bg-navy-800 hover:text-white"
                >
                  Contact Us Online
                </Link>
              </div>

              <p className="mt-6 text-sm text-gray-500">
                You can also visit our{" "}
                <Link
                  href="/patient-information"
                  className="font-medium text-gold-600 underline decoration-gold-300 underline-offset-2 transition-colors hover:text-gold-700"
                >
                  Patient Information
                </Link>{" "}
                page for details about insurance, payment options, and
                preparing for your visit.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
