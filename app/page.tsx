import type { Metadata } from "next";

import Banner from "@/app/components/Banner";
import IntroBlock from "@/app/components/IntroBlock";
import FeaturedCardRow from "@/app/components/FeaturedCardRow";
import ReviewGrid from "@/app/components/ReviewGrid";
import LocationsBlock from "@/app/components/LocationsBlock";
import CTASection from "@/app/components/CTASection";

import { testimonials } from "@/app/data/testimonials";
import {
  homeEntryPoints,
  homeProcedureSpotlights,
} from "@/app/data/homeFeatured";
import { PHONE_LAFAYETTE } from "@/app/lib/constants";

// ─── Metadata ─────────────────────────────────────────────────────────────────

const pageTitle =
  "Acadiana Endodontics — Specialist Root Canal Care in Lafayette & New Iberia, LA";
const pageDescription =
  "Board-certified endodontists in Lafayette and New Iberia, LA. Gentle root canal therapy, retreatment, apicoectomy, and microsurgery. Request an appointment online.";
const ogImage = "/images/office/hero-dentist-patient.webp";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Acadiana Endodontics",
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Acadiana Endodontics — Dr. Fowler with a patient in the treatment room",
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

// ─── Phone helpers ───────────────────────────────────────────────────────────

const phoneTelHref = `tel:+1${PHONE_LAFAYETTE.replace(/\D/g, "")}`;
const phoneCtaLabel = `Call ${PHONE_LAFAYETTE}`;

// ─── Homepage ─────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* 1. BANNER ─────────────────────────────────────────────────────────── */}
      <Banner
        eyebrow="LAFAYETTE · NEW IBERIA"
        heading="Acadiana Endodontics"
        tagline="Specialist care for saving your natural teeth — Lafayette and New Iberia, Louisiana."
        primaryCta={{
          label: "Request an Appointment",
          href: "/contact",
        }}
        secondaryCta={{
          label: phoneCtaLabel,
          href: phoneTelHref,
        }}
        image="/images/office/hero-dentist-patient.webp"
        imageAlt="Dr. Fowler with a patient in the treatment room"
        overlay="left-soft"
        align="left"
        height="full"
      />

      {/* 2. INTRO BLOCK ─────────────────────────────────────────────────────── */}
      <IntroBlock eyebrow="BOARD-CERTIFIED ENDODONTISTS">
        <p className="text-lead text-gray-700">
          Dr. Robert Fowler and Dr. James Reaves are members of the American
          Association of Endodontists, serving Acadiana with advanced root
          canal therapy, retreatment, and microsurgery. Two convenient
          locations, focused exclusively on saving your natural teeth.
        </p>
      </IntroBlock>

      {/* 3. ENTRY POINTS — What to expect (cream) ──────────────────────────── */}
      <FeaturedCardRow
        eyebrow="GETTING STARTED"
        heading="What to expect"
        items={homeEntryPoints}
        surface="cream"
      />

      {/* 4. PROCEDURE SPOTLIGHTS — Treatments we provide (white) ────────────── */}
      <FeaturedCardRow
        eyebrow="OUR SPECIALTIES"
        heading="Treatments we provide"
        items={homeProcedureSpotlights}
      />

      {/* 5. PATIENT REVIEWS (cream) ─────────────────────────────────────────── */}
      <ReviewGrid
        eyebrow="WHAT OUR PATIENTS SAY"
        heading="Care, in their own words"
        testimonials={testimonials}
        columns={2}
        surface="cream"
      />

      {/* 6. LOCATIONS (white) ───────────────────────────────────────────────── */}
      <LocationsBlock
        eyebrow="VISIT US"
        heading="Two locations across Acadiana"
        showMaps={false}
      />

      {/* 7. FINAL CTA (cream) ──────────────────────────────────────────────── */}
      <CTASection
        title="Ready to save your tooth?"
        description="Request an appointment online, or call us during business hours."
        primaryCTA={{ label: "Request an Appointment", href: "/contact" }}
        secondaryCTA={{ label: phoneCtaLabel, href: phoneTelHref }}
        className="section-cream"
      />
    </>
  );
}
