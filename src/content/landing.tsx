export type MediaAsset = {
  type: "image" | "video";
  src: string;
  poster?: string;
  responsivePoster?: {
    mobile: string;
    desktop: string;
    breakpoint?: number;
  };
  alt: string;
  priority?: boolean;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type FAQGroup = {
  title: string;
  items: FAQItem[];
  defaultOpen?: boolean;
};

export type CarouselCard = {
  title: string;
  body: string;
  items?: string[];
  media: MediaAsset;
};

export type MindsetCard = {
  title: string;
  items?: string[];
};

export type SectionContent = {
  eyebrow?: string;
  heading: React.ReactNode;
  body: string;
  cta?: {
    label: string;
    href: string;
  };
  media?: MediaAsset;
};

export const heroContent: SectionContent = {
  eyebrow: "Personalized aesthetics",
  heading: (
    <>
      Your complete <span className="opacity-50">facial analysis</span>
    </>
  ),
  body: "Every face is unique. We analyze 163 aspects of your face to understand your personal facial aesthetics.",
  media: {
    type: "image",
    src: "/images/female-top.png",
    alt: "Facial analysis preview",
    priority: true,
  },
};

const generalQuestionItems: FAQItem[] = [
  {
    question: "What is Qoves?",
    answer:
      "Qoves is the world's deepest dive into improving your looks and aesthetic appeal based on personalized analysis. We provide you a home for optimized plans across skincare, facial structure, and lifestyle.",
  },
  {
    question: "Who is this for?",
    answer:
      "Anyone who wants a structured, evidence-aware view of their facial features and a clearer path for improvement.",
  },
  {
    question: "What exactly will I receive?",
    answer:
      "A report that translates your submitted photos into facial observations, priority areas, and practical next steps.",
  },
  {
    question: "How does it work?",
    answer:
      "You submit photos, the analysis reviews visible features and proportions, then the report organizes findings into clear recommendations.",
  },
  {
    question: "How long will it take for me to receive my results?",
    answer:
      "Turnaround depends on the selected package and review queue. The interface should make the current expectation visible at purchase time.",
  },
  {
    question: "Is this a one-time report or a continuous service?",
    answer:
      "The first version can present the report as a one-time purchase while leaving space for follow-up plans or subscriptions.",
  },
  {
    question: "How often do I need to submit photos?",
    answer:
      "Submit once for a baseline report, then again only when there are meaningful changes to track.",
  },
];

function reuseGeneralQuestions(startIndex: number, total: number) {
  return Array.from(
    { length: total },
    (_, index) =>
      generalQuestionItems[(startIndex + index) % generalQuestionItems.length],
  );
}

export const faqGroups: FAQGroup[] = [
  {
    title: "General Questions",
    defaultOpen: true,
    items: generalQuestionItems,
  },
  {
    title: "About the Analysis",
    items: reuseGeneralQuestions(2, 5),
  },
  {
    title: "About the Protocol",
    items: reuseGeneralQuestions(4, 3),
  },
  {
    title: "Experience & Use",
    items: reuseGeneralQuestions(1, 6),
  },
  {
    title: "Pricing & Subscription",
    items: reuseGeneralQuestions(3, 4),
  },
  {
    title: "Privacy & Data",
    items: reuseGeneralQuestions(0, 7),
  },
  {
    title: "Mindset & Philosophy",
    items: reuseGeneralQuestions(5, 2),
  },
  {
    title: "Practical Concerns",
    items: reuseGeneralQuestions(6, 5),
  },
  {
    title: "About Support",
    items: reuseGeneralQuestions(2, 3),
  },
];

export const insecuritySection: SectionContent = {
  eyebrow: "Backed by 2000+ research papers",
  heading: "Will analyzing my face make me insecure?",
  body: "Get your answer back from a practical and informational plan based on 2000+ academic studies.",
  cta: {
    label: "Start your glow-up",
    href: "#faq",
  },
  media: {
    type: "video",
    src: "",
    poster: "/images/lifestyle-poster.svg",
    alt: "Person reviewing a facial analysis on a phone",
  },
};

export const analysisCards: CarouselCard[] = [
  {
    title: "Lifestyle factors",
    body: "Considers diet, climate, stress, sleep, and habits.",
    media: {
      type: "image",
      src: "/images/analysis-lifestyle-@2x.png",
      alt: "Lifestyle factor preview",
    },
  },
  {
    title: "Cultural beauty standards",
    body: "Adapts to regional and societal ideals.",
    media: {
      type: "image",
      src: "/images/analysis-cultural-@2x.png",
      alt: "Cultural beauty standards preview",
    },
  },
  {
    title: "Genetic factors",
    body: "Takes into account genetic factors and how they might impact your facial aesthetics.",
    media: {
      type: "image",
      src: "/images/analysis-genetic-@2x.png",
      alt: "Genetic factor preview",
    },
  },
];

export const mindsetSection: SectionContent = {
  heading: "Is it vain to care about your appearance?",
  body: "Wanting to feel better walking into rooms is not shallow. The goal is to notice what is within your control and build a plan that feels measured, realistic, and private.",
  media: {
    type: "video",
    src: "",
    poster: "/images/mindset-poster.svg",
    alt: "Soft-focus portrait backdrop",
  },
};

export const mindsetCards: MindsetCard[] = [
  {
    title: "Consider this...",
    items: [
      "First impressions matter",
      "It has a considerable impact on interpersonal interactions",
      "Small improvements can drastically impact quality of life",
    ],
  },
  {
    title: "The key is approaching it intelligently",
    items: [
      "Use evidence instead of self-criticism",
      "Separate observation from emotion",
      "Focus on what can be changed or improved",
    ],
  },
];
