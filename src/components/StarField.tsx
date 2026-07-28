import { useMemo } from "react";

// Animated neon particle field used as page background.
export default function StarField({ density = 60 }: { density?: number }) {
  const stars = useMemo(
    () =>
      Array.from({ length: density }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2.5,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 5,
        hue: Math.random() > 0.5 ? "hsl(262 83% 72%)" : "hsl(189 94% 65%)",
      })),
    [density]
  );
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-40" />
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full animate-float"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            background: s.hue,
            boxShadow: `0 0 ${s.size * 4}px ${s.hue}`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
