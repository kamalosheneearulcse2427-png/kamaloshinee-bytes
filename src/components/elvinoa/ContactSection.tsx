import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import RobotCharacter from "./RobotCharacter";
import HumanCharacter from "./HumanCharacter";
import { useSpeech } from "@/hooks/useSpeech";
import { Mail, Phone, MapPin, Send, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const THANKS = "Thank you for visiting Elvinoa Technologies. We look forward to building something amazing together.";

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-30%" });
  const [spoken, setSpoken] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { speak, cancel, speaking } = useSpeech();
  const { toast } = useToast();

  useEffect(() => {
    if (inView && !spoken) {
      const t = setTimeout(() => {
        speak(THANKS, { robot: true, rate: 0.95 });
        setSpoken(true);
      }, 700);
      return () => clearTimeout(t);
    }
  }, [inView, spoken, speak]);

  useEffect(() => () => cancel(), [cancel]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message received!",
      description: `Thanks ${form.name || "there"} — our team will reach out within 24 hours.`,
    });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 hex-grid" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-electric text-sm tracking-[0.5em] uppercase mb-2">Chapter 08 · Final</p>
          <h2 className="text-4xl md:text-5xl font-black text-gradient-neon mb-3">Get in Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project? A question? A crazy idea? We would love to hear from you.
          </p>
        </motion.div>

        {/* Thank-you scene */}
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-end justify-center gap-4 md:gap-8">
            <motion.div initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }}>
              <RobotCharacter waving size={170} speaking={speaking} />
            </motion.div>
            <motion.div initial={{ x: 100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }}>
              <HumanCharacter waving size={170} />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-6 max-w-2xl bg-card border-2 border-neon glow-neon rounded-2xl px-6 py-5 text-center"
          >
            <p className="text-lg md:text-xl text-foreground font-medium">
              "Thank you for visiting <span className="text-neon font-bold">Elvinoa Technologies</span>. We look forward to building something amazing together!"
            </p>
            <button
              onClick={() => speak(THANKS, { robot: true, rate: 0.95 })}
              className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-electric text-electric text-xs font-semibold hover:bg-electric hover:text-primary-foreground transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5" />
              Replay
            </button>
          </motion.div>
        </div>

        {/* Contact grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-card border border-border rounded-2xl p-6 space-y-5"
          >
            <h3 className="text-xl font-bold text-electric mb-4">Contact Details</h3>
            <a href="mailto:hello@elvinoa.tech" className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-lg bg-neon/10 text-neon flex items-center justify-center group-hover:bg-neon group-hover:text-primary-foreground transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Email</p>
                <p className="font-semibold text-foreground">hello@elvinoa.tech</p>
              </div>
            </a>
            <a href="tel:+911234567890" className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-lg bg-electric/10 text-electric flex items-center justify-center group-hover:bg-electric group-hover:text-primary-foreground transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Phone</p>
                <p className="font-semibold text-foreground">+91 12345 67890</p>
              </div>
            </a>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-neon/10 text-neon flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">HQ</p>
                <p className="font-semibold text-foreground">Tamil Nadu, India</p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={submit}
            className="bg-gradient-card border border-border rounded-2xl p-6 space-y-4"
          >
            <h3 className="text-xl font-bold text-neon mb-2">Send a Message</h3>
            <input
              required
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-neon transition-colors"
            />
            <input
              required
              type="email"
              placeholder="Your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-neon transition-colors"
            />
            <textarea
              required
              rows={4}
              placeholder="Tell us about your project…"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-neon transition-colors resize-none"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-neon text-primary-foreground font-bold py-3 rounded-lg flex items-center justify-center gap-2 glow-neon"
            >
              <Send className="w-4 h-4" />
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
