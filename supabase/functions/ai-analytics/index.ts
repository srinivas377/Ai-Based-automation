import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const ANALYTICS_PROMPT = `You are an AI Career Analytics engine for CareerOS. You analyze career data and provide actionable insights.

When generating analytics, provide structured analysis covering:
1. **Market Trends** - Current job market conditions, in-demand skills, salary trends
2. **Career Predictions** - Where the user's career trajectory is heading
3. **Skill Analysis** - Current skill gaps and improvement areas
4. **Application Performance** - How job applications are performing
5. **Recommendations** - Prioritized actions to improve career outcomes

Always be data-driven, specific, and actionable. Use percentages, timeframes, and concrete numbers when possible.`;

serve(async (req) => {
  console.log("AI Analytics function called");
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, userData } = await req.json();
    console.log("Analytics query:", query);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build context from user data
    const userContext = userData ? `
User Profile Context:
- Skills: ${userData.skills?.join(", ") || "Not specified"}
- Experience Level: ${userData.experienceLevel || "Not specified"}
- Target Role: ${userData.targetRole || "Not specified"}
- Applications: ${userData.applicationsCount || 0} total
- Interview Rate: ${userData.interviewRate || 0}%
` : "";

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: ANALYTICS_PROMPT },
          { role: "user", content: `${userContext}\n\nAnalytics Request: ${query}` },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_analytics",
              description: "Generate structured career analytics data",
              parameters: {
                type: "object",
                properties: {
                  marketInsights: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        category: { type: "string" },
                        value: { type: "string" },
                        trend: { type: "string", enum: ["up", "down", "stable"] },
                        percentage: { type: "number" }
                      }
                    }
                  },
                  skillAnalysis: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        skill: { type: "string" },
                        currentLevel: { type: "number" },
                        marketDemand: { type: "number" },
                        gapScore: { type: "number" }
                      }
                    }
                  },
                  predictions: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        prediction: { type: "string" },
                        confidence: { type: "number" },
                        timeframe: { type: "string" }
                      }
                    }
                  },
                  recommendations: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        action: { type: "string" },
                        priority: { type: "string", enum: ["high", "medium", "low"] },
                        impact: { type: "string" }
                      }
                    }
                  },
                  summary: { type: "string" }
                },
                required: ["summary"]
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "generate_analytics" } }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    console.log("AI response received");
    
    // Extract tool call result
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (toolCall?.function?.arguments) {
      const analytics = JSON.parse(toolCall.function.arguments);
      return new Response(JSON.stringify({ success: true, analytics }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fallback to text response
    return new Response(JSON.stringify({ 
      success: true, 
      analytics: { 
        summary: data.choices?.[0]?.message?.content || "Analysis complete" 
      } 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("AI Analytics error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
