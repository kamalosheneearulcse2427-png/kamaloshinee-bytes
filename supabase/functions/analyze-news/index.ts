import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY missing" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { text, title, source } = await req.json();
    if (!text || typeof text !== "string" || text.trim().length < 20) {
      return new Response(
        JSON.stringify({ error: "Please provide news text (at least 20 characters)." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const system = `You are an expert misinformation analyst. Given a piece of news content, judge whether it is likely REAL, FAKE, or UNCERTAIN.

Analyze:
- Factual plausibility and known events
- Emotional/clickbait language, exaggeration
- Presence/absence of verifiable sources
- Logical consistency and internal contradictions
- Common misinformation patterns (conspiracy, unnamed "experts", etc.)

Return ONLY strict JSON matching this schema:
{
  "verdict": "REAL" | "FAKE" | "UNCERTAIN",
  "confidence": number (0-100),
  "summary": string (1-2 sentence overall judgment),
  "red_flags": string[] (specific suspicious signals; empty array if none),
  "supporting_signals": string[] (signals that support credibility; empty array if none),
  "reasoning": string (short paragraph explaining your decision),
  "recommendation": string (what the reader should do — e.g., verify with X, cross-check with Y)
}`;

    const userContent = [
      title ? `TITLE: ${title}` : null,
      source ? `SOURCE: ${source}` : null,
      `CONTENT:\n${text}`,
    ].filter(Boolean).join("\n\n");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": LOVABLE_API_KEY,
      },
      body: JSON.stringify({
        model: "google/gemini-3.6-flash",
        messages: [
          { role: "system", content: system },
          { role: "user", content: userContent },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Gateway error", res.status, errText);
      if (res.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit reached. Try again shortly." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (res.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits in workspace billing." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: "AI analysis failed", details: errText }), {
        status: res.status, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await res.json();
    const raw = data?.choices?.[0]?.message?.content ?? "{}";
    let parsed: any;
    try { parsed = JSON.parse(raw); } catch {
      parsed = { verdict: "UNCERTAIN", confidence: 0, summary: "Could not parse AI response.", red_flags: [], supporting_signals: [], reasoning: raw, recommendation: "Try again." };
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
