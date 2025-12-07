import { motion } from "framer-motion";
import { Star, Zap, Target, Trophy } from "lucide-react";

interface GameHUDProps {
  currentSection: string;
  sectionsVisited: string[];
}

const sections = [
  { id: 'home', name: 'START', icon: Star },
  { id: 'about', name: 'ABOUT', icon: Zap },
  { id: 'education', name: 'EDUCATION', icon: Target },
  { id: 'skills', name: 'SKILLS', icon: Trophy },
  { id: 'projects', name: 'PROJECTS', icon: Star },
  { id: 'experience', name: 'EXPERIENCE', icon: Zap },
  { id: 'contact', name: 'CONTACT', icon: Target },
];

const GameHUD = ({ currentSection, sectionsVisited }: GameHUDProps) => {
  const progress = Math.round((sectionsVisited.length / sections.length) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
    >
      {/* Main HUD container */}
      <div className="flex items-center gap-4 px-6 py-3 bg-black/60 backdrop-blur-lg border border-white/10 rounded-full">
        {/* Level indicator */}
        <div className="flex items-center gap-2">
          <motion.div
            className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-400 to-purple-500 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Star className="w-5 h-5 text-white fill-white" />
          </motion.div>
          <div className="text-left">
            <p className="text-[10px] text-white/50 uppercase tracking-wider">Level</p>
            <p className="text-sm font-bold text-white">{sectionsVisited.length}/{sections.length}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-white/20" />

        {/* Progress bar */}
        <div className="flex flex-col items-center gap-1">
          <p className="text-[10px] text-white/50 uppercase tracking-wider">Progress</p>
          <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-teal-400 via-purple-500 to-pink-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-white/20" />

        {/* Current zone */}
        <div className="text-right">
          <p className="text-[10px] text-white/50 uppercase tracking-wider">Zone</p>
          <motion.p
            key={currentSection}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-bold text-teal-400 uppercase"
          >
            {sections.find(s => s.id === currentSection)?.name || 'LOADING'}
          </motion.p>
        </div>
      </div>

      {/* Section dots */}
      <div className="flex justify-center gap-2 mt-3">
        {sections.map((section) => (
          <motion.div
            key={section.id}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSection === section.id
                ? 'bg-teal-400 scale-125'
                : sectionsVisited.includes(section.id)
                ? 'bg-purple-500'
                : 'bg-white/20'
            }`}
            animate={currentSection === section.id ? {
              boxShadow: [
                '0 0 10px rgba(45, 212, 191, 0.5)',
                '0 0 20px rgba(45, 212, 191, 0.8)',
                '0 0 10px rgba(45, 212, 191, 0.5)',
              ],
            } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default GameHUD;
