import { useState, useCallback } from "react";
import { toast } from "sonner";

interface MarketInsight {
  category: string;
  value: string;
  trend: "up" | "down" | "stable";
  percentage: number;
}

interface SkillAnalysis {
  skill: string;
  currentLevel: number;
  marketDemand: number;
  gapScore: number;
}

interface Prediction {
  prediction: string;
  confidence: number;
  timeframe: string;
}

interface Recommendation {
  action: string;
  priority: "high" | "medium" | "low";
  impact: string;
}

export interface AnalyticsData {
  marketInsights?: MarketInsight[];
  skillAnalysis?: SkillAnalysis[];
  predictions?: Prediction[];
  recommendations?: Recommendation[];
  summary: string;
}

const ANALYTICS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-analytics`;

export function useAIAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async (query: string, userData?: object) => {
    setIsLoading(true);
    setError(null);

    try {
      const resp = await fetch(ANALYTICS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ query, userData }),
      });

      if (!resp.ok) {
        const errorData = await resp.json().catch(() => ({}));
        throw new Error(errorData.error || `Request failed: ${resp.status}`);
      }

      const data = await resp.json();
      
      if (data.success && data.analytics) {
        setAnalytics(data.analytics);
        return data.analytics;
      } else {
        throw new Error(data.error || "Failed to get analytics");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Analytics error";
      setError(message);
      toast.error(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    analytics,
    isLoading,
    error,
    fetchAnalytics,
  };
}
