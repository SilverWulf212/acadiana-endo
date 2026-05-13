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

      {/* 3. WHY SEE A SPECIALIST ──────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow text-center">A SPECIALIST&apos;S APPROACH</p>
            <h2 className="heading-section mt-3 text-center">
              Why see an endodontist
            </h2>
            <div className="mt-8 space-y-5 text-lead text-gray-700">
              <p>
                Endodontists are dental specialists with two to three years of
                additional training beyond dental school, focused exclusively
                on saving natural teeth. We perform an average of 25 root canal
                treatments each week — most general dentists perform around
                two.
              </p>
              <p>
                That depth of focus translates to faster, more comfortable
                visits and better outcomes for complex cases. We use
                surgical-grade microscopes, 3D cone-beam imaging, and the
                gentlest anesthesia techniques to make treatment routine rather
                than memorable.
              </p>
              <p>
                When your general dentist refers you to us, it&apos;s because
                they want your tooth saved by the practitioner most equipped to
                do it well.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DOCTOR ZIG-ZAG ROWS ───────────────────────────────────────────── */}
      {/* TODO(Task 6 / §12): emit Person schema per doctor */}
      {drFowler && <DoctorCard doctor={drFowler} align="image-left" />}
      {drReaves && <DoctorCard doctor={drReaves} align="image-right" />}

      {/* 5. LOCATIONS ─────────────────────────────────────────────────────── */}
      <LocationsBlock
        eyebrow="VISIT US"
        heading="Two locations across Acadiana"
        showMaps={false}
      />
    </>
  );
}
