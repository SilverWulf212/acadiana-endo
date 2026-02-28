import type { Metadata } from "next";
import { getServiceBySlug } from "@/app/data/services";
import ServicePageLayout from "@/app/services/ServicePageLayout";

const service = getServiceBySlug("retreatment")!;

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  alternates: {
    canonical: `/services/${service.slug}`,
  },
};

const whatToExpect = [
  {
    step: "Evaluation & Imaging",
    description:
      "We take CBCT 3D images to evaluate the previously treated tooth. Our specialist identifies the cause of the failed treatment — missed canals, new decay, fractures, or other issues.",
  },
  {
    step: "Removing Previous Filling",
    description:
      "Under microscope magnification, the specialist carefully removes the previous root canal filling material and any posts or cores to access the full canal system.",
  },
  {
    step: "Retreatment",
    description:
      "The canals are re-cleaned, reshaped, and disinfected. Any previously missed canals are located and treated. New filling material is placed to seal the canals.",
  },
  {
    step: "Restoration & Follow-Up",
    description:
      "Your referring dentist will place a new crown or restoration. We schedule a follow-up to ensure the tooth is healing properly and the infection has resolved.",
  },
];

export default function RetreamentPage() {
  return <ServicePageLayout service={service} whatToExpect={whatToExpect} />;
}
