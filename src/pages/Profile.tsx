import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ChevronRight, LogOut, User } from "lucide-react";
import StarField from "@/components/StarField";
import AnimatedStudent from "@/components/AnimatedStudent";

export default function Profile() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [form, setForm] = useState({
    full_name: "", college: "", year: "1st Year", branch: "",
    career_goal: "", skills: "", interests: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) { navigate("/auth"); return; }
      setUserId(data.user.id);
      const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).maybeSingle();
      if (profile) {
        setForm({
          full_name: profile.full_name ?? "",
          college: profile.college ?? "",
          year: profile.year ?? "1st Year",
          branch: profile.branch ?? "",
          career_goal: profile.career_goal ?? "",
          skills: (profile.skills ?? []).join(", "),
          interests: (profile.interests ?? []).join(", "),
        });
      }
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").upsert({
      id: userId,
      full_name: form.full_name,
      college: form.college,
      year: form.year,
      branch: form.branch,
      career_goal: form.career_goal,
      skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
      interests: form.interests.split(",").map((s) => s.trim()).filter(Boolean),
    });
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Profile saved!");
    navigate("/chat");
  };

  const signOut = async () => { await supabase.auth.signOut(); navigate("/auth"); };

  return (
    <div className="min-h-screen relative px-4 py-10">
      <StarField />
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Tell us about yourself</h1>
              <p className="text-sm text-muted-foreground">Step 1 of 3 — your details power the AI roadmap</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={signOut}><LogOut className="w-4 h-4 mr-2" />Sign out</Button>
        </div>

        <div className="grid md:grid-cols-[1fr_320px] gap-8">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={submit}
            className="glass rounded-3xl p-8 space-y-5 glow-violet"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Full name</Label>
                <Input value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} required className="mt-1.5" />
              </div>
              <div>
                <Label>College / University</Label>
                <Input value={form.college} onChange={(e) => setForm({ ...form, college: e.target.value })} required className="mt-1.5" placeholder="e.g., IIT Madras" />
              </div>
              <div>
                <Label>Year</Label>
                <select value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                  <option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>Final Year</option><option>Graduate</option>
                </select>
              </div>
              <div>
                <Label>Branch / Major</Label>
                <Input value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value })} required className="mt-1.5" placeholder="e.g., Computer Science" />
              </div>
            </div>
            <div>
              <Label>Dream career / role</Label>
              <Input value={form.career_goal} onChange={(e) => setForm({ ...form, career_goal: e.target.value })} required className="mt-1.5" placeholder="e.g., Machine Learning Engineer at Google" />
            </div>
            <div>
              <Label>Current skills <span className="text-muted-foreground text-xs">(comma separated)</span></Label>
              <Textarea rows={2} value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} className="mt-1.5" placeholder="Python, HTML, basic DSA" />
            </div>
            <div>
              <Label>Interests</Label>
              <Textarea rows={2} value={form.interests} onChange={(e) => setForm({ ...form, interests: e.target.value })} className="mt-1.5" placeholder="AI, robotics, product design" />
            </div>
            <Button type="submit" disabled={saving} className="w-full h-11 bg-gradient-primary text-white">
              {saving ? "Saving…" : (<>Continue to AI Chat <ChevronRight className="w-4 h-4 ml-1" /></>)}
            </Button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass rounded-3xl p-6 flex flex-col items-center justify-center text-center h-fit"
          >
            <AnimatedStudent size={200} />
            <p className="text-sm text-muted-foreground mt-3">
              Your student profile is the fuel for a truly personalized roadmap.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
