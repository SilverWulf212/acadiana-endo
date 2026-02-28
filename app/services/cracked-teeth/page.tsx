import type { Metadata } from "next";
import { getServiceBySlug } from "@/app/data/services";
import ServicePageLayout from "@/app/services/ServicePageLayout";

const service = getServiceBySlug("cracked-teeth")!;

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  alternates: {
    canonical: `/services/${service.slug}`,
  },
};

const whatToExpect = [
  {
    step: "Comprehensive Examination",
    description:
      "Your specialist performs a thorough clinical examination, including bite tests and transillumination (shining a bright light through the tooth to reveal fracture lines).",
  },
  {
    step: "Advanced Imaging",
    description:
      "CBCT 3D imaging provides a detailed view of the tooth and surrounding bone, revealing cracks that are invisible on standard X-rays. This is critical for accurate diagnosis.",
  },
  {
    step: "Diagnosis & Treatment Plan",
    description:
      "Based on the type, location, and severity of the crack, your specialist discusses all treatment options — from root canal therapy to protect the pulp, to other restorative approaches.",
  },
  {
    step: "Treatment & Coordination",
    description:
      "If root canal treatment is indicated, it is performed the same day when possible. We coordinate with your general dentist for any additional restorative work, such as placing a crown.",
  },
];

export default function CrackedTeethPage() {
  return <ServicePageLayout service={service} whatToExpect={whatToExpect} />;
}
