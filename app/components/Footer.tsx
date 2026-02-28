import Link from "next/link";
import {
  PRACTICE_NAME,
  PRACTICE_EMAIL,
  PHONE_LAFAYETTE,
  PHONE_NEW_IBERIA,
  LOCATION_LAFAYETTE,
  LOCATION_NEW_IBERIA,
  SERVICE_LINKS,
} from "@/app/lib/constants";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Patient Information", href: "/patient-information" },
  { label: "Referring Doctors", href: "/referring-doctors" },
  { label: "Contact", href: "/contact" },
];

function formatAddress(loc: typeof LOCATION_LAFAYETTE) {
  return `${loc.address}, ${loc.city}, ${loc.state} ${loc.zip}`;
}

function getHoursSummary(loc: typeof LOCATION_LAFAYETTE) {
  const openDays = loc.hours.filter((h) => h.hours !== "Closed");
  if (openDays.length === 0) return "By appointment";
  if (openDays.length === 1) {
    return `${openDays[0].day}: ${openDays[0].hours}`;
  }
  // Check for consecutive days with same hours
  const firstDay = openDays[0].day;
  const lastDay = openDays[openDays.length - 1].day;
  const sameHours = openDays.every((d) => d.hours === openDays[0].hours);
  if (sameHours) {
    return `${firstDay}–${lastDay}: ${openDays[0].hours}`;
  }
  return openDays.map((d) => `${d.day}: ${d.hours}`).join(", ");
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-navy-800 text-white" role="contentinfo">
      {/* Decorative top accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400" />

      <div className="container pt-16 pb-8">
        {/* Columns */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: About */}
          <div>
            <div className="mb-4">
              <span className="font-heading text-xl font-bold tracking-tight text-white">
                Acadiana{" "}
              </span>
              <span className="font-heading text-xl font-light tracking-tight text-gold-400">
                Endodontics
              </span>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-navy-200">
              Serving the Acadiana region with expert endodontic care. Our
              specialists are dedicated to saving your natural teeth with gentle,
              advanced treatment.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-1 text-sm font-medium text-gold-400 transition-colors duration-200 hover:text-gold-300"
            >
              Learn more about us
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="mb-5 font-heading text-sm font-semibold uppercase tracking-widest text-gold-400">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-200 transition-colors duration-200 hover:text-gold-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="mb-5 font-heading text-sm font-semibold uppercase tracking-widest text-gold-400">
              Services
            </h3>
            <ul className="space-y-3">
              {SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-200 transition-colors duration-200 hover:text-gold-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="mb-5 font-heading text-sm font-semibold uppercase tracking-widest text-gold-400">
              Contact
            </h3>

            {/* Lafayette */}
            <div className="mb-5">
              <p className="mb-1 text-sm font-semibold text-white">
                {LOCATION_LAFAYETTE.name} Office
              </p>
              <p className="text-sm text-navy-200">
                {formatAddress(LOCATION_LAFAYETTE)}
              </p>
              <a
                href={`tel:${PHONE_LAFAYETTE.replace(/[^\d+]/g, "")}`}
                className="text-sm text-navy-200 transition-colors duration-200 hover:text-gold-400"
              >
                {PHONE_LAFAYETTE}
              </a>
              <p className="mt-1 text-xs text-navy-300">
                {getHoursSummary(LOCATION_LAFAYETTE)}
              </p>
            </div>

            {/* New Iberia */}
            <div className="mb-5">
              <p className="mb-1 text-sm font-semibold text-white">
                {LOCATION_NEW_IBERIA.name} Office
              </p>
              <p className="text-sm text-navy-200">
                {formatAddress(LOCATION_NEW_IBERIA)}
              </p>
              <a
                href={`tel:${PHONE_NEW_IBERIA.replace(/[^\d+]/g, "")}`}
                className="text-sm text-navy-200 transition-colors duration-200 hover:text-gold-400"
              >
                {PHONE_NEW_IBERIA}
              </a>
              <p className="mt-1 text-xs text-navy-300">
                {getHoursSummary(LOCATION_NEW_IBERIA)}
              </p>
            </div>

            {/* Email */}
            <a
              href={`mailto:${PRACTICE_EMAIL}`}
              className="text-sm text-navy-200 transition-colors duration-200 hover:text-gold-400"
            >
              {PRACTICE_EMAIL}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-navy-700/50 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-navy-300">
              &copy; {currentYear} {PRACTICE_NAME}. All rights reserved.
            </p>
            <p className="text-xs font-medium tracking-wide text-navy-400">
              Proudly Serving Acadiana
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
