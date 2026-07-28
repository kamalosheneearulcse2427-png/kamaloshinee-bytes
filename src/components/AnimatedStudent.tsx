import { motion } from "framer-motion";

// SVG college student character.
export default function AnimatedStudent({ size = 200 }: { size?: number }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 200 220"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: [0, -6, 0], opacity: 1 }}
      transition={{ y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.6 } }}
    >
      <defs>
        <linearGradient id="sHoodie" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(291 82% 76%)" />
          <stop offset="100%" stopColor="hsl(262 83% 55%)" />
        </linearGradient>
      </defs>
      {/* graduation cap */}
      <polygon points="60,42 100,26 140,42 100,58" fill="hsl(230 45% 6%)" stroke="hsl(189 94% 55%)" strokeWidth="1.5" />
      <line x1="140" y1="42" x2="150" y2="66" stroke="hsl(291 82% 76%)" strokeWidth="2" />
      <circle cx="150" cy="68" r="4" fill="hsl(291 82% 76%)" />
      {/* head */}
      <circle cx="100" cy="78" r="26" fill="#f5d0b0" />
      {/* eyes */}
      <circle cx="90" cy="76" r="2.5" fill="hsl(230 45% 6%)" />
      <circle cx="110" cy="76" r="2.5" fill="hsl(230 45% 6%)" />
      {/* smile */}
      <path d="M90 88 Q100 96 110 88" stroke="hsl(230 45% 6%)" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* hoodie */}
      <path d="M55 130 Q100 100 145 130 L155 200 L45 200 Z" fill="url(#sHoodie)" />
      {/* laptop */}
      <rect x="72" y="158" width="56" height="34" rx="4" fill="hsl(230 45% 6%)" stroke="hsl(189 94% 55%)" strokeWidth="1.2" />
      <rect x="76" y="162" width="48" height="26" rx="2" fill="hsl(189 94% 55% / 0.2)" />
      <motion.rect x="78" y="165" width="20" height="2" fill="hsl(189 94% 65%)"
        animate={{ width: [4, 30, 12] }} transition={{ duration: 2, repeat: Infinity }} />
      <motion.rect x="78" y="171" width="14" height="2" fill="hsl(291 82% 76%)"
        animate={{ width: [22, 8, 26] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }} />
      <motion.rect x="78" y="177" width="30" height="2" fill="hsl(189 94% 65%)"
        animate={{ width: [12, 34, 6] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }} />
      <ellipse cx="100" cy="208" rx="55" ry="6" fill="hsl(262 83% 62% / 0.35)" />
    </motion.svg>
  );
}
