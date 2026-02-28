import type { Doctor } from "@/app/lib/types";

export const doctors: Doctor[] = [
  {
    name: "Dr. Robert Fowler",
    credentials: "DDS",
    title: "Board-Certified Endodontist",
    bio: "Dr. Robert Fowler is a board-certified endodontist and the founder of Acadiana Endodontics. After earning his Doctor of Dental Surgery degree from LSU School of Dentistry, Dr. Fowler completed his advanced specialty training in endodontics, where he developed expertise in complex root canal therapy, microsurgery, and dental trauma management.\n\nWith over 20 years of clinical experience, Dr. Fowler has treated thousands of patients throughout the Acadiana region. He is dedicated to staying at the forefront of endodontic technology, utilizing CBCT 3D imaging and surgical microscopes to provide the highest standard of care.\n\nDr. Fowler is a member of the American Association of Endodontists and serves as a clinical faculty member at LSU School of Dentistry, training the next generation of dental professionals. He is passionate about patient education and ensuring every patient understands their treatment options.",
    education: [
      { degree: "DDS", institution: "LSU School of Dentistry" },
      { degree: "Certificate in Endodontics", institution: "LSU School of Dentistry" },
      { degree: "BS in Biology", institution: "University of Louisiana at Lafayette" },
    ],
    memberships: [
      "American Association of Endodontists",
      "American Dental Association",
      "Louisiana Dental Association",
      "Acadiana District Dental Association",
      "LSU School of Dentistry Clinical Faculty",
    ],
    imageUrl: "/images/doctors/dr-fowler.jpg",
  },
  {
    name: "Dr. James Reaves",
    credentials: "DDS",
    title: "Board-Certified Endodontist",
    bio: "Dr. James Reaves is a board-certified endodontist who joined Acadiana Endodontics bringing extensive training and a genuine passion for saving natural teeth. He earned his Doctor of Dental Surgery degree from LSU School of Dentistry and completed his specialty residency in endodontics.\n\nDr. Reaves specializes in complex endodontic cases, including retreatment of previously treated teeth, microsurgical procedures, and management of dental trauma. His calm, reassuring demeanor puts even the most anxious patients at ease.\n\nCommitted to clinical excellence, Dr. Reaves regularly participates in continuing education courses and stays current with the latest advances in endodontic techniques and technology. He believes that every patient deserves individualized, compassionate care and takes the time to explain each step of the treatment process.",
    education: [
      { degree: "DDS", institution: "LSU School of Dentistry" },
      { degree: "Certificate in Endodontics", institution: "LSU School of Dentistry" },
      { degree: "BS in Biological Sciences", institution: "Louisiana State University" },
    ],
    memberships: [
      "American Association of Endodontists",
      "American Dental Association",
      "Louisiana Dental Association",
      "Acadiana District Dental Association",
    ],
    imageUrl: "/images/doctors/dr-reaves.jpg",
  },
];
