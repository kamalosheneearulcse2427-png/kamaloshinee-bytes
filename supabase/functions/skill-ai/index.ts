// Handles two modes: "chat" (conversational mentor) and "roadmap" (structured plan).
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
const AI_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";
const MODEL = "google/gemini-2.5-flash";

function profileSummary(p: any) {
  if (!p) return "";
  return `Student profile:
- Name: ${p.full_name}
- College: ${p.college}
- Year: ${p.year}
- Branch: ${p.branch}
- Dream career: ${p.career_goal}
- Current skills: ${(p.skills ?? []).join(", ") || "none listed"}
- Interests: ${(p.interests ?? []).join(", ") || "none listed"}`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    if (!LOVABLE_API_KEY) throw new Error("Missing LOVABLE_API_KEY");
    const { mode, messages = [], profile } = await req.json();

    if (mode === "chat") {
      const system = `You are PathPilot, a warm and highly practical AI career mentor for a college student.
Be concise (2-4 sentences per reply), ask ONE follow-up question at a time, and use plain conversational language suitable for spoken voice.
Focus on identifying the student's skill gaps, interests, learning style and constraints.
${profileSummary(profile)}`;
      const res = await fetch(AI_URL, {
        method: "POST",
        headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: MODEL,
          messages: [{ role: "system", content: system }, ...messages],
        }),
      });
      if (!res.ok) {
        const t = await res.text();
        return new Response(JSON.stringify({ error: t }), { status: res.status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content ?? "";
      return new Response(JSON.stringify({ reply }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (mode === "roadmap") {
      const convo = messages.map((m: any) => `${m.role.toUpperCase()}: ${m.content}`).join("\n");
      const system = `You are PathPilot, an expert career strategist. Produce a comprehensive but concrete career roadmap for a college student, spanning FROM their current year of college ALL THE WAY through internships, interview prep, and landing a first job at a top company aligned with their dream career.
${profileSummary(profile)}

Prior conversation with the student:
${convo}

Return STRICT JSON only (no markdown fences) matching:
{
  "headline": "short punchy title",
  "stages": [
    { "title": "Stage name", "timeframe": "e.g. 1st Year - Semester 1&2", "focus": ["skill 1","skill 2","skill 3"], "milestones": ["milestone 1","milestone 2","milestone 3"], "tips": "one motivating practical tip" }
  ],
  "final_message": "warm 2-3 sentence pep talk from the mentor"
}
Include 6-8 stages that clearly cover: (1) foundational skills in 1st year, (2) deep skill-building in 2nd year, (3) first internship / open source in 3rd year, (4) advanced projects & specialization in final year, (5) interview preparation (DSA, system design, HR), (6) applying & job hunt, (7) landing & thriving in the first company role.`;

      const res = await fetch(AI_URL, {
        method: "POST",
        headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: MODEL,
          messages: [{ role: "system", content: system }, { role: "user", content: "Build my roadmap now." }],
          response_format: { type: "json_object" },
        }),
      });
      if (!res.ok) {
        const t = await res.text();
        return new Response(JSON.stringify({ error: t }), { status: res.status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      const data = await res.json();
      const raw = data.choices?.[0]?.message?.content ?? "{}";
      let roadmap: any;
      try { roadmap = JSON.parse(raw); } catch { roadmap = JSON.parse(raw.replace(/```json|```/g, "")); }
      return new Response(JSON.stringify({ roadmap }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ error: "Unknown mode" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message ?? "Server error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
