import { cn } from "@/app/lib/utils";
import type { Location } from "@/app/lib/types";

interface ContactInfoProps {
  location: Location;
  className?: string;
}

/**
 * Renders location contact details: name, formatted address, click-to-call phone,
 * email (if provided in future), and hours table. Each info type has an inline SVG icon.
 */
export default function ContactInfo({ location, className }: ContactInfoProps) {
  const phoneHref = `tel:${location.phone.replace(/[^\d+]/g, "")}`;
  const formattedAddress = `${location.address}, ${location.city}, ${location.state} ${location.zip}`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formattedAddress)}`;

  return (
    <div className={cn("space-y-5", className)}>
      {/* Location Name */}
      <h3 className="font-heading text-lg font-bold text-navy-800">
        {location.name} Office
      </h3>

      {/* Address */}
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0 text-navy-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742ZM12 13.5a3 3 0 100-6 3 3 0 000 6Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm leading-relaxed text-gray-700 transition-colors duration-200 hover:text-gold-600"
          >
            {location.address}
            <br />
            {location.city}, {location.state} {location.zip}
          </a>
        </div>
      </div>

      {/* Phone */}
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0 text-navy-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <a
          href={phoneHref}
          className="text-sm font-medium text-navy-800 transition-colors duration-200 hover:text-gold-600"
        >
          {location.phone}
        </a>
      </div>

      {/* Fax (if available) */}
      {location.fax && (
        <div className="flex items-start gap-3">
          <div className="mt-0.5 shrink-0 text-navy-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3Zm-3 11H8v-5h8v5Zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Zm-1-9H6v4h12V3Z" />
            </svg>
          </div>
          <span className="text-sm text-gray-600">
            Fax: {location.fax}
          </span>
        </div>
      )}

      {/* Hours Table */}
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0 text-navy-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="w-full">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-navy-500">
            Office Hours
          </p>
          <table className="w-full text-sm">
            <tbody>
              {location.hours.map((h) => (
                <tr key={h.day}>
                  <td className="py-0.5 pr-4 font-medium text-gray-700">
                    {h.day}
                  </td>
                  <td
                    className={cn(
                      "py-0.5 text-right",
                      h.hours === "Closed"
                        ? "text-gray-400"
                        : "text-navy-700"
                    )}
                  >
                    {h.hours}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
