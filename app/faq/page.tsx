import type { Metadata } from "next";

import PageHero from "@/app/components/PageHero";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import IntroBlock from "@/app/components/IntroBlock";
import FAQAccordion from "@/app/components/FAQAccordion";
import { faqs, faqCategories } from "@/app/data/faqs";
import { cn } from "@/app/lib/utils";

// ─── Metadata ─────────────────────────────────────────────────────────────────

const pageTitle = "FAQ — Acadiana Endodontics";
const pageDescription =
  "Answers to common questions about endodontic treatment, procedures, insurance, and referrals at Acadiana Endodontics in Lafayette & New Iberia, LA.";
const ogImage = "/images/general/doctor-patient.jpg";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/faq",
    siteName: "Acadiana Endodontics",
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Endodontist consulting with a patient at Acadiana Endodontics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [ogImage],
  },
};

// ─── FAQ JSON-LD Schema ──────────────────────────────────────────────────────
// Static, sourced from our own data — standard Next.js pattern for structured data.

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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FAQPage() {
  const faqSchema = generateFAQSchema();

  return (
    <>
      {/* FAQ Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. PAGE HERO ──────────────────────────────────────────────────────── */}
      <PageHero
        title="Frequently Asked Questions"
        description="Answers about endodontic care"
        backgroundImage="/images/general/doctor-patient.jpg"
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "FAQ" },
            ]}
          />
        }
      />

      {/* 2. INTRO BLOCK ────────────────────────────────────────────────────── */}
      <IntroBlock eyebrow="BEFORE YOU CALL">
        <p>
          Here&apos;s what patients ask us most often — about treatment,
          billing, and what to expect.
        </p>
      </IntroBlock>

      {/* 3. STACKED FAQ CATEGORIES (single section, tightened rhythm) ─────── */}
      <section className="section">
        <div className="container max-w-3xl">
          {faqCategories.map((category, index) => {
            const categoryFaqs = faqs[category.id];
            if (!categoryFaqs || categoryFaqs.length === 0) return null;

            return (
              <div
                key={category.id}
                id={category.id}
                className={cn("scroll-mt-24", index > 0 && "mt-16")}
              >
                <p className="eyebrow">{category.label.toUpperCase()}</p>
                <h2 className="heading-section mt-3">{category.label}</h2>

                <div className="mt-8">
                  <FAQAccordion faqs={categoryFaqs} />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
