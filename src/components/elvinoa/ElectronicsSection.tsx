import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import RobotCharacter from "./RobotCharacter";
import HumanCharacter from "./HumanCharacter";
import { useSpeech } from "@/hooks/useSpeech";

// Real electronics stock photos — Unsplash direct image URLs (permitted).
const ITEMS = [
  {
    name: "Microcontrollers",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80",
    desc: "The brain of every smart device. We use ARM Cortex, ESP32, and STM32 chips to run our firmware.",
  },
  {
    name: "Printed Circuit Boards",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    desc: "Multi-layer PCBs designed in-house — the backbone that connects every component.",
  },
  {
    name: "Sensors & Modules",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    desc: "Temperature, motion, gas, and biometric sensors that let devices understand the world.",
  },
  {
    name: "Capacitors & Resistors",
    image: "https://images.unsplash.com/photo-1601737487795-dab272f52420?auto=format&fit=crop&w=800&q=80",
    desc: "Passive components chosen for tolerance and thermal stability across our product line.",
  },
  {
    name: "LEDs & Displays",
    image: "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?auto=format&fit=crop&w=800&q=80",
    desc: "OLED, LCD, and addressable LED arrays for status, dashboards, and ambient feedback.",
  },
  {
    name: "Power & Batteries",
    image: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=800&q=80",
    desc: "Regulated power supplies, Li-Ion packs, and BMS boards engineered for safety.",
  },
];

const SPEECH =
  "These are the core electronic components we work with every day. Each one plays a critical role in the devices we build.";

const ElectronicsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-30%" });
  const [active, setActive] = useState(0);
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

  const explainItem = (idx: number) => {
    setActive(idx);
    speak(`${ITEMS[idx].name}. ${ITEMS[idx].desc}`, { robot: true, rate: 0.95 });
  };

  return (
    <section id="electronics" ref={sectionRef} className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-60" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-electric text-sm tracking-[0.5em] uppercase mb-2">Chapter 03</p>
          <h2 className="text-4xl md:text-5xl font-black text-gradient-neon mb-3">The Electronics We Use</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Click any component and let our robot explain how we use it.
          </p>
        </motion.div>

        {/* Robot + human explaining the currently selected item */}
        <div className="grid md:grid-cols-[auto_1fr_auto] items-end gap-4 mb-10">
          <div className="justify-self-center hidden md:block">
            <RobotCharacter size={160} speaking={speaking} />
          </div>

          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-card border-2 border-neon glow-neon rounded-2xl px-6 py-5 mb-6"
          >
            <p className="text-neon font-bold text-lg mb-1">{ITEMS[active].name}</p>
            <p className="text-foreground text-sm md:text-base">{ITEMS[active].desc}</p>
          </motion.div>

          <div className="justify-self-center hidden md:block">
            <HumanCharacter size={160} />
          </div>
        </div>

        {/* Component grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {ITEMS.map((item, i) => (
            <motion.button
              key={item.name}
              onClick={() => explainItem(i)}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.04 }}
              className={`group relative rounded-xl overflow-hidden border-2 text-left transition-all ${
                active === i ? "border-neon glow-neon" : "border-border hover:border-electric"
              }`}
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                <img src={item.image} alt={item.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              </div>
              <div className="p-4 bg-card">
                <h4 className="font-bold text-foreground text-sm md:text-base">{item.name}</h4>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ElectronicsSection;
