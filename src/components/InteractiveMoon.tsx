import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface InteractiveMoonProps {
  children: React.ReactNode;
  moonSize?: number;
}

const InteractiveMoon = ({ children, moonSize = 80 }: InteractiveMoonProps) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div className="relative">
      {/* Moon trigger */}
      <AnimatePresence>
        {!isRevealed && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          >
            <motion.div
              className="pointer-events-auto cursor-pointer relative"
              onClick={() => setIsRevealed(true)}
              onHoverStart={() => setIsRevealed(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{ width: moonSize, height: moonSize }}
            >
              {/* Moon glow */}
              <motion.div
                className="absolute inset-0 rounded-full bg-yellow-100/30 blur-xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              {/* Moon surface */}
              <motion.div
                className="relative w-full h-full rounded-full overflow-hidden"
                style={{
                  background: "radial-gradient(circle at 30% 30%, #fffde7 0%, #ffd54f 40%, #ffb300 100%)",
                  boxShadow: "0 0 60px rgba(255, 215, 0, 0.5), inset -10px -10px 30px rgba(0,0,0,0.2)",
                }}
                animate={{
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{ duration: 8, repeat: Infinity }}
              >
                {/* Moon craters */}
                <div className="absolute w-4 h-4 rounded-full bg-amber-200/50 top-4 left-6" />
                <div className="absolute w-3 h-3 rounded-full bg-amber-300/40 top-8 right-4" />
                <div className="absolute w-5 h-5 rounded-full bg-amber-200/30 bottom-6 left-4" />
                <div className="absolute w-2 h-2 rounded-full bg-amber-300/50 bottom-4 right-6" />
              </motion.div>

              {/* Floating text */}
              <motion.p
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white/70 text-sm whitespace-nowrap font-medium"
                animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✨ Touch the moon ✨
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content with reveal animation */}
      <motion.div
        initial={{ opacity: 0, filter: "blur(20px)" }}
        animate={{
          opacity: isRevealed ? 1 : 0.1,
          filter: isRevealed ? "blur(0px)" : "blur(20px)",
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {children}
      </motion.div>

      {/* Reset button when revealed */}
      <AnimatePresence>
        {isRevealed && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.5 }}
            onClick={() => setIsRevealed(false)}
            className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-amber-400 to-yellow-500 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2"
          >
            <span>🌙</span> Hide with Moon
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveMoon;