import type { Metadata } from "next";

import PageHero from "@/app/components/PageHero";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import IntroBlock from "@/app/components/IntroBlock";
import FeaturedCardRow from "@/app/components/FeaturedCardRow";
import { services, servicesAsFeaturedCards } from "@/app/data/services";

// ─── Metadata ─────────────────────────────────────────────────────────────────

const pageTitle = "Endodontic Services — Acadiana Endodontics";
const pageDescription =
  "Root canals, retreatment, apicoectomy, cracked teeth, dental trauma, and CBCT 3D imaging — performed by board-certified endodontists in Lafayette and New Iberia, LA.";
const ogImage = "/images/services/treatment-room.jpg";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    type: "website",
    url: "/services",
    siteName: "Acadiana Endodontics",
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Surgical treatment room at Acadiana Endodontics",
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

export default function ServicesPage() {
  const serviceCards = servicesAsFeaturedCards(services);

  return (
    <>
      {/* 1. PAGE HERO ──────────────────────────────────────────────────────── */}
      <PageHero
        title="Endodontic Services"
        backgroundImage="/images/services/treatment-room.jpg"
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services" },
            ]}
          />
        }
      />

      {/* 2. INTRO BLOCK ────────────────────────────────────────────────────── */}
      <IntroBlock eyebrow="WHAT WE TREAT">
        <p>
          Every service below is performed by board-certified endodontists
          using surgical microscopes and CBCT 3D imaging. Click any treatment
          to learn more about how we approach it.
        </p>
      </IntroBlock>

      {/* 3. SERVICES GRID ──────────────────────────────────────────────────── */}
      <FeaturedCardRow items={serviceCards} columns={3} />
    </>
  );
}
