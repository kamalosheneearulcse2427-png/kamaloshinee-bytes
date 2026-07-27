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

    const system = `You are a careful, balanced misinformation analyst. Your job is NOT to assume content is fake by default. Most mainstream news is real.

Judge the content as REAL, FAKE, or UNCERTAIN using these rules:
- REAL: Content describes plausible events, uses neutral reporting language, is consistent with widely known facts, mentions real named entities/places/dates, or matches the style of legitimate journalism. A named reputable source (Reuters, AP, BBC, NYT, Guardian, etc.) is a strong REAL signal.
- FAKE: Content contains clearly fabricated claims, impossible events, obvious conspiracy patterns, invented "experts", or extreme clickbait with no verifiable substance.
- UNCERTAIN: Only when there is genuinely not enough information to decide (very short, ambiguous, or opinion). Do NOT default to UNCERTAIN or FAKE just because you can't personally verify — evaluate the writing itself.

Important:
- Absence of a source is NOT proof of fake. Weight writing style, internal consistency, and plausibility heavily.
- Neutral, factual, well-structured reporting = lean REAL with high confidence.
- Sensational, emotionally manipulative, or logically impossible = lean FAKE.
- Be decisive. Only use UNCERTAIN when truly unclear.

Return ONLY strict JSON:
{
  "verdict": "REAL" | "FAKE" | "UNCERTAIN",
  "confidence": number (0-100),
  "summary": string,
  "red_flags": string[],
  "supporting_signals": string[],
  "reasoning": string,
  "recommendation": string
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
        model: "google/gemini-2.5-pro",
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
