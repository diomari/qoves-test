import {
  analysisCards,
  faqGroups,
  heroContent,
  insecuritySection,
  mindsetCards,
  mindsetSection,
} from "@/content/landing";

import { FAQAccordion } from "@/components/FAQAccordion";
import { Hero } from "@/components/Hero";
import { PersonalizedPlanSection } from "@/components/PersonalizedPlanSection";
import { Section } from "@/components/Section";
import { UnifiedStoryPanel } from "@/components/UnifiedStoryPanel";
import { TextPill } from "@/components/general/TextPill";

export default function Home() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <PersonalizedPlanSection />
      <Hero content={heroContent} />

      <Section
        className="bg-paper py-16 sm:py-24"
        id="faq"
        innerClassName="max-w-[430px] sm:max-w-3xl"
      >
        <div className="text-center">
          <TextPill className="mb-4">Introducing</TextPill>
          <h2 className="text-balance text-[32px] font-light leading-none tracking-normal text-ink ">
            Frequently asked <span className="text-[#8ca2aa]">questions</span>
          </h2>
          <p className="mx-auto text[14px] mt-5 max-w-xs text-pretty text-xs leading-5 text-ink/62 sm:max-w-md sm:text-sm">
            If you have any other questions, please use the chat box in the
            corner right or contact us over email at help@qoves.com.
          </p>
        </div>
        <div className="mt-9">
          <FAQAccordion groups={faqGroups} />
        </div>
      </Section>

      <UnifiedStoryPanel
        analysisCards={analysisCards}
        insecuritySection={insecuritySection}
        mindsetCards={mindsetCards}
        mindsetSection={mindsetSection}
      />
    </main>
  );
}
