import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, CheckCircle2, HelpCircle, Loader2, Newspaper, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Result = {
  verdict: "REAL" | "FAKE" | "UNCERTAIN";
  confidence: number;
  summary: string;
  red_flags: string[];
  supporting_signals: string[];
  reasoning: string;
  recommendation: string;
};

const FakeNewsDetector = () => {
  const [title, setTitle] = useState("");
  const [source, setSource] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const analyze = async () => {
    if (text.trim().length < 20) {
      toast.error("Paste at least 20 characters of news content.");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-news", {
        body: { title, source, text },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      setResult(data as Result);
    } catch (e: any) {
      console.error(e);
      toast.error(e.message ?? "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  const verdictStyle = (v?: string) => {
    switch (v) {
      case "REAL": return { color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/30", Icon: CheckCircle2, label: "Likely REAL" };
      case "FAKE": return { color: "text-red-400", bg: "bg-red-500/10 border-red-500/30", Icon: AlertTriangle, label: "Likely FAKE" };
      default: return { color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/30", Icon: HelpCircle, label: "UNCERTAIN" };
    }
  };

  const v = verdictStyle(result?.verdict);
  const VIcon = v.Icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 text-white">
      {/* Background grid */}
      <div className="fixed inset-0 opacity-[0.07] pointer-events-none"
        style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "40px 40px" }} />

      <header className="relative border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Fake News Detector</h1>
              <p className="text-xs text-white/50">AI-powered credibility analysis</p>
            </div>
          </div>
          <Badge variant="outline" className="border-cyan-400/40 text-cyan-300 hidden sm:flex">
            <Sparkles className="w-3 h-3 mr-1" /> Gemini AI
          </Badge>
        </div>
      </header>

      <main className="relative max-w-5xl mx-auto px-6 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-cyan-200 to-indigo-300 bg-clip-text text-transparent">
            Is this news real or fake?
          </h2>
          <p className="text-white/60 mt-3 max-w-2xl mx-auto">
            Paste any news article, social media post, or headline. Our AI analyzes credibility signals, red flags, and returns a verdict with reasoning.
          </p>
        </motion.div>

        <Card className="bg-white/5 border-white/10 backdrop-blur-md p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <Input placeholder="Headline / Title (optional)" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-white/5 border-white/10" />
            <Input placeholder="Source / URL (optional)" value={source} onChange={(e) => setSource(e.target.value)} className="bg-white/5 border-white/10" />
          </div>
          <Textarea
            placeholder="Paste the news content here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[200px] bg-white/5 border-white/10 resize-none"
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/40">{text.length} characters</span>
            <Button onClick={analyze} disabled={loading} className="bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 shadow-lg shadow-cyan-500/30">
              {loading ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing…</>) : (<><Newspaper className="w-4 h-4 mr-2" /> Analyze News</>)}
            </Button>
          </div>
        </Card>

        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-8 space-y-4"
            >
              <Card className={`${v.bg} border p-6`}>
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-2xl border ${v.bg} flex items-center justify-center flex-shrink-0`}>
                    <VIcon className={`w-7 h-7 ${v.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className={`text-2xl font-black ${v.color}`}>{v.label}</h3>
                      <Badge variant="outline" className={`${v.color} border-current`}>{result.confidence}% confidence</Badge>
                    </div>
                    <p className="text-white/80 mt-2">{result.summary}</p>
                    <div className="mt-4">
                      <Progress value={result.confidence} className="h-2" />
                    </div>
                  </div>
                </div>
              </Card>

              <div className="grid md:grid-cols-2 gap-4">
                <Card className="bg-white/5 border-white/10 p-5">
                  <h4 className="font-bold text-red-300 flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-4 h-4" /> Red Flags
                  </h4>
                  {result.red_flags.length === 0 ? (
                    <p className="text-white/50 text-sm">No major red flags detected.</p>
                  ) : (
                    <ul className="space-y-2 text-sm text-white/80">
                      {result.red_flags.map((f, i) => (
                        <li key={i} className="flex gap-2"><span className="text-red-400 mt-0.5">•</span> {f}</li>
                      ))}
                    </ul>
                  )}
                </Card>

                <Card className="bg-white/5 border-white/10 p-5">
                  <h4 className="font-bold text-emerald-300 flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-4 h-4" /> Supporting Signals
                  </h4>
                  {result.supporting_signals.length === 0 ? (
                    <p className="text-white/50 text-sm">No strong credibility signals detected.</p>
                  ) : (
                    <ul className="space-y-2 text-sm text-white/80">
                      {result.supporting_signals.map((f, i) => (
                        <li key={i} className="flex gap-2"><span className="text-emerald-400 mt-0.5">•</span> {f}</li>
                      ))}
                    </ul>
                  )}
                </Card>
              </div>

              <Card className="bg-white/5 border-white/10 p-5">
                <h4 className="font-bold text-cyan-300 mb-2">AI Reasoning</h4>
                <p className="text-sm text-white/80 leading-relaxed">{result.reasoning}</p>
              </Card>

              <Card className="bg-indigo-500/10 border-indigo-400/30 p-5">
                <h4 className="font-bold text-indigo-200 mb-2">Recommendation</h4>
                <p className="text-sm text-white/90">{result.recommendation}</p>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-center text-xs text-white/40 mt-10">
          ⚠️ AI analysis is a helpful signal, not the final word. Always cross-check important claims with trusted sources.
        </p>
      </main>
    </div>
  );
};

export default FakeNewsDetector;
