import { NextResponse } from "next/server";
import {
  PRACTICE_NAME,
  PRACTICE_EMAIL,
  PRACTICE_WEBSITE,
  PHONE_LAFAYETTE,
  PHONE_NEW_IBERIA,
  LOCATION_LAFAYETTE,
  LOCATION_NEW_IBERIA,
} from "@/app/lib/constants";
import { services } from "@/app/data/services";
import { doctors } from "@/app/data/doctors";
import { faqs, faqCategories } from "@/app/data/faqs";

function formatLocation(loc: typeof LOCATION_LAFAYETTE): string {
  const openDays = loc.hours
    .filter((h) => h.hours !== "Closed")
    .map((h) => `  - ${h.day}: ${h.hours}`)
    .join("\n");
  const phone =
    loc.name === "Lafayette" ? PHONE_LAFAYETTE : PHONE_NEW_IBERIA;
  return `### ${loc.name} Office
- Address: ${loc.address}, ${loc.city}, ${loc.state} ${loc.zip}
- Phone: ${phone}
- Hours:
${openDays}`;
}

export async function GET() {
  const servicesList = services
    .map(
      (s) =>
        `### ${s.title}
${s.shortDescription}

${s.fullDescription.split("\n\n")[0]}

**Benefits:**
${s.benefits.map((b) => `- ${b}`).join("\n")}

**URL:** ${PRACTICE_WEBSITE}/services/${s.slug}`
    )
    .join("\n\n");

  const doctorsList = doctors
    .map(
      (d) =>
        `### ${d.name}, ${d.credentials}
**${d.title}**

${d.bio.split("\n\n")[0]}

**Education:**
${d.education.map((e) => `- ${e.degree}, ${e.institution}`).join("\n")}

**Professional Memberships:**
${d.memberships.map((m) => `- ${m}`).join("\n")}`
    )
    .join("\n\n");

  const faqList = faqCategories
    .map((cat) => {
      const items = faqs[cat.id];
      if (!items || items.length === 0) return "";
      return `### ${cat.label}
${items.map((f) => `**Q: ${f.question}**\nA: ${f.answer}`).join("\n\n")}`;
    })
    .filter(Boolean)
    .join("\n\n");

  const content = `# ${PRACTICE_NAME}

> Board-certified endodontists in Lafayette and New Iberia, Louisiana

## About

${PRACTICE_NAME} is an endodontic specialty practice serving patients throughout the Acadiana region of Louisiana. Our board-certified endodontists specialize in saving natural teeth through expert root canal therapy and advanced endodontic procedures. Using state-of-the-art technology including CBCT 3D imaging and surgical microscopes, we provide precise, comfortable care.

We are committed to clinical excellence, patient comfort, and collaborative care with referring dentists. Most patients are seen within 1-2 business days, and same-day emergency appointments are available for dental trauma and acute infections.

## Services

${servicesList}

## Our Doctors

${doctorsList}

## Locations

${formatLocation(LOCATION_LAFAYETTE)}

${formatLocation(LOCATION_NEW_IBERIA)}

## Frequently Asked Questions

${faqList}

## Contact Information

- **Website:** ${PRACTICE_WEBSITE}
- **Email:** ${PRACTICE_EMAIL}
- **Lafayette Phone:** ${PHONE_LAFAYETTE}
- **New Iberia Phone:** ${PHONE_NEW_IBERIA}
- **Online Contact:** ${PRACTICE_WEBSITE}/contact
- **Referring Doctors:** ${PRACTICE_WEBSITE}/referring-doctors

## Insurance & Payment

We accept most major dental insurance plans including Delta Dental, Cigna, Aetna, MetLife, and many others. CareCredit financing is available for flexible payment plans. We also offer a 5% discount for payment by cash or check at the time of service.

## Emergency Care

Same-day emergency appointments are available for dental trauma and acute infections. If you have a dental emergency, call ${PHONE_LAFAYETTE} immediately.
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
