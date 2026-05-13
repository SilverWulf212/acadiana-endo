import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import PageHero from "@/app/components/PageHero";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import IntroBlock from "@/app/components/IntroBlock";
import FeaturedCardRow, {
  type FeaturedCardItem,
} from "@/app/components/FeaturedCardRow";
import CTASection from "@/app/components/CTASection";
import { PHONE_LAFAYETTE } from "@/app/lib/constants";
import { cn } from "@/app/lib/utils";

// ─── Metadata ─────────────────────────────────────────────────────────────────

const pageTitle = "Your First Visit — Acadiana Endodontics";
const pageDescription =
  "What to expect before, during, and after your visit to Acadiana Endodontics — Lafayette & New Iberia, LA. Specialty endodontic care from board-certified specialists.";
const ogImage = "/images/office/hero-consultation.webp";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/patient-information",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/patient-information",
    siteName: "Acadiana Endodontics",
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Consultation room at Acadiana Endodontics",
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

// ─── Anchor Row Helper ────────────────────────────────────────────────────────

type AnchorRowProps = {
  id: string;
  heading: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
  children: React.ReactNode;
};

function AnchorRow({
  id,
  heading,
  image,
  imageAlt,
  reverse = false,
  children,
}: AnchorRowProps) {
  return (
    <section className="section">
      <div className="container">
        <div
          id={id}
          className={cn("component-row scroll-mt-24", reverse && "reverse")}
        >
          {/* Image — always first in DOM */}
          <div className="relative aspect-[5/4] overflow-hidden rounded-xl">
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>

          {/* Copy */}
          <div>
            <h2 className="heading-section">{heading}</h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-gray-700">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PatientInformationPage() {
  const phoneHref = `tel:${PHONE_LAFAYETTE.replace(/[^\d+]/g, "")}`;

  const stepCards: FeaturedCardItem[] = [
    {
      mode: "link",
      title: "Before Your Visit",
      href: "#before",
      image: "/images/general/doctor-patient.jpg",
      imageAlt: "Doctor speaking with a patient",
    },
    {
      mode: "link",
      title: "During Your Appointment",
      href: "#during",
      image: "/images/general/dental-exam.jpg",
      imageAlt: "Endodontist performing an exam",
    },
    {
      mode: "link",
      title: "After Treatment",
      href: "#after",
      image: "/images/general/happy-patient.jpg",
      imageAlt: "Patient smiling after successful treatment",
    },
  ];

  return (
    <>
      {/* 1. PAGE HERO ──────────────────────────────────────────────────────── */}
      <PageHero
        title="Your First Visit"
        description="What to expect at Acadiana Endodontics"
        backgroundImage="/images/office/hero-consultation.webp"
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Patient Information" },
            ]}
          />
        }
      />

      {/* 2. INTRO BLOCK ────────────────────────────────────────────────────── */}
      <IntroBlock eyebrow="WELCOME">
        <p>
          We&apos;re a specialty practice — that means every visit is focused
          exclusively on diagnosing and treating tooth-saving needs. Most
          patients are referred by their general dentist, but we welcome direct
          calls as well.
        </p>
      </IntroBlock>

      {/* 3. THREE-STEP FEATURED CARD ROW ────────────────────────────────────── */}
      <FeaturedCardRow
        eyebrow="THREE STEPS"
        heading="What your visit looks like"
        items={stepCards}
      />

      {/* 4a. BEFORE ─────────────────────────────────────────────────────────── */}
      <AnchorRow
        id="before"
        heading="Before your visit"
        image="/images/general/doctor-patient.jpg"
        imageAlt="Doctor speaking with a patient before treatment"
      >
        <p>
          Please bring a photo ID and your dental insurance card. To save time
          in the office, you can complete the new-patient forms online ahead of
          your visit — head to our{" "}
          <Link
            href="/contact"
            className="font-medium text-navy-800 underline decoration-gold-400 underline-offset-2 transition-colors hover:text-gold-700"
          >
            contact page
          </Link>{" "}
          to get started.
        </p>
        <p>
          We recommend arriving about 10 minutes early so our team can verify
          your information and answer any last-minute questions before your
          appointment begins.
        </p>
      </AnchorRow>

      {/* 4b. DURING ─────────────────────────────────────────────────────────── */}
      <AnchorRow
        id="during"
        heading="During your appointment"
        image="/images/general/dental-exam.jpg"
        imageAlt="Endodontist performing a thorough clinical exam"
        reverse
      >
        <p>
          Your visit starts with a thorough clinical exam. Digital X-rays — and
          a focused CBCT 3D scan when the diagnosis calls for it — let us see
          the tooth&apos;s anatomy in detail before we recommend a path
          forward.
        </p>
        <p>
          We&apos;ll walk through what we find and discuss your treatment plan
          together. The majority of procedures are completed the same day, so
          you can leave with the problem behind you rather than scheduling a
          return trip.
        </p>
      </AnchorRow>

      {/* 4c. AFTER ──────────────────────────────────────────────────────────── */}
      <AnchorRow
        id="after"
        heading="After treatment"
        image="/images/general/happy-patient.jpg"
        imageAlt="Patient smiling after successful endodontic treatment"
      >
        <p>
          Most patients return to normal activity the same day. Any mild
          tenderness is typically manageable with over-the-counter pain
          relievers like ibuprofen or acetaminophen and improves within a few
          days.
        </p>
        <p>
          You&apos;ll follow up with your referring dentist for the final
          restoration (usually a crown) to protect the tooth long-term. If
          questions come up between visits, call us anytime — we&apos;re happy
          to help.
        </p>
      </AnchorRow>

      {/* 5. QUIET CTA ──────────────────────────────────────────────────────── */}
      <CTASection
        title="Questions before your visit?"
        description={`Call us at ${PHONE_LAFAYETTE} or request an appointment online.`}
        primaryCTA={{ label: "Request an Appointment", href: "/contact" }}
        secondaryCTA={{ label: `Call ${PHONE_LAFAYETTE}`, href: phoneHref }}
      />
    </>
  );
}
