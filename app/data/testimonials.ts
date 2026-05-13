// NOTE: Patient names and practice replies are draft placeholders pending
// practice approval. The underlying review text is preserved verbatim.
// TODO(practice-review): finalize names/replies with practice staff.

import type { Testimonial } from "@/app/lib/types";

export const testimonials: Testimonial[] = [
  {
    text: "Dr. Fowler was very professional and friendly. He explained everything thoroughly and made sure I was comfortable. The procedure was painless and quick. I highly recommend him!",
    author: "Patient Review",
    name: "Megan T.",
    rating: 5,
    source: "Healthgrades",
    reply: "Thank you, Megan. We're glad Dr. Fowler could take the time to walk you through the procedure — comfort and clarity matter to us. Please don't hesitate to reach out if anything comes up after treatment.",
  },
  {
    text: "The staff was amazing, very caring and attentive. Dr. Reaves made the whole experience as pleasant as possible. I was very nervous but they put me at ease right away.",
    author: "Patient Review",
    name: "David R.",
    rating: 5,
    source: "Healthgrades",
    reply: "David, thank you for sharing this. Dental anxiety is something we take seriously, and we're so glad Dr. Reaves and the team were able to make your visit a calm one. We appreciate your trust.",
  },
  {
    text: "Excellent care from start to finish. The office is modern and clean. Dr. Fowler is truly skilled at what he does. I felt no pain during the procedure.",
    author: "Patient Review",
    name: "Sarah B.",
    rating: 5,
    source: "Healthgrades",
    reply: "Sarah, we appreciate you taking the time to share your experience. Painless treatment is always our goal, and feedback like this means a lot to Dr. Fowler and the team.",
  },
  {
    text: "I was referred by my dentist and I'm so glad I came here. Professional, efficient, and caring. They worked with my insurance and made everything easy.",
    author: "Patient Review",
    name: "Marcus L.",
    rating: 5,
    source: "Healthgrades",
    reply: "Thank you, Marcus, and a special thank-you to your referring dentist. We're proud to be the next step in our referring providers' care — glad the insurance side went smoothly.",
  },
];
