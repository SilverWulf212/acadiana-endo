import type { Metadata } from "next";
import { getServiceBySlug } from "@/app/data/services";
import ServicePageLayout from "@/app/services/ServicePageLayout";

const service = getServiceBySlug("cbct-imaging")!;

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  alternates: {
    canonical: `/services/${service.slug}`,
  },
};

const whatToExpect = [
  {
    step: "Preparation",
    description:
      "No special preparation is needed. You may be asked to remove jewelry, glasses, or any metal objects near the scan area. The process is quick and comfortable.",
  },
  {
    step: "The Scan",
    description:
      "You stand or sit still while the CBCT unit rotates around your head. The scan takes only 20-40 seconds. There is no discomfort — you simply remain still while the machine captures the images.",
  },
  {
    step: "Image Review",
    description:
      "The 3D images are available immediately. Your specialist reviews them with you during your appointment, pointing out the anatomy and explaining any findings in detail.",
  },
  {
    step: "Treatment Planning",
    description:
      "Using the 3D data, your specialist develops a precise treatment plan tailored to your unique anatomy. This leads to more predictable outcomes and faster procedures.",
  },
];

export default function CBCTImagingPage() {
  return <ServicePageLayout service={service} whatToExpect={whatToExpect} />;
}
