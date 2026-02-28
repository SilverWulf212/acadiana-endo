import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/app/components/PageHero";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import ServiceCard from "@/app/components/ServiceCard";
import CTASection from "@/app/components/CTASection";
import ScrollReveal from "@/app/components/ScrollReveal";
import { services } from "@/app/data/services";
import { PHONE_LAFAYETTE } from "@/app/lib/constants";

export const metadata: Metadata = {
  title: "Our Endodontic Services",
  description:
    "Comprehensive endodontic services in Lafayette & New Iberia, LA. Root canals, retreatment, apicoectomy, cracked teeth, dental trauma, and CBCT 3D imaging. Call (337) 981-0144.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <PageHero
        title="Our Services"
        description="Comprehensive endodontic care using advanced technology, delivered with precision and compassion by board-certified specialists."
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services" },
            ]}
          />
        }
      />

      {/* ─── Services Grid ────────────────────────────────────────────────── */}
      <section className="section bg-gray-50">
        <div className="container">
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="heading-section">
                Specialized Endodontic Treatment
              </h2>
              <p className="text-lead mt-4">
                From routine root canals to complex microsurgery, our specialists
                provide the full spectrum of endodontic care — all under one roof.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <ScrollReveal key={service.slug} delay={index * 100}>
                <ServiceCard
                  title={service.title}
                  shortDescription={service.shortDescription}
                  slug={service.slug}
                  icon={service.icon}
                  className="h-full"
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Technology Section ────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="rounded-2xl border border-steel-200 bg-white p-8 lg:p-12">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
                  {/* Icon */}
                  <div className="flex shrink-0 items-center justify-center">
                    <div className="rounded-2xl bg-navy-50 p-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-16 w-16 text-navy-600"
                        aria-hidden="true"
                      >
                        <path d="M3 3h5v2H5v3H3V3Zm13 0h5v5h-2V5h-3V3ZM3 16h2v3h3v2H3v-5Zm16 0h2v5h-5v-2h3v-3ZM7 7h10v10H7V7Zm2 2v6h6V9H9Z" />
                      </svg>
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h2 className="heading-subsection">
                      Advanced Technology for Better Outcomes
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-gray-600">
                      Every treatment at Acadiana Endodontics is guided by
                      state-of-the-art technology. Our CBCT 3D imaging provides
                      detailed three-dimensional views of your tooth anatomy with
                      up to 90% less radiation than medical CT scans. Combined
                      with surgical microscopes that magnify the treatment area
                      up to 25x, our specialists can diagnose and treat
                      conditions with unmatched precision.
                    </p>
                    <div className="mt-6">
                      <Link
                        href="/services/cbct-imaging"
                        className="btn btn-outline btn-sm"
                      >
                        Learn About CBCT Imaging
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────────── */}
      <CTASection
        title="Ready to Schedule Your Appointment?"
        description="Our team is here to help. Contact us today to schedule a consultation or get answers to your questions."
        primaryCTA={{ label: "Contact Us", href: "/contact" }}
        secondaryCTA={{
          label: `Call ${PHONE_LAFAYETTE}`,
          href: `tel:+13379810144`,
        }}
      />
    </>
  );
}
