import { Zap, Play, Pause, Settings, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const automations = [
  {
    name: "Job Matching & Apply",
    status: "running",
    lastRun: "2 hours ago",
    nextRun: "in 4 hours",
    stats: { applied: 3, skipped: 7 },
  },
  {
    name: "Resume Optimization",
    status: "paused",
    lastRun: "Yesterday",
    nextRun: "Manual trigger",
    stats: { optimized: 2, pending: 1 },
  },
  {
    name: "Skill Gap Analysis",
    status: "running",
    lastRun: "1 hour ago",
    nextRun: "Daily at 9 AM",
    stats: { detected: 3, resolved: 5 },
  },
  {
    name: "Rejection Feedback Loop",
    status: "idle",
    lastRun: "3 days ago",
    nextRun: "On rejection",
    stats: { analyzed: 4, improved: 3 },
  },
];

export function AutomationStatus() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground">Automation Engine</h3>
            <p className="text-xs text-muted-foreground">3 of 4 automations active</p>
          </div>
        </div>
        <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
          <Settings className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="space-y-3">
        {automations.map((auto) => (
          <div
            key={auto.name}
            className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  auto.status === "running" && "bg-success animate-pulse",
                  auto.status === "paused" && "bg-warning",
                  auto.status === "idle" && "bg-muted-foreground"
                )} />
                <span className="text-sm font-medium text-foreground">{auto.name}</span>
              </div>
              <button className={cn(
                "p-1.5 rounded-lg transition-colors",
                auto.status === "running" ? "hover:bg-warning/20" : "hover:bg-success/20"
              )}>
                {auto.status === "running" ? (
                  <Pause className="w-3.5 h-3.5 text-warning" />
                ) : (
                  <Play className="w-3.5 h-3.5 text-success" />
                )}
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <CheckCircle2 className="w-3 h-3" />
                <span>Last: {auto.lastRun}</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>Next: {auto.nextRun}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick stats */}
      <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-xl font-heading font-bold text-foreground">47</p>
          <p className="text-xs text-muted-foreground">Actions today</p>
        </div>
        <div>
          <p className="text-xl font-heading font-bold text-success">89%</p>
          <p className="text-xs text-muted-foreground">Success rate</p>
        </div>
        <div>
          <p className="text-xl font-heading font-bold text-primary">12h</p>
          <p className="text-xs text-muted-foreground">Time saved</p>
        </div>
      </div>
    </div>
  );
}
