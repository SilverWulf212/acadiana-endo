import type { Metadata } from "next";
import { getServiceBySlug } from "@/app/data/services";
import ServicePageLayout from "@/app/services/ServicePageLayout";

const service = getServiceBySlug("apicoectomy")!;

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  alternates: {
    canonical: `/services/${service.slug}`,
  },
};

const whatToExpect = [
  {
    step: "Pre-Surgical Assessment",
    description:
      "We take CBCT 3D images to precisely locate the infection at the root tip and plan the surgical approach. Your specialist explains the procedure and addresses any concerns.",
  },
  {
    step: "Local Anesthesia",
    description:
      "The area around the affected tooth is thoroughly numbed with local anesthesia. You remain awake but feel no pain during the procedure.",
  },
  {
    step: "Microsurgical Procedure",
    description:
      "Through a small incision in the gum tissue, the specialist accesses the root tip, removes the infected tissue and the very end of the root, then places a small filling to seal the canal. The incision is closed with sutures.",
  },
  {
    step: "Healing & Follow-Up",
    description:
      "Most patients return to normal activities the next day. You'll receive detailed aftercare instructions. We schedule a follow-up to remove sutures and monitor healing over the following months.",
  },
];

export default function ApicoectomyPage() {
  return <ServicePageLayout service={service} whatToExpect={whatToExpect} />;
}
