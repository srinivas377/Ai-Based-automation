import { TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const skills = [
  { name: "React", level: 92, trend: "up", category: "Frontend" },
  { name: "TypeScript", level: 88, trend: "up", category: "Languages" },
  { name: "Node.js", level: 75, trend: "stable", category: "Backend" },
  { name: "Python", level: 70, trend: "up", category: "Languages" },
  { name: "AWS", level: 55, trend: "up", category: "Cloud" },
  { name: "Docker", level: 60, trend: "stable", category: "DevOps" },
  { name: "Machine Learning", level: 45, trend: "up", category: "AI/ML" },
  { name: "System Design", level: 65, trend: "up", category: "Architecture" },
];

const skillGaps = [
  { skill: "Kubernetes", priority: "high", reason: "Required by 73% of target jobs" },
  { skill: "GraphQL", priority: "medium", reason: "Growing demand in market" },
  { skill: "Rust", priority: "low", reason: "Emerging in systems programming" },
];

export function SkillRadar() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-semibold text-lg text-foreground">
          Skill Intelligence
        </h3>
        <span className="text-xs text-muted-foreground">Updated 2h ago</span>
      </div>

      {/* Skills grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">{skill.name}</span>
              {skill.trend === "up" && (
                <TrendingUp className="w-3 h-3 text-success" />
              )}
            </div>
            <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className={cn(
                  "absolute left-0 top-0 h-full rounded-full transition-all duration-500",
                  skill.level >= 80 && "bg-success progress-glow",
                  skill.level >= 60 && skill.level < 80 && "bg-primary",
                  skill.level < 60 && "bg-warning"
                )}
                style={{ width: `${skill.level}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-muted-foreground">{skill.category}</span>
              <span className="text-xs font-medium text-muted-foreground">{skill.level}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Skill gaps */}
      <div className="border-t border-white/10 pt-4">
        <p className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-warning" />
          Skill Gaps Detected
        </p>
        <div className="space-y-2">
          {skillGaps.map((gap) => (
            <div
              key={gap.skill}
              className="flex items-center justify-between p-2 rounded-lg bg-white/5"
            >
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  gap.priority === "high" && "bg-destructive",
                  gap.priority === "medium" && "bg-warning",
                  gap.priority === "low" && "bg-muted-foreground"
                )} />
                <span className="text-sm text-foreground">{gap.skill}</span>
              </div>
              <span className="text-xs text-muted-foreground">{gap.reason}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
