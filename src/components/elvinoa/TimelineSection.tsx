import { motion } from "framer-motion";
import { ClipboardList, PenTool, Cpu, TestTube2, Package, Truck } from "lucide-react";

const PHASES = [
  { day: "Day 1-2", title: "Requirements", desc: "Discovery call, scope definition, feasibility study.", icon: ClipboardList },
  { day: "Day 3-7", title: "Design", desc: "Schematic capture, PCB layout, mechanical CAD.", icon: PenTool },
  { day: "Day 8-14", title: "Development", desc: "Board manufacturing, firmware coding, integration.", icon: Cpu },
  { day: "Day 15-21", title: "Testing", desc: "EMC, thermal, functional and endurance testing.", icon: TestTube2 },
  { day: "Day 22-25", title: "Packaging", desc: "Enclosure finalization, labeling, documentation.", icon: Package },
  { day: "Day 26-30", title: "Delivery", desc: "Shipment, on-site setup, and hand-off training.", icon: Truck },
];

const TimelineSection = () => (
  <section id="timeline" className="relative py-24 px-4 overflow-hidden">
    <div className="absolute inset-0 hex-grid opacity-70" />

    <div className="relative z-10 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-electric text-sm tracking-[0.5em] uppercase mb-2">Chapter 06</p>
        <h2 className="text-4xl md:text-5xl font-black text-gradient-neon mb-3">Project Timeline</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Here is how we take a project from idea to delivery — typically 30 days end-to-end.
        </p>
      </motion.div>

      {/* Vertical timeline */}
      <div className="relative">
        {/* Center line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-neon via-electric to-neon rounded-full md:-translate-x-1/2" />

        {PHASES.map((p, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative flex items-start mb-10 ${
                isLeft ? "md:justify-start" : "md:justify-end"
              }`}
            >
              {/* Node */}
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                className="absolute left-6 md:left-1/2 w-6 h-6 rounded-full bg-neon glow-neon border-4 border-background md:-translate-x-1/2 z-10"
              />

              {/* Card */}
              <div className={`ml-16 md:ml-0 md:w-[46%] ${isLeft ? "" : "md:ml-auto"}`}>
                <div className="bg-gradient-card border border-border hover:border-electric rounded-xl p-5 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-electric/10 text-electric flex items-center justify-center">
                      <p.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-electric font-mono uppercase tracking-widest">{p.day}</p>
                      <h3 className="text-lg font-bold text-foreground">{p.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default TimelineSection;
