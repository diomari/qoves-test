import { FAQSection } from "@/components/sections/FAQSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { PersonalizedPlanSection } from "@/components/sections/PersonalizedPlanSection";
import { StorySection } from "@/components/sections/StorySection";

export default function Home() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <PersonalizedPlanSection />
      <HeroSection />
      <FAQSection />
      <StorySection />
    </main>
  );
}
