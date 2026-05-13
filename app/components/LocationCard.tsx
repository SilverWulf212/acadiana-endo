import type { Location } from "@/app/lib/types";
import { cn, getDirectionsUrl, getHoursSummary } from "@/app/lib/utils";
import GoogleMap from "@/app/components/GoogleMap";

type LocationCardProps = {
  location: Location;
  showMap?: boolean;
  variant?: "compact" | "full";
};

function ArrowOut() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5 10a.75.75 0 0 1 .75-.75h6.638L10.23 7.29a.75.75 0 1 1 1.04-1.08l3.5 3.25a.75.75 0 0 1 0 1.08l-3.5 3.25a.75.75 0 1 1-1.04-1.08l2.158-1.96H5.75A.75.75 0 0 1 5 10Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/**
 * Highland-style office card.
 * Server Component.
 */
export default function LocationCard({
  location,
  showMap = false,
  variant = "full",
}: LocationCardProps) {
  const telDigits = location.phone.replace(/[^\d+]/g, "");
  const directionsUrl = getDirectionsUrl(location);
  const hoursSummary = getHoursSummary(location);

  return (
    <article
      className={cn("office-info", variant === "compact" && "p-5")}
    >
      <p className="eyebrow">Location</p>

      <h3 className="heading-subsection mt-2">{location.name} Office</h3>

      <address className="mt-3 not-italic text-gray-700">
        {location.address}
        <br />
        {location.city}, {location.state} {location.zip}
      </address>

      <p className="mt-3">
        <a
          href={`tel:${telDigits}`}
          className="font-medium text-navy-800 transition-colors hover:text-gold-600"
        >
          {location.phone}
        </a>
      </p>

      <p className="mt-2 text-sm text-gray-600">{hoursSummary}</p>

      <p className="mt-4">
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Get directions to ${location.name}`}
          className="inline-flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-wider text-gold-600 hover:text-gold-700"
        >
          Get Directions
          <ArrowOut />
        </a>
      </p>

      {showMap && (
        <div className="mt-5">
          <GoogleMap location={location} />
        </div>
      )}
    </article>
  );
}
