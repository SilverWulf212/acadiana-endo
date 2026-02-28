import Link from "next/link";
import { cn } from "@/app/lib/utils";

interface CTABannerProps {
  className?: string;
}

/**
 * Dual-audience CTA banner.
 * Side by side on desktop, stacked on mobile.
 * Left: Patients - "Request an Appointment"
 * Right: Referring Doctors - "Refer a Patient"
 */
export default function CTABanner({ className }: CTABannerProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-gray-50 py-16 lg:py-20",
        className
      )}
    >
      <div className="container">
        <div className="grid gap-8 md:grid-cols-2 md:gap-6">
          {/* Patients CTA */}
          <div className="relative overflow-hidden rounded-2xl bg-navy-800 p-8 text-center lg:p-10">
            {/* Decorative gradient */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-navy-900/60 via-transparent to-navy-700/30"
              aria-hidden="true"
            />
            <div
              className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-gold-400/10"
              aria-hidden="true"
            />

            <div className="relative">
              {/* Icon */}
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold-400/15">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-7 w-7 text-gold-400"
                  aria-hidden="true"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3Zm0 14.2a7.2 7.2 0 0 1-6-3.22c.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 0 1-6 3.22Z" />
                </svg>
              </div>

              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold-400">
                Patients
              </p>
              <h3 className="mb-3 font-heading text-xl font-bold text-white lg:text-2xl">
                Need Endodontic Care?
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-navy-200">
                Our board-certified specialists provide gentle, expert root canal
                therapy and endodontic treatment.
              </p>
              <Link
                href="/contact"
                className="group btn btn-lg relative inline-flex overflow-hidden bg-gold-400 text-navy-900 hover:bg-gold-500 hover:shadow-lg hover:shadow-gold-400/25"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">Request an Appointment</span>
              </Link>
            </div>
          </div>

          {/* Referring Doctors CTA */}
          <div className="relative overflow-hidden rounded-2xl border border-steel-200 bg-white p-8 text-center lg:p-10">
            {/* Decorative element */}
            <div
              className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-navy-50"
              aria-hidden="true"
            />

            <div className="relative">
              {/* Icon */}
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-navy-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-7 w-7 text-navy-600"
                  aria-hidden="true"
                >
                  <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2ZM10 4h4v2h-4V4Zm6 11h-3v3h-2v-3H8v-2h3v-3h2v3h3v2Z" />
                </svg>
              </div>

              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-navy-500">
                Referring Doctors
              </p>
              <h3 className="mb-3 font-heading text-xl font-bold text-navy-800 lg:text-2xl">
                Refer a Patient to Us
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-gray-600">
                Streamlined referral process with same-day scheduling, detailed
                reports, and seamless communication.
              </p>
              <Link
                href="/referring-doctors"
                className="btn btn-lg btn-outline"
              >
                Refer a Patient
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
