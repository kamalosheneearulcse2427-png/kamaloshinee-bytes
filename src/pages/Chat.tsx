import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Mic, MicOff, Send, Volume2, VolumeX, Map, ArrowLeft } from "lucide-react";
import StarField from "@/components/StarField";
import AnimatedRobot from "@/components/AnimatedRobot";
import AnimatedStudent from "@/components/AnimatedStudent";
import { useSpeech } from "@/hooks/useSpeech";
import { useVoiceInput } from "@/hooks/useVoiceInput";

type Msg = { role: "user" | "assistant"; content: string };

export default function Chat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [muted, setMuted] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { speak, cancel, speaking, supported: ttsOK } = useSpeech();
  const { listening, transcript, supported: srOK, start, stop, setTranscript } = useVoiceInput();

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) { navigate("/auth"); return; }
      const { data: p } = await supabase.from("profiles").select("*").eq("id", data.user.id).maybeSingle();
      if (!p?.career_goal) { toast("Please complete your profile first"); navigate("/profile"); return; }
      setProfile(p);
      const greeting = `Hi ${p.full_name?.split(" ")[0] ?? "there"}! I'm your AI career mentor. I see you're aiming to become a ${p.career_goal}. Tell me — what's the biggest thing on your mind about your career right now?`;
      setMessages([{ role: "assistant", content: greeting }]);
      if (!muted) setTimeout(() => speak(greeting), 500);
    });
  }, [navigate]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  useEffect(() => { if (transcript) setInput(transcript); }, [transcript]);

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || busy) return;
    setInput(""); setTranscript("");
    const newMsgs: Msg[] = [...messages, { role: "user", content }];
    setMessages(newMsgs);
    setBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke("skill-ai", {
        body: { mode: "chat", messages: newMsgs, profile },
      });
      if (error) throw error;
      const reply = data?.reply ?? "Sorry, I couldn't respond.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
      if (!muted) speak(reply);
    } catch (e: any) {
      toast.error(e.message ?? "Chat failed");
    } finally {
      setBusy(false);
    }
  };

  const buildRoadmap = async () => {
    setBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke("skill-ai", {
        body: { mode: "roadmap", messages, profile },
      });
      if (error) throw error;
      const { data: user } = await supabase.auth.getUser();
      if (user.user) {
        await supabase.from("roadmaps").insert({
          user_id: user.user.id,
          title: `Roadmap: ${profile.career_goal}`,
          content: data.roadmap,
        });
      }
      navigate("/roadmap");
    } catch (e: any) {
      toast.error(e.message ?? "Failed to build roadmap");
    } finally {
      setBusy(false);
    }
  };

  const toggleMic = () => (listening ? stop() : start());

  return (
    <div className="min-h-screen relative flex flex-col">
      <StarField />
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between glass border-b border-border">
        <Button variant="ghost" size="sm" onClick={() => navigate("/profile")}><ArrowLeft className="w-4 h-4 mr-1" />Profile</Button>
        <div className="text-center">
          <h1 className="font-bold text-lg text-gradient">AI Mentor Chat</h1>
          <p className="text-xs text-muted-foreground">Step 2 — talk it out with your AI coach</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" onClick={() => { setMuted(!muted); if (!muted) cancel(); }}>
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
          <Button size="sm" onClick={buildRoadmap} disabled={busy || messages.length < 3} className="bg-gradient-primary text-white">
            <Map className="w-4 h-4 mr-1" /> Build my roadmap
          </Button>
        </div>
      </header>

      <div className="flex-1 grid md:grid-cols-[280px_1fr_280px] max-w-7xl w-full mx-auto p-4 gap-4">
        {/* Left: Robot */}
        <div className="hidden md:flex flex-col items-center justify-center glass rounded-3xl p-6">
          <div className={`rounded-full ${speaking ? "animate-pulse-ring" : ""}`}>
            <AnimatedRobot size={200} talking={speaking} />
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            {speaking ? "Speaking…" : listening ? "Listening…" : "Ready"}
          </p>
        </div>

        {/* Chat area */}
        <div className="glass rounded-3xl p-4 flex flex-col min-h-[60vh]">
          <div ref={scrollRef} className="flex-1 overflow-y-auto pr-2 space-y-3">
            <AnimatePresence initial={false}>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-gradient-primary text-white rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm border border-border"
                  }`}>
                    {m.content}
                  </div>
                </motion.div>
              ))}
              {busy && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="px-4 py-3 rounded-2xl bg-muted border border-border">
                    <div className="flex gap-1">
                      {[0,1,2].map(i => (
                        <span key={i} className="w-2 h-2 rounded-full bg-cyan animate-pulse" style={{ animationDelay: `${i*0.15}s` }} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); send(); }} className="mt-3 flex gap-2 items-end">
            {srOK && (
              <Button type="button" onClick={toggleMic} variant={listening ? "default" : "outline"} size="icon"
                className={listening ? "bg-pink text-white" : ""}>
                {listening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
            )}
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              rows={1}
              placeholder={listening ? "Listening…" : "Type or speak your question…"}
              className="flex-1 resize-none rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <Button type="submit" disabled={busy || !input.trim()} className="bg-gradient-primary text-white"><Send className="w-4 h-4" /></Button>
          </form>
          {!ttsOK && <p className="text-xs text-muted-foreground mt-2">Voice output not supported in this browser.</p>}
        </div>

        {/* Right: Student */}
        <div className="hidden md:flex flex-col items-center justify-center glass rounded-3xl p-6">
          <AnimatedStudent size={200} />
          <p className="mt-4 text-center text-sm text-muted-foreground">{profile?.full_name?.split(" ")[0] ?? "You"}</p>
        </div>
      </div>
    </div>
  );
}
