import { MainLayout } from "@/components/layout/MainLayout";
import {
  Workflow, Zap, FileText, Brain, RefreshCw, Power, Activity,
  CheckCircle2, Clock, AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const flows = [
  {
    id: "auto-apply",
    name: "Job Auto-Apply",
    description: "Automatically apply to jobs matching 85%+ with tailored resume and cover letter",
    icon: Zap,
    color: "text-agent-auto",
    enabled: true,
    runs: 47,
    success: 92,
  },
  {
    id: "resume-opt",
    name: "Resume Optimization",
    description: "Continuously optimize resume per job posting using ATS keyword analysis",
    icon: FileText,
    color: "text-agent-resume",
    enabled: true,
    runs: 23,
    success: 96,
  },
  {
    id: "skill-gap",
    name: "Skill Gap Automation",
    description: "Detect missing skills weekly and queue learning modules automatically",
    icon: Brain,
    color: "text-agent-skill",
    enabled: true,
    runs: 12,
    success: 100,
  },
  {
    id: "rejection-loop",
    name: "Rejection Feedback Loop",
    description: "Parse rejection emails and feed insights back into resume + matching agents",
    icon: RefreshCw,
    color: "text-agent-feedback",
    enabled: false,
    runs: 5,
    success: 88,
  },
];

const logs = [
  { time: "2 min ago", flow: "Auto-Apply", message: "Applied to Senior SWE at Linear", status: "success" },
  { time: "14 min ago", flow: "Resume Optimization", message: "Updated resume for ML roles", status: "success" },
  { time: "1 hr ago", flow: "Skill Gap", message: "Detected Kubernetes gap — queued course", status: "success" },
  { time: "3 hr ago", flow: "Auto-Apply", message: "Skipped role: salary mismatch", status: "warning" },
  { time: "Yesterday", flow: "Rejection Loop", message: "Could not parse email format", status: "error" },
  { time: "Yesterday", flow: "Auto-Apply", message: "Applied to 4 positions in batch", status: "success" },
];

const Automation = () => {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(flows.map((f) => [f.id, f.enabled]))
  );

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground mb-2 tracking-tight flex items-center gap-3">
              <Workflow className="w-7 h-7 text-primary" /> Automation Engine
            </h1>
            <p className="text-muted-foreground">Closed-loop workflows orchestrating your agents</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-xl bg-success/10 border border-success/20 text-sm text-success flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              3 of 4 flows active
            </div>
          </div>
        </div>

        {/* Flow cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {flows.map((f) => (
            <div key={f.id} className="glass-card rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={cn("w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center", f.color)}>
                    <f.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-foreground">{f.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {enabled[f.id] ? "Active" : "Paused"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setEnabled((e) => ({ ...e, [f.id]: !e[f.id] }))}
                  className={cn(
                    "relative w-11 h-6 rounded-full transition-colors",
                    enabled[f.id] ? "bg-primary" : "bg-white/10"
                  )}
                >
                  <span className={cn(
                    "absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform",
                    enabled[f.id] ? "translate-x-5" : "translate-x-0.5"
                  )} />
                </button>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{f.description}</p>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                <div>
                  <p className="text-xs text-muted-foreground">Runs this week</p>
                  <p className="text-xl font-heading font-bold text-foreground mt-0.5">{f.runs}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Success rate</p>
                  <p className="text-xl font-heading font-bold text-success mt-0.5">{f.success}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* History logs */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-heading font-semibold text-foreground flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" /> Automation History
            </h3>
            <button className="text-sm text-muted-foreground hover:text-foreground">Export</button>
          </div>
          <div className="space-y-2">
            {logs.map((l, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  l.status === "success" && "bg-success/10 text-success",
                  l.status === "warning" && "bg-warning/10 text-warning",
                  l.status === "error" && "bg-destructive/10 text-destructive",
                )}>
                  {l.status === "success" && <CheckCircle2 className="w-4 h-4" />}
                  {l.status === "warning" && <Clock className="w-4 h-4" />}
                  {l.status === "error" && <AlertCircle className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground truncate">{l.message}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{l.flow} · {l.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Automation;
