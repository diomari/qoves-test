import {
  analysisCards,
  faqGroups,
  heroContent,
  insecuritySection,
  mindsetCards,
  mindsetSection
} from "@/content/landing";

import { FAQAccordion } from "@/components/FAQAccordion";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { UnifiedStoryPanel } from "@/components/UnifiedStoryPanel";

export default function Home() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <Hero content={heroContent} />

      <Section
        className="bg-paper py-16 sm:py-24"
        id="faq"
        innerClassName="max-w-[430px] sm:max-w-3xl"
      >
        <Reveal className="text-center">
          <p className="mx-auto mb-5 w-fit rounded-full border border-ink/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-ink/42">
            Introducing
          </p>
          <h2 className="text-balance text-3xl font-light leading-none tracking-normal text-ink sm:text-5xl">
            Frequently asked <span className="text-[#8ca2aa]">questions</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xs text-pretty text-xs leading-5 text-ink/62 sm:max-w-md sm:text-sm">
            If you have any other questions, please use the chat box in the
            corner right or contact us over email at help@qoves.com.
          </p>
        </Reveal>
        <Reveal className="mt-9" delay={0.08}>
          <FAQAccordion groups={faqGroups} />
        </Reveal>
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
