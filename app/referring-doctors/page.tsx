import type { Metadata } from "next";

import PageHero from "@/app/components/PageHero";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import ScrollReveal from "@/app/components/ScrollReveal";
import CTASection from "@/app/components/CTASection";
import ReferralForm from "@/app/components/ReferralForm";
import {
  PRACTICE_NAME,
  PRACTICE_EMAIL,
  PHONE_LAFAYETTE,
} from "@/app/lib/constants";
import { cn } from "@/app/lib/utils";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "For Referring Doctors",
  description: `Streamlined referral process for dentists referring patients to ${PRACTICE_NAME}. Submit referrals online, by fax, or by phone. Same-day emergency appointments, detailed treatment reports, and direct doctor-to-doctor communication.`,
  alternates: {
    canonical: "/referring-doctors",
  },
};

// ─── Why Refer Benefits ──────────────────────────────────────────────────────

const benefits = [
  {
    title: "Board-Certified Specialists",
    description:
      "Your patients receive care from fellowship-trained, board-certified endodontists with decades of combined experience.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    title: "Advanced CBCT 3D Imaging",
    description:
      "State-of-the-art cone beam CT technology reveals anatomy that standard radiographs miss, enabling precise diagnosis and treatment planning.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <path d="M3 3h5v2H5v3H3V3Zm13 0h5v5h-2V5h-3V3ZM3 16h2v3h3v2H3v-5Zm16 0h2v5h-5v-2h3v-3ZM7 7h10v10H7V7Zm2 2v6h6V9H9Z" />
      </svg>
    ),
  },
  {
    title: "Same-Day Emergency Appointments",
    description:
      "We prioritize your urgent and emergency referrals. Patients in pain are seen the same day whenever possible.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    title: "Detailed Treatment Reports",
    description:
      "You receive comprehensive post-treatment reports including findings, procedures performed, prognosis, and recommended follow-up care.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z"
          clipRule="evenodd"
        />
        <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
      </svg>
    ),
  },
  {
    title: "Streamlined Referral Process",
    description:
      "Refer patients online, by fax, or by phone. Our dedicated referral coordinator handles scheduling and communication.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 013.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0121 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 017.5 16.125V3.375z" />
        <path d="M15 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0017.25 7.5h-1.875A.375.375 0 0115 7.125V5.25zM4.875 6H6v10.125A3.375 3.375 0 009.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V7.875C3 6.839 3.84 6 4.875 6z" />
      </svg>
    ),
  },
  {
    title: "Doctor-to-Doctor Communication",
    description:
      "Direct access to our endodontists for consultations, case discussions, and treatment coordination. We are always available to discuss your patients.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];

// ─── Referral Process Steps ──────────────────────────────────────────────────

const referralSteps = [
  {
    step: 1,
    title: "Submit a Referral",
    description:
      "Use our online referral form below, call our office directly, or fax the referral to our secure fax line. Whichever method is most convenient for your practice.",
  },
  {
    step: 2,
    title: "We Schedule the Patient",
    description:
      "Our referral coordinator contacts the patient promptly — typically within 1-2 business days. Emergency and urgent referrals are prioritized for same-day scheduling.",
  },
  {
    step: 3,
    title: "Treatment & Communication",
    description:
      "We keep you informed throughout the treatment process. If questions arise during the procedure, we will contact you directly to discuss findings and options.",
  },
  {
    step: 4,
    title: "Detailed Report Sent",
    description:
      "A comprehensive treatment report is sent to your office promptly after the appointment, including clinical findings, procedures performed, radiographs, and follow-up recommendations.",
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ReferringDoctorsPage() {
  const phoneHref = `tel:${PHONE_LAFAYETTE.replace(/[^\d+]/g, "")}`;

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════════
          HERO
          ════════════════════════════════════════════════════════════════════════ */}
      <PageHero
        title="For Referring Doctors"
        description="We value our partnership with referring dentists. Our streamlined process ensures your patients receive expert endodontic care with complete communication back to your office."
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Referring Doctors" },
            ]}
          />
        }
      />

      {/* ════════════════════════════════════════════════════════════════════════
          WHY REFER TO US
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="section bg-white">
        <div className="container">
          <ScrollReveal>
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <div className="accent-bar mx-auto mb-4" />
              <h2 className="heading-section">Why Refer to Us</h2>
              <p className="text-lead mt-4">
                When you refer a patient to {PRACTICE_NAME}, you can trust
                they are receiving the highest standard of endodontic care
                available in Acadiana
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, i) => (
              <ScrollReveal
                key={benefit.title}
                delay={i * 100}
                animation="scale-in"
              >
                <div
                  className={cn(
                    "group flex h-full flex-col rounded-xl border border-steel-100 bg-gray-50 p-8 transition-all duration-300",
                    "hover:-translate-y-1 hover:border-gold-200 hover:bg-white hover:shadow-lg hover:shadow-navy-800/5"
                  )}
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-navy-800 text-gold-400 transition-colors duration-300 group-hover:bg-gold-400 group-hover:text-navy-900">
                    {benefit.icon}
                  </div>
                  <h3 className="mb-3 font-heading text-lg font-bold text-navy-800">
                    {benefit.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          REFERRAL PROCESS
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="section bg-gray-50">
        <div className="container">
          <ScrollReveal>
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <div className="accent-bar mx-auto mb-4" />
              <h2 className="heading-section">How the Referral Process Works</h2>
              <p className="text-lead mt-4">
                A simple, efficient process designed to respect your time and
                ensure the best outcome for your patients
              </p>
            </div>
          </ScrollReveal>

          <div className="mx-auto max-w-4xl">
            <div className="relative">
              {/* Vertical connecting line */}
              <div
                className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-gold-300 via-gold-400 to-gold-300 md:block"
                aria-hidden="true"
              />

              <div className="space-y-8 md:space-y-12">
                {referralSteps.map((item, i) => (
                  <ScrollReveal key={item.step} delay={i * 150}>
                    <div className="flex gap-6 md:gap-8">
                      {/* Step number */}
                      <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy-800 font-heading text-lg font-bold text-gold-400 shadow-lg shadow-navy-800/20">
                        {item.step}
                      </div>

                      {/* Content */}
                      <div className="flex-1 rounded-xl border border-steel-100 bg-white p-6 shadow-sm md:p-8">
                        <h3 className="mb-2 font-heading text-lg font-bold text-navy-800">
                          {item.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          REFERRAL FORM
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="section bg-white" id="referral-form">
        <div className="container">
          <ScrollReveal>
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <div className="accent-bar mx-auto mb-4" />
              <h2 className="heading-section">Submit a Referral</h2>
              <p className="text-lead mt-4">
                Complete the form below to refer a patient. All fields marked
                with an asterisk are required.
              </p>
            </div>
          </ScrollReveal>

          <div className="mx-auto max-w-5xl">
            <div className="grid gap-10 lg:grid-cols-3 lg:gap-14">
              {/* Form — takes 2 columns */}
              <div className="lg:col-span-2">
                <ScrollReveal animation="slide-in-left" delay={100}>
                  <div className="relative rounded-2xl border border-steel-100 bg-gray-50 p-6 shadow-sm sm:p-8 lg:p-10">
                    <ReferralForm />
                  </div>
                </ScrollReveal>
              </div>

              {/* Sidebar — alternative methods */}
              <div className="lg:col-span-1">
                <ScrollReveal animation="slide-in-right" delay={200}>
                  <div className="sticky top-8 space-y-6">
                    {/* Alternative Methods Card */}
                    <div className="rounded-2xl border border-steel-100 bg-gray-50 p-6 shadow-sm">
                      <h3 className="mb-5 font-heading text-lg font-bold text-navy-800">
                        Other Ways to Refer
                      </h3>

                      <div className="space-y-5">
                        {/* Phone */}
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-800">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-5 w-5 text-gold-400"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-navy-700">
                              Call Us
                            </p>
                            <a
                              href={phoneHref}
                              className="text-sm font-medium text-gold-600 transition-colors hover:text-gold-700"
                            >
                              {PHONE_LAFAYETTE}
                            </a>
                          </div>
                        </div>

                        {/* Fax */}
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-800">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-5 w-5 text-gold-400"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7.875 1.5C6.839 1.5 6 2.34 6 3.375v2.99c-.426.053-.851.11-1.274.174-1.454.218-2.476 1.483-2.476 2.917v6.294a3 3 0 003 3h.27l-.575 1.15a.75.75 0 001.342.67L7.2 18.75h9.6l.913 1.82a.75.75 0 001.342-.67l-.575-1.15h.27a3 3 0 003-3V9.456c0-1.434-1.022-2.7-2.476-2.917A48.716 48.716 0 0018 6.366V3.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM16.5 6.205v-2.83A.375.375 0 0016.125 3h-8.25a.375.375 0 00-.375.375v2.83a49.353 49.353 0 019 0zm-9.585 1.56a.75.75 0 01-.67.835 47.568 47.568 0 00-2.085.37.75.75 0 01-.294-1.47 49.015 49.015 0 012.214-.394.75.75 0 01.835.66zM18.34 8.6c-.71-.1-1.423-.189-2.14-.266a.75.75 0 01.14-1.494c.735.069 1.464.16 2.19.274a.75.75 0 01-.19 1.486zM7.5 13.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5h-7.5z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-navy-700">
                              Fax Referral
                            </p>
                            <p className="text-sm text-gray-600">
                              (337) 981-0155
                            </p>
                          </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-800">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-5 w-5 text-gold-400"
                              aria-hidden="true"
                            >
                              <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                              <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-navy-700">
                              Email
                            </p>
                            <a
                              href={`mailto:${PRACTICE_EMAIL}`}
                              className="text-sm font-medium text-gold-600 transition-colors hover:text-gold-700"
                            >
                              {PRACTICE_EMAIL}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Info Card */}
                    <div className="rounded-2xl border border-gold-200 bg-gold-50/50 p-6">
                      <h3 className="mb-3 font-heading text-base font-bold text-navy-800">
                        Emergency Referrals
                      </h3>
                      <p className="text-sm leading-relaxed text-gray-700">
                        For emergency cases, please call our office directly at{" "}
                        <a
                          href={phoneHref}
                          className="font-semibold text-navy-800 underline decoration-gold-400 underline-offset-2 hover:text-gold-700"
                        >
                          {PHONE_LAFAYETTE}
                        </a>
                        . We make every effort to see emergency patients the same day.
                      </p>
                    </div>

                    {/* HIPAA Note */}
                    <div className="rounded-2xl border border-steel-100 bg-gray-50 p-6">
                      <div className="flex items-start gap-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="mt-0.5 h-5 w-5 shrink-0 text-navy-600"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div>
                          <p className="text-sm font-semibold text-navy-700">
                            Secure & HIPAA Compliant
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-gray-500">
                            All referral information is transmitted securely and handled in full compliance with HIPAA privacy regulations.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          CTA
          ════════════════════════════════════════════════════════════════════════ */}
      <CTASection
        title="Have Questions About Referring a Patient?"
        description="Our team is here to assist. Call us directly for consultations, case discussions, or any questions about our referral process."
        primaryCTA={{ label: "Submit a Referral", href: "#referral-form" }}
        secondaryCTA={{
          label: `Call ${PHONE_LAFAYETTE}`,
          href: phoneHref,
        }}
      />
    </>
  );
}
