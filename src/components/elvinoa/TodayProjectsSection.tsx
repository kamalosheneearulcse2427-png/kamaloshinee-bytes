import { motion } from "framer-motion";
import { Calendar, CheckCircle2 } from "lucide-react";

const TODAY = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

const PROJECTS = [
  {
    title: "Smart Home Hub v2",
    status: "In production",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=80",
    desc: "Final assembly and QA on the second-generation home automation hub with matter protocol support.",
  },
  {
    title: "Industrial IoT Gateway",
    status: "Firmware release",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80",
    desc: "Shipped firmware v3.2 with predictive maintenance telemetry for our factory-floor client.",
  },
  {
    title: "Medical Wearable Prototype",
    status: "Prototype testing",
    image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=900&q=80",
    desc: "PPG + ECG wearable in third iteration — signal quality now within clinical-grade thresholds.",
  },
  {
    title: "EV Charging Controller",
    status: "Board bring-up",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=900&q=80",
    desc: "New CCS2 controller board powered up successfully; running load-test cycles now.",
  },
];

const TodayProjectsSection = () => (
  <section id="today" className="relative py-24 px-4 overflow-hidden">
    <div className="absolute inset-0 hex-grid" />

    <div className="relative z-10 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <p className="text-electric text-sm tracking-[0.5em] uppercase mb-2">Chapter 04</p>
        <h2 className="text-4xl md:text-5xl font-black text-gradient-neon mb-3">Today at Elvinoa</h2>
        <div className="inline-flex items-center gap-2 mt-2 px-4 py-1.5 rounded-full border border-electric text-electric text-sm">
          <Calendar className="w-4 h-4" />
          {TODAY}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="group bg-gradient-card border border-border rounded-xl overflow-hidden hover:border-neon transition-colors"
          >
            <div className="aspect-video relative overflow-hidden">
              <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 bg-neon/90 text-primary-foreground text-xs font-bold rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {p.status}
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-foreground mb-2">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TodayProjectsSection;
