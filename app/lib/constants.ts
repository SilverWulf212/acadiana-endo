import type { Location } from "./types";

// ─── Practice Information ────────────────────────────────────────────────────

export const PRACTICE_NAME = "Acadiana Endodontics";
export const PRACTICE_EMAIL = "info@acadianaendo.com";
export const PRACTICE_WEBSITE = "https://acadianaendo.com";

// ─── Phone Numbers ───────────────────────────────────────────────────────────

export const PHONE_LAFAYETTE = "(337) 981-0144";
export const PHONE_NEW_IBERIA = "(337) 365-0444";

// ─── Locations ───────────────────────────────────────────────────────────────

export const LOCATION_LAFAYETTE: Location = {
  name: "Lafayette",
  address: "207 Ansley Blvd",
  city: "Lafayette",
  state: "LA",
  zip: "70503",
  phone: PHONE_LAFAYETTE,
  coordinates: { lat: 30.1942, lng: -92.0355 },
  hours: [
    { day: "Monday", hours: "7:10 AM - 4:00 PM" },
    { day: "Tuesday", hours: "7:10 AM - 4:00 PM" },
    { day: "Wednesday", hours: "7:10 AM - 4:00 PM" },
    { day: "Thursday", hours: "7:10 AM - 4:00 PM" },
    { day: "Friday", hours: "Closed" },
    { day: "Saturday", hours: "Closed" },
    { day: "Sunday", hours: "Closed" },
  ],
};

export const LOCATION_NEW_IBERIA: Location = {
  name: "New Iberia",
  address: "315 Weeks St",
  city: "New Iberia",
  state: "LA",
  zip: "70560",
  phone: PHONE_NEW_IBERIA,
  coordinates: { lat: 30.0027, lng: -91.8188 },
  hours: [
    { day: "Monday", hours: "Closed" },
    { day: "Tuesday", hours: "Closed" },
    { day: "Wednesday", hours: "8:00 AM - 4:00 PM" },
    { day: "Thursday", hours: "Closed" },
    { day: "Friday", hours: "Closed" },
    { day: "Saturday", hours: "Closed" },
    { day: "Sunday", hours: "Closed" },
  ],
};

export const LOCATIONS: Location[] = [LOCATION_LAFAYETTE, LOCATION_NEW_IBERIA];

// ─── Navigation ──────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Patient Info", href: "/patient-info" },
  { label: "Referring Doctors", href: "/referring-doctors" },
  { label: "Contact", href: "/contact" },
] as const;

// ─── Social Links (placeholders — update when available) ─────────────────────

export const SOCIAL_LINKS = {
  facebook: "#",
  google: "#",
} as const;
