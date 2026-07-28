import { motion } from "framer-motion";

// SVG robot mentor. `talking` triggers a mouth/glow pulse.
export default function AnimatedRobot({ talking = false, size = 220 }: { talking?: boolean; size?: number }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 200 220"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: [0, -8, 0], opacity: 1 }}
      transition={{ y: { duration: 3, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.6 } }}
    >
      <defs>
        <linearGradient id="rBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(262 83% 62%)" />
          <stop offset="100%" stopColor="hsl(189 94% 55%)" />
        </linearGradient>
        <radialGradient id="rEye" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="hsl(189 94% 55%)" />
        </radialGradient>
      </defs>
      {/* antenna */}
      <line x1="100" y1="12" x2="100" y2="32" stroke="hsl(291 82% 76%)" strokeWidth="2" />
      <motion.circle cx="100" cy="10" r="5" fill="hsl(291 82% 76%)"
        animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }} />
      {/* head */}
      <rect x="55" y="30" width="90" height="72" rx="18" fill="url(#rBody)" opacity="0.95" />
      <rect x="55" y="30" width="90" height="72" rx="18" fill="none" stroke="hsl(291 82% 76%)" strokeWidth="1.5" opacity="0.6" />
      {/* eyes */}
      <motion.circle cx="80" cy="66" r="9" fill="url(#rEye)"
        animate={{ scale: talking ? [1, 1.15, 1] : 1 }} transition={{ duration: 0.4, repeat: Infinity }} />
      <motion.circle cx="120" cy="66" r="9" fill="url(#rEye)"
        animate={{ scale: talking ? [1, 1.15, 1] : 1 }} transition={{ duration: 0.4, repeat: Infinity, delay: 0.1 }} />
      {/* mouth */}
      <motion.rect x="82" y="84" width="36" height={talking ? 8 : 3} rx="2" fill="hsl(291 82% 76%)"
        animate={{ height: talking ? [3, 10, 3] : 3 }} transition={{ duration: 0.35, repeat: Infinity }} />
      {/* body */}
      <rect x="45" y="106" width="110" height="80" rx="16" fill="url(#rBody)" opacity="0.9" />
      <circle cx="100" cy="146" r="10" fill="hsl(230 45% 6%)" />
      <circle cx="100" cy="146" r="5" fill="hsl(291 82% 76%)" />
      {/* arms */}
      <motion.rect x="20" y="118" width="22" height="8" rx="4" fill="hsl(262 83% 62%)"
        animate={{ rotate: [0, -10, 0] }} style={{ originX: "42px", originY: "122px" }}
        transition={{ duration: 2, repeat: Infinity }} />
      <motion.rect x="158" y="118" width="22" height="8" rx="4" fill="hsl(262 83% 62%)"
        animate={{ rotate: [0, 10, 0] }} style={{ originX: "158px", originY: "122px" }}
        transition={{ duration: 2, repeat: Infinity }} />
      {/* base */}
      <ellipse cx="100" cy="200" rx="55" ry="8" fill="hsl(189 94% 55% / 0.4)" />
    </motion.svg>
  );
}
