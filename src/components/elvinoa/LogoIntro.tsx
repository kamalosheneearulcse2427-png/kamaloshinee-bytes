import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import logoAsset from "@/assets/elvinoa-logo.png.asset.json";

interface LogoIntroProps {
  onEnter: () => void;
}

// Boot-up splash: logo scans in, tagline appears, then a big "Enter" button
// (needed so the browser lets us call speechSynthesis later — autoplay policy).
const LogoIntro = ({ onEnter }: LogoIntroProps) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowButton(true), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background hex-grid overflow-hidden"
    >
      {/* Scanning circuit lines */}
      <motion.div
        className="absolute inset-x-0 h-1 bg-gradient-neon opacity-70"
        initial={{ top: 0 }}
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating circuit nodes */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-neon"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.6, 1] }}
          transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
        />
      ))}

      <motion.div
        initial={{ scale: 0.6, opacity: 0, rotateY: -90 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative"
      >
        <div className="absolute inset-0 rounded-full bg-neon blur-3xl opacity-30" />
        <img
          src={logoAsset.url}
          alt="Elvinoa Technologies"
          className="relative w-56 h-56 md:w-72 md:h-72 object-contain drop-shadow-[0_0_30px_hsl(88_95%_55%/0.6)]"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-8 text-center"
      >
        <p className="font-mono text-electric text-sm md:text-base tracking-[0.4em] uppercase">
          System Initializing<span className="animate-pulse">_</span>
        </p>
      </motion.div>

      <AnimatePresence>
        {showButton && (
          <motion.button
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEnter}
            className="mt-12 relative group px-10 py-4 bg-gradient-neon text-primary-foreground font-bold text-lg tracking-widest uppercase rounded-md glow-neon"
          >
            <span className="relative z-10">Enter Elvinoa</span>
            <motion.span
              className="absolute inset-0 rounded-md border-2 border-neon"
              animate={{ scale: [1, 1.15, 1], opacity: [0.8, 0, 0.8] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      <p className="absolute bottom-6 text-xs text-muted-foreground tracking-widest">
        © ELVINOA TECHNOLOGIES · EST. 2024
      </p>
    </motion.section>
  );
};

export default LogoIntro;
