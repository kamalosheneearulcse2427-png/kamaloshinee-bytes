import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Rocket, GraduationCap, Sparkles } from "lucide-react";
import StarField from "@/components/StarField";
import AnimatedStudent from "@/components/AnimatedStudent";
import AnimatedRobot from "@/components/AnimatedRobot";

export default function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/profile");
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate("/profile");
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: window.location.origin + "/profile", data: { full_name: name } },
        });
        if (error) throw error;
        toast.success("Account created! Check your email if confirmation is required.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err: any) {
      toast.error(err.message ?? "Authentication failed");
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    const res = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (res.error) toast.error("Google sign-in failed");
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-12">
      <StarField />
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left: brand + character */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-6">
            <Sparkles className="w-4 h-4 text-pink" />
            <span className="text-xs uppercase tracking-widest text-muted-foreground">AI Career Mentor</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
            <span className="text-gradient">PathPilot</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-6 max-w-md">
            From your first year of college to landing your dream company — a personalized AI roadmap, built for you.
          </p>
          <div className="flex items-end gap-4 justify-center md:justify-start">
            <AnimatedStudent size={170} />
            <div className="hidden sm:block relative">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full glass text-xs whitespace-nowrap text-cyan">
                "Let's build your future."
              </div>
              <AnimatedRobot size={170} talking />
            </div>
          </div>
        </motion.div>

        {/* Right: auth card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass rounded-3xl p-8 glow-violet"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">{mode === "signin" ? "Welcome back" : "Create your account"}</h2>
              <p className="text-xs text-muted-foreground">
                {mode === "signin" ? "Sign in to continue your journey" : "Start your AI-guided career journey"}
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={google}
            className="w-full mb-4 h-11 border-border/60 hover:bg-muted"
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 10.2v3.9h5.4c-.2 1.4-1.6 4.1-5.4 4.1-3.2 0-5.8-2.7-5.8-6s2.6-6 5.8-6c1.8 0 3 .8 3.7 1.5l2.5-2.4C16.6 3.8 14.5 3 12 3 6.9 3 2.8 7.1 2.8 12S6.9 21 12 21c6.9 0 9.2-4.8 9.2-7.3 0-.5-.1-.9-.1-1.3H12z" />
            </svg>
            Continue with Google
          </Button>

          <div className="relative my-4 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <span className="relative bg-card px-3 text-xs uppercase tracking-wider text-muted-foreground">or</span>
          </div>

          <form onSubmit={submit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1.5" placeholder="Priya Sharma" />
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1.5" placeholder="you@college.edu" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="mt-1.5" placeholder="At least 6 characters" />
            </div>
            <Button type="submit" disabled={busy} className="w-full h-11 bg-gradient-primary hover:opacity-90 text-white font-semibold">
              <Rocket className="w-4 h-4 mr-2" />
              {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
            </Button>
          </form>

          <p className="text-sm text-center text-muted-foreground mt-6">
            {mode === "signin" ? "New here? " : "Already have an account? "}
            <button className="text-cyan hover:underline font-medium" onClick={() => setMode(mode === "signin" ? "signup" : "signin")}>
              {mode === "signin" ? "Create an account" : "Sign in"}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
