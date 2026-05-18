import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { Section } from "@/components/shared/Section";
import { TextPill } from "@/components/shared/TextPill";
import { faqGroups } from "@/content/landing";

import styles from "./FAQSection.module.scss";

export function FAQSection() {
  return (
    <Section
      className={styles.section}
      id="faq"
      innerClassName={styles.inner}
    >
      <div className={styles.intro}>
        <TextPill className={styles.pill}>Introducing</TextPill>
        <h2 className={styles.title}>
          Frequently asked <span className={styles.highlight}>questions</span>
        </h2>
        <p className={styles.description}>
          If you have any other questions, please use the chat box in the
          corner right or contact us over email at help@qoves.com.
        </p>
      </div>
      <div className={styles.accordion}>
        <FAQAccordion groups={faqGroups} />
      </div>
    </Section>
  );
}
