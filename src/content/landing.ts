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
  media: MediaAsset;
};

export type SectionContent = {
  eyebrow?: string;
  heading: string;
  body: string;
  cta?: {
    label: string;
    href: string;
  };
  media?: MediaAsset;
};

export const heroContent: SectionContent = {
  eyebrow: "Photos to insights",
  heading: "Your complete facial analysis",
  body:
    "Leverage advanced analysis to decode your face structure and get personal recommendations.",
  media: {
    type: "video",
    src: "",
    responsivePoster: {
      mobile: "/images/female-top-xs.png",
      desktop: "/images/female-top-md.png",
      breakpoint: 768
    },
    alt: "Facial analysis preview",
    priority: true
  }
};

const generalQuestionItems: FAQItem[] = [
  {
    question: "What is Qoves?",
    answer:
      "Qoves is the world's deepest dive into improving your looks and aesthetic appeal based on personalized analysis. We provide you a home for optimized plans across skincare, facial structure, and lifestyle."
  },
  {
    question: "Who is this for?",
    answer:
      "Anyone who wants a structured, evidence-aware view of their facial features and a clearer path for improvement."
  },
  {
    question: "What exactly will I receive?",
    answer:
      "A report that translates your submitted photos into facial observations, priority areas, and practical next steps."
  },
  {
    question: "How does it work?",
    answer:
      "You submit photos, the analysis reviews visible features and proportions, then the report organizes findings into clear recommendations."
  },
  {
    question: "How long will it take for me to receive my results?",
    answer:
      "Turnaround depends on the selected package and review queue. The interface should make the current expectation visible at purchase time."
  },
  {
    question: "Is this a one-time report or a continuous service?",
    answer:
      "The first version can present the report as a one-time purchase while leaving space for follow-up plans or subscriptions."
  },
  {
    question: "How often do I need to submit photos?",
    answer:
      "Submit once for a baseline report, then again only when there are meaningful changes to track."
  }
];

function reuseGeneralQuestions(startIndex: number, total: number) {
  return Array.from(
    { length: total },
    (_, index) => generalQuestionItems[(startIndex + index) % generalQuestionItems.length]
  );
}

export const faqGroups: FAQGroup[] = [
  {
    title: "General Questions",
    defaultOpen: true,
    items: generalQuestionItems
  },
  {
    title: "About the Analysis",
    items: reuseGeneralQuestions(2, 5)
  },
  {
    title: "About the Protocol",
    items: reuseGeneralQuestions(4, 3)
  },
  {
    title: "Experience & Use",
    items: reuseGeneralQuestions(1, 6)
  },
  {
    title: "Pricing & Subscription",
    items: reuseGeneralQuestions(3, 4)
  },
  {
    title: "Privacy & Data",
    items: reuseGeneralQuestions(0, 7)
  },
  {
    title: "Mindset & Philosophy",
    items: reuseGeneralQuestions(5, 2)
  },
  {
    title: "Practical Concerns",
    items: reuseGeneralQuestions(6, 5)
  },
  {
    title: "About Support",
    items: reuseGeneralQuestions(2, 3)
  }
];

export const insecuritySection: SectionContent = {
  eyebrow: "Down to your front view",
  heading: "Will analyzing my face make me insecure?",
  body:
    "Get your answer back from a practical and informational plan based on 2000+ academic studies.",
  cta: {
    label: "Start your glow-up",
    href: "#faq"
  },
  media: {
    type: "video",
    src: "",
    poster: "/images/lifestyle-poster.svg",
    alt: "Person reviewing a facial analysis on a phone"
  }
};

export const analysisCards: CarouselCard[] = [
  {
    title: "Lifestyle factors",
    body: "See habits that may affect skin texture, energy, and facial presentation.",
    media: {
      type: "image",
      src: "/images/card-lifestyle.svg",
      alt: "Lifestyle factor preview"
    }
  },
  {
    title: "Outcome planning",
    body: "Turn observations into actions that are realistic to maintain.",
    media: {
      type: "image",
      src: "/images/card-outcomes.svg",
      alt: "Outcome planning preview"
    }
  },
  {
    title: "Feature context",
    body: "Understand visible proportions without turning the process into judgment.",
    media: {
      type: "image",
      src: "/images/card-features.svg",
      alt: "Feature context preview"
    }
  }
];

export const mindsetSection: SectionContent = {
  heading: "Is it vain to care about your appearance?",
  body:
    "Wanting to feel better walking into rooms is not shallow. The goal is to notice what is within your control and build a plan that feels measured, realistic, and private.",
  media: {
    type: "video",
    src: "",
    poster: "/images/mindset-poster.svg",
    alt: "Soft-focus portrait backdrop"
  }
};

export const mindsetCards: CarouselCard[] = [
  {
    title: "Consider this...",
    body: "Find precise actions that improve presentation without chasing unrealistic standards.",
    media: {
      type: "image",
      src: "/images/card-consider.svg",
      alt: "Consideration prompt"
    }
  },
  {
    title: "The mirror is not the metric",
    body: "Use structured analysis to reduce guesswork and focus on clear decisions.",
    media: {
      type: "image",
      src: "/images/card-metric.svg",
      alt: "Structured analysis prompt"
    }
  },
  {
    title: "Build from baseline",
    body: "Capture a starting point, then track visible changes with context.",
    media: {
      type: "image",
      src: "/images/card-baseline.svg",
      alt: "Baseline prompt"
    }
  }
];
