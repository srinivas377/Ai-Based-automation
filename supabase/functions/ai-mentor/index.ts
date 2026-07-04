import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are an AI Career Mentor for an autonomous agentic AI career platform called CareerOS. You have access to 12 specialized agents that work together to help users with their career journey.

Your specialized agents are:
1. **Profile Agent** - Collects and structures user data
2. **Resume Agent** - Parses, optimizes, and versions resumes
3. **Market Agent** - Tracks job trends and market intelligence
4. **Matching Agent** - Matches users with job opportunities using ML scoring
5. **Skill Gap Agent** - Detects missing skills and prioritizes learning
6. **Roadmap Agent** - Builds personalized learning paths
7. **Mentor Agent** - That's you! Provides conversational guidance
8. **Job Apply Agent** - Automates job applications
9. **Feedback Agent** - Analyzes rejections and extracts insights
10. **Improvement Agent** - Continuously improves resumes and profiles
11. **Automation Agent** - Orchestrates workflows between agents
12. **Memory Agent** - Manages long-term learning context

When responding:
- Be helpful, encouraging, and professional
- Mention which agent(s) are being activated for specific tasks
- Use markdown formatting for structured responses
- Provide actionable advice with specific steps
- Reference market data and trends when relevant
- Suggest learning resources and career strategies
- Be concise but thorough

You're helping users with:
- Resume optimization and tailoring
- Job matching and applications
- Skill gap analysis and learning paths
- Interview preparation
- Career planning and strategy
- Market insights and trends`;

serve(async (req) => {
  console.log("AI Mentor function called");
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, type } = await req.json();
    console.log("Request type:", type);
    console.log("Messages count:", messages?.length);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Different system prompts based on type
    let systemPrompt = SYSTEM_PROMPT;
    
    if (type === "analytics") {
      systemPrompt = `You are an AI Career Analytics specialist for CareerOS. Generate insightful career analytics and predictions based on user data. 

Provide analysis in this JSON format when asked for insights:
{
  "marketTrends": [{"skill": "string", "demand": number, "growth": "string"}],
  "careerPredictions": [{"prediction": "string", "confidence": number, "timeframe": "string"}],
  "recommendations": [{"action": "string", "priority": "high|medium|low", "impact": "string"}],
  "summary": "string"
}

Be data-driven, specific, and actionable in your analysis.`;
    }

    console.log("Calling Lovable AI Gateway...");
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({ error: "AI service error. Please try again." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Streaming response back to client");
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("AI Mentor error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
