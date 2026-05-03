export const siteContact = {
  email: "hello@skillbridge.dev",
  phone: "+880 1712-345678",
  address: "Banani 11, Dhaka 1213, Bangladesh",
};

export const marketingStats = [
  { label: "Live sessions completed", value: "1.2k+" },
  { label: "Learners matched this quarter", value: "340+" },
  { label: "Average tutor rating", value: "4.9/5" },
];

export const featureHighlights = [
  {
    title: "Match by goals, not guesswork",
    description:
      "Filter tutors by subject, pricing, ratings, and teaching format so students land on the right profile faster.",
  },
  {
    title: "Structured sessions with visible momentum",
    description:
      "Every booking turns into a clear outcome with schedule visibility, review loops, and next-step planning.",
  },
  {
    title: "Built for trust from the first click",
    description:
      "Published profiles, verified reviews, and responsive support keep the platform feeling credible and calm.",
  },
];

export const processSteps = [
  {
    title: "Explore curated tutors",
    description:
      "Start with real tutor profiles, transparent pricing, and strong category signals instead of generic listings.",
  },
  {
    title: "Filter down to the right fit",
    description:
      "Use category, rating, subject, and budget filters to narrow the search without losing quality.",
  },
  {
    title: "Book and keep learning moving",
    description:
      "Choose an available session, confirm instantly, and track the outcome from dashboard to review.",
  },
];

export const testimonials = [
  {
    quote:
      "The tutor search felt much more intentional than other platforms. I found a React mentor and shipped my portfolio update in two weeks.",
    name: "Nadia Rahman",
    role: "Frontend learner",
  },
  {
    quote:
      "As a tutor, the booking flow is clean and I can actually see which sessions are upcoming, completed, or need follow-up.",
    name: "Tanvir Hasan",
    role: "React mentor",
  },
  {
    quote:
      "The reviews and dashboard data made it easy to trust the platform before committing to a longer learning plan.",
    name: "Farhan Kabir",
    role: "Career-switch student",
  },
];

export const faqItems = [
  {
    question: "How do students choose the right tutor?",
    answer:
      "Students can compare published tutor profiles using subject expertise, price range, rating, teaching mode, and recent availability.",
  },
  {
    question: "Can tutors manage their own session schedule?",
    answer:
      "Yes. Tutors can publish availability slots, track bookings, mark completed sessions, and monitor reviews from their dashboard.",
  },
  {
    question: "Is the platform useful for both online and offline learning?",
    answer:
      "Yes. Tutor profiles clearly show whether sessions are online, in-person, or flexible across both modes.",
  },
  {
    question: "What makes SkillBridge production-ready?",
    answer:
      "The platform includes role-based dashboards, live data cards, search and filtering, validation-driven forms, dark mode, and a full responsive layout.",
  },
];

export const resourceLinks = [
  {
    title: "About SkillBridge",
    href: "/about",
    description: "How the platform helps learners and tutors move with clarity.",
  },
  {
    title: "Contact Us",
    href: "/contact",
    description: "Reach the team for support, partnerships, or deployment questions.",
  },
  {
    title: "Help Center",
    href: "/help",
    description: "Answers to the most common student and tutor workflow questions.",
  },
  {
    title: "Privacy & Terms",
    href: "/privacy",
    description: "Platform policies, data handling basics, and expected conduct.",
  },
];

export const blogHighlights = [
  {
    title: "How to choose a tutor for project-based learning",
    excerpt:
      "Look beyond subject keywords and compare teaching structure, feedback quality, and whether the tutor helps you produce finished work.",
  },
  {
    title: "What a strong tutoring profile should communicate",
    excerpt:
      "Clear outcomes, concrete expertise, and honest availability matter more than vague self-promotion when students are deciding quickly.",
  },
  {
    title: "Turning one-off sessions into consistent progress",
    excerpt:
      "Students who keep momentum usually leave each session with a small deliverable, not just notes or inspiration.",
  },
];

export function getTutorGalleryImages(categoryName?: string, avatar?: string | null) {
  const categoryImages: Record<string, string[]> = {
    "Web Development": [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    ],
    "Spoken English": [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
    ],
    "Data Science": [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1200&q=80",
    ],
    "UI/UX Design": [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80",
    ],
    Mathematics: [
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80",
    ],
    "IELTS Preparation": [
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    ],
    "Product Management": [
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516321310764-8d8c068f1c70?auto=format&fit=crop&w=1200&q=80",
    ],
    "AI Foundations": [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?auto=format&fit=crop&w=1200&q=80",
    ],
  };

  const fallback = [
    "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
  ];

  return [avatar || fallback[0], ...(categoryImages[categoryName || ""] || fallback)];
}
