import type { Metadata } from "next";
import { getServiceBySlug } from "@/app/data/services";
import ServicePageLayout from "@/app/services/ServicePageLayout";

const service = getServiceBySlug("dental-trauma")!;

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  alternates: {
    canonical: `/services/${service.slug}`,
  },
};

const whatToExpect = [
  {
    step: "Emergency Intake",
    description:
      "Call us immediately at (337) 981-0144. We prioritize dental trauma and will get you seen as quickly as possible — often the same day. Bring any tooth fragments or knocked-out teeth with you.",
  },
  {
    step: "Assessment & Imaging",
    description:
      "Your specialist examines the injury and takes CBCT 3D images to assess the full extent of the damage, including root fractures and bone injuries that may not be visible otherwise.",
  },
  {
    step: "Immediate Treatment",
    description:
      "Treatment depends on the type of injury: reimplanting knocked-out teeth, stabilizing displaced teeth with a splint, treating root fractures, or performing emergency root canal therapy.",
  },
  {
    step: "Monitoring & Follow-Up",
    description:
      "Traumatic dental injuries require ongoing monitoring. We schedule follow-up appointments to track healing and intervene early if complications arise. We keep your general dentist informed throughout.",
  },
];

export default function DentalTraumaPage() {
  return <ServicePageLayout service={service} whatToExpect={whatToExpect} />;
}
