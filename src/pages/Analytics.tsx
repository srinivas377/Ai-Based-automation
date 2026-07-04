import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useAIAnalytics, AnalyticsData } from "@/hooks/useAIAnalytics";
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Brain, 
  Target, 
  Sparkles,
  RefreshCw,
  Briefcase,
  GraduationCap,
  BarChart3,
  LineChart,
  PieChart,
  Zap,
  ArrowUpRight,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
  Cell,
} from "recharts";

// Mock data for initial display
const mockUserData = {
  skills: ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker"],
  experienceLevel: "Mid-Senior",
  targetRole: "Senior Software Engineer",
  applicationsCount: 21,
  interviewRate: 28.5,
};

const mockSkillData = [
  { skill: "React", level: 85, demand: 92 },
  { skill: "TypeScript", level: 78, demand: 88 },
  { skill: "Node.js", level: 72, demand: 85 },
  { skill: "Python", level: 65, demand: 80 },
  { skill: "AWS", level: 58, demand: 90 },
  { skill: "Docker", level: 55, demand: 82 },
];

const mockTrendData = [
  { month: "Aug", applications: 8, interviews: 2, offers: 0 },
  { month: "Sep", applications: 12, interviews: 3, offers: 1 },
  { month: "Oct", applications: 15, interviews: 4, offers: 1 },
  { month: "Nov", applications: 18, interviews: 5, offers: 2 },
  { month: "Dec", applications: 21, interviews: 6, offers: 2 },
  { month: "Jan", applications: 21, interviews: 6, offers: 2 },
];

const chartConfig = {
  applications: { label: "Applications", color: "hsl(var(--primary))" },
  interviews: { label: "Interviews", color: "hsl(var(--success))" },
  offers: { label: "Offers", color: "hsl(var(--accent))" },
  level: { label: "Your Level", color: "hsl(var(--primary))" },
  demand: { label: "Market Demand", color: "hsl(var(--agent-matching))" },
};

const Analytics = () => {
  const { analytics, isLoading, fetchAnalytics } = useAIAnalytics();
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  useEffect(() => {
    // Fetch initial analytics
    fetchAnalytics(
      "Provide comprehensive career analytics including market trends, skill analysis, predictions, and recommendations for a software engineer targeting senior roles.",
      mockUserData
    );
  }, []);

  const handleRefresh = () => {
    setLastRefresh(new Date());
    fetchAnalytics(
      "Refresh career analytics with latest market data and updated predictions.",
      mockUserData
    );
  };

  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up": return <TrendingUp className="w-4 h-4 text-success" />;
      case "down": return <TrendingDown className="w-4 h-4 text-destructive" />;
      default: return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getPriorityColor = (priority: "high" | "medium" | "low") => {
    switch (priority) {
      case "high": return "bg-destructive/20 text-destructive";
      case "medium": return "bg-warning/20 text-warning";
      case "low": return "bg-success/20 text-success";
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground mb-1 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              AI Career Analytics
            </h1>
            <p className="text-muted-foreground">
              AI-powered insights and predictions for your career journey
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">
              Last updated: {lastRefresh.toLocaleTimeString()}
            </span>
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              Refresh Analytics
            </button>
          </div>
        </div>

        {/* AI Summary */}
        {analytics?.summary && (
          <div className="premium-glass-card p-6 border-l-4 border-primary">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/20">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-2">AI Insights Summary</h3>
                <p className="text-muted-foreground leading-relaxed">{analytics.summary}</p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4">
          <div className="premium-glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl bg-agent-apply/20">
                <Briefcase className="w-5 h-5 text-agent-apply" />
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-success/20 text-success">+5 this week</span>
            </div>
            <p className="text-3xl font-heading font-bold text-foreground">21</p>
            <p className="text-sm text-muted-foreground">Active Applications</p>
          </div>
          <div className="premium-glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl bg-success/20">
                <Target className="w-5 h-5 text-success" />
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-success/20 text-success">+3%</span>
            </div>
            <p className="text-3xl font-heading font-bold text-foreground">28.5%</p>
            <p className="text-sm text-muted-foreground">Interview Rate</p>
          </div>
          <div className="premium-glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl bg-agent-matching/20">
                <BarChart3 className="w-5 h-5 text-agent-matching" />
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-success/20 text-success">+12%</span>
            </div>
            <p className="text-3xl font-heading font-bold text-foreground">87%</p>
            <p className="text-sm text-muted-foreground">Match Score</p>
          </div>
          <div className="premium-glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl bg-primary/20">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-success/20 text-success">92%</span>
            </div>
            <p className="text-3xl font-heading font-bold text-foreground">Ready</p>
            <p className="text-sm text-muted-foreground">Career Readiness</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Application Trends */}
          <div className="col-span-8 premium-glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-heading font-semibold text-foreground">Application Trends</h3>
                <p className="text-sm text-muted-foreground">6-month performance overview</p>
              </div>
              <LineChart className="w-5 h-5 text-muted-foreground" />
            </div>
            <ChartContainer config={chartConfig} className="h-[280px] w-full">
              <AreaChart data={mockTrendData}>
                <defs>
                  <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.01}/>
                  </linearGradient>
                  <linearGradient id="colorInterviews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0.01}/>
                  </linearGradient>
                  <linearGradient id="colorOffers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0.01}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-white/5" />
                <XAxis dataKey="month" className="text-muted-foreground text-xs" />
                <YAxis className="text-muted-foreground text-xs" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="applications"
                  stroke="hsl(var(--primary))"
                  fill="url(#colorApplications)"
                  strokeWidth={2.5}
                />
                <Area
                  type="monotone"
                  dataKey="interviews"
                  stroke="hsl(var(--success))"
                  fill="url(#colorInterviews)"
                  strokeWidth={2.5}
                />
                <Area
                  type="monotone"
                  dataKey="offers"
                  stroke="hsl(var(--accent))"
                  fill="url(#colorOffers)"
                  strokeWidth={2.5}
                />
              </AreaChart>
            </ChartContainer>
          </div>

          {/* Skill Radar */}
          <div className="col-span-4 premium-glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-heading font-semibold text-foreground">Skill Analysis</h3>
                <p className="text-sm text-muted-foreground">Your skills vs market demand</p>
              </div>
              <PieChart className="w-5 h-5 text-muted-foreground" />
            </div>
            <ChartContainer config={chartConfig} className="h-[260px] w-full">
              <RadarChart data={mockSkillData}>
                <PolarGrid className="stroke-white/10" />
                <PolarAngleAxis dataKey="skill" className="text-muted-foreground text-xs" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} className="text-muted-foreground" />
                <Radar
                  name="Your Level"
                  dataKey="level"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary) / 0.3)"
                />
                <Radar
                  name="Market Demand"
                  dataKey="demand"
                  stroke="hsl(var(--agent-matching))"
                  fill="hsl(var(--agent-matching) / 0.2)"
                />
                <ChartTooltip content={<ChartTooltipContent />} />
              </RadarChart>
            </ChartContainer>
          </div>
        </div>

        {/* Market Insights & Recommendations */}
        <div className="grid grid-cols-12 gap-6">
          {/* Market Insights */}
          <div className="col-span-6 premium-glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-agent-market/20">
                <TrendingUp className="w-5 h-5 text-agent-market" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground">Market Insights</h3>
                <p className="text-sm text-muted-foreground">AI-detected market trends</p>
              </div>
            </div>
            <div className="space-y-3">
              {(analytics?.marketInsights || [
                { category: "React Developer", value: "High Demand", trend: "up" as const, percentage: 23 },
                { category: "Remote Positions", value: "Increasing", trend: "up" as const, percentage: 15 },
                { category: "Salary Range", value: "$150k-180k", trend: "stable" as const, percentage: 5 },
                { category: "Competition", value: "Moderate", trend: "down" as const, percentage: -8 },
              ]).map((insight, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                  <div>
                    <p className="font-medium text-foreground">{insight.category}</p>
                    <p className="text-sm text-muted-foreground">{insight.value}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(insight.trend)}
                    <span className={cn(
                      "text-sm font-medium",
                      insight.trend === "up" && "text-success",
                      insight.trend === "down" && "text-destructive",
                      insight.trend === "stable" && "text-muted-foreground"
                    )}>
                      {insight.percentage > 0 ? "+" : ""}{insight.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="col-span-6 premium-glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-primary/20">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground">AI Recommendations</h3>
                <p className="text-sm text-muted-foreground">Prioritized actions for success</p>
              </div>
            </div>
            <div className="space-y-3">
              {(analytics?.recommendations || [
                { action: "Complete AWS certification to match 90% of target roles", priority: "high" as const, impact: "Increases match score by 15%" },
                { action: "Optimize resume for ATS with target keywords", priority: "high" as const, impact: "Improves response rate by 25%" },
                { action: "Build a Kubernetes side project", priority: "medium" as const, impact: "Fills major skill gap" },
                { action: "Expand LinkedIn network with recruiters", priority: "low" as const, impact: "More inbound opportunities" },
              ]).map((rec, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/5 group hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="font-medium text-foreground group-hover:text-primary transition-colors">{rec.action}</p>
                      <p className="text-sm text-muted-foreground mt-1">{rec.impact}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={cn("text-xs px-2 py-1 rounded-full font-medium capitalize", getPriorityColor(rec.priority))}>
                        {rec.priority}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Career Predictions */}
        <div className="premium-glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-accent/20">
              <GraduationCap className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground">Career Predictions</h3>
              <p className="text-sm text-muted-foreground">AI-powered career trajectory forecasts</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {(analytics?.predictions || [
              { prediction: "Likely to receive senior role offer", confidence: 78, timeframe: "3-6 months" },
              { prediction: "AWS skills will unlock 40% more opportunities", confidence: 85, timeframe: "After certification" },
              { prediction: "Salary range increase to $165k-185k", confidence: 72, timeframe: "12-18 months" },
            ]).map((pred, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-muted-foreground">{pred.timeframe}</span>
                  <div className="flex items-center gap-1">
                    <div className="w-16 h-2 rounded-full bg-white/10 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                        style={{ width: `${pred.confidence}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{pred.confidence}%</span>
                  </div>
                </div>
                <p className="font-medium text-foreground">{pred.prediction}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Analytics;
