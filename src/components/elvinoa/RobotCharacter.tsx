import { motion } from "framer-motion";

interface RobotCharacterProps {
  speaking?: boolean;
  handshake?: boolean;
  waving?: boolean;
  size?: number;
}

// Stylized SVG robot with animated eyes, mouth, and arm. When speaking the
// mouth oscillates. When handshake is true, the right arm extends forward.
const RobotCharacter = ({ speaking, handshake, waving, size = 220 }: RobotCharacterProps) => {
  return (
    <motion.svg
      viewBox="0 0 200 260"
      width={size}
      height={(size / 200) * 260}
      initial={{ y: 0 }}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      style={{ filter: "drop-shadow(0 0 12px hsl(200 100% 55% / 0.4))" }}
    >
      <defs>
        <linearGradient id="botBody" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#e6f2ff" />
          <stop offset="100%" stopColor="#8bb3d9" />
        </linearGradient>
        <linearGradient id="botAccent" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="hsl(88 95% 55%)" />
          <stop offset="100%" stopColor="hsl(200 100% 55%)" />
        </linearGradient>
        <radialGradient id="eyeGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="hsl(88 100% 70%)" />
          <stop offset="100%" stopColor="hsl(200 100% 40%)" />
        </radialGradient>
      </defs>

      {/* Antenna */}
      <motion.g animate={{ rotate: [-4, 4, -4] }} transition={{ duration: 2, repeat: Infinity }} style={{ transformOrigin: "100px 30px" }}>
        <line x1="100" y1="30" x2="100" y2="10" stroke="url(#botAccent)" strokeWidth="3" />
        <circle cx="100" cy="8" r="5" fill="hsl(88 95% 55%)">
          <animate attributeName="opacity" values="1;0.4;1" dur="1s" repeatCount="indefinite" />
        </circle>
      </motion.g>

      {/* Head */}
      <rect x="55" y="30" width="90" height="70" rx="14" fill="url(#botBody)" stroke="hsl(200 60% 40%)" strokeWidth="2" />
      <rect x="60" y="35" width="80" height="60" rx="10" fill="#1a2540" />

      {/* Eyes */}
      <motion.g animate={{ scaleY: speaking ? [1, 0.9, 1] : 1 }} transition={{ duration: 0.4, repeat: Infinity }}>
        <circle cx="80" cy="60" r="9" fill="url(#eyeGlow)" />
        <circle cx="120" cy="60" r="9" fill="url(#eyeGlow)" />
        <circle cx="82" cy="58" r="2.5" fill="#fff" />
        <circle cx="122" cy="58" r="2.5" fill="#fff" />
      </motion.g>

      {/* Mouth (speaker grill / animated when talking) */}
      {speaking ? (
        <motion.rect
          x="85"
          y="78"
          width="30"
          height="8"
          rx="2"
          fill="hsl(88 95% 55%)"
          animate={{ scaleY: [0.4, 1, 0.6, 1, 0.4], opacity: [0.7, 1, 0.7, 1, 0.7] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          style={{ transformOrigin: "100px 82px" }}
        />
      ) : (
        <g>
          <line x1="85" y1="80" x2="115" y2="80" stroke="hsl(200 60% 60%)" strokeWidth="1" />
          <line x1="85" y1="84" x2="115" y2="84" stroke="hsl(200 60% 60%)" strokeWidth="1" />
        </g>
      )}

      {/* Neck */}
      <rect x="90" y="100" width="20" height="10" fill="#5c7a99" />

      {/* Body */}
      <rect x="45" y="110" width="110" height="90" rx="16" fill="url(#botBody)" stroke="hsl(200 60% 40%)" strokeWidth="2" />
      <rect x="55" y="120" width="90" height="70" rx="10" fill="#1a2540" />

      {/* Chest panel — circuit lines + core */}
      <circle cx="100" cy="155" r="14" fill="url(#botAccent)">
        <animate attributeName="r" values="14;16;14" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="100" cy="155" r="6" fill="#fff" opacity="0.9" />
      <path d="M65 135 L85 135 M115 135 L135 135 M65 175 L85 175 M115 175 L135 175" stroke="hsl(88 95% 55%)" strokeWidth="1.5" opacity="0.7" />

      {/* Left arm */}
      <motion.g
        animate={waving ? { rotate: [0, 25, -10, 25, 0] } : { rotate: [0, 3, 0] }}
        transition={{ duration: waving ? 1.5 : 4, repeat: Infinity }}
        style={{ transformOrigin: "50px 125px" }}
      >
        <rect x="30" y="120" width="18" height="55" rx="8" fill="url(#botBody)" stroke="hsl(200 60% 40%)" strokeWidth="1.5" />
        <circle cx="39" cy="180" r="10" fill="url(#botBody)" stroke="hsl(200 60% 40%)" strokeWidth="1.5" />
      </motion.g>

      {/* Right arm (handshake) */}
      <motion.g
        initial={{ rotate: 0 }}
        animate={
          handshake
            ? { rotate: [0, -55, -45, -55, -45], x: [0, 15, 15, 15, 15] }
            : { rotate: [0, -3, 0] }
        }
        transition={{ duration: handshake ? 2 : 4, repeat: Infinity, repeatType: "reverse" }}
        style={{ transformOrigin: "155px 125px" }}
      >
        <rect x="152" y="120" width="18" height="55" rx="8" fill="url(#botBody)" stroke="hsl(200 60% 40%)" strokeWidth="1.5" />
        <circle cx="161" cy="180" r="11" fill="url(#botBody)" stroke="hsl(200 60% 40%)" strokeWidth="1.5" />
      </motion.g>

      {/* Legs */}
      <rect x="70" y="200" width="22" height="50" rx="6" fill="url(#botBody)" stroke="hsl(200 60% 40%)" strokeWidth="1.5" />
      <rect x="108" y="200" width="22" height="50" rx="6" fill="url(#botBody)" stroke="hsl(200 60% 40%)" strokeWidth="1.5" />
      <ellipse cx="81" cy="252" rx="14" ry="5" fill="#1a2540" />
      <ellipse cx="119" cy="252" rx="14" ry="5" fill="#1a2540" />
    </motion.svg>
  );
};

export default RobotCharacter;
