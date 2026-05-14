import {
  analysisCards,
  faqGroups,
  heroContent,
  insecuritySection,
  mindsetCards,
  mindsetSection
} from "@/content/landing";

import { CTAButton } from "@/components/CTAButton";
import { FAQAccordion } from "@/components/FAQAccordion";
import { GlassPanel } from "@/components/GlassPanel";
import { Hero } from "@/components/Hero";
import { MediaCarousel } from "@/components/MediaCarousel";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { VideoBackdrop } from "@/components/VideoBackdrop";

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

      <section className="relative isolate min-h-[760px] overflow-hidden bg-charcoal text-white sm:min-h-[840px]">
        <VideoBackdrop media={insecuritySection.media} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,19,18,0.08)_0%,rgba(18,19,18,0.38)_45%,rgba(18,19,18,0.88)_100%)]" />
        <div className="relative z-10 mx-auto flex min-h-[760px] max-w-6xl flex-col px-4 pb-8 pt-48 text-center sm:min-h-[840px] sm:pt-56 lg:pt-72">
          <Reveal>
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.22em] text-white/70">
              {insecuritySection.eyebrow}
            </p>
            <h2 className="mx-auto max-w-sm text-balance text-[2rem] font-light leading-none tracking-normal sm:max-w-2xl sm:text-6xl">
              {insecuritySection.heading}
            </h2>
            <p className="mx-auto mt-5 max-w-[18rem] text-pretty text-xs leading-5 text-white/72 sm:max-w-md sm:text-sm">
              {insecuritySection.body}
            </p>
            {insecuritySection.cta ? (
              <div className="mt-7">
                <CTAButton href={insecuritySection.cta.href}>
                  {insecuritySection.cta.label}
                </CTAButton>
              </div>
            ) : null}
          </Reveal>

          <Reveal className="mt-auto" delay={0.12}>
            <MediaCarousel cards={analysisCards} />
          </Reveal>
        </div>
      </section>

      <section className="relative isolate min-h-[760px] overflow-hidden bg-charcoal text-white">
        <VideoBackdrop
          media={mindsetSection.media}
          overlayClassName="bg-[linear-gradient(180deg,rgba(27,25,22,0.62)_0%,rgba(26,24,22,0.48)_42%,rgba(20,19,18,0.92)_100%)]"
        />
        <div className="absolute inset-0 backdrop-blur-[2px]" />
        <div className="relative z-10 mx-auto flex min-h-[760px] max-w-6xl flex-col px-4 pb-10 pt-48 text-center sm:pt-56 lg:pt-64">
          <Reveal>
            <h2 className="mx-auto max-w-xs text-balance text-[2rem] font-light leading-none tracking-normal sm:max-w-2xl sm:text-6xl">
              {mindsetSection.heading}
            </h2>
            <p className="mx-auto mt-5 max-w-[19rem] text-pretty text-xs leading-5 text-white/72 sm:max-w-lg sm:text-sm">
              {mindsetSection.body}
            </p>
          </Reveal>
          <Reveal className="mt-auto" delay={0.12}>
            <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 text-left [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {mindsetCards.map((card) => (
                <GlassPanel
                  className="min-h-[188px] w-[274px] shrink-0 p-4"
                  key={card.title}
                >
                  <h3 className="text-lg font-light leading-tight">{card.title}</h3>
                  <p className="mt-14 rounded-[4px] bg-white/12 px-3 py-2 text-[11px] leading-4 text-white/74 ring-1 ring-white/12">
                    {card.body}
                  </p>
                </GlassPanel>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
