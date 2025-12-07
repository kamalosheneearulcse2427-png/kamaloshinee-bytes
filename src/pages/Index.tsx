import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import GameIntro from "@/components/GameIntro";
import GameHUD from "@/components/GameHUD";
import LevelUpNotification from "@/components/LevelUpNotification";

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const [sectionsVisited, setSectionsVisited] = useState<string[]>(['home']);
  const [levelUpInfo, setLevelUpInfo] = useState<{ show: boolean; name: string }>({ show: false, name: '' });

  // Handle keyboard to start game
  useEffect(() => {
    const handleKeyPress = () => {
      if (!gameStarted) setGameStarted(true);
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted]);

  // Track current section on scroll
  useEffect(() => {
    if (!gameStarted) return;

    const sections = ['home', 'about', 'education', 'skills', 'projects', 'experience', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const absoluteTop = top + window.scrollY;
          const absoluteBottom = bottom + window.scrollY;
          
          if (scrollPosition >= absoluteTop && scrollPosition <= absoluteBottom) {
            if (currentSection !== sectionId) {
              setCurrentSection(sectionId);
              
              // Mark section as visited and show level up
              if (!sectionsVisited.includes(sectionId)) {
                setSectionsVisited(prev => [...prev, sectionId]);
                const sectionNames: Record<string, string> = {
                  home: 'Home Base',
                  about: 'About Zone',
                  education: 'Education Realm',
                  skills: 'Skills Arena',
                  projects: 'Projects Galaxy',
                  experience: 'Experience Path',
                  contact: 'Contact Portal',
                };
                setLevelUpInfo({ show: true, name: sectionNames[sectionId] || sectionId });
              }
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [gameStarted, currentSection, sectionsVisited]);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Game Intro Screen */}
      <AnimatePresence>
        {!gameStarted && (
          <GameIntro onStart={() => setGameStarted(true)} />
        )}
      </AnimatePresence>

      {/* Game HUD */}
      {gameStarted && (
        <GameHUD 
          currentSection={currentSection} 
          sectionsVisited={sectionsVisited} 
        />
      )}

      {/* Level Up Notification */}
      <LevelUpNotification
        show={levelUpInfo.show}
        sectionName={levelUpInfo.name}
        onComplete={() => setLevelUpInfo({ show: false, name: '' })}
      />

      {/* Main Content */}
      <AnimatePresence>
        {gameStarted && (
          <>
            <Navigation />
            <main>
              <Hero />
              <About />
              <Education />
              <Skills />
              <Projects />
              <Experience />
              <Contact />
            </main>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
