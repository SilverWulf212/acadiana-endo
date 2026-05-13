export interface FAQ {
  question: string;
  answer: string;
  category?: string;
}

export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  faqs: FAQ[];
  icon: string;
  image: string;
  imageAlt: string;
  metaTitle: string;
  metaDescription: string;
}

export interface Doctor {
  name: string;
  credentials: string;
  title: string;
  bio: string;
  education: { degree: string; institution: string; year?: string }[];
  memberships: string[];
  imageUrl: string;
}

export interface Testimonial {
  id?: string;
  text: string;
  author: string;
  name?: string;
  rating: number;       // keep number; visual layer clamps
  source?: string;
  reply?: string;
  date?: string;
}

export interface Location {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  fax?: string;
  coordinates: { lat: number; lng: number };
  hours: { day: string; hours: string }[];
}
