import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { Section } from "@/components/shared/Section";
import { TextPill } from "@/components/shared/TextPill";
import { faqGroups } from "@/content/landing";

export function FAQSection() {
  return (
    <Section
      className="bg-paper py-16 sm:py-24"
      id="faq"
      innerClassName="max-w-[430px] sm:max-w-3xl"
    >
      <div className="text-center">
        <TextPill className="mb-4">Introducing</TextPill>
        <h2 className="text-balance text-[32px] font-light leading-none tracking-normal text-ink">
          Frequently asked <span className="text-[#8ca2aa]">questions</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xs text-pretty text-xs leading-5 text-ink/62 sm:max-w-md sm:text-sm">
          If you have any other questions, please use the chat box in the
          corner right or contact us over email at help@qoves.com.
        </p>
      </div>
      <div className="mt-9">
        <FAQAccordion groups={faqGroups} />
      </div>
    </Section>
  );
}
