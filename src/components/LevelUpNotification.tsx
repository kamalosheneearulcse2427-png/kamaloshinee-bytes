import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, Sparkles } from "lucide-react";

interface LevelUpNotificationProps {
  show: boolean;
  sectionName: string;
  onComplete: () => void;
}

const LevelUpNotification = ({ show, sectionName, onComplete }: LevelUpNotificationProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: -50 }}
          transition={{ type: "spring", duration: 0.6 }}
          onAnimationComplete={onComplete}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50"
        >
          <motion.div
            className="relative px-8 py-4 bg-gradient-to-r from-purple-600/90 to-pink-600/90 backdrop-blur-lg rounded-2xl border border-white/20"
            animate={{
              boxShadow: [
                '0 0 30px rgba(168, 85, 247, 0.4)',
                '0 0 60px rgba(168, 85, 247, 0.6)',
                '0 0 30px rgba(168, 85, 247, 0.4)',
              ],
            }}
            transition={{ duration: 0.5, repeat: 3 }}
          >
            {/* Floating particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2"
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 1,
                }}
                animate={{
                  x: (Math.random() - 0.5) * 100,
                  y: -50 - Math.random() * 50,
                  opacity: 0,
                  scale: 0,
                }}
                transition={{ duration: 1, delay: i * 0.1 }}
              >
                <Star className="w-full h-full text-yellow-400 fill-yellow-400" />
              </motion.div>
            ))}

            <div className="flex items-center gap-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1 }}
                className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center"
              >
                <Trophy className="w-6 h-6 text-yellow-900" />
              </motion.div>
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs text-white/70 uppercase tracking-wider">Achievement Unlocked</span>
                </div>
                <p className="text-xl font-bold text-white">
                  {sectionName} Discovered!
                </p>
              </div>
            </div>

            {/* Progress XP */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-3 flex items-center justify-end gap-2"
            >
              <span className="text-sm text-yellow-300 font-bold">+100 XP</span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LevelUpNotification;
