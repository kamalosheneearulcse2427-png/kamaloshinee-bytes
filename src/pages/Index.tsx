import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LogoIntro from "@/components/elvinoa/LogoIntro";
import ElvinoaNav from "@/components/elvinoa/ElvinoaNav";
import WelcomeSection from "@/components/elvinoa/WelcomeSection";
import AboutSection from "@/components/elvinoa/AboutSection";
import ElectronicsSection from "@/components/elvinoa/ElectronicsSection";
import TodayProjectsSection from "@/components/elvinoa/TodayProjectsSection";
import AchievementsSection from "@/components/elvinoa/AchievementsSection";
import TimelineSection from "@/components/elvinoa/TimelineSection";
import BenefitsSection from "@/components/elvinoa/BenefitsSection";
import ContactSection from "@/components/elvinoa/ContactSection";
import logoAsset from "@/assets/elvinoa-logo.png.asset.json";

const Index = () => {
  const [entered, setEntered] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnimatePresence>
        {!entered && <LogoIntro key="intro" onEnter={() => setEntered(true)} />}
      </AnimatePresence>

      {entered && (
        <>
          <ElvinoaNav />
          <main>
            <WelcomeSection />
            <AboutSection />
            <ElectronicsSection />
            <TodayProjectsSection />
            <AchievementsSection />
            <TimelineSection />
            <BenefitsSection />
            <ContactSection />
          </main>

          <footer className="relative border-t border-border py-8 px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <img src={logoAsset.url} alt="Elvinoa" className="w-8 h-8 object-contain" />
              <span className="font-black text-gradient-neon tracking-wider">ELVINOA TECHNOLOGIES</span>
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Elvinoa Technologies. Engineering tomorrow, today.
            </p>
          </footer>
        </>
      )}
    </div>
  );
};

export default Index;
