import type { Metadata } from "next";
import dynamic from "next/dynamic";

import PageHero from "@/app/components/PageHero";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import ScrollReveal from "@/app/components/ScrollReveal";
import CTASection from "@/app/components/CTASection";
import ContactInfo from "@/app/components/ContactInfo";

const AppointmentForm = dynamic(
  () => import("@/app/components/AppointmentForm")
);
const GoogleMap = dynamic(() => import("@/app/components/GoogleMap"));
import {
  PRACTICE_NAME,
  PRACTICE_EMAIL,
  PHONE_LAFAYETTE,
  PHONE_NEW_IBERIA,
  LOCATION_LAFAYETTE,
  LOCATION_NEW_IBERIA,
} from "@/app/lib/constants";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${PRACTICE_NAME} to request an appointment or ask a question. Two convenient locations in Lafayette and New Iberia, LA. Call (337) 981-0144.`,
  alternates: {
    canonical: "/contact",
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const lafayettePhoneHref = `tel:${PHONE_LAFAYETTE.replace(/[^\d+]/g, "")}`;
  const newIberiaPhoneHref = `tel:${PHONE_NEW_IBERIA.replace(/[^\d+]/g, "")}`;

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <PageHero
        title="Contact Us"
        description="We're here to help. Request an appointment or reach out with any questions."
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Contact" },
            ]}
          />
        }
      />

      {/* ── Main Content: Form + Sidebar ──────────────────────────────────── */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
            {/* Left: Appointment Form (takes 2/3 width on desktop) */}
            <ScrollReveal
              animation="slide-in-left"
              className="lg:col-span-2"
            >
              <div className="rounded-2xl border border-steel-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
                <AppointmentForm />
              </div>
            </ScrollReveal>

            {/* Right: Contact Sidebar (1/3 width on desktop) */}
            <ScrollReveal animation="slide-in-right" delay={200}>
              <div className="space-y-8">
                {/* Lafayette Office Card */}
                <div className="rounded-2xl border border-steel-200 bg-white p-6 shadow-sm">
                  <ContactInfo location={LOCATION_LAFAYETTE} />
                </div>

                {/* New Iberia Office Card */}
                <div className="rounded-2xl border border-steel-200 bg-white p-6 shadow-sm">
                  <ContactInfo location={LOCATION_NEW_IBERIA} />
                </div>

                {/* Email */}
                <div className="rounded-2xl border border-steel-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0 text-navy-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5"
                        aria-hidden="true"
                      >
                        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                      </svg>
                    </div>
                    <div>
                      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-navy-500">
                        Email Us
                      </p>
                      <a
                        href={`mailto:${PRACTICE_EMAIL}`}
                        className="text-sm font-medium text-navy-800 transition-colors duration-200 hover:text-gold-600"
                      >
                        {PRACTICE_EMAIL}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Emergency Callout */}
                <div className="rounded-2xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-orange-50 p-6">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-6 w-6 text-red-500"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-bold text-red-800">
                        Dental Emergency?
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-red-700">
                        Don&apos;t wait. Call us directly for same-day emergency
                        appointments.
                      </p>
                      <div className="mt-3 space-y-2">
                        <a
                          href={lafayettePhoneHref}
                          className="flex items-center gap-2 text-sm font-semibold text-red-800 transition-colors duration-200 hover:text-red-600"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-4 w-4"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Lafayette: {PHONE_LAFAYETTE}
                        </a>
                        <a
                          href={newIberiaPhoneHref}
                          className="flex items-center gap-2 text-sm font-semibold text-red-800 transition-colors duration-200 hover:text-red-600"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-4 w-4"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                          New Iberia: {PHONE_NEW_IBERIA}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Maps Section ──────────────────────────────────────────────────── */}
      <section className="section bg-gray-50">
        <div className="container">
          <ScrollReveal animation="fade-up">
            <div className="mb-10 text-center">
              <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-gold-400" aria-hidden="true" />
              <h2 className="heading-section">Our Locations</h2>
              <p className="mx-auto mt-3 max-w-xl text-lead">
                Two convenient offices serving the Acadiana region.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Lafayette Map */}
            <ScrollReveal animation="slide-in-left" delay={100}>
              <div className="space-y-4">
                <GoogleMap location={LOCATION_LAFAYETTE} />
                <div className="text-center">
                  <h3 className="font-heading text-lg font-bold text-navy-800">
                    Lafayette Office
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {LOCATION_LAFAYETTE.address}, {LOCATION_LAFAYETTE.city},{" "}
                    {LOCATION_LAFAYETTE.state} {LOCATION_LAFAYETTE.zip}
                  </p>
                  <a
                    href={lafayettePhoneHref}
                    className="mt-1 inline-block text-sm font-medium text-navy-700 transition-colors duration-200 hover:text-gold-600"
                  >
                    {PHONE_LAFAYETTE}
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* New Iberia Map */}
            <ScrollReveal animation="slide-in-right" delay={200}>
              <div className="space-y-4">
                <GoogleMap location={LOCATION_NEW_IBERIA} />
                <div className="text-center">
                  <h3 className="font-heading text-lg font-bold text-navy-800">
                    New Iberia Office
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {LOCATION_NEW_IBERIA.address}, {LOCATION_NEW_IBERIA.city},{" "}
                    {LOCATION_NEW_IBERIA.state} {LOCATION_NEW_IBERIA.zip}
                  </p>
                  <a
                    href={newIberiaPhoneHref}
                    className="mt-1 inline-block text-sm font-medium text-navy-700 transition-colors duration-200 hover:text-gold-600"
                  >
                    {PHONE_NEW_IBERIA}
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────────────────── */}
      <CTASection
        title="Prefer to Call?"
        description="Our friendly team is ready to assist you. Call us today to schedule your appointment."
        primaryCTA={{
          label: `Call Lafayette: ${PHONE_LAFAYETTE}`,
          href: lafayettePhoneHref,
        }}
        secondaryCTA={{
          label: `Call New Iberia: ${PHONE_NEW_IBERIA}`,
          href: newIberiaPhoneHref,
        }}
      />
    </>
  );
}
