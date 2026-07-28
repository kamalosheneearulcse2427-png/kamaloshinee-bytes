import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2, VolumeX, Play, Pause, Trophy, Sparkles } from "lucide-react";
import StarField from "@/components/StarField";
import AnimatedRobot from "@/components/AnimatedRobot";
import { useSpeech } from "@/hooks/useSpeech";
import { toast } from "sonner";

type Stage = { title: string; timeframe: string; focus: string[]; milestones: string[]; tips: string };
type RoadmapDoc = { headline: string; stages: Stage[]; final_message: string };

export default function Roadmap() {
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState<RoadmapDoc | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [muted, setMuted] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const { speak, cancel, speaking, supported } = useSpeech();
  const stageRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    (async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) { navigate("/auth"); return; }
      const { data: p } = await supabase.from("profiles").select("*").eq("id", user.user.id).maybeSingle();
      setProfile(p);
      const { data: rows } = await supabase.from("roadmaps").select("*").eq("user_id", user.user.id).order("created_at", { ascending: false }).limit(1);
      if (rows && rows[0]) setRoadmap(rows[0].content as RoadmapDoc);
      else { toast("No roadmap yet — chat with the AI first"); navigate("/chat"); }
    })();
  }, [navigate]);

  // Auto-play voice walkthrough of stages
  useEffect(() => {
    if (!autoPlay || !roadmap || muted) return;
    if (activeIdx >= roadmap.stages.length) { setAutoPlay(false); if (!muted) speak(roadmap.final_message); return; }
    const s = roadmap.stages[activeIdx];
    stageRefs.current[activeIdx]?.scrollIntoView({ behavior: "smooth", block: "center" });
    const text = `${s.title}. ${s.timeframe}. Focus on ${s.focus.slice(0,3).join(", ")}. Key milestones: ${s.milestones.slice(0,3).join(". ")}. ${s.tips}`;
    speak(text);
    const timer = setTimeout(() => setActiveIdx((i) => i + 1), Math.max(6000, text.length * 55));
    return () => clearTimeout(timer);
  }, [autoPlay, activeIdx, roadmap, muted, speak]);

  const startWalkthrough = () => {
    if (!roadmap) return;
    setActiveIdx(0);
    setAutoPlay(true);
    if (!muted) speak(roadmap.headline);
  };
  const stopWalkthrough = () => { setAutoPlay(false); cancel(); };

  if (!roadmap) return null;

  return (
    <div className="min-h-screen relative">
      <StarField density={80} />

      <header className="px-6 py-4 flex items-center justify-between glass border-b border-border sticky top-0 z-20">
        <Button variant="ghost" size="sm" onClick={() => navigate("/chat")}><ArrowLeft className="w-4 h-4 mr-1" />Back to chat</Button>
        <div className="text-center">
          <h1 className="font-bold text-lg text-gradient">Your Career Roadmap</h1>
          <p className="text-xs text-muted-foreground">Step 3 — College → Interview → Company</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" onClick={() => { setMuted(!muted); if (!muted) cancel(); }}>
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
          {!autoPlay ? (
            <Button size="sm" onClick={startWalkthrough} className="bg-gradient-primary text-white">
              <Play className="w-4 h-4 mr-1" /> Voice tour
            </Button>
          ) : (
            <Button size="sm" onClick={stopWalkthrough} variant="outline">
              <Pause className="w-4 h-4 mr-1" /> Stop
            </Button>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-4">
            <Sparkles className="w-4 h-4 text-pink" />
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Personalized for {profile?.full_name}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-3 text-gradient">{roadmap.headline}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Target: <span className="text-cyan font-semibold">{profile?.career_goal}</span></p>
          <div className="mt-6 flex justify-center">
            <div className={`rounded-full ${speaking ? "animate-pulse-ring" : ""}`}>
              <AnimatedRobot size={140} talking={speaking} />
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet via-cyan to-pink" />
          {roadmap.stages.map((s, i) => (
            <motion.div
              key={i}
              ref={(el) => (stageRefs.current[i] = el)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`relative mb-10 md:grid md:grid-cols-2 md:gap-8 ${i % 2 === 0 ? "" : "md:[&>*:first-child]:col-start-2"}`}
            >
              <div className={`absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-primary ring-4 ring-background ${activeIdx === i && autoPlay ? "animate-pulse-ring" : ""}`} />
              <div className={`pl-12 md:pl-0 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                <div className={`inline-block glass rounded-2xl p-6 text-left ${activeIdx === i && autoPlay ? "glow-violet" : ""}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-4 h-4 text-pink" />
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">{s.timeframe}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gradient-accent">{s.title}</h3>
                  <div className="mb-3">
                    <p className="text-xs uppercase text-cyan mb-1">Focus</p>
                    <div className="flex flex-wrap gap-1.5">
                      {s.focus.map((f, k) => (
                        <span key={k} className="text-xs px-2 py-1 rounded-md bg-muted border border-border">{f}</span>
                      ))}
                    </div>
                  </div>
                  <div className="mb-3">
                    <p className="text-xs uppercase text-cyan mb-1">Milestones</p>
                    <ul className="text-sm space-y-1">
                      {s.milestones.map((m, k) => (
                        <li key={k} className="flex gap-2"><span className="text-pink">▸</span>{m}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-sm text-muted-foreground italic">💡 {s.tips}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-12 glass rounded-3xl p-8 text-center glow-cyan"
        >
          <Trophy className="w-10 h-10 mx-auto text-pink mb-3" />
          <h3 className="text-2xl font-bold mb-2 text-gradient">You've got this.</h3>
          <p className="text-muted-foreground max-w-xl mx-auto">{roadmap.final_message}</p>
          {supported && (
            <Button className="mt-6 bg-gradient-primary text-white" onClick={() => speak(roadmap.final_message)}>
              <Volume2 className="w-4 h-4 mr-2" /> Hear it from your mentor
            </Button>
          )}
        </motion.div>
      </main>
    </div>
  );
}
