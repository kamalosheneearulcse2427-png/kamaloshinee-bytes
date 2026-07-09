import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSpeech } from "@/hooks/useSpeech";
import { Volume2, VolumeX } from "lucide-react";
import welcomeScene from "@/assets/welcome-scene.png.asset.json";
import robotImg from "@/assets/welcome-robot.png";
import humanImg from "@/assets/welcome-human.png";

// Welcome scene: real robot & human photos walk in from the sides,
// meet in the middle, shake hands, and the robot greets the visitor.


const WelcomeSection = () => {
  const [handshakeStarted, setHandshakeStarted] = useState(false);
  const [greeted, setGreeted] = useState(false);
  const { speak, cancel, speaking, supported } = useSpeech();

  useEffect(() => {
    const t1 = setTimeout(() => setHandshakeStarted(true), 2600);
    const t2 = setTimeout(() => {
      if (supported) {
        speak("Welcome to Elvinoa Company. It is a pleasure to meet you.", { robot: true, rate: 0.95 });
      }
      setGreeted(true);
    }, 3600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      cancel();
    };
  }, [speak, cancel, supported]);

  const replay = () => {
    speak("Welcome to Elvinoa Company. It is a pleasure to meet you.", { robot: true, rate: 0.95 });
  };

  return (
    <section id="welcome" className="relative min-h-screen flex flex-col items-center justify-center px-4 py-24 overflow-hidden">
      {/* Animated background image (Ken Burns pan/zoom) */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.15, x: -30 }}
        animate={{ scale: [1.15, 1.25, 1.15], x: [-30, 30, -30], y: [0, -10, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        style={{
          backgroundImage: `url(${welcomeScene.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Cinematic dark overlay so text/characters stay readable */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/85 via-background/55 to-background/90" />
      <div className="absolute inset-0 z-0 hex-grid opacity-40" />

      {/* Drifting light particles for extra motion */}
      {[...Array(18)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute z-0 w-1 h-1 rounded-full bg-neon"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{
            y: [0, -30 - Math.random() * 40, 0],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3 }}
        />
      ))}

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
      <div className="relative z-10 w-full max-w-5xl h-[420px] flex items-end justify-center gap-2 md:gap-4">
        {/* Human walks in from left (naturally angled toward the right) */}
        <motion.img
          src={humanImg}
          alt="Elvinoa client"
          initial={{ x: "-70vw", opacity: 0 }}
          animate={{
            x: handshakeStarted ? [0, 6, 0, 6, 0] : ["-70vw", "-20vw", "0vw"],
            opacity: 1,
            y: handshakeStarted ? [0, -3, 0, -3, 0] : [0, -7, 0, -7, 0, -7, 0],
            rotate: handshakeStarted ? [0, 1.5, -1.5, 1.5, 0] : [-2, 2, -2, 2, -2, 2, 0],
          }}
          transition={
            handshakeStarted
              ? { duration: 0.35, repeat: Infinity, ease: "easeInOut" }
              : {
                  x: { duration: 2.4, ease: "easeOut" },
                  y: { duration: 0.45, repeat: 5, ease: "easeInOut" },
                  rotate: { duration: 0.45, repeat: 5, ease: "easeInOut" },
                }
          }
          className="h-[380px] w-auto object-contain drop-shadow-[0_10px_30px_hsl(88_95%_55%/0.4)]"
        />

        {/* Handshake sparks */}
        {handshakeStarted && (
          <div className="relative w-12 flex items-center justify-center pb-40">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-neon"
                initial={{ scale: 0, opacity: 1 }}
                animate={{
                  scale: [0, 1.8, 0],
                  x: [0, (Math.random() - 0.5) * 80],
                  y: [0, (Math.random() - 0.5) * 80],
                  opacity: [1, 0.9, 0],
                }}
                transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </div>
        )}

        {/* Robot walks in from right, mirrored so it faces the human on the left */}
        <motion.img
          src={robotImg}
          alt="Elvinoa robot"
          initial={{ x: "70vw", opacity: 0 }}
          animate={{
            x: handshakeStarted ? 0 : ["70vw", "20vw", "0vw"],
            opacity: 1,
            y: handshakeStarted ? 0 : [0, -8, 0, -8, 0, -8, 0],
            rotate: handshakeStarted ? 0 : [2, -2, 2, -2, 2, -2, 0],
          }}
          transition={{
            x: { duration: 2.4, ease: "easeOut" },
            y: { duration: 0.45, repeat: 5, ease: "easeInOut" },
            rotate: { duration: 0.45, repeat: 5, ease: "easeInOut" },
          }}
          style={{ transform: "scaleX(-1)" }}
          className="h-[380px] w-auto object-contain drop-shadow-[0_10px_30px_hsl(200_100%_55%/0.5)]"
        />

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
