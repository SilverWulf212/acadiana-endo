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
  openGraph: {
    title: service.metaTitle,
    description: service.metaDescription,
  },
};

export default function DentalTraumaPage() {
  return <ServicePageLayout service={service} />;
}
