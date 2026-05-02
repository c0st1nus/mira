import { type Language, landingContent } from "@/lib/landing-content";
import { AboutChallengeSection } from "./about-challenge-section";
import { BenefitsSection } from "./benefits-section";
import { FaqSection } from "./faq-section";
import { FinalCta } from "./final-cta";
import { Footer } from "./footer";
import { Header } from "./header";
import { HeroSection } from "./hero-section";
import { LanguageSync } from "./language-sync";
import { MiraSection } from "./mira-section";
import { MobileActionBar } from "./mobile-action-bar";
import { StepsSection } from "./steps-section";
import { TimelineSection } from "./timeline-section";
import { TracksSection } from "./tracks-section";

export function LandingShell({ language }: { language: Language }) {
  const content = landingContent[language];

  return (
    <div className="relative isolate min-h-screen overflow-hidden">
      <LanguageSync language={language} />
      <div aria-hidden="true" className="ambient-bg" />
      <div className="relative z-10">
        <Header content={content} language={language} />
        <main className="landing-main">
          <div aria-hidden="true" className="section-flow-bg" />
          <HeroSection content={content} />
          <AboutChallengeSection content={content} />
          <BenefitsSection content={content} />
          <TracksSection content={content} />
          <StepsSection content={content} />
          <MiraSection content={content} />
          <TimelineSection content={content} />
          <FaqSection content={content} />
          <FinalCta content={content} />
        </main>
        <Footer content={content} />
        <MobileActionBar content={content} />
      </div>
    </div>
  );
}
