import type { FAQ } from "@/app/lib/types";

export const faqs: Record<string, FAQ[]> = {
  general: [
    {
      question: "What is an endodontist?",
      answer:
        "An endodontist is a dentist who has completed 2-3 years of additional specialized training beyond dental school, focusing exclusively on diagnosing and treating problems inside the tooth. While all endodontists are dentists, only about 3% of dentists are endodontists.",
      category: "general",
    },
    {
      question:
        "Why should I see a specialist instead of my general dentist?",
      answer:
        "Endodontists perform an average of 25 root canals per week compared to less than two for general dentists. This focused experience, combined with advanced training and specialized equipment like surgical microscopes and CBCT 3D imaging, means more efficient, comfortable, and successful treatments.",
      category: "general",
    },
    {
      question: "Do I need a referral to see an endodontist?",
      answer:
        "While most patients are referred by their general dentist, a referral is not required. You can contact us directly to schedule an appointment. We work closely with your general dentist to coordinate your care.",
      category: "general",
    },
    {
      question: "What should I bring to my first appointment?",
      answer:
        "Please bring your photo ID, insurance card, a list of current medications, and any X-rays or referral information from your dentist. If you have dental anxiety, let us know when scheduling so we can take extra steps to ensure your comfort.",
      category: "general",
    },
  ],
  procedures: [
    {
      question: "Does a root canal hurt?",
      answer:
        "Modern root canal treatment is virtually painless. We use advanced local anesthesia techniques to ensure you're completely numb before we begin. Most patients compare the experience to having a filling placed. After the procedure, any mild soreness typically resolves within a few days with over-the-counter pain medication.",
      category: "procedures",
    },
    {
      question: "How long does a root canal take?",
      answer:
        "Most root canals are completed in a single visit lasting 60-90 minutes. Complex cases involving multiple canals or retreatment may require a second appointment. Our use of advanced technology like CBCT imaging and surgical microscopes helps us work efficiently.",
      category: "procedures",
    },
    {
      question: "What is the success rate of root canal treatment?",
      answer:
        "Root canal treatment has a success rate of over 95% when performed by an endodontic specialist. With proper care and a timely crown placement by your general dentist, a root canal-treated tooth can last a lifetime.",
      category: "procedures",
    },
    {
      question: "What happens after my root canal?",
      answer:
        "You may experience mild tenderness for a few days, manageable with over-the-counter medication. We'll send a detailed report to your referring dentist, who will place a permanent crown or restoration to protect the treated tooth. This should be done within a few weeks of your root canal.",
      category: "procedures",
    },
  ],
  insurance: [
    {
      question: "What insurance plans do you accept?",
      answer:
        "We accept most major dental insurance plans including Delta Dental, Cigna, Aetna, MetLife, and many others. Our office staff will verify your benefits and help you understand your coverage before treatment begins.",
      category: "insurance",
    },
    {
      question: "What if I don't have insurance?",
      answer:
        "We offer several payment options for patients without insurance, including CareCredit financing, which offers interest-free payment plans. We also accept Visa, MasterCard, Discover, and offer a 5% discount for payment by cash or check at the time of service.",
      category: "insurance",
    },
    {
      question: "Do you offer payment plans?",
      answer:
        "Yes, we offer CareCredit financing which provides flexible monthly payment plans, many with no-interest promotional periods. Our office staff can help you apply and get approved, often on the same day as your appointment.",
      category: "insurance",
    },
  ],
  referringDoctors: [
    {
      question: "How do I refer a patient?",
      answer:
        "You can refer patients through our online referral form, by fax, or by phone. Visit our Referring Doctors page for the referral form, or call (337) 981-0144. We'll schedule your patient promptly and keep you informed throughout treatment.",
      category: "referringDoctors",
    },
    {
      question: "How quickly can you see my patient?",
      answer:
        "We typically see routine referrals within 1-2 business days. Emergency cases, including dental trauma and acute infections, can usually be seen the same day. Call us directly for urgent cases.",
      category: "referringDoctors",
    },
    {
      question: "Will I receive a treatment report?",
      answer:
        "Yes. After completing treatment, we send a detailed report including diagnosis, treatment performed, and any follow-up recommendations. We also communicate directly with you if there are any concerns during treatment.",
      category: "referringDoctors",
    },
  ],
};

export const faqCategories = [
  { id: "general", label: "General", icon: "info" },
  { id: "procedures", label: "Procedures", icon: "tooth" },
  { id: "insurance", label: "Insurance & Payment", icon: "card" },
  { id: "referringDoctors", label: "For Referring Doctors", icon: "referral" },
];
