import {
  DeferredPersonalizedPlanSection,
  DeferredStorySection,
} from "@/components/sections/HomeDeferredSections";
import { FAQSection } from "@/components/sections/FAQ";
import { HeroSection } from "@/components/sections/Hero";

import styles from "./HomePage.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.pageRightBorder}></div>
      <div className={styles.pageLeftBorder}></div>
      <DeferredPersonalizedPlanSection />
      <HeroSection />
      <FAQSection />
      <DeferredStorySection />
    </main>
  );
}
