import type { Metadata } from "next";
import Link from "next/link";

import PageHero from "@/app/components/PageHero";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import ScrollReveal from "@/app/components/ScrollReveal";
import CTASection from "@/app/components/CTASection";
import { acceptedInsurance, paymentMethods } from "@/app/data/insurance";
import {
  PRACTICE_NAME,
  PHONE_LAFAYETTE,
} from "@/app/lib/constants";
import { cn } from "@/app/lib/utils";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Patient Information",
  description: `Everything you need to know before your visit to ${PRACTICE_NAME}. Learn about what to expect, accepted insurance plans, payment options, and pre- and post-operative care instructions.`,
  alternates: {
    canonical: "/patient-information",
  },
};

// ─── Journey Steps Data ────────────────────────────────────────────────────────

const journeySteps = [
  {
    step: 1,
    title: "Schedule Your Visit",
    description:
      "Call our office or request an appointment online. Our friendly staff will find a convenient time and answer any questions you may have. Emergency appointments are often available same-day.",
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
          d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    step: 2,
    title: "Your First Appointment",
    description:
      "We'll review your dental and medical history, take any necessary imaging including CBCT 3D scans, perform a thorough examination, and provide a clear diagnosis with treatment options.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <path d="M11.625 16.5a1.875 1.875 0 100-3.75 1.875 1.875 0 000 3.75z" />
        <path
          fillRule="evenodd"
          d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm6 16.5c.66 0 1.277-.19 1.797-.518l1.048 1.048a.75.75 0 001.06-1.06l-1.048-1.048A3.375 3.375 0 1011.625 18z"
          clipRule="evenodd"
        />
        <path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />
      </svg>
    ),
  },
  {
    step: 3,
    title: "Gentle Treatment",
    description:
      "Using advanced anesthesia, surgical microscopes, and state-of-the-art techniques, your procedure will be comfortable and efficient. Most treatments are completed in a single visit.",
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
          d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    step: 4,
    title: "Follow-Up Care",
    description:
      "We'll provide detailed post-operative instructions and coordinate with your general dentist for any follow-up restoration. Our team is available if you have any questions during recovery.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
      </svg>
    ),
  },
];

// ─── Pre/Post-Op Data ──────────────────────────────────────────────────────────

const preOpInstructions = [
  "Take all regular medications as prescribed unless directed otherwise",
  "Eat a normal meal before your appointment — you may be numb for several hours after",
  "Inform us of any changes to your medical history or medications",
  "If you experience dental anxiety, let us know so we can accommodate you",
  "Avoid alcohol for 24 hours prior to your appointment",
];

const postOpInstructions = [
  "Take any prescribed medications as directed",
  "Over-the-counter ibuprofen or acetaminophen can help manage mild soreness",
  "Avoid chewing on the treated side until your permanent restoration is placed",
  "Mild tenderness is normal for a few days and will gradually improve",
  "Contact our office immediately if you experience severe pain, swelling, or fever",
  "Follow up with your general dentist within 2-4 weeks for a permanent crown",
];

// ─── Payment Icon Helper ───────────────────────────────────────────────────────

function PaymentIcon({ method }: { method: string }) {
  // Credit card icon for card-type payments
  if (["Visa", "MasterCard", "Discover"].includes(method)) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5 text-navy-500"
        aria-hidden="true"
      >
        <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z" />
        <path
          fillRule="evenodd"
          d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-18 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
          clipRule="evenodd"
        />
      </svg>
    );
  }
  // Cash/check icon
  if (["Cash", "Check"].includes(method)) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5 text-navy-500"
        aria-hidden="true"
      >
        <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
        <path
          fillRule="evenodd"
          d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
          clipRule="evenodd"
        />
      </svg>
    );
  }
  // CareCredit / financing icon
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5 text-navy-500"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM9 7.5A.75.75 0 009 9h1.5c.98 0 1.813.626 2.122 1.5H9A.75.75 0 009 12h3.622a2.251 2.251 0 01-2.122 1.5H9a.75.75 0 00-.53 1.28l3 3a.75.75 0 101.06-1.06L10.81 14h.69a3.75 3.75 0 003.75-3.75V10.5A.75.75 0 0014.5 10h-.128A3.744 3.744 0 0010.5 7.5H9z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// ─── Patient Information Page ─────────────────────────────────────────────────

export default function PatientInformationPage() {
  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════════
          HERO
          ════════════════════════════════════════════════════════════════════════ */}
      <PageHero
        title="Patient Information"
        description="Everything you need to know to prepare for your visit. We're committed to making your experience as comfortable and seamless as possible."
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Patient Information" },
            ]}
          />
        }
      />

      {/* ════════════════════════════════════════════════════════════════════════
          WHAT TO EXPECT — Journey Steps
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="section bg-white">
        <div className="container">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <div className="accent-bar mx-auto mb-4" />
              <h2 className="heading-section">What to Expect</h2>
              <p className="text-lead mt-4">
                From your first call to your follow-up visit, here&apos;s what
                your journey with us looks like
              </p>
            </div>
          </ScrollReveal>

          <div className="relative mt-16">
            {/* Vertical connector line (desktop) */}
            <div
              className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-gold-200 via-gold-400 to-gold-200 lg:block"
              aria-hidden="true"
            />

            <div className="space-y-12 lg:space-y-0">
              {journeySteps.map((item, index) => {
                const isEven = index % 2 === 0;

                return (
                  <ScrollReveal
                    key={item.step}
                    animation={isEven ? "slide-in-left" : "slide-in-right"}
                    delay={index * 120}
                  >
                    <div
                      className={cn(
                        "relative lg:grid lg:grid-cols-2 lg:gap-16 lg:py-8",
                        !isEven && "lg:direction-rtl"
                      )}
                    >
                      {/* Timeline node (desktop) */}
                      <div
                        className="absolute left-1/2 top-10 z-10 hidden h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-navy-800 text-sm font-bold text-gold-400 shadow-lg lg:flex"
                        aria-hidden="true"
                      >
                        {item.step}
                      </div>

                      {/* Card */}
                      <div
                        className={cn(
                          "group relative rounded-2xl border border-steel-100 bg-gray-50 p-8 transition-all duration-300",
                          "hover:-translate-y-1 hover:border-gold-200 hover:bg-white hover:shadow-xl hover:shadow-navy-800/5",
                          isEven ? "lg:col-start-1" : "lg:col-start-2"
                        )}
                      >
                        {/* Step number (mobile) */}
                        <div className="mb-4 flex items-center gap-4 lg:hidden">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-800 text-sm font-bold text-gold-400">
                            {item.step}
                          </div>
                          <h3 className="heading-subsection !text-navy-800">
                            {item.title}
                          </h3>
                        </div>

                        {/* Icon + Title (desktop) */}
                        <div className="hidden lg:block">
                          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-navy-800 text-gold-400 transition-colors duration-300 group-hover:bg-gold-400 group-hover:text-navy-900">
                            {item.icon}
                          </div>
                          <h3 className="heading-subsection !text-navy-800">
                            {item.title}
                          </h3>
                        </div>

                        <p className="mt-3 text-base leading-relaxed text-gray-600 lg:mt-4">
                          {item.description}
                        </p>
                      </div>

                      {/* Empty column for layout balance */}
                      <div className="hidden lg:block" />
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          INSURANCE & PAYMENT
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="section bg-gray-50">
        <div className="container">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <div className="accent-bar mx-auto mb-4" />
              <h2 className="heading-section">Insurance & Payment</h2>
              <p className="text-lead mt-4">
                We accept most major dental insurance plans and offer flexible
                payment options to make your care accessible
              </p>
            </div>
          </ScrollReveal>

          {/* Insurance Grid */}
          <ScrollReveal delay={150}>
            <div className="mx-auto mt-12 max-w-4xl">
              <h3 className="mb-6 text-center font-heading text-sm font-bold uppercase tracking-widest text-navy-600">
                Accepted Insurance Plans
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {acceptedInsurance.map((name) => (
                  <span
                    key={name}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border border-steel-200 bg-white px-5 py-2.5",
                      "text-sm font-medium text-navy-700 transition-all duration-200",
                      "hover:border-gold-300 hover:bg-gold-50 hover:shadow-sm"
                    )}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4 shrink-0 text-gold-500"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {name}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-center text-sm text-gray-500">
                Don&apos;t see your plan listed? Contact us — we work with many
                additional providers.
              </p>
            </div>
          </ScrollReveal>

          {/* Payment Methods + CareCredit */}
          <div className="mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-2">
            {/* Payment Methods */}
            <ScrollReveal delay={200} animation="slide-in-left">
              <div className="h-full rounded-2xl border border-steel-100 bg-white p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5 text-gold-400"
                      aria-hidden="true"
                    >
                      <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z" />
                      <path
                        fillRule="evenodd"
                        d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-18 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-navy-800">
                    Payment Methods
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {paymentMethods.map((method) => (
                    <div
                      key={method}
                      className="flex items-center gap-2.5 rounded-lg border border-steel-100 bg-gray-50 px-4 py-3 transition-colors duration-200 hover:border-gold-200 hover:bg-gold-50"
                    >
                      <PaymentIcon method={method} />
                      <span className="text-sm font-medium text-navy-700">
                        {method}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Cash discount callout */}
                <div className="mt-6 flex items-start gap-3 rounded-xl bg-gold-50 p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="mt-0.5 h-5 w-5 shrink-0 text-gold-600"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm font-medium text-navy-800">
                    <span className="font-bold text-gold-700">
                      5% discount
                    </span>{" "}
                    for payment by cash or check at the time of service
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* CareCredit Highlight */}
            <ScrollReveal delay={300} animation="slide-in-right">
              <div className="relative h-full overflow-hidden rounded-2xl border border-gold-200 bg-gradient-to-br from-navy-800 via-navy-800 to-navy-900 p-8">
                {/* Decorative glow */}
                <div
                  className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold-400/10 blur-3xl"
                  aria-hidden="true"
                />
                <div
                  className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-gold-400/5 blur-2xl"
                  aria-hidden="true"
                />

                <div className="relative">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5 text-navy-900"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM9 7.5A.75.75 0 009 9h1.5c.98 0 1.813.626 2.122 1.5H9A.75.75 0 009 12h3.622a2.251 2.251 0 01-2.122 1.5H9a.75.75 0 00-.53 1.28l3 3a.75.75 0 101.06-1.06L10.81 14h.69a3.75 3.75 0 003.75-3.75V10.5A.75.75 0 0014.5 10h-.128A3.744 3.744 0 0010.5 7.5H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <h3 className="font-heading text-lg font-bold text-white">
                      CareCredit Financing
                    </h3>
                  </div>

                  <p className="text-base leading-relaxed text-navy-200">
                    CareCredit offers flexible monthly payment plans with
                    promotional no-interest periods, making it easy to get the
                    care you need now and pay over time.
                  </p>

                  <ul className="mt-6 space-y-3">
                    {[
                      "No-interest plans available for 6, 12, or 18 months",
                      "Easy application with same-day approval",
                      "Use for the whole family at thousands of providers",
                      "Manage your account and payments online",
                    ].map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="mt-0.5 h-4 w-4 shrink-0 text-gold-400"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm text-navy-100">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-6 text-sm text-navy-300">
                    Ask our staff about CareCredit at your next visit, or apply
                    online before your appointment.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          PRE-OP & POST-OP CARE
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="section bg-white">
        <div className="container">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <div className="accent-bar mx-auto mb-4" />
              <h2 className="heading-section">
                Before & After Your Treatment
              </h2>
              <p className="text-lead mt-4">
                Follow these guidelines to ensure the best possible experience
                and outcome
              </p>
            </div>
          </ScrollReveal>

          <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-2">
            {/* Before Your Appointment */}
            <ScrollReveal delay={100} animation="slide-in-left">
              <div className="h-full rounded-2xl border border-steel-100 bg-gray-50 p-8 transition-all duration-300 hover:border-gold-200 hover:shadow-lg hover:shadow-navy-800/5">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6 text-gold-400"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-navy-800">
                      Before Your Appointment
                    </h3>
                    <p className="text-sm text-gray-500">Pre-operative care</p>
                  </div>
                </div>

                <ul className="space-y-4">
                  {preOpInstructions.map((instruction, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy-800">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-3 w-3 text-gold-400"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-base leading-relaxed text-gray-700">
                        {instruction}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* After Your Appointment */}
            <ScrollReveal delay={200} animation="slide-in-right">
              <div className="h-full rounded-2xl border border-steel-100 bg-gray-50 p-8 transition-all duration-300 hover:border-gold-200 hover:shadow-lg hover:shadow-navy-800/5">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6 text-gold-400"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-navy-800">
                      After Your Appointment
                    </h3>
                    <p className="text-sm text-gray-500">
                      Post-operative care
                    </p>
                  </div>
                </div>

                <ul className="space-y-4">
                  {postOpInstructions.map((instruction, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy-800">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-3 w-3 text-gold-400"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-base leading-relaxed text-gray-700">
                        {instruction}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>

          {/* Emergency note */}
          <ScrollReveal delay={300}>
            <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-gold-200 bg-gold-50 p-6 text-center">
              <p className="text-sm font-medium text-navy-800">
                <span className="font-bold">Questions or concerns?</span>{" "}
                Contact our office at{" "}
                <a
                  href={`tel:${PHONE_LAFAYETTE.replace(/[^\d+]/g, "")}`}
                  className="font-bold text-gold-700 underline decoration-gold-300 underline-offset-2 transition-colors hover:text-gold-800"
                >
                  {PHONE_LAFAYETTE}
                </a>{" "}
                or visit our{" "}
                <Link
                  href="/faq"
                  className="font-bold text-gold-700 underline decoration-gold-300 underline-offset-2 transition-colors hover:text-gold-800"
                >
                  FAQ page
                </Link>{" "}
                for more answers.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          CTA
          ════════════════════════════════════════════════════════════════════════ */}
      <CTASection
        title="Ready to Schedule Your Visit?"
        description="Our team is here to answer your questions and find a convenient time for your appointment."
        primaryCTA={{ label: "Request Appointment", href: "/contact" }}
        secondaryCTA={{
          label: `Call ${PHONE_LAFAYETTE}`,
          href: `tel:${PHONE_LAFAYETTE.replace(/[^\d+]/g, "")}`,
        }}
      />
    </>
  );
}
