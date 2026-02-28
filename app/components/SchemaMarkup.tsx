import {
  PRACTICE_NAME,
  PRACTICE_EMAIL,
  PRACTICE_WEBSITE,
  PHONE_LAFAYETTE,
  LOCATION_LAFAYETTE,
  LOCATION_NEW_IBERIA,
} from "@/app/lib/constants";

export function LocalBusinessSchema() {
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
    priceRange: "$$",
    medicalSpecialty: "Endodontics",
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: LOCATION_LAFAYETTE.address,
        addressLocality: LOCATION_LAFAYETTE.city,
        addressRegion: LOCATION_LAFAYETTE.state,
        postalCode: LOCATION_LAFAYETTE.zip,
        addressCountry: "US",
      },
      {
        "@type": "PostalAddress",
        streetAddress: LOCATION_NEW_IBERIA.address,
        addressLocality: LOCATION_NEW_IBERIA.city,
        addressRegion: LOCATION_NEW_IBERIA.state,
        postalCode: LOCATION_NEW_IBERIA.zip,
        addressCountry: "US",
      },
    ],
    geo: {
      "@type": "GeoCoordinates",
      latitude: LOCATION_LAFAYETTE.coordinates.lat,
      longitude: LOCATION_LAFAYETTE.coordinates.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "07:10",
        closes: "16:00",
      },
    ],
    sameAs: [],
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
    publisher: {
      "@id": `${PRACTICE_WEBSITE}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${PRACTICE_WEBSITE}/services/{search_term_string}`,
      },
      "query-input": "required name=search_term_string",
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
    medicalSpecialty: {
      "@type": "MedicalSpecialty",
      name: "Endodontics",
    },
    availableService: [
      {
        "@type": "MedicalProcedure",
        name: "Root Canal Therapy",
        procedureType: "https://schema.org/NoninvasiveProcedure",
      },
      {
        "@type": "MedicalProcedure",
        name: "Endodontic Retreatment",
        procedureType: "https://schema.org/NoninvasiveProcedure",
      },
      {
        "@type": "MedicalProcedure",
        name: "Apicoectomy",
        procedureType: "https://schema.org/SurgicalProcedure",
      },
      {
        "@type": "MedicalProcedure",
        name: "Cracked Tooth Treatment",
      },
      {
        "@type": "MedicalProcedure",
        name: "Dental Trauma Care",
      },
      {
        "@type": "MedicalTherapy",
        name: "CBCT 3D Imaging",
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
