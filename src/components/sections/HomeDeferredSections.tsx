"use client";

import dynamic from "next/dynamic";

import styles from "@/app/HomePage.module.scss";

const PersonalizedPlanSection = dynamic(
  () =>
    import("@/components/sections/PersonalizedPlan").then(
      (module) => module.PersonalizedPlanSection,
    ),
  {
    ssr: false,
    loading: () => <SectionPlaceholder className={styles.planPlaceholder} />,
  },
);

const StorySection = dynamic(
  () => import("@/components/sections/Story").then((module) => module.StorySection),
  {
    ssr: false,
    loading: () => <SectionPlaceholder className={styles.storyPlaceholder} />,
  },
);

export function DeferredPersonalizedPlanSection() {
  return <PersonalizedPlanSection />;
}

export function DeferredStorySection() {
  return <StorySection />;
}

function SectionPlaceholder({ className }: { className: string }) {
  return <div aria-hidden="true" className={className} />;
}
