import type { Metadata } from "next";
import { getServiceBySlug } from "@/app/data/services";
import ServicePageLayout from "@/app/services/ServicePageLayout";

const service = getServiceBySlug("root-canal")!;

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  alternates: {
    canonical: `/services/${service.slug}`,
  },
};

const whatToExpect = [
  {
    step: "Consultation & Diagnosis",
    description:
      "We review your dental history and take CBCT 3D images to get a complete picture of your tooth's anatomy. Your specialist will explain the diagnosis and walk you through the treatment plan.",
  },
  {
    step: "Anesthesia & Comfort",
    description:
      "We apply modern anesthesia techniques to ensure you are completely numb and comfortable before beginning. Most patients feel no pain during the procedure.",
  },
  {
    step: "Treatment",
    description:
      "Using a surgical microscope for precision, your specialist accesses the pulp chamber, removes the infected tissue, cleans and shapes each canal, and fills them with a biocompatible material. Most cases are completed in a single visit.",
  },
  {
    step: "Follow-Up & Restoration",
    description:
      "You'll receive aftercare instructions and any prescribed medication. We coordinate with your referring dentist, who will place a permanent crown to protect and restore the treated tooth.",
  },
];

export default function RootCanalPage() {
  return <ServicePageLayout service={service} whatToExpect={whatToExpect} />;
}
