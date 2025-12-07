import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Gamepad2, Lock, Unlock } from "lucide-react";

interface InteractiveMoonProps {
  children: React.ReactNode;
  moonSize?: number;
  sectionName?: string;
  onReveal?: () => void;
}

const InteractiveMoon = ({ children, moonSize = 100, sectionName = "Zone", onReveal }: InteractiveMoonProps) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showUnlockEffect, setShowUnlockEffect] = useState(false);

  const handleReveal = () => {
    setShowUnlockEffect(true);
    setTimeout(() => {
      setIsRevealed(true);
      onReveal?.();
    }, 500);
  };

  return (
    <div className="relative">
      {/* Lock trigger */}
      <AnimatePresence>
        {!isRevealed && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 2 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          >
            <motion.div
              className="pointer-events-auto cursor-pointer relative"
              onClick={handleReveal}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{ width: moonSize, height: moonSize }}
            >
              {/* Pulsing rings */}
              {[1, 2, 3].map((ring) => (
                <motion.div
                  key={ring}
                  className="absolute inset-0 rounded-full border-2 border-teal-400/30"
                  animate={{
                    scale: [1, 1.5 + ring * 0.3],
                    opacity: [0.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: ring * 0.4,
                  }}
                />
              ))}

              {/* Main orb */}
              <motion.div
                className="relative w-full h-full rounded-full overflow-hidden"
                style={{
                  background: showUnlockEffect
                    ? "radial-gradient(circle at 30% 30%, #34d399 0%, #10b981 50%, #059669 100%)"
                    : "radial-gradient(circle at 30% 30%, #2dd4bf 0%, #a855f7 50%, #ec4899 100%)",
                  boxShadow: showUnlockEffect
                    ? "0 0 80px rgba(52, 211, 153, 0.8)"
                    : "0 0 60px rgba(168, 85, 247, 0.5), 0 0 100px rgba(236, 72, 153, 0.3)",
                }}
                animate={{
                  rotate: showUnlockEffect ? 720 : [0, 360],
                  scale: showUnlockEffect ? [1, 1.5, 0] : 1,
                }}
                transition={{
                  rotate: showUnlockEffect ? { duration: 0.5 } : { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: showUnlockEffect ? { duration: 0.5 } : {},
                }}
              >
                {/* Inner glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ 
                      rotateY: [0, 180, 360],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    {showUnlockEffect ? (
                      <Unlock className="w-8 h-8 text-white" />
                    ) : (
                      <Lock className="w-8 h-8 text-white drop-shadow-lg" />
                    )}
                  </motion.div>
                </div>
              </motion.div>

              {/* Floating particles */}
              {!showUnlockEffect && [...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-teal-400 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  animate={{
                    x: [0, Math.cos(i * 60 * Math.PI / 180) * 60],
                    y: [0, Math.sin(i * 60 * Math.PI / 180) * 60],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}

              {/* Label */}
              <motion.div
                className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <p className="text-white/90 text-lg font-bold tracking-wider whitespace-nowrap">
                  🎮 UNLOCK {sectionName.toUpperCase()}
                </p>
                <motion.p
                  className="text-teal-400/80 text-sm mt-1"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Click to reveal
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content with reveal animation */}
      <motion.div
        initial={{ opacity: 0, filter: "blur(20px)", scale: 0.9 }}
        animate={{
          opacity: isRevealed ? 1 : 0.05,
          filter: isRevealed ? "blur(0px)" : "blur(30px)",
          scale: isRevealed ? 1 : 0.9,
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {children}
      </motion.div>

      {/* Lock button when revealed */}
      <AnimatePresence>
        {isRevealed && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ delay: 0.5, type: "spring" }}
            onClick={() => setIsRevealed(false)}
            className="fixed bottom-6 right-6 z-50 group"
          >
            <motion.div
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(168, 85, 247, 0.4)',
                  '0 0 30px rgba(168, 85, 247, 0.6)',
                  '0 0 20px rgba(168, 85, 247, 0.4)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Gamepad2 className="w-5 h-5 text-white" />
              <span className="text-white font-bold text-sm tracking-wide">LOCK ZONE</span>
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveMoon;