import { MainLayout } from "@/components/layout/MainLayout";
import { 
  Bot, 
  Brain, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  MessageSquare, 
  TrendingUp, 
  Sparkles, 
  RefreshCw, 
  Zap, 
  Database, 
  Target,
  Play,
  Pause,
  Settings,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

const agents = [
  {
    id: "profile",
    name: "Profile Agent",
    description: "Collects and structures user data, maintains profile consistency",
    icon: Bot,
    color: "bg-agent-profile",
    status: "active",
    lastAction: "Updated skills profile",
    actionsToday: 12,
    successRate: 98,
  },
  {
    id: "resume",
    name: "Resume Agent",
    description: "Parses, optimizes, and versions resumes for different roles",
    icon: FileText,
    color: "bg-agent-resume",
    status: "active",
    lastAction: "Optimized for Senior SWE role",
    actionsToday: 5,
    successRate: 95,
  },
  {
    id: "market",
    name: "Market Agent",
    description: "Tracks job trends, demand signals, and market intelligence",
    icon: TrendingUp,
    color: "bg-agent-market",
    status: "idle",
    lastAction: "Scanned 156 new postings",
    actionsToday: 3,
    successRate: 100,
  },
  {
    id: "matching",
    name: "Matching Agent",
    description: "Matches user profile with job opportunities using ML scoring",
    icon: Target,
    color: "bg-agent-matching",
    status: "active",
    lastAction: "Found 8 high-match jobs",
    actionsToday: 24,
    successRate: 92,
  },
  {
    id: "skill",
    name: "Skill Gap Agent",
    description: "Detects missing skills and prioritizes learning needs",
    icon: Brain,
    color: "bg-agent-skill",
    status: "processing",
    lastAction: "Analyzing Kubernetes gap",
    actionsToday: 7,
    successRate: 89,
  },
  {
    id: "roadmap",
    name: "Roadmap Agent",
    description: "Builds personalized learning paths and tracks progress",
    icon: GraduationCap,
    color: "bg-agent-roadmap",
    status: "active",
    lastAction: "Updated learning roadmap",
    actionsToday: 4,
    successRate: 96,
  },
  {
    id: "mentor",
    name: "Mentor Agent",
    description: "Provides conversational career guidance and advice",
    icon: MessageSquare,
    color: "bg-agent-mentor",
    status: "active",
    lastAction: "Completed chat session",
    actionsToday: 18,
    successRate: 97,
  },
  {
    id: "apply",
    name: "Job Apply Agent",
    description: "Automates job applications with tailored materials",
    icon: Briefcase,
    color: "bg-agent-apply",
    status: "idle",
    lastAction: "Applied to 3 positions",
    actionsToday: 3,
    successRate: 85,
  },
  {
    id: "feedback",
    name: "Feedback Agent",
    description: "Analyzes rejections and extracts improvement insights",
    icon: RefreshCw,
    color: "bg-agent-feedback",
    status: "idle",
    lastAction: "Analyzed 2 rejections",
    actionsToday: 2,
    successRate: 100,
  },
  {
    id: "improve",
    name: "Improvement Agent",
    description: "Continuously improves resume and profile based on feedback",
    icon: Sparkles,
    color: "bg-agent-improve",
    status: "idle",
    lastAction: "Enhanced resume summary",
    actionsToday: 1,
    successRate: 94,
  },
  {
    id: "auto",
    name: "Automation Agent",
    description: "Orchestrates workflows and coordinates other agents",
    icon: Zap,
    color: "bg-agent-auto",
    status: "active",
    lastAction: "Triggered job search flow",
    actionsToday: 47,
    successRate: 99,
  },
  {
    id: "memory",
    name: "Memory Agent",
    description: "Manages long-term learning memory and context",
    icon: Database,
    color: "bg-agent-memory",
    status: "active",
    lastAction: "Stored conversation context",
    actionsToday: 156,
    successRate: 100,
  },
];

const Agents = () => {
  const activeAgents = agents.filter(a => a.status === "active").length;
  const totalActions = agents.reduce((sum, a) => sum + a.actionsToday, 0);
  const avgSuccessRate = Math.round(agents.reduce((sum, a) => sum + a.successRate, 0) / agents.length);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground mb-1">Agent Network</h1>
            <p className="text-muted-foreground">Monitor and control your AI agents</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-sm text-foreground transition-colors">
              <Settings className="w-4 h-4" />
              Configure
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all">
              <Activity className="w-4 h-4" />
              View Logs
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="glass-card p-4">
            <p className="text-sm text-muted-foreground mb-1">Active Agents</p>
            <p className="text-3xl font-heading font-bold text-foreground">{activeAgents}</p>
            <p className="text-xs text-muted-foreground mt-1">of {agents.length} total</p>
          </div>
          <div className="glass-card p-4">
            <p className="text-sm text-muted-foreground mb-1">Actions Today</p>
            <p className="text-3xl font-heading font-bold text-primary">{totalActions}</p>
            <p className="text-xs text-muted-foreground mt-1">autonomous actions</p>
          </div>
          <div className="glass-card p-4">
            <p className="text-sm text-muted-foreground mb-1">Success Rate</p>
            <p className="text-3xl font-heading font-bold text-success">{avgSuccessRate}%</p>
            <p className="text-xs text-muted-foreground mt-1">average across agents</p>
          </div>
          <div className="glass-card p-4">
            <p className="text-sm text-muted-foreground mb-1">Time Saved</p>
            <p className="text-3xl font-heading font-bold text-accent">12h</p>
            <p className="text-xs text-muted-foreground mt-1">this week</p>
          </div>
        </div>

        {/* Agent Grid */}
        <div className="grid grid-cols-3 gap-4">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="glass-card p-5 hover:ring-2 hover:ring-primary/30 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center",
                    agent.color
                  )}>
                    <agent.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {agent.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        agent.status === "active" && "bg-success animate-pulse",
                        agent.status === "processing" && "bg-warning animate-pulse",
                        agent.status === "idle" && "bg-muted-foreground"
                      )} />
                      <span className="text-xs text-muted-foreground capitalize">{agent.status}</span>
                    </div>
                  </div>
                </div>
                <button className={cn(
                  "p-2 rounded-lg transition-colors",
                  agent.status === "active" ? "hover:bg-warning/20" : "hover:bg-success/20"
                )}>
                  {agent.status === "active" || agent.status === "processing" ? (
                    <Pause className="w-4 h-4 text-warning" />
                  ) : (
                    <Play className="w-4 h-4 text-success" />
                  )}
                </button>
              </div>

              <p className="text-sm text-muted-foreground mb-4">{agent.description}</p>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span>Last action</span>
                  <span>{agent.lastAction}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="text-lg font-heading font-bold text-foreground">{agent.actionsToday}</p>
                    <p className="text-xs text-muted-foreground">actions today</p>
                  </div>
                  <div>
                    <p className="text-lg font-heading font-bold text-success">{agent.successRate}%</p>
                    <p className="text-xs text-muted-foreground">success rate</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Agents;
