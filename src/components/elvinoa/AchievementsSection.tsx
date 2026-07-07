import { motion } from "framer-motion";
import { Trophy, Award, Star, Medal } from "lucide-react";

const ACHIEVEMENTS = [
  {
    year: "2025",
    title: "Best Electronics Startup",
    org: "National Innovation Awards",
    icon: Trophy,
    image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=900&q=80",
  },
  {
    year: "2024",
    title: "Green Tech Excellence",
    org: "Sustainable Electronics Forum",
    icon: Award,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
  },
  {
    year: "2024",
    title: "IoT Product of the Year",
    org: "Embedded World Expo",
    icon: Star,
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=900&q=80",
  },
  {
    year: "2024",
    title: "ISO 9001 Certified",
    org: "International Standards Org.",
    icon: Medal,
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
  },
];

const AchievementsSection = () => (
  <section id="achievements" className="relative py-24 px-4 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-hero opacity-40" />

    <div className="relative z-10 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-electric text-sm tracking-[0.5em] uppercase mb-2">Chapter 05</p>
        <h2 className="text-4xl md:text-5xl font-black text-gradient-neon mb-3">Achievements & Awards</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">Milestones that mark our journey so far.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ACHIEVEMENTS.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 40, rotate: -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            whileHover={{ y: -8, rotate: 1 }}
            className="group relative bg-gradient-card border border-border rounded-xl overflow-hidden hover:border-neon hover:glow-neon transition-all"
          >
            <div className="aspect-[4/3] relative overflow-hidden">
              <img src={a.image} alt={a.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-3 left-3 w-12 h-12 rounded-full bg-gradient-neon flex items-center justify-center glow-neon"
              >
                <a.icon className="w-6 h-6 text-primary-foreground" />
              </motion.div>
              <span className="absolute top-3 right-3 text-electric font-mono text-xs bg-card px-2 py-1 rounded">
                {a.year}
              </span>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-foreground mb-1 leading-tight">{a.title}</h3>
              <p className="text-muted-foreground text-xs uppercase tracking-wider">{a.org}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AchievementsSection;
