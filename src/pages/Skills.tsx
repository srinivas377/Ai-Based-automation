import { MainLayout } from "@/components/layout/MainLayout";
import {
  Brain, AlertTriangle, TrendingUp, Award, ExternalLink, Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const skills = [
  { name: "React", level: 92, demand: 95, category: "Frontend" },
  { name: "TypeScript", level: 88, demand: 92, category: "Languages" },
  { name: "Node.js", level: 75, demand: 85, category: "Backend" },
  { name: "Python", level: 70, demand: 88, category: "Languages" },
  { name: "AWS", level: 55, demand: 90, category: "Cloud" },
  { name: "Docker", level: 60, demand: 82, category: "DevOps" },
  { name: "System Design", level: 65, demand: 90, category: "Architecture" },
  { name: "PostgreSQL", level: 72, demand: 80, category: "Database" },
];

const gaps = [
  { skill: "Kubernetes", priority: "high", reason: "Required by 73% of target senior roles", impact: "+18% match score" },
  { skill: "GraphQL", priority: "medium", reason: "Growing 24% YoY in postings", impact: "+9% match score" },
  { skill: "Rust", priority: "low", reason: "Emerging in systems programming", impact: "+4% match score" },
];

const certs = [
  { name: "AWS Solutions Architect", issuer: "Amazon", year: "2023", verified: true },
  { name: "Professional Scrum Master", issuer: "Scrum.org", year: "2022", verified: true },
  { name: "Google Cloud Professional", issuer: "Google", year: "2023", verified: true },
  { name: "Kubernetes Administrator", issuer: "CNCF", year: "2024", verified: false },
];

const Skills = () => {
  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground mb-2 tracking-tight">
              Skills Intelligence
            </h1>
            <p className="text-muted-foreground">Real-time view of your skills versus market demand</p>
          </div>
          <button className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all glow-primary flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Re-analyze with AI
          </button>
        </div>

        {/* Skill cards */}
        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" /> Your Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((s) => (
              <div key={s.name} className="glass-card rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-medium text-foreground">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.category}</p>
                  </div>
                  <span className="text-sm font-semibold text-foreground">{s.level}%</span>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                      <span>You</span><span>{s.level}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={cn("h-full rounded-full",
                          s.level >= 80 ? "bg-success" : s.level >= 60 ? "bg-primary" : "bg-warning"
                        )}
                        style={{ width: `${s.level}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                      <span>Market demand</span><span>{s.demand}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-agent-matching/60 rounded-full" style={{ width: `${s.demand}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Two columns: gaps + market */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" /> Skill Gap Analysis
            </h3>
            <div className="space-y-3">
              {gaps.map((g) => (
                <div key={g.skill} className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={cn("w-2 h-2 rounded-full",
                        g.priority === "high" && "bg-destructive",
                        g.priority === "medium" && "bg-warning",
                        g.priority === "low" && "bg-muted-foreground"
                      )} />
                      <p className="font-medium text-foreground">{g.skill}</p>
                    </div>
                    <span className="text-xs text-success">{g.impact}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{g.reason}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-agent-market" /> Market Demand Insights
            </h3>
            <div className="space-y-3">
              {[
                { label: "Cloud & DevOps", growth: "+34%", note: "AWS/K8s leading hiring" },
                { label: "AI / ML Engineering", growth: "+58%", note: "Highest premium roles" },
                { label: "TypeScript stacks", growth: "+22%", note: "React/Next dominant" },
                { label: "Distributed Systems", growth: "+19%", note: "Senior+ openings" },
              ].map((m) => (
                <div key={m.label} className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                  <div>
                    <p className="font-medium text-foreground">{m.label}</p>
                    <p className="text-xs text-muted-foreground">{m.note}</p>
                  </div>
                  <span className="text-sm font-semibold text-success">{m.growth}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-accent" /> Certifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {certs.map((c) => (
              <div key={c.name} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <Award className="w-4 h-4 text-accent" />
                  <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm font-medium text-foreground">{c.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{c.issuer} · {c.year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Skills;
