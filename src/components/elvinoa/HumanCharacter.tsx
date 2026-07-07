import { motion } from "framer-motion";

interface HumanCharacterProps {
  handshake?: boolean;
  waving?: boolean;
  size?: number;
}

// Stylized SVG human character mirroring the robot for the handshake scene.
const HumanCharacter = ({ handshake, waving, size = 220 }: HumanCharacterProps) => {
  return (
    <motion.svg
      viewBox="0 0 200 260"
      width={size}
      height={(size / 200) * 260}
      initial={{ y: 0 }}
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      style={{ filter: "drop-shadow(0 0 12px hsl(88 95% 55% / 0.3))" }}
    >
      <defs>
        <linearGradient id="skin" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#f4c9a3" />
          <stop offset="100%" stopColor="#c68d63" />
        </linearGradient>
        <linearGradient id="shirt" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="hsl(200 80% 45%)" />
          <stop offset="100%" stopColor="hsl(220 70% 25%)" />
        </linearGradient>
      </defs>

      {/* Hair */}
      <path d="M60 55 Q60 25 100 22 Q140 25 140 55 L140 65 Q120 55 100 55 Q80 55 60 65 Z" fill="#3b2a20" />

      {/* Head */}
      <ellipse cx="100" cy="70" rx="34" ry="38" fill="url(#skin)" />

      {/* Eyes */}
      <ellipse cx="88" cy="70" rx="3" ry="4" fill="#1a1a1a" />
      <ellipse cx="112" cy="70" rx="3" ry="4" fill="#1a1a1a" />
      <circle cx="89" cy="69" r="1" fill="#fff" />
      <circle cx="113" cy="69" r="1" fill="#fff" />

      {/* Eyebrows */}
      <path d="M82 62 Q88 60 94 62" stroke="#2a1a10" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M106 62 Q112 60 118 62" stroke="#2a1a10" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Smile */}
      <path d="M88 85 Q100 92 112 85" stroke="#7a3a2a" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Neck */}
      <rect x="92" y="105" width="16" height="12" fill="url(#skin)" />

      {/* Shirt / body */}
      <path d="M55 120 Q55 115 65 115 L135 115 Q145 115 145 120 L150 210 Q100 220 50 210 Z" fill="url(#shirt)" />
      {/* Collar */}
      <path d="M85 115 L100 130 L115 115 Z" fill="hsl(220 70% 20%)" />
      {/* Tie */}
      <path d="M97 130 L103 130 L106 160 L100 170 L94 160 Z" fill="hsl(88 95% 55%)" />

      {/* Left arm */}
      <motion.g
        animate={waving ? { rotate: [0, -25, 10, -25, 0] } : { rotate: [0, -3, 0] }}
        transition={{ duration: waving ? 1.5 : 4, repeat: Infinity }}
        style={{ transformOrigin: "60px 125px" }}
      >
        <rect x="42" y="120" width="16" height="55" rx="7" fill="url(#shirt)" />
        <circle cx="50" cy="180" r="10" fill="url(#skin)" />
      </motion.g>

      {/* Right arm (handshake) */}
      <motion.g
        initial={{ rotate: 0 }}
        animate={
          handshake
            ? { rotate: [0, 55, 45, 55, 45], x: [0, -15, -15, -15, -15] }
            : { rotate: [0, 3, 0] }
        }
        transition={{ duration: handshake ? 2 : 4, repeat: Infinity, repeatType: "reverse" }}
        style={{ transformOrigin: "142px 125px" }}
      >
        <rect x="142" y="120" width="16" height="55" rx="7" fill="url(#shirt)" />
        <circle cx="150" cy="180" r="11" fill="url(#skin)" />
      </motion.g>

      {/* Legs */}
      <rect x="72" y="210" width="22" height="45" rx="6" fill="hsl(220 40% 20%)" />
      <rect x="106" y="210" width="22" height="45" rx="6" fill="hsl(220 40% 20%)" />
      <ellipse cx="83" cy="257" rx="14" ry="4" fill="#1a1a1a" />
      <ellipse cx="117" cy="257" rx="14" ry="4" fill="#1a1a1a" />
    </motion.svg>
  );
};

export default HumanCharacter;
