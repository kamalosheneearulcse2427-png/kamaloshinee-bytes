import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Play, Volume2 } from "lucide-react";

interface GameIntroProps {
  onStart: () => void;
}

const GameIntro = ({ onStart }: GameIntroProps) => {
  const [showPress, setShowPress] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPress(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.5 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 bg-[#0a0a0f] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Starfield background */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Animated grid lines */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(66, 184, 131, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(66, 184, 131, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Glowing orb */}
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Game title */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-center z-10"
      >
        <motion.h1
          className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-purple-500 to-pink-500 mb-4"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          style={{ backgroundSize: '200% 200%' }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          KAMALOSHENEE
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-xl md:text-2xl text-white/60 tracking-[0.3em] uppercase"
        >
          Portfolio Quest
        </motion.p>
      </motion.div>

      {/* Loading bar */}
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: "300px" }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="mt-12 h-2 bg-white/10 rounded-full overflow-hidden z-10"
      >
        <motion.div
          className="h-full bg-gradient-to-r from-teal-400 via-purple-500 to-pink-500"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ delay: 2, duration: 1.5, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Press to play button */}
      <AnimatePresence>
        {showPress && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
            onClick={onStart}
            className="mt-12 z-10 group"
          >
            <motion.div
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-500/20 to-purple-500/20 border-2 border-teal-400/50 rounded-full backdrop-blur-sm"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(45, 212, 191, 0.3)',
                  '0 0 40px rgba(45, 212, 191, 0.5)',
                  '0 0 20px rgba(45, 212, 191, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-6 h-6 text-teal-400 fill-teal-400" />
              <span className="text-xl font-bold text-white tracking-wider">
                PRESS TO PLAY
              </span>
            </motion.div>
            <motion.p
              className="text-white/40 text-sm mt-3 text-center"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Click or press any key
            </motion.p>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Version info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-6 text-white/40 text-sm z-10"
      >
        <p>v1.0.0 | 2024</p>
      </motion.div>

      {/* Sound indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 right-6 flex items-center gap-2 text-white/40 text-sm z-10"
      >
        <Volume2 className="w-4 h-4" />
        <span>Best with sound</span>
      </motion.div>
    </motion.div>
  );
};

export default GameIntro;
