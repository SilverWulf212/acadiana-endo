import type { Metadata } from "next";

import PageHero from "@/app/components/PageHero";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import LocationCard from "@/app/components/LocationCard";
import LocationsBlock from "@/app/components/LocationsBlock";
import CTASection from "@/app/components/CTASection";
import AppointmentForm from "@/app/components/AppointmentForm";
import { LOCATION_LAFAYETTE, PHONE_LAFAYETTE } from "@/app/lib/constants";

// ─── Metadata ─────────────────────────────────────────────────────────────────

const pageTitle =
  "Contact Acadiana Endodontics — Lafayette & New Iberia, LA";
const pageDescription =
  "Request an appointment or contact Acadiana Endodontics. Two locations serving Lafayette and New Iberia, LA. Same-day emergency endodontic care available.";
const ogImage = "/images/office/lafayette-exterior.jpg";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/contact",
    siteName: "Acadiana Endodontics",
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Acadiana Endodontics Lafayette office exterior",
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const phoneHref = `tel:${PHONE_LAFAYETTE.replace(/[^\d+]/g, "")}`;

  return (
    <>
      {/* 1. PAGE HERO ──────────────────────────────────────────────────────── */}
      <PageHero
        title="Contact Us"
        description="Lafayette & New Iberia, LA"
        backgroundImage="/images/office/lafayette-exterior.jpg"
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Contact" },
            ]}
          />
        }
      />

      {/* 2. FORM + LOCATION CARD 7/5 SPLIT ─────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Left: Appointment form (7/12) */}
            <div className="lg:col-span-7">
              <p className="eyebrow">REQUEST AN APPOINTMENT</p>
              <h2 className="heading-section mt-3">
                Tell us how we can help
              </h2>

              <div className="mt-8">
                <AppointmentForm />
              </div>
            </div>

            {/* Right: Lafayette location card with map (5/12) */}
            <div className="lg:col-span-5">
              <LocationCard
                location={LOCATION_LAFAYETTE}
                showMap={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. LOCATIONS BLOCK WITH MAPS ──────────────────────────────────────── */}
      <LocationsBlock
        eyebrow="VISIT US"
        heading="Find us in Acadiana"
        showMaps={true}
      />

      {/* 4. QUIET CTA ──────────────────────────────────────────────────────── */}
      <CTASection
        title="Need immediate help?"
        description="If you're experiencing severe pain or dental trauma, call us during business hours for same-day options."
        primaryCTA={{ label: `Call ${PHONE_LAFAYETTE}`, href: phoneHref }}
        secondaryCTA={{ label: "View patient info", href: "/patient-information" }}
      />
    </>
  );
}
