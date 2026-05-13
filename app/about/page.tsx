import type { Metadata } from "next";

import PageHero from "@/app/components/PageHero";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import IntroBlock from "@/app/components/IntroBlock";
import DoctorCard from "@/app/components/DoctorCard";
import LocationsBlock from "@/app/components/LocationsBlock";
import { doctors } from "@/app/data/doctors";

// ─── Metadata ─────────────────────────────────────────────────────────────────

const pageTitle =
  "About Acadiana Endodontics — Dr. Robert Fowler & Dr. James Reaves";
const pageDescription =
  "Meet the board-certified endodontists at Acadiana Endodontics in Lafayette & New Iberia, LA. AAE-affiliated specialists with decades of combined experience.";
const ogImage = "/images/office/hero-dentist-patient.webp";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/about",
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

// ─── About Page ───────────────────────────────────────────────────────────────

export default function AboutPage() {
  // Pick doctors by surname so order is deterministic and resilient to data churn.
  const drFowler = doctors.find((d) => d.name.includes("Fowler"));
  const drReaves = doctors.find((d) => d.name.includes("Reaves"));

  return (
    <>
      {/* 1. PAGE HERO ─────────────────────────────────────────────────────── */}
      <PageHero
        title="About Acadiana Endodontics"
        description="Specialists in saving natural teeth — Lafayette & New Iberia, LA"
        backgroundImage="/images/office/hero-dentist-patient.webp"
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "About" },
            ]}
          />
        }
      />

      {/* 2. INTRO BLOCK ───────────────────────────────────────────────────── */}
      <IntroBlock eyebrow="OUR PRACTICE">
        <p>
          Acadiana Endodontics is a specialty practice dedicated exclusively to
          endodontic care. Our two board-certified endodontists — Dr. Robert
          Fowler and Dr. James Reaves — trained at LSU School of Dentistry and
          are active members of the American Association of Endodontists.
          Together they bring decades of experience preserving natural teeth
          across Lafayette, New Iberia, and the surrounding parishes.
        </p>
      </IntroBlock>

      {/* 3. DOCTOR ZIG-ZAG ROWS ───────────────────────────────────────────── */}
      {/* TODO(Task 6 / §12): emit Person schema per doctor */}
      {drFowler && <DoctorCard doctor={drFowler} align="image-left" />}
      {drReaves && <DoctorCard doctor={drReaves} align="image-right" />}

      {/* 4. LOCATIONS ─────────────────────────────────────────────────────── */}
      <LocationsBlock
        eyebrow="VISIT US"
        heading="Two locations across Acadiana"
        showMaps={false}
      />
    </>
  );
}
