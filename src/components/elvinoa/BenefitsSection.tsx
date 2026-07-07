import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import RobotCharacter from "./RobotCharacter";
import HumanCharacter from "./HumanCharacter";
import { useSpeech } from "@/hooks/useSpeech";
import { Home, Factory, HeartPulse, Leaf, Car, GraduationCap } from "lucide-react";

const USES = [
  { icon: Home, title: "Smart Homes", desc: "Lighting, security, and climate control that just works." },
  { icon: Factory, title: "Industrial Automation", desc: "PLCs, sensors, and edge gateways for modern factories." },
  { icon: HeartPulse, title: "Healthcare", desc: "Patient monitoring devices and wearable diagnostics." },
  { icon: Leaf, title: "Green Energy", desc: "Solar inverters, battery management, and grid controllers." },
  { icon: Car, title: "Automotive", desc: "EV charging controllers and vehicle telemetry units." },
  { icon: GraduationCap, title: "Education", desc: "STEM kits and lab equipment for the next generation." },
];

const BENEFITS = [
  "In-house design, manufacturing, and firmware — one team, one delivery.",
  "Fixed-price contracts with milestone-based payments.",
  "Two-year warranty on every hardware product shipped.",
  "Free consultation and prototype quote within 24 hours.",
];

const SPEECH =
  "Our work touches many industries. From smart homes to hospitals, from factories to electric vehicles. Every project is a partnership.";

const BenefitsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-30%" });
  const [spoken, setSpoken] = useState(false);
  const { speak, cancel, speaking } = useSpeech();

  useEffect(() => {
    if (inView && !spoken) {
      const t = setTimeout(() => {
        speak(SPEECH, { robot: true, rate: 0.95 });
        setSpoken(true);
      }, 500);
      return () => clearTimeout(t);
    }
  }, [inView, spoken, speak]);

  useEffect(() => () => cancel(), [cancel]);

  return (
    <section id="benefits" ref={sectionRef} className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-50" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-electric text-sm tracking-[0.5em] uppercase mb-2">Chapter 07</p>
          <h2 className="text-4xl md:text-5xl font-black text-gradient-neon mb-3">Uses & Benefits</h2>
        </motion.div>

        {/* Scene with speech bubble */}
        <div className="grid md:grid-cols-[auto_1fr_auto] items-end gap-4 mb-12">
          <div className="justify-self-center hidden md:block">
            <RobotCharacter size={160} speaking={speaking} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-card border-2 border-electric glow-electric rounded-2xl px-6 py-5 mb-6"
          >
            <p className="text-base md:text-lg text-foreground">
              "Our work touches <span className="text-electric font-bold">many industries</span> — from smart homes to hospitals, from factories to electric vehicles. Every project is a partnership."
            </p>
          </motion.div>

          <div className="justify-self-center hidden md:block">
            <HumanCharacter size={160} />
          </div>
        </div>

        {/* Uses grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-14">
          {USES.map((u, i) => (
            <motion.div
              key={u.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="bg-gradient-card border border-border rounded-xl p-5 text-center hover:border-neon transition-colors"
            >
              <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-neon/10 text-neon flex items-center justify-center">
                <u.icon className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-foreground text-sm md:text-base mb-1">{u.title}</h4>
              <p className="text-muted-foreground text-xs md:text-sm">{u.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Benefits list */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-card border border-neon/40 rounded-2xl p-6 md:p-8"
        >
          <h3 className="text-2xl font-bold text-gradient-neon mb-6 text-center">Why Choose Elvinoa?</h3>
          <ul className="grid md:grid-cols-2 gap-4">
            {BENEFITS.map((b, i) => (
              <motion.li
                key={b}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="flex items-start gap-3"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-neon text-primary-foreground text-xs font-bold flex items-center justify-center mt-0.5">
                  ✓
                </span>
                <span className="text-foreground text-sm md:text-base">{b}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
