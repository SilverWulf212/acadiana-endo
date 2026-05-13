import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Location } from "@/app/lib/types";

/**
 * Merge Tailwind CSS classes with clsx and tailwind-merge.
 * Handles conditional classes and resolves Tailwind conflicts.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a Location's address into a single comma-separated line.
 */
export function formatAddress(loc: Location): string {
  return `${loc.address}, ${loc.city}, ${loc.state} ${loc.zip}`;
}

/**
 * Produce a compact, human-readable summary of a location's open hours.
 * - Returns "By appointment" when no days are open.
 * - Collapses consecutive same-hours days into a range (e.g. "Mon–Thu: 7:10 AM - 4:00 PM").
 * - Falls back to a comma-separated list when hours vary.
 */
export function getHoursSummary(loc: Location): string {
  const openDays = loc.hours.filter((h) => h.hours !== "Closed");
  if (openDays.length === 0) return "By appointment";
  if (openDays.length === 1) {
    return `${openDays[0].day}: ${openDays[0].hours}`;
  }
  const firstDay = openDays[0].day;
  const lastDay = openDays[openDays.length - 1].day;
  const sameHours = openDays.every((d) => d.hours === openDays[0].hours);
  if (sameHours) {
    return `${firstDay}–${lastDay}: ${openDays[0].hours}`;
  }
  return openDays.map((d) => `${d.day}: ${d.hours}`).join(", ");
}

/**
 * Build a Google Maps "directions to" URL for a Location.
 */
export function getDirectionsUrl(location: Location): string {
  const dest = `${location.address}, ${location.city}, ${location.state} ${location.zip}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(dest)}`;
}
