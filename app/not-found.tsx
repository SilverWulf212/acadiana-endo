import Link from "next/link";
import { PHONE_LAFAYETTE } from "@/app/lib/constants";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-24">
      {/* 404 number */}
      <p className="font-heading text-[8rem] font-extrabold leading-none tracking-tight text-navy-200 sm:text-[10rem]">
        404
      </p>

      {/* Message */}
      <h1 className="heading-section mt-2 text-center">Page Not Found</h1>
      <p className="text-lead mt-4 max-w-md text-center">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      {/* Navigation suggestions */}
      <nav className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link href="/" className="btn btn-primary">
          Go Home
        </Link>
        <Link href="/services" className="btn btn-outline">
          Our Services
        </Link>
        <Link href="/contact" className="btn btn-ghost">
          Contact Us
        </Link>
      </nav>

      {/* Phone CTA */}
      <p className="mt-10 text-center text-sm text-gray-500">
        Need immediate help?{" "}
        <a
          href={`tel:${PHONE_LAFAYETTE.replace(/\D/g, "")}`}
          className="font-semibold text-navy-700 underline underline-offset-2 hover:text-navy-900"
        >
          Call {PHONE_LAFAYETTE}
        </a>
      </p>
    </div>
  );
}
