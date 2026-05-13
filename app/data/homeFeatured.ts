import type { FeaturedCardItem } from "@/app/components/FeaturedCardRow";

export const homeEntryPoints: FeaturedCardItem[] = [
  {
    mode: "link",
    title: "Your First Visit",
    href: "/patient-information",
    image: "/images/office/hero-consultation.webp",
    imageAlt: "Welcoming consultation room at Acadiana Endodontics",
  },
  {
    mode: "link",
    title: "Advanced Technology",
    href: "/services/cbct-imaging",
    image: "/images/services/dental-chair.jpg",
    imageAlt: "Modern dental chair and imaging equipment",
  },
  {
    mode: "link",
    title: "Meet Our Doctors",
    href: "/about",
    image: "/images/office/hero-dentist-patient.webp",
    imageAlt: "Dr. Fowler with a patient",
  },
];

export const homeProcedureSpotlights: FeaturedCardItem[] = [
  {
    mode: "link",
    title: "Root Canal Therapy",
    href: "/services/root-canal",
    image: "/images/general/dental-exam.jpg",
    imageAlt: "Endodontist examining a patient",
  },
  {
    mode: "link",
    title: "Cracked Teeth",
    href: "/services/cracked-teeth",
    image: "/images/services/dental-xray.jpg",
    imageAlt: "Dental X-ray showing a cracked tooth",
  },
  {
    mode: "link",
    title: "Apicoectomy",
    href: "/services/apicoectomy",
    image: "/images/services/treatment-room.jpg",
    imageAlt: "Surgical treatment room",
  },
];
