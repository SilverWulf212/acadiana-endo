import type { Metadata } from "next";

import Banner from "@/app/components/Banner";
import IntroBlock from "@/app/components/IntroBlock";
import FeaturedCardRow from "@/app/components/FeaturedCardRow";
import ReviewGrid from "@/app/components/ReviewGrid";
import LocationsBlock from "@/app/components/LocationsBlock";
import CTASection from "@/app/components/CTASection";

import { testimonials } from "@/app/data/testimonials";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:
    "Acadiana Endodontics — Specialist Root Canal Care in Lafayette & New Iberia, LA",
  description:
    "Board-certified endodontists in Lafayette and New Iberia, LA. Gentle root canal therapy, retreatment, apicoectomy, and microsurgery. Request an appointment online.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Acadiana Endodontics — Specialist Root Canal Care in Lafayette & New Iberia, LA",
    description:
      "Board-certified endodontists in Lafayette and New Iberia, LA. Gentle root canal therapy, retreatment, apicoectomy, and microsurgery. Request an appointment online.",
    images: [
      {
        url: "/images/office/hero-dentist-patient.webp",
      },
    ],
  },
};

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
          label: "Call (337) 981-0144",
          href: "tel:+13379810144",
        }}
        image="/images/office/hero-dentist-patient.webp"
        imageAlt="Dr. Fowler with a patient in the treatment room"
        overlay="left"
        align="left"
        height="full"
      />

      {/* 2. INTRO BLOCK ─────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <IntroBlock eyebrow="BOARD-CERTIFIED ENDODONTISTS">
            <p className="text-lead text-gray-700">
              Dr. Robert Fowler and Dr. James Reaves are members of the American
              Association of Endodontists, serving Acadiana with advanced root
              canal therapy, retreatment, and microsurgery. Two convenient
              locations, focused exclusively on saving your natural teeth.
            </p>
          </IntroBlock>
        </div>
      </section>

      {/* 3. ENTRY POINTS — What to expect ──────────────────────────────────── */}
      <FeaturedCardRow
        eyebrow="GETTING STARTED"
        heading="What to expect"
        items={[
          {
            mode: "link",
            title: "Your First Visit",
            href: "/patient-information",
            image: "/images/office/hero-consultation.webp",
            imageAlt: "Welcoming consultation room at Acadiana Endodontics",
          },
          {
            mode: "link",
            title: "Advanced Technology",
            href: "/services/cbct-imaging",
            image: "/images/services/dental-chair.jpg",
            imageAlt: "Modern dental chair and imaging equipment",
          },
          {
            mode: "link",
            title: "Meet Our Doctors",
            href: "/about",
            image: "/images/office/hero-dentist-patient.webp",
            imageAlt: "Dr. Fowler with a patient",
          },
        ]}
      />

      {/* 4. PROCEDURE SPOTLIGHTS — Treatments we provide ───────────────────── */}
      <FeaturedCardRow
        eyebrow="OUR SPECIALTIES"
        heading="Treatments we provide"
        items={[
          {
            mode: "link",
            title: "Root Canal Therapy",
            href: "/services/root-canal",
            image: "/images/general/dental-exam.jpg",
            imageAlt: "Endodontist examining a patient",
          },
          {
            mode: "link",
            title: "Cracked Teeth",
            href: "/services/cracked-teeth",
            image: "/images/services/dental-xray.jpg",
            imageAlt: "Dental X-ray showing a cracked tooth",
          },
          {
            mode: "link",
            title: "Apicoectomy",
            href: "/services/apicoectomy",
            image: "/images/services/treatment-room.jpg",
            imageAlt: "Surgical treatment room",
          },
        ]}
      />

      {/* 5. PATIENT REVIEWS ─────────────────────────────────────────────────── */}
      <ReviewGrid
        eyebrow="WHAT OUR PATIENTS SAY"
        heading="Care, in their own words"
        testimonials={testimonials}
        columns={2}
      />

      {/* 6. LOCATIONS ───────────────────────────────────────────────────────── */}
      <LocationsBlock
        eyebrow="VISIT US"
        heading="Two locations across Acadiana"
        showMaps={false}
      />

      {/* 7. FINAL CTA (existing component; quieted further in Task 6) ──────── */}
      <CTASection
        title="Ready to save your tooth?"
        description="Request an appointment online, or call us during business hours."
        primaryCTA={{ label: "Request an Appointment", href: "/contact" }}
        secondaryCTA={{ label: "Call (337) 981-0144", href: "tel:+13379810144" }}
      />
    </>
  );
}
