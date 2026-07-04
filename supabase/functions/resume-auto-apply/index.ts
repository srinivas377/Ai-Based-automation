import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { resumeText, fileName } = await req.json();
    if (!resumeText || typeof resumeText !== "string") {
      return new Response(JSON.stringify({ error: "resumeText required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const trimmed = resumeText.slice(0, 12000);

    const tools = [{
      type: "function",
      function: {
        name: "process_resume_and_apply",
        description: "Parse resume, score ATS, match jobs, and auto-apply.",
        parameters: {
          type: "object",
          properties: {
            candidate: {
              type: "object",
              properties: {
                name: { type: "string" },
                title: { type: "string" },
                yearsExperience: { type: "number" },
                topSkills: { type: "array", items: { type: "string" } },
              },
              required: ["name", "title", "topSkills"],
            },
            atsScore: { type: "number", description: "0-100" },
            atsBreakdown: {
              type: "object",
              properties: {
                keywords: { type: "number" },
                impact: { type: "number" },
                skillsMatch: { type: "number" },
                formatting: { type: "number" },
              },
              required: ["keywords", "impact", "skillsMatch", "formatting"],
            },
            suggestions: { type: "array", items: { type: "string" } },
            matchedJobs: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  company: { type: "string" },
                  role: { type: "string" },
                  location: { type: "string" },
                  matchScore: { type: "number" },
                  salary: { type: "string" },
                  status: { type: "string", enum: ["applied", "queued", "skipped"] },
                  reason: { type: "string" },
                },
                required: ["company", "role", "matchScore", "status", "reason"],
              },
            },
            summary: { type: "string" },
          },
          required: ["candidate", "atsScore", "atsBreakdown", "suggestions", "matchedJobs", "summary"],
        },
      },
    }];

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: "You are CareerOS auto-apply engine. Analyze the resume, compute realistic ATS scores, generate 6-8 realistic matched jobs from real-sounding companies (Google, Stripe, Notion, Vercel, Airbnb, Linear, Figma, Shopify, etc.) tailored to the candidate's actual skills, and mark which were auto-applied (matchScore>=80 => applied, 65-79 => queued, <65 => skipped). Be specific and grounded in the actual resume content.",
          },
          { role: "user", content: `Resume (${fileName || "uploaded"}):\n\n${trimmed}` },
        ],
        tools,
        tool_choice: { type: "function", function: { name: "process_resume_and_apply" } },
      }),
    });

    if (!aiRes.ok) {
      const t = await aiRes.text();
      console.error("AI error", aiRes.status, t);
      const status = aiRes.status === 429 || aiRes.status === 402 ? aiRes.status : 500;
      const msg = aiRes.status === 429 ? "Rate limit exceeded, try again shortly."
        : aiRes.status === 402 ? "AI credits exhausted."
        : "AI service error.";
      return new Response(JSON.stringify({ error: msg }), {
        status, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await aiRes.json();
    const args = data.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    if (!args) throw new Error("No structured output");
    const parsed = JSON.parse(args);

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("resume-auto-apply error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
