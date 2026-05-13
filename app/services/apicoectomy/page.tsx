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
  openGraph: {
    title: service.metaTitle,
    description: service.metaDescription,
  },
};

export default function ApicoectomyPage() {
  return <ServicePageLayout service={service} />;
}
