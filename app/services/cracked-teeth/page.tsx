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
  openGraph: {
    title: service.metaTitle,
    description: service.metaDescription,
  },
};

export default function CrackedTeethPage() {
  return <ServicePageLayout service={service} />;
}
