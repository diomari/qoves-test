import { FAQSection } from "@/components/sections/FAQ";
import { HeroSection } from "@/components/sections/Hero";
import { PersonalizedPlanSection } from "@/components/sections/PersonalizedPlan";
import { StorySection } from "@/components/sections/Story";

import styles from "./HomePage.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.pageRightBorder}></div>
      <div className={styles.pageLeftBorder}></div>
      <PersonalizedPlanSection />
      <HeroSection />
      <FAQSection />
      <StorySection />
    </main>
  );
}
