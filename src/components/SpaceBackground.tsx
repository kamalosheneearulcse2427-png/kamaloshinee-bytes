import { motion } from "framer-motion";
import { useMemo } from "react";

interface SpaceBackgroundProps {
  starCount?: number;
  showNebula?: boolean;
}

const SpaceBackground = ({ starCount = 100, showNebula = true }: SpaceBackgroundProps) => {
  const stars = useMemo(() => 
    [...Array(starCount)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    })), [starCount]
  );

  const shootingStars = useMemo(() => 
    [...Array(3)].map((_, i) => ({
      id: i,
      delay: i * 4 + Math.random() * 2,
      duration: 1.5,
      startX: Math.random() * 50,
      startY: Math.random() * 30,
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Deep space gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d1117] to-[#161b22]" />
      
      {/* Twinkling stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map((star) => (
        <motion.div
          key={`shooting-${star.id}`}
          className="absolute w-20 h-0.5 bg-gradient-to-r from-white to-transparent rounded-full"
          style={{
            left: `${star.startX}%`,
            top: `${star.startY}%`,
            rotate: "45deg",
          }}
          animate={{
            x: [0, 300],
            y: [0, 200],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            repeatDelay: star.delay + 8,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Nebula clouds */}
      {showNebula && (
        <>
          <motion.div
            animate={{ 
              x: [0, 30, 0],
              y: [0, -20, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute top-20 left-10 w-96 h-96 bg-teal/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              x: [0, -30, 0],
              y: [0, 20, 0],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{ duration: 12, repeat: Infinity }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-purple/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink/5 rounded-full blur-3xl"
          />
        </>
      )}

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-teal/50 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
};

export default SpaceBackground;