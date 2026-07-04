import { Bot, Brain, FileText, Briefcase, GraduationCap, MessageSquare, TrendingUp, Sparkles, RefreshCw, Zap, Database, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const agents = [
  { id: "profile", name: "Profile", icon: Bot, color: "bg-agent-profile", status: "active" },
  { id: "resume", name: "Resume", icon: FileText, color: "bg-agent-resume", status: "active" },
  { id: "market", name: "Market", icon: TrendingUp, color: "bg-agent-market", status: "idle" },
  { id: "matching", name: "Match", icon: Target, color: "bg-agent-matching", status: "active" },
  { id: "skill", name: "Skill Gap", icon: Brain, color: "bg-agent-skill", status: "processing" },
  { id: "roadmap", name: "Roadmap", icon: GraduationCap, color: "bg-agent-roadmap", status: "active" },
  { id: "mentor", name: "Mentor", icon: MessageSquare, color: "bg-agent-mentor", status: "active" },
  { id: "apply", name: "Apply", icon: Briefcase, color: "bg-agent-apply", status: "idle" },
  { id: "feedback", name: "Feedback", icon: RefreshCw, color: "bg-agent-feedback", status: "idle" },
  { id: "improve", name: "Improve", icon: Sparkles, color: "bg-agent-improve", status: "idle" },
  { id: "auto", name: "Automation", icon: Zap, color: "bg-agent-auto", status: "active" },
  { id: "memory", name: "Memory", icon: Database, color: "bg-agent-memory", status: "active" },
];

export function AgentOrbit() {
  return (
    <div className="relative w-full h-80 flex items-center justify-center">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-48 h-48 rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Center core */}
      <div className="absolute z-10 w-24 h-24 rounded-full glass-card flex items-center justify-center glow-primary">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center animate-pulse-glow">
          <Brain className="w-8 h-8 text-primary" />
        </div>
      </div>

      {/* Orbit rings */}
      <div className="absolute w-48 h-48 rounded-full border border-white/5 animate-spin-slow" style={{ animationDuration: "30s" }} />
      <div className="absolute w-64 h-64 rounded-full border border-white/5 animate-spin-slow" style={{ animationDuration: "40s", animationDirection: "reverse" }} />
      <div className="absolute w-80 h-80 rounded-full border border-white/5 animate-spin-slow" style={{ animationDuration: "50s" }} />

      {/* Agent nodes */}
      {agents.map((agent, index) => {
        const angle = (index / agents.length) * 360;
        const radius = 120 + (index % 3) * 20;
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;

        return (
          <div
            key={agent.id}
            className="absolute transition-all duration-500 hover:scale-125 cursor-pointer group"
            style={{
              transform: `translate(${x}px, ${y}px)`,
            }}
          >
            <div className="relative">
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                  agent.color,
                  agent.status === "active" && "shadow-lg",
                  agent.status === "processing" && "animate-pulse"
                )}
              >
                <agent.icon className="w-5 h-5 text-white" />
              </div>
              {/* Status indicator */}
              <div
                className={cn(
                  "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background",
                  agent.status === "active" && "bg-success",
                  agent.status === "processing" && "bg-warning animate-pulse",
                  agent.status === "idle" && "bg-muted-foreground"
                )}
              />
              {/* Tooltip */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                <span className="text-xs font-medium text-muted-foreground">{agent.name}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
