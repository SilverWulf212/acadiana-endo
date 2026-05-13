import type { Metadata } from "next";

import PageHero from "@/app/components/PageHero";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import IntroBlock from "@/app/components/IntroBlock";
import FeaturedCardRow, {
  type FeaturedCardItem,
} from "@/app/components/FeaturedCardRow";
import ReferralForm from "@/app/components/ReferralForm";

// ─── Metadata ─────────────────────────────────────────────────────────────────

const pageTitle = "For Referring Doctors — Acadiana Endodontics";
const pageDescription =
  "Seamless specialist endodontic care for your patients. Same-day emergencies, detailed reports, and direct doctor-to-doctor access — Lafayette & New Iberia, LA.";
const ogImage = "/images/office/treatment-room.jpg";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/referring-doctors",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/referring-doctors",
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

export default function ReferringDoctorsPage() {
  const infoCards: FeaturedCardItem[] = [
    {
      mode: "info",
      title: "Same-day emergencies",
      image: "/images/general/dental-exam.jpg",
      imageAlt: "Urgent endodontic exam",
      description:
        "We reserve openings for acute pain and trauma every day.",
    },
    {
      mode: "info",
      title: "Detailed reports",
      image: "/images/services/dental-chair.jpg",
      imageAlt: "Diagnostic imaging room",
      description:
        "You receive a written summary with images after every consult.",
    },
    {
      mode: "info",
      title: "Direct doctor line",
      image: "/images/general/doctor-patient.jpg",
      imageAlt: "Endodontist in conversation with a patient",
      description:
        "Reach Dr. Fowler or Dr. Reaves directly when you need a quick consult.",
    },
  ];

  return (
    <>
      {/* 1. PAGE HERO ──────────────────────────────────────────────────────── */}
      <PageHero
        title="For Referring Doctors"
        description="Seamless specialist care for your patients"
        backgroundImage="/images/office/treatment-room.jpg"
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Referring Doctors" },
            ]}
          />
        }
      />

      {/* 2. INTRO BLOCK ────────────────────────────────────────────────────── */}
      <IntroBlock eyebrow="THANK YOU">
        <p>
          We value the trust you place in us when you refer a patient. Our goal
          is simple: provide expert endodontic care, communicate clearly with
          your office, and return your patient ready for restoration.
        </p>
      </IntroBlock>

      {/* 3. THREE INFO CARDS ───────────────────────────────────────────────── */}
      <FeaturedCardRow
        eyebrow="WHAT TO EXPECT"
        heading="How we work with your office"
        items={infoCards}
      />

      {/* 4. REFERRAL FORM ──────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container max-w-2xl">
          <div className="mb-10 text-center sm:mb-14">
            <p className="eyebrow">SUBMIT A REFERRAL</p>
            <h2 className="heading-section mt-3">Refer a patient</h2>
            <div className="accent-bar mx-auto mt-4" />
          </div>

          <ReferralForm />
        </div>
      </section>
    </>
  );
}
