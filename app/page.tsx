import type { Metadata } from "next";
import Link from "next/link";

import HeroCarousel from "@/app/components/HeroCarousel";
import StatsStrip from "@/app/components/StatsStrip";
import ScrollReveal from "@/app/components/ScrollReveal";
import ServiceCard from "@/app/components/ServiceCard";
import DoctorCard from "@/app/components/DoctorCard";
import TestimonialCarousel from "@/app/components/TestimonialCarousel";
import CTASection from "@/app/components/CTASection";
import { testimonials } from "@/app/data/testimonials";
import { PHONE_LAFAYETTE } from "@/app/lib/constants";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

// ─── Service Data (inline; will move to data file in Task 5) ──────────────────

const services = [
  {
    title: "Root Canal Therapy",
    slug: "root-canal",
    icon: "tooth",
    shortDescription:
      "Gentle, precise root canal treatment that saves your natural tooth and eliminates pain — often completed in a single visit.",
  },
  {
    title: "Endodontic Retreatment",
    slug: "retreatment",
    icon: "retreatment",
    shortDescription:
      "When a previous root canal needs attention, our specialists can retreat and restore the tooth to full health.",
  },
  {
    title: "Apicoectomy",
    slug: "apicoectomy",
    icon: "apicoectomy",
    shortDescription:
      "A microsurgical procedure to treat persistent infection at the root tip when conventional treatment isn't enough.",
  },
  {
    title: "Cracked Teeth",
    slug: "cracked-teeth",
    icon: "cracked",
    shortDescription:
      "Expert diagnosis and treatment for cracked, fractured, or damaged teeth using advanced imaging technology.",
  },
  {
    title: "Dental Trauma",
    slug: "dental-trauma",
    icon: "trauma",
    shortDescription:
      "Emergency endodontic care for knocked-out, displaced, or injured teeth. Time-sensitive treatment when you need it most.",
  },
  {
    title: "CBCT 3D Imaging",
    slug: "cbct-imaging",
    icon: "cbct",
    shortDescription:
      "State-of-the-art cone beam CT scanning provides detailed 3D images with up to 90% less radiation than medical CT scans.",
  },
];

// ─── Doctor Preview Data ──────────────────────────────────────────────────────

const doctors = [
  {
    name: "Dr. Robert Fowler",
    credentials: "DDS",
    title: "Board-Certified Endodontist",
    bio: "Dr. Fowler is a board-certified endodontist with extensive experience in advanced root canal therapy and microsurgery. A graduate of LSU School of Dentistry, he is dedicated to providing the highest standard of care with a gentle approach.",
    imageUrl: "",
  },
  {
    name: "Dr. James Reaves",
    credentials: "DDS",
    title: "Board-Certified Endodontist",
    bio: "Dr. Reaves brings years of specialized training and a passion for saving natural teeth. His expertise in complex endodontic cases and emergency treatment ensures patients receive exceptional care when they need it most.",
    imageUrl: "",
  },
];

// ─── Homepage ─────────────────────────────────────────────────────────────────

export default function HomePage() {
  const phoneHref = `tel:${PHONE_LAFAYETTE.replace(/[^\d+]/g, "")}`;

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════════
          1. HERO CAROUSEL
          ════════════════════════════════════════════════════════════════════════ */}
      <HeroCarousel />

      {/* ════════════════════════════════════════════════════════════════════════
          2. STATS STRIP
          ════════════════════════════════════════════════════════════════════════ */}
      <StatsStrip />

      {/* ════════════════════════════════════════════════════════════════════════
          3. PROBLEM / SOLUTION — Why Choose a Specialist?
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="section bg-white">
        <div className="container">
          <ScrollReveal>
            <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
              <div className="accent-bar mx-auto mb-4" />
              <h2 className="heading-section">
                Why Choose a Root Canal Specialist?
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Problem side */}
            <ScrollReveal animation="slide-in-left" delay={100}>
              <div className="relative rounded-2xl bg-gray-50 p-8 lg:p-10">
                {/* Red accent */}
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-red-50">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-red-400" aria-hidden="true">
                    <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="heading-subsection mb-4 !text-navy-800">
                  The Problem with General Treatment
                </h3>
                <ul className="space-y-3">
                  {[
                    "Dental anxiety prevents millions from seeking needed care",
                    "General dentists perform root canals occasionally — specialists perform them daily",
                    "Outdated equipment can miss hidden canals and complex anatomy",
                    "Delayed treatment leads to tooth loss, infection, and higher costs",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-5 w-5 shrink-0 text-red-300" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Solution side */}
            <ScrollReveal animation="slide-in-right" delay={200}>
              <div className="relative rounded-2xl border-2 border-gold-200 bg-gold-50/50 p-8 lg:p-10">
                {/* Gold accent */}
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gold-100">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-gold-600" aria-hidden="true">
                    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="heading-subsection mb-4 !text-navy-800">
                  The Acadiana Endodontics Difference
                </h3>
                <ul className="space-y-3">
                  {[
                    "Board-certified specialists who focus exclusively on saving teeth",
                    "Advanced CBCT 3D imaging reveals what standard X-rays miss",
                    "Gentle approach with modern anesthesia — most patients feel no pain",
                    "Two convenient locations serving Lafayette and New Iberia",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-navy-700">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" aria-hidden="true">
                        <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          4. SERVICES GRID
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="section bg-gray-50">
        <div className="container">
          <ScrollReveal>
            <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
              <div className="accent-bar mx-auto mb-4" />
              <h2 className="heading-section">Our Services</h2>
              <p className="text-lead mt-4">
                Comprehensive endodontic care with advanced technology and a
                gentle touch
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <ScrollReveal key={service.slug} delay={i * 100} animation="scale-in">
                <ServiceCard
                  title={service.title}
                  shortDescription={service.shortDescription}
                  slug={service.slug}
                  icon={service.icon}
                />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={600}>
            <div className="mt-12 text-center">
              <Link
                href="/services"
                className="btn btn-outline btn-lg"
              >
                View All Services
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          5. MEET OUR DOCTORS
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="section bg-white">
        <div className="container">
          <ScrollReveal>
            <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
              <div className="accent-bar mx-auto mb-4" />
              <h2 className="heading-section">Meet Our Doctors</h2>
              <p className="text-lead mt-4">
                Our board-certified endodontists combine decades of expertise
                with genuine compassion for every patient
              </p>
            </div>
          </ScrollReveal>

          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            {doctors.map((doctor, i) => (
              <ScrollReveal key={doctor.name} delay={i * 150} animation="fade-up">
                <DoctorCard
                  name={doctor.name}
                  credentials={doctor.credentials}
                  title={doctor.title}
                  bio={doctor.bio}
                  imageUrl={doctor.imageUrl}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          6. TECHNOLOGY SHOWCASE
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Text column */}
            <ScrollReveal animation="slide-in-left">
              <div>
                <div className="accent-bar mb-4" />
                <h2 className="heading-section mb-6">
                  State-of-the-Art Technology
                </h2>
                <p className="text-lead mb-8">
                  Our CBCT 3D imaging system provides detailed, three-dimensional
                  views of your teeth and surrounding structures — revealing
                  hidden canals, fractures, and infections that traditional X-rays
                  can miss.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    {
                      title: "Up to 90% Less Radiation",
                      desc: "Significantly lower dose compared to traditional medical CT scans",
                    },
                    {
                      title: "Precise 3D Visualization",
                      desc: "See every angle of the tooth structure for accurate diagnosis",
                    },
                    {
                      title: "Faster, More Accurate Treatment",
                      desc: "Better imaging means fewer surprises and better outcomes",
                    },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-100">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-gold-600" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-heading text-sm font-semibold text-navy-800">
                          {item.title}
                        </p>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/services/cbct-imaging"
                  className="btn btn-primary"
                >
                  Learn More About CBCT
                </Link>
              </div>
            </ScrollReveal>

            {/* Image placeholder column */}
            <ScrollReveal animation="slide-in-right" delay={150}>
              <div className="relative">
                {/* Decorative frame */}
                <div className="absolute -inset-4 rounded-2xl border-2 border-dashed border-gold-200/60" />
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-100 via-navy-50 to-steel-100 p-12 lg:p-16">
                  <div className="flex flex-col items-center justify-center text-center">
                    {/* CBCT icon */}
                    <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-white/80 shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-12 w-12 text-navy-600" aria-hidden="true">
                        <path d="M3 3h5v2H5v3H3V3Zm13 0h5v5h-2V5h-3V3ZM3 16h2v3h3v2H3v-5Zm16 0h2v5h-5v-2h3v-3ZM7 7h10v10H7V7Zm2 2v6h6V9H9Z" />
                      </svg>
                    </div>
                    <p className="font-heading text-lg font-semibold text-navy-700">
                      CBCT 3D Imaging
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                      Advanced cone beam computed tomography
                    </p>
                    {/* Decorative scanning lines */}
                    <div className="mt-8 w-full space-y-2">
                      {Array.from({ length: 5 }, (_, i) => (
                        <div
                          key={i}
                          className="mx-auto h-0.5 rounded-full bg-navy-200/60"
                          style={{ width: `${80 - i * 12}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          7. TESTIMONIALS
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="section bg-white">
        <div className="container">
          <ScrollReveal>
            <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
              <div className="accent-bar mx-auto mb-4" />
              <h2 className="heading-section">What Our Patients Say</h2>
              <p className="text-lead mt-4">
                Real reviews from real patients — see why Acadiana trusts us with
                their smiles
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <TestimonialCarousel testimonials={testimonials} />
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          8. FOR REFERRING DOCTORS
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-navy-800 py-16 lg:py-24">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900/80 via-transparent to-navy-700/40" />
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-gold-400/5" />
        <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-gold-400/5" />

        <div className="container relative">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Text */}
            <ScrollReveal animation="slide-in-left">
              <div>
                <div className="mb-4 h-1 w-12 rounded-full bg-gold-400" />
                <h2 className="heading-section mb-6 !text-white">
                  For Referring Doctors
                </h2>
                <p className="mb-8 text-lg leading-relaxed text-navy-200">
                  We value our relationships with referring dentists and make the
                  referral process as seamless as possible. Your patients are in
                  expert hands.
                </p>
                <ul className="space-y-4">
                  {[
                    "Same-day emergency appointments available",
                    "Detailed treatment reports sent promptly",
                    "Easy online and fax referral options",
                    "Direct line for doctor-to-doctor consultations",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-navy-100"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 shrink-0 text-gold-400" aria-hidden="true">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* CTA card */}
            <ScrollReveal animation="slide-in-right" delay={150}>
              <div className="rounded-2xl border border-navy-600/50 bg-navy-700/50 p-8 text-center backdrop-blur-sm lg:p-10">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-400/10">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-gold-400" aria-hidden="true">
                    <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 013.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0121 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 017.5 16.125V3.375z" />
                    <path d="M15 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0017.25 7.5h-1.875A.375.375 0 0115 7.125V5.25zM4.875 6H6v10.125A3.375 3.375 0 009.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V7.875C3 6.839 3.84 6 4.875 6z" />
                  </svg>
                </div>
                <h3 className="mb-3 font-heading text-xl font-bold text-white">
                  Streamlined Referral Process
                </h3>
                <p className="mb-8 text-sm leading-relaxed text-navy-200">
                  Our dedicated referral coordinator ensures a smooth experience for
                  both you and your patients. We keep you informed every step of the
                  way.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Link
                    href="/referring-doctors"
                    className="btn btn-lg bg-gold-400 text-navy-900 hover:bg-gold-500"
                  >
                    Refer a Patient
                  </Link>
                  <a
                    href={phoneHref}
                    className="btn btn-lg border-white/25 text-white hover:bg-white/10"
                  >
                    Call Us Directly
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          9. INSURANCE / PAYMENT STRIP
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="border-y border-steel-100 bg-gray-50 py-12 lg:py-16">
        <div className="container">
          <ScrollReveal>
            <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
              {/* Left text */}
              <div>
                <h2 className="font-heading text-xl font-bold text-navy-800 lg:text-2xl">
                  We Accept Most Major Insurance Plans
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Our team will help verify your coverage and maximize your
                  benefits. CareCredit financing also available.
                </p>
              </div>

              {/* Insurance logos placeholder */}
              <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-8">
                {[
                  "Delta Dental",
                  "Cigna",
                  "Aetna",
                  "MetLife",
                  "CareCredit",
                ].map((name) => (
                  <div
                    key={name}
                    className="flex h-12 items-center justify-center rounded-lg border border-steel-200 bg-white px-4 text-xs font-medium text-gray-500 shadow-sm"
                  >
                    {name}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          10. FINAL CTA
          ════════════════════════════════════════════════════════════════════════ */}
      <CTASection
        title="Ready to Save Your Smile?"
        description="Our specialists are here to help. Schedule your appointment today or call us for immediate assistance."
        primaryCTA={{ label: "Request Appointment", href: "/contact" }}
        secondaryCTA={{ label: "Call (337) 981-0144", href: "tel:3379810144" }}
      />
    </>
  );
}
