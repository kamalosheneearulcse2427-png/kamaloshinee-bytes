import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import RobotCharacter from "./RobotCharacter";
import HumanCharacter from "./HumanCharacter";
import { useSpeech } from "@/hooks/useSpeech";
import { Cpu, Zap, ShieldCheck, Sparkles, Rocket, Users } from "lucide-react";

const FEATURES = [
  { icon: Cpu, title: "Custom Circuit Design", desc: "PCBs and embedded boards engineered for your exact use case." },
  { icon: Zap, title: "IoT & Smart Devices", desc: "Connected sensors and controllers powering the next generation of hardware." },
  { icon: ShieldCheck, title: "Reliability First", desc: "Rigorous testing, thermal validation, and long-life components in every build." },
  { icon: Sparkles, title: "Innovation Lab", desc: "R&D team exploring AI-driven edge computing and green electronics." },
  { icon: Rocket, title: "Rapid Prototyping", desc: "From schematic to working prototype in days, not months." },
  { icon: Users, title: "Full-Stack Team", desc: "Firmware, hardware, cloud, and UX — one company, one delivery." },
];

const ABOUT_SPEECH =
  "Hello again. Elvinoa Technologies is an electronics company. We design custom circuits, smart devices, and embedded systems. Let me show you what we do best.";

// Robot introduces the company and the six core capabilities.
const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-30%" });
  const [spoken, setSpoken] = useState(false);
  const { speak, cancel, speaking } = useSpeech();

  useEffect(() => {
    if (inView && !spoken) {
      const t = setTimeout(() => {
        speak(ABOUT_SPEECH, { robot: true, rate: 0.95 });
        setSpoken(true);
      }, 700);
      return () => clearTimeout(t);
    }
  }, [inView, spoken, speak]);

  useEffect(() => () => cancel(), [cancel]);

  return (
    <section id="about" ref={sectionRef} className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 hex-grid opacity-70" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-electric text-sm tracking-[0.5em] uppercase mb-2">Chapter 02</p>
          <h2 className="text-4xl md:text-5xl font-black text-gradient-neon mb-3">About Elvinoa</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            An electronics company built on precision, curiosity, and craft.
          </p>
        </motion.div>

        {/* Scene: robot presenting, human listening */}
        <div className="grid md:grid-cols-[auto_1fr_auto] items-end gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="justify-self-center"
          >
            <RobotCharacter size={180} speaking={speaking} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="relative bg-card border-2 border-electric glow-electric rounded-2xl px-6 py-5 mb-6"
          >
            <p className="text-base md:text-lg text-foreground">
              "Hello again! <span className="text-electric font-bold">Elvinoa Technologies</span> is an electronics company. We design custom circuits, smart devices, and embedded systems. Let me show you what we do best."
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="justify-self-center"
          >
            <HumanCharacter size={180} />
          </motion.div>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative bg-gradient-card border border-border rounded-xl p-6 hover:border-neon transition-colors"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity bg-neon/5" />
              <div className="relative">
                <div className="w-12 h-12 rounded-lg bg-neon/10 flex items-center justify-center text-neon mb-4 group-hover:bg-neon group-hover:text-primary-foreground transition-colors">
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
