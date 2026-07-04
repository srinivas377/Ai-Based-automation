import { ArrowRight, Building2, Clock, CheckCircle2, XCircle, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const pipelineStages = [
  { id: "applied", label: "Applied", count: 12, icon: Send, color: "text-agent-auto" },
  { id: "screening", label: "Screening", count: 5, icon: Clock, color: "text-agent-market" },
  { id: "interview", label: "Interview", count: 3, icon: Building2, color: "text-warning" },
  { id: "offer", label: "Offer", count: 1, icon: CheckCircle2, color: "text-success" },
  { id: "rejected", label: "Rejected", count: 4, icon: XCircle, color: "text-destructive" },
];

const recentApplications = [
  {
    company: "TechCorp AI",
    role: "Senior ML Engineer",
    status: "interview",
    daysAgo: 2,
    logo: "T",
    matchScore: 94,
  },
  {
    company: "DataFlow Inc",
    role: "Full Stack Developer",
    status: "screening",
    daysAgo: 4,
    logo: "D",
    matchScore: 87,
  },
  {
    company: "CloudScale",
    role: "Backend Engineer",
    status: "applied",
    daysAgo: 1,
    logo: "C",
    matchScore: 91,
  },
  {
    company: "AI Startup",
    role: "Software Engineer",
    status: "offer",
    daysAgo: 7,
    logo: "A",
    matchScore: 96,
  },
];

export function JobPipeline() {
  return (
    <div className="glass-card p-6">
      <h3 className="font-heading font-semibold text-lg text-foreground mb-6">
        Application Pipeline
      </h3>

      {/* Pipeline stages */}
      <div className="flex items-center justify-between mb-8">
        {pipelineStages.map((stage, index) => (
          <div key={stage.id} className="flex items-center">
            <div className="text-center">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center mb-2 transition-all",
                "bg-white/5 hover:bg-white/10"
              )}>
                <stage.icon className={cn("w-5 h-5", stage.color)} />
              </div>
              <p className="text-2xl font-heading font-bold text-foreground">{stage.count}</p>
              <p className="text-xs text-muted-foreground">{stage.label}</p>
            </div>
            {index < pipelineStages.length - 1 && (
              <ArrowRight className="w-4 h-4 text-muted-foreground/50 mx-3" />
            )}
          </div>
        ))}
      </div>

      {/* Recent applications */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground mb-3">Recent Applications</p>
        {recentApplications.map((app, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center font-heading font-bold text-primary">
                {app.logo}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {app.role}
                </p>
                <p className="text-xs text-muted-foreground">{app.company}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-primary">{app.matchScore}%</p>
                <p className="text-xs text-muted-foreground">Match</p>
              </div>
              <span className={cn(
                "text-xs px-2 py-1 rounded-full",
                app.status === "interview" && "bg-warning/20 text-warning",
                app.status === "screening" && "bg-agent-market/20 text-agent-market",
                app.status === "applied" && "bg-agent-auto/20 text-agent-auto",
                app.status === "offer" && "bg-success/20 text-success"
              )}>
                {app.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
