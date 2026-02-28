import Link from "next/link";
import { cn } from "@/app/lib/utils";

interface ServiceCardProps {
  title: string;
  shortDescription: string;
  slug: string;
  icon: string;
  className?: string;
}

/**
 * Map icon identifiers to inline SVG elements.
 * Uses simple medical/dental-themed icons.
 */
function ServiceIcon({ icon, className }: { icon: string; className?: string }) {
  const iconClass = cn("h-10 w-10 transition-colors duration-300", className);

  switch (icon) {
    case "tooth":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={iconClass} aria-hidden="true">
          <path d="M12 2c-2.5 0-5 1.5-6 4-1.5 3.5-.5 6 .5 8.5C7.5 17 8 19 8 22h2c0-3 1-5 2-5s2 2 2 5h2c0-3 .5-5 1.5-7.5 1-2.5 2-5 .5-8.5C17 3.5 14.5 2 12 2Z" />
        </svg>
      );
    case "microscope":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={iconClass} aria-hidden="true">
          <path d="M12 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm-1 2v4.5l-3 5.5H5v2h14v-2h-3l-3-5.5V8h-2Zm0 6.12L13.5 18h-3l2.5-3.88Z" />
        </svg>
      );
    case "scan":
    case "cbct":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={iconClass} aria-hidden="true">
          <path d="M3 3h5v2H5v3H3V3Zm13 0h5v5h-2V5h-3V3ZM3 16h2v3h3v2H3v-5Zm16 0h2v5h-5v-2h3v-3ZM7 7h10v10H7V7Zm2 2v6h6V9H9Z" />
        </svg>
      );
    case "surgery":
    case "apicoectomy":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={iconClass} aria-hidden="true">
          <path d="M20.38 8.57l-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 3.35 19a2 2 0 0 0 1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0-.27-10.44ZM10.59 15.41a2 2 0 0 0 2.83 0l5.66-8.49-8.49 5.66a2 2 0 0 0 0 2.83Z" />
        </svg>
      );
    case "cracked":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={iconClass} aria-hidden="true">
          <path d="M12 2c-2.5 0-5 1.5-6 4-.7 1.6-.8 3-.6 4.3L11 8l-2.5 5L12 11l-1.5 5L15 12l-3 1 3.5-4.5-3.5 1 1.6-3.8C14.3 3 13.2 2 12 2Zm.5 12.5L8 22h2c0-3 1-5 2-5s2 2 2 5h2c0-3 .5-5 1.5-7.5.5-1.2.9-2.3 1-3.5l-6 3Z" />
        </svg>
      );
    case "trauma":
    case "emergency":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={iconClass} aria-hidden="true">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2Z" />
        </svg>
      );
    case "retreat":
    case "retreatment":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={iconClass} aria-hidden="true">
          <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0 0 20 12c0-4.42-3.58-8-8-8Zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 0 0 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3Z" />
        </svg>
      );
    default:
      // Fallback: medical cross
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={iconClass} aria-hidden="true">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2Z" />
        </svg>
      );
  }
}

export default function ServiceCard({
  title,
  shortDescription,
  slug,
  icon,
  className,
}: ServiceCardProps) {
  return (
    <Link
      href={`/services/${slug}`}
      className={cn(
        "group flex flex-col items-start rounded-xl border border-steel-200 bg-white p-6 transition-all duration-300 lg:p-8",
        "hover:-translate-y-1 hover:border-gold-300 hover:shadow-lg hover:shadow-navy-800/5",
        className
      )}
    >
      {/* Icon */}
      <div className="mb-4 inline-flex rounded-lg bg-navy-50 p-3 text-navy-600 transition-colors duration-300 group-hover:bg-gold-50 group-hover:text-gold-600">
        <ServiceIcon icon={icon} />
      </div>

      {/* Title */}
      <h3 className="mb-2 font-heading text-lg font-semibold text-navy-800 transition-colors duration-300 group-hover:text-navy-900">
        {title}
      </h3>

      {/* Description */}
      <p className="mb-4 text-sm leading-relaxed text-gray-600">
        {shortDescription}
      </p>

      {/* Learn more */}
      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-navy-600 transition-colors duration-300 group-hover:text-gold-600">
        Learn more
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5 10a.75.75 0 0 1 .75-.75h6.638L10.23 7.29a.75.75 0 1 1 1.04-1.08l3.5 3.25a.75.75 0 0 1 0 1.08l-3.5 3.25a.75.75 0 1 1-1.04-1.08l2.158-1.96H5.75A.75.75 0 0 1 5 10Z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </Link>
  );
}
