import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import logoAsset from "@/assets/elvinoa-logo.png.asset.json";

const NAV = [
  { id: "welcome", label: "Home" },
  { id: "about", label: "About" },
  { id: "electronics", label: "Electronics" },
  { id: "today", label: "Today" },
  { id: "achievements", label: "Awards" },
  { id: "timeline", label: "Timeline" },
  { id: "benefits", label: "Benefits" },
  { id: "contact", label: "Contact" },
];

const ElvinoaNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={`fixed top-0 inset-x-0 z-40 transition-all ${
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <button onClick={() => go("welcome")} className="flex items-center gap-2">
          <img src={logoAsset.url} alt="Elvinoa" className="w-9 h-9 object-contain drop-shadow-[0_0_8px_hsl(88_95%_55%/0.6)]" />
          <span className="font-black text-lg tracking-wider text-gradient-neon hidden sm:block">ELVINOA</span>
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className="px-3 py-2 text-sm font-semibold text-muted-foreground hover:text-neon transition-colors tracking-wide uppercase"
            >
              {n.label}
            </button>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden w-10 h-10 rounded-md border border-border text-neon flex items-center justify-center"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-background/95 backdrop-blur border-t border-border"
        >
          <div className="flex flex-col p-2">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className="text-left px-4 py-3 text-sm font-semibold text-muted-foreground hover:text-neon hover:bg-muted rounded-md transition-colors uppercase tracking-wide"
              >
                {n.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default ElvinoaNav;
