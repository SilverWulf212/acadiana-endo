import {
  PRACTICE_NAME,
  PRACTICE_EMAIL,
  PRACTICE_WEBSITE,
  PHONE_LAFAYETTE,
  PHONE_NEW_IBERIA,
  LOCATION_LAFAYETTE,
  LOCATION_NEW_IBERIA,
} from "@/app/lib/constants";
import type { FAQ } from "@/app/lib/types";

export function LocalBusinessSchema() {
  // Primary location (Lafayette) as main entity, with New Iberia as a department
  const schema = {
    "@context": "https://schema.org",
    "@type": ["Dentist", "MedicalBusiness"],
    "@id": `${PRACTICE_WEBSITE}/#organization`,
    name: PRACTICE_NAME,
    description:
      "Board-certified endodontists providing expert root canal therapy and endodontic care in Lafayette and New Iberia, Louisiana.",
    url: PRACTICE_WEBSITE,
    telephone: PHONE_LAFAYETTE,
    email: PRACTICE_EMAIL,
    image: `${PRACTICE_WEBSITE}/images/office/lafayette-exterior.jpg`,
    logo: `${PRACTICE_WEBSITE}/favicon.svg`,
    priceRange: "$$",
    medicalSpecialty: "Endodontics",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Check, Credit Card, CareCredit",
    areaServed: [
      {
        "@type": "City",
        name: "Lafayette",
        sameAs: "https://en.wikipedia.org/wiki/Lafayette,_Louisiana",
      },
      {
        "@type": "City",
        name: "New Iberia",
        sameAs: "https://en.wikipedia.org/wiki/New_Iberia,_Louisiana",
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: LOCATION_LAFAYETTE.address,
      addressLocality: LOCATION_LAFAYETTE.city,
      addressRegion: LOCATION_LAFAYETTE.state,
      postalCode: LOCATION_LAFAYETTE.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: LOCATION_LAFAYETTE.coordinates.lat,
      longitude: LOCATION_LAFAYETTE.coordinates.lng,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${LOCATION_LAFAYETTE.coordinates.lat},${LOCATION_LAFAYETTE.coordinates.lng}`,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "07:10",
        closes: "16:00",
      },
    ],
    department: {
      "@type": ["Dentist", "MedicalBusiness"],
      "@id": `${PRACTICE_WEBSITE}/#new-iberia-location`,
      name: `${PRACTICE_NAME} - New Iberia`,
      telephone: PHONE_NEW_IBERIA,
      address: {
        "@type": "PostalAddress",
        streetAddress: LOCATION_NEW_IBERIA.address,
        addressLocality: LOCATION_NEW_IBERIA.city,
        addressRegion: LOCATION_NEW_IBERIA.state,
        postalCode: LOCATION_NEW_IBERIA.zip,
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: LOCATION_NEW_IBERIA.coordinates.lat,
        longitude: LOCATION_NEW_IBERIA.coordinates.lng,
      },
      hasMap: `https://www.google.com/maps/search/?api=1&query=${LOCATION_NEW_IBERIA.coordinates.lat},${LOCATION_NEW_IBERIA.coordinates.lng}`,
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Wednesday"],
          opens: "08:00",
          closes: "16:00",
        },
      ],
    },
  };

  // JSON-LD structured data uses dangerouslySetInnerHTML by design.
  // All values come from our own constants — no user input is involved.
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${PRACTICE_WEBSITE}/#website`,
    name: PRACTICE_NAME,
    url: PRACTICE_WEBSITE,
    inLanguage: "en-US",
    publisher: {
      "@id": `${PRACTICE_WEBSITE}/#organization`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function MedicalOrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "@id": `${PRACTICE_WEBSITE}/#medical-organization`,
    name: PRACTICE_NAME,
    url: PRACTICE_WEBSITE,
    telephone: PHONE_LAFAYETTE,
    email: PRACTICE_EMAIL,
    isPartOf: {
      "@id": `${PRACTICE_WEBSITE}/#organization`,
    },
    medicalSpecialty: {
      "@type": "MedicalSpecialty",
      name: "Endodontics",
    },
    availableService: [
      {
        "@type": "MedicalProcedure",
        name: "Root Canal Therapy",
        procedureType: "https://schema.org/NoninvasiveProcedure",
        url: `${PRACTICE_WEBSITE}/services/root-canal`,
      },
      {
        "@type": "MedicalProcedure",
        name: "Endodontic Retreatment",
        procedureType: "https://schema.org/NoninvasiveProcedure",
        url: `${PRACTICE_WEBSITE}/services/retreatment`,
      },
      {
        "@type": "MedicalProcedure",
        name: "Apicoectomy",
        procedureType: "https://schema.org/SurgicalProcedure",
        url: `${PRACTICE_WEBSITE}/services/apicoectomy`,
      },
      {
        "@type": "MedicalProcedure",
        name: "Cracked Tooth Treatment",
        url: `${PRACTICE_WEBSITE}/services/cracked-teeth`,
      },
      {
        "@type": "MedicalProcedure",
        name: "Dental Trauma Care",
        url: `${PRACTICE_WEBSITE}/services/dental-trauma`,
      },
      {
        "@type": "MedicalTherapy",
        name: "CBCT 3D Imaging",
        url: `${PRACTICE_WEBSITE}/services/cbct-imaging`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Service Page Schema ──────────────────────────────────────────────────────
// Use on individual service pages for rich results

interface ServiceSchemaProps {
  name: string;
  description: string;
  slug: string;
  procedureType?: "NoninvasiveProcedure" | "SurgicalProcedure";
}

export function ServiceSchema({
  name,
  description,
  slug,
  procedureType,
}: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name,
    description,
    url: `${PRACTICE_WEBSITE}/services/${slug}`,
    isPartOf: {
      "@id": `${PRACTICE_WEBSITE}/#website`,
    },
    about: {
      "@type": "MedicalProcedure",
      name,
      description,
      ...(procedureType
        ? { procedureType: `https://schema.org/${procedureType}` }
        : {}),
      body: {
        "@type": "AnatomicalStructure",
        name: "Tooth",
      },
    },
    mainEntity: {
      "@type": "MedicalBusiness",
      "@id": `${PRACTICE_WEBSITE}/#organization`,
    },
    specialty: {
      "@type": "MedicalSpecialty",
      name: "Endodontics",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── FAQ Page Schema ──────────────────────────────────────────────────────────
// Emits a FAQPage block for use on service detail pages (plan §12). Reusable
// anywhere a list of Q/A pairs is rendered visually.

interface FAQPageSchemaProps {
  faqs: FAQ[];
}

export function FAQPageSchema({ faqs }: FAQPageSchemaProps) {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
