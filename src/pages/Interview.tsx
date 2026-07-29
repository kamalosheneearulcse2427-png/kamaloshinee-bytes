import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AnimatedRobot from "@/components/AnimatedRobot";
import AnimatedStudent from "@/components/AnimatedStudent";
import StarField from "@/components/StarField";
import { Button } from "@/components/ui/button";
import { useSpeech } from "@/hooks/useSpeech";
import { ArrowLeft, Sparkles } from "lucide-react";

// Sunset Neon palette applied locally: #0b0620 bg, #ff2e93 pink, #ff8a3d orange, #ffd166 gold.
const palette = {
  "--background": "268 78% 8%",
  "--foreground": "40 100% 95%",
  "--primary": "330 100% 59%",   // #ff2e93
  "--secondary": "22 100% 62%",  // #ff8a3d
  "--accent": "42 100% 70%",     // #ffd166
  "--muted": "268 40% 16%",
  "--muted-foreground": "40 30% 80%",
  "--border": "330 60% 30%",
  "--card": "268 60% 12%",
} as React.CSSProperties;

const STAGES = ["walk-in", "handshake", "talking", "done"] as const;
type Stage = typeof STAGES[number];

export default function Interview() {
  const [stage, setStage] = useState<Stage>("walk-in");
  const [bubble, setBubble] = useState("");
  const { speak, cancel } = useSpeech();

  useEffect(() => {
    const t1 = setTimeout(() => setStage("handshake"), 2200);
    const t2 = setTimeout(() => {
      setStage("talking");
      const line = "Hello! Welcome to your mock interview. I'm your AI interviewer. Ready when you are!";
      setBubble(line);
      speak(line);
    }, 3800);
    const t3 = setTimeout(() => setStage("done"), 9500);
    return () => { [t1, t2, t3].forEach(clearTimeout); cancel(); };
  }, []);

  const replay = () => {
    cancel();
    setBubble("");
    setStage("walk-in");
  };

  return (
    <div style={palette} className="min-h-screen relative overflow-hidden bg-background text-foreground">
      <StarField density={80} />
      {/* Sunset glow blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 -left-20 w-[520px] h-[520px] rounded-full blur-3xl opacity-40"
             style={{ background: "radial-gradient(circle, #ff2e93, transparent 60%)" }} />
        <div className="absolute -bottom-40 -right-20 w-[560px] h-[560px] rounded-full blur-3xl opacity-40"
             style={{ background: "radial-gradient(circle, #ff8a3d, transparent 60%)" }} />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[380px] h-[380px] rounded-full blur-3xl opacity-30"
             style={{ background: "radial-gradient(circle, #ffd166, transparent 60%)" }} />
      </div>

      <header className="relative z-10 flex items-center justify-between px-6 py-4">
        <Link to="/chat">
          <Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" /> Back</Button>
        </Link>
        <h1 className="text-lg md:text-2xl font-bold tracking-tight"
            style={{ background: "linear-gradient(90deg,#ff2e93,#ff8a3d,#ffd166)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
          AI Mock Interview
        </h1>
        <Button size="sm" variant="outline" onClick={replay} className="border-[color:hsl(var(--primary))]">
          <Sparkles className="w-4 h-4 mr-1" /> Replay
        </Button>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-4 pb-16">
        <p className="text-center text-sm md:text-base text-muted-foreground mb-4">
          Watch your AI interviewer greet you — then the real interview begins.
        </p>

        {/* Stage */}
        <div className="relative h-[520px] md:h-[560px] rounded-3xl overflow-hidden"
             style={{
               background: "linear-gradient(180deg, rgba(11,6,32,0.6), rgba(255,46,147,0.08))",
               border: "1px solid hsl(var(--border))",
               boxShadow: "0 30px 120px -20px rgba(255,46,147,0.35), inset 0 0 80px rgba(255,138,61,0.08)",
             }}>
          {/* Floor glow */}
          <div className="absolute bottom-0 left-0 right-0 h-40"
               style={{ background: "linear-gradient(180deg, transparent, rgba(255,209,102,0.18))" }} />
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-[70%] h-4 rounded-full blur-2xl"
               style={{ background: "radial-gradient(ellipse, #ff2e93aa, transparent 70%)" }} />

          {/* Robot from left */}
          <motion.div
            className="absolute bottom-16 left-0"
            initial={{ x: -400, opacity: 0 }}
            animate={{
              x: stage === "walk-in" ? [-400, -40] : stage === "handshake" || stage === "talking" || stage === "done" ? -40 : -400,
              opacity: 1,
              y: stage === "walk-in" ? [0, -6, 0, -6, 0] : 0,
            }}
            transition={{ duration: stage === "walk-in" ? 2 : 0.6, ease: "easeOut" }}
          >
            <div className="relative">
              <AnimatedRobot size={260} talking={stage === "talking"} />
              {/* Extended arm for handshake */}
              {(stage === "handshake" || stage === "talking") && (
                <motion.div
                  className="absolute"
                  style={{ top: 150, right: -30, transformOrigin: "left center" }}
                  initial={{ rotate: -40, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="w-24 h-3 rounded-full"
                       style={{ background: "linear-gradient(90deg,#ff2e93,#ff8a3d)" }} />
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Student from right */}
          <motion.div
            className="absolute bottom-16 right-0"
            initial={{ x: 400, opacity: 0 }}
            animate={{
              x: stage === "walk-in" ? [400, 40] : -0 + 40,
              opacity: 1,
              y: stage === "walk-in" ? [0, -6, 0, -6, 0] : 0,
              scaleX: -1, // face the robot
            }}
            transition={{ duration: stage === "walk-in" ? 2 : 0.6, ease: "easeOut" }}
          >
            <div className="relative">
              <AnimatedStudent size={240} />
              {(stage === "handshake" || stage === "talking") && (
                <motion.div
                  className="absolute"
                  style={{ top: 150, left: -20, transformOrigin: "right center" }}
                  initial={{ rotate: 40, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="w-20 h-3 rounded-full"
                       style={{ background: "linear-gradient(90deg,#ffd166,#ff8a3d)" }} />
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Handshake flash */}
          {stage === "handshake" && (
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.6, 1], opacity: [0, 1, 0.9] }}
              transition={{ duration: 0.9 }}
            >
              <div className="w-32 h-32 rounded-full blur-2xl"
                   style={{ background: "radial-gradient(circle, #ffd166, #ff2e93 60%, transparent 70%)" }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-10 h-10" style={{ color: "#ffd166" }} />
              </div>
            </motion.div>
          )}

          {/* Speech bubble */}
          {bubble && (stage === "talking" || stage === "done") && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="absolute top-8 left-1/2 -translate-x-1/2 max-w-md text-center px-5 py-3 rounded-2xl"
              style={{
                background: "linear-gradient(135deg, rgba(255,46,147,0.25), rgba(255,138,61,0.25))",
                border: "1px solid #ff8a3d",
                boxShadow: "0 0 30px rgba(255,46,147,0.5)",
                color: "#fff",
              }}
            >
              <p className="text-sm md:text-base font-medium">{bubble}</p>
            </motion.div>
          )}

          {/* Stage label */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em]"
               style={{ color: "#ffd166" }}>
            {stage === "walk-in" && "Approaching…"}
            {stage === "handshake" && "Handshake ✦"}
            {stage === "talking" && "Introduction"}
            {stage === "done" && "Ready to begin"}
          </div>
        </div>

        {stage === "done" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/chat">
              <Button className="text-white"
                      style={{ background: "linear-gradient(90deg,#ff2e93,#ff8a3d)" }}>
                Start the Interview
              </Button>
            </Link>
            <Button variant="outline" onClick={replay}
                    style={{ borderColor: "#ffd166", color: "#ffd166" }}>
              Replay animation
            </Button>
          </motion.div>
        )}
      </main>
    </div>
  );
}
