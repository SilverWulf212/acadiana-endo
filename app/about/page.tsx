import type { Metadata } from "next";
import Image from "next/image";

import PageHero from "@/app/components/PageHero";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import ScrollReveal from "@/app/components/ScrollReveal";
import CTASection from "@/app/components/CTASection";
import { doctors } from "@/app/data/doctors";
import { PRACTICE_NAME, PHONE_LAFAYETTE } from "@/app/lib/constants";
import { cn } from "@/app/lib/utils";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "About Our Endodontists",
  description: `Meet the board-certified endodontists at ${PRACTICE_NAME}. Dr. Robert Fowler and Dr. James Reaves provide expert root canal therapy, microsurgery, and advanced endodontic care in Lafayette and New Iberia, LA.`,
  alternates: {
    canonical: "/about",
  },
};

// ─── Core Values Data ─────────────────────────────────────────────────────────

const coreValues = [
  {
    title: "Excellence",
    description:
      "We pursue the highest standard of care in every procedure, leveraging advanced technology and ongoing education.",
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
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    title: "Compassion",
    description:
      "We understand dental anxiety and treat every patient with genuine warmth, patience, and understanding.",
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
  {
    title: "Innovation",
    description:
      "We invest in cutting-edge technology including CBCT 3D imaging and surgical microscopes for superior outcomes.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <path d="M12 .75a8.25 8.25 0 00-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 00.577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 01-.937-.171.75.75 0 11.374-1.453 5.261 5.261 0 002.626 0 .75.75 0 11.374 1.452 6.712 6.712 0 01-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 00.577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0012 .75z" />
        <path
          fillRule="evenodd"
          d="M9.013 19.9a.75.75 0 01.877-.597 11.319 11.319 0 004.22 0 .75.75 0 11.28 1.473 12.819 12.819 0 01-4.78 0 .75.75 0 01-.597-.876zM9.754 22.344a.75.75 0 01.824-.668 13.682 13.682 0 002.844 0 .75.75 0 11.156 1.492 15.156 15.156 0 01-3.156 0 .75.75 0 01-.668-.824z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    title: "Trust",
    description:
      "We build lasting relationships through transparency, honest communication, and consistently exceptional results.",
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
];

// ─── Helper: Extract initials ─────────────────────────────────────────────────

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter((part) => !part.endsWith(".") || part.length > 2)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

// ─── Collect unique memberships ───────────────────────────────────────────────

function getUniqueMemberships(): string[] {
  const allMemberships = doctors.flatMap((doc) => doc.memberships);
  return [...new Set(allMemberships)];
}

// ─── About Page ───────────────────────────────────────────────────────────────

export default function AboutPage() {
  const uniqueMemberships = getUniqueMemberships();

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════════
          HERO
          ════════════════════════════════════════════════════════════════════════ */}
      <PageHero
        title="About Acadiana Endodontics"
        description="Board-certified endodontists dedicated to saving your natural teeth with gentle, advanced care"
        backgroundImage="/images/office/lafayette-exterior.jpg"
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "About" },
            ]}
          />
        }
      />

      {/* ════════════════════════════════════════════════════════════════════════
          PRACTICE MISSION
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="section bg-white">
        <div className="container">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <div className="accent-bar mx-auto mb-4" />
              <h2 className="heading-section">Our Mission</h2>
              <p className="text-lead mt-6">
                At {PRACTICE_NAME}, our mission is to provide exceptional
                endodontic care that preserves your natural teeth and protects
                your overall oral health. We combine decades of specialized
                expertise with the most advanced technology available, delivering
                treatment that is precise, gentle, and centered on you.
              </p>
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                We believe every patient deserves to be treated with compassion,
                transparency, and respect. From your first phone call to your
                follow-up visit, our team is committed to making your experience
                as comfortable and stress-free as possible. We take the time to
                listen, educate, and partner with you in your care decisions.
              </p>
            </div>
          </ScrollReveal>

          {/* Office Exterior Photo */}
          <ScrollReveal delay={200}>
            <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-2xl shadow-xl shadow-navy-800/10">
              <Image
                src="/images/office/lafayette-exterior.jpg"
                alt="Acadiana Endodontics office in Lafayette, Louisiana"
                width={1100}
                height={589}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </ScrollReveal>

          {/* Core Values Grid */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 100} animation="scale-in">
                <div
                  className={cn(
                    "group flex flex-col items-center rounded-xl border border-steel-100 bg-gray-50 p-8 text-center transition-all duration-300",
                    "hover:-translate-y-1 hover:border-gold-200 hover:bg-white hover:shadow-lg hover:shadow-navy-800/5"
                  )}
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-navy-800 text-gold-400 transition-colors duration-300 group-hover:bg-gold-400 group-hover:text-navy-900">
                    {value.icon}
                  </div>
                  <h3 className="font-heading text-lg font-bold text-navy-800">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {value.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          MEET OUR SPECIALISTS
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="section bg-gray-50">
        <div className="container">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <div className="accent-bar mx-auto mb-4" />
              <h2 className="heading-section">Meet Our Specialists</h2>
              <p className="text-lead mt-4">
                Our board-certified endodontists combine decades of expertise
                with genuine compassion for every patient
              </p>
            </div>
          </ScrollReveal>

          {/* Doctor Profiles */}
          <div className="space-y-20 lg:space-y-28">
            {doctors.map((doctor, index) => {
              const isEven = index % 2 === 0;
              const hasImage = doctor.imageUrl && doctor.imageUrl.trim() !== "";
              const initials = getInitials(doctor.name);
              const bioParagraphs = doctor.bio.split("\n\n");

              return (
                <ScrollReveal
                  key={doctor.name}
                  animation={isEven ? "slide-in-left" : "slide-in-right"}
                  delay={100}
                >
                  <div
                    className={cn(
                      "grid items-start gap-10 lg:grid-cols-12 lg:gap-16",
                      !isEven && "lg:direction-rtl"
                    )}
                  >
                    {/* Avatar & Quick Info Column */}
                    <div
                      className={cn(
                        "flex flex-col items-center text-center lg:col-span-4",
                        !isEven && "lg:order-2"
                      )}
                    >
                      {/* Large Avatar */}
                      <div className="relative mb-8">
                        {/* Decorative ring */}
                        <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-gold-200 via-gold-100 to-navy-100 opacity-60" />
                        {hasImage ? (
                          <div className="relative h-52 w-52 overflow-hidden rounded-full ring-4 ring-white lg:h-64 lg:w-64">
                            <Image
                              src={doctor.imageUrl}
                              alt={`${doctor.name}, ${doctor.credentials}`}
                              width={512}
                              height={512}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="relative flex h-52 w-52 items-center justify-center rounded-full bg-gradient-to-br from-navy-100 via-navy-50 to-steel-100 ring-4 ring-white lg:h-64 lg:w-64">
                            <span className="font-heading text-5xl font-bold text-navy-400 lg:text-6xl">
                              {initials}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Name */}
                      <h3 className="font-heading text-2xl font-bold text-navy-800 lg:text-3xl">
                        {doctor.name}
                        {doctor.credentials && (
                          <span className="ml-1 text-navy-500">
                            , {doctor.credentials}
                          </span>
                        )}
                      </h3>

                      {/* Title */}
                      <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-gold-600">
                        {doctor.title}
                      </p>

                      {/* Gold accent */}
                      <div
                        className="mt-4 h-1 w-16 rounded-full bg-gold-400"
                        aria-hidden="true"
                      />
                    </div>

                    {/* Bio & Details Column */}
                    <div
                      className={cn(
                        "lg:col-span-8",
                        !isEven && "lg:order-1"
                      )}
                    >
                      {/* Bio paragraphs */}
                      <div className="space-y-4">
                        {bioParagraphs.map((paragraph, pIndex) => (
                          <p
                            key={pIndex}
                            className="text-base leading-relaxed text-gray-700"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      {/* Education & Memberships in a two-column grid */}
                      <div className="mt-10 grid gap-8 sm:grid-cols-2">
                        {/* Education */}
                        <div className="rounded-xl border border-steel-100 bg-white p-6">
                          <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-800">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-5 w-5 text-gold-400"
                                aria-hidden="true"
                              >
                                <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                                <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
                                <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
                              </svg>
                            </div>
                            <h4 className="font-heading text-sm font-bold uppercase tracking-widest text-navy-700">
                              Education
                            </h4>
                          </div>
                          <ul className="space-y-3">
                            {doctor.education.map((edu, eIndex) => (
                              <li
                                key={eIndex}
                                className="flex items-start gap-2.5"
                              >
                                <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                                <div>
                                  <p className="text-sm font-semibold text-navy-800">
                                    {edu.degree}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {edu.institution}
                                  </p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Memberships */}
                        <div className="rounded-xl border border-steel-100 bg-white p-6">
                          <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-800">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-5 w-5 text-gold-400"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <h4 className="font-heading text-sm font-bold uppercase tracking-widest text-navy-700">
                              Memberships
                            </h4>
                          </div>
                          <ul className="space-y-3">
                            {doctor.memberships.map((membership, mIndex) => (
                              <li
                                key={mIndex}
                                className="flex items-start gap-2.5"
                              >
                                <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                                <p className="text-sm text-gray-700">
                                  {membership}
                                </p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          ADVANCED TECHNOLOGY
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Photo */}
            <ScrollReveal animation="slide-in-left">
              <div className="overflow-hidden rounded-2xl shadow-xl shadow-navy-800/10">
                <Image
                  src="/images/office/treatment-room.jpg"
                  alt="Dr. Fowler performing endodontic treatment using a surgical microscope at Acadiana Endodontics"
                  width={1097}
                  height={800}
                  className="h-auto w-full object-cover"
                />
              </div>
            </ScrollReveal>

            {/* Text */}
            <ScrollReveal animation="slide-in-right" delay={150}>
              <div>
                <div className="accent-bar mb-4" />
                <h2 className="heading-section">Advanced Technology</h2>
                <p className="text-lead mt-6">
                  Precision instruments and cutting-edge imaging for the best
                  possible outcomes.
                </p>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-gray-700">
                  <p>
                    At {PRACTICE_NAME}, we invest in the latest endodontic
                    technology to provide our patients with the highest standard of
                    care. Our surgical operating microscopes deliver up to 25x
                    magnification, allowing our specialists to visualize the
                    intricate anatomy of each tooth with extraordinary clarity.
                  </p>
                  <p>
                    Combined with CBCT 3D imaging, digital radiography, and
                    advanced ultrasonic instrumentation, our technology enables us
                    to diagnose complex cases with greater accuracy, perform
                    minimally invasive procedures, and achieve consistently
                    superior results.
                  </p>
                </div>
                <ul className="mt-8 space-y-3">
                  {[
                    "Surgical operating microscopes",
                    "CBCT 3D cone beam imaging",
                    "Digital radiography",
                    "Ultrasonic instrumentation",
                    "Electronic apex locators",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm font-medium text-navy-800">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5 shrink-0 text-gold-500"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          PROFESSIONAL AFFILIATIONS
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="section bg-gray-50">
        <div className="container">
          <ScrollReveal>
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <div className="accent-bar mx-auto mb-4" />
              <h2 className="heading-section">Professional Affiliations</h2>
              <p className="text-lead mt-4">
                Our doctors maintain active memberships with the leading
                professional organizations in dentistry and endodontics
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
              {uniqueMemberships.map((membership) => (
                <span
                  key={membership}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border border-gold-200 bg-gold-50 px-5 py-2.5",
                    "text-sm font-medium text-navy-800 transition-all duration-200",
                    "hover:border-gold-300 hover:bg-gold-100 hover:shadow-sm"
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
                      d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {membership}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          CTA
          ════════════════════════════════════════════════════════════════════════ */}
      <CTASection
        title="Schedule Your Appointment"
        description="Our specialists are ready to provide the expert, compassionate care you deserve. Contact us today to get started."
        primaryCTA={{ label: "Request Appointment", href: "/contact" }}
        secondaryCTA={{
          label: `Call ${PHONE_LAFAYETTE}`,
          href: `tel:${PHONE_LAFAYETTE.replace(/[^\d+]/g, "")}`,
        }}
      />
    </>
  );
}
