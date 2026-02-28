"use client";

import { cn } from "@/app/lib/utils";
import type { Location } from "@/app/lib/types";

interface GoogleMapProps {
  location: Location;
  className?: string;
}

/**
 * Lazy-loaded Google Maps iframe embed for a given location.
 * Uses the no-API-key embed approach with lat/lng coordinates.
 */
export default function GoogleMap({ location, className }: GoogleMapProps) {
  const { lat, lng } = location.coordinates;
  const formattedAddress = `${location.address}, ${location.city}, ${location.state} ${location.zip}`;
  const embedUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-steel-200 bg-gray-100",
        className
      )}
    >
      <iframe
        src={embedUrl}
        title={`Map of Acadiana Endodontics ${location.name} office at ${formattedAddress}`}
        width="100%"
        height="100%"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="h-64 w-full md:h-80"
        style={{ border: 0 }}
      />
    </div>
  );
}
