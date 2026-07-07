import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import RobotCharacter from "./RobotCharacter";
import HumanCharacter from "./HumanCharacter";
import { useSpeech } from "@/hooks/useSpeech";
import { Volume2, VolumeX } from "lucide-react";

// Welcome scene: robot walks toward human, they shake hands, robot speaks
// "Welcome to Elvinoa Technologies". Speech plays once when scene mounts.
const WelcomeSection = () => {
  const [handshakeStarted, setHandshakeStarted] = useState(false);
  const [greeted, setGreeted] = useState(false);
  const { speak, cancel, speaking, supported } = useSpeech();

  useEffect(() => {
    const t1 = setTimeout(() => setHandshakeStarted(true), 1400);
    const t2 = setTimeout(() => {
      if (supported) {
        speak("Welcome to Elvinoa Technologies. It is a pleasure to meet you.", { robot: true, rate: 0.95 });
      }
      setGreeted(true);
    }, 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      cancel();
    };
  }, [speak, cancel, supported]);

  const replay = () => {
    speak("Welcome to Elvinoa Technologies. It is a pleasure to meet you.", { robot: true, rate: 0.95 });
  };

  return (
    <section id="welcome" className="relative min-h-screen flex flex-col items-center justify-center px-4 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 hex-grid" />

      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 text-center mb-6"
      >
        <p className="text-electric text-sm tracking-[0.5em] uppercase mb-2">Chapter 01</p>
        <h1 className="text-4xl md:text-6xl font-black text-gradient-neon">Welcome Aboard</h1>
      </motion.div>

      {/* Stage */}
      <div className="relative z-10 w-full max-w-4xl h-[360px] flex items-end justify-center gap-2 md:gap-6">
        {/* Robot slides in from left */}
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <RobotCharacter handshake={handshakeStarted} size={200} speaking={speaking} />
        </motion.div>

        {/* Handshake sparks */}
        {handshakeStarted && (
          <div className="relative w-16 flex items-center justify-center pb-24">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-neon"
                initial={{ scale: 0, opacity: 1 }}
                animate={{
                  scale: [0, 1.5, 0],
                  x: [0, (Math.random() - 0.5) * 60],
                  y: [0, (Math.random() - 0.5) * 60],
                  opacity: [1, 0.8, 0],
                }}
                transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        )}

        {/* Human slides in from right */}
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <HumanCharacter handshake={handshakeStarted} size={200} />
        </motion.div>
      </div>

      {/* Speech bubble */}
      {greeted && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 mt-8 max-w-lg bg-card border-2 border-neon glow-neon rounded-2xl px-6 py-4 text-center"
        >
          <p className="text-lg md:text-xl text-foreground font-medium">
            "Welcome to <span className="text-neon font-bold">Elvinoa Technologies</span>. It is a pleasure to meet you!"
          </p>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-card border-t-2 border-l-2 border-neon rotate-45" />
        </motion.div>
      )}

      {/* Replay voice control */}
      {supported && greeted && (
        <button
          onClick={speaking ? cancel : replay}
          className="relative z-10 mt-6 flex items-center gap-2 px-5 py-2 bg-card border border-electric text-electric rounded-full text-sm font-semibold hover:bg-electric hover:text-primary-foreground transition-colors"
        >
          {speaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          {speaking ? "Stop voice" : "Replay greeting"}
        </button>
      )}
    </section>
  );
};

export default WelcomeSection;
