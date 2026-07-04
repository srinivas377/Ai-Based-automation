import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import {
  Briefcase,
  Target,
  Sparkles,
  TrendingUp,
  CalendarCheck,
  ArrowUpRight,
  FileText,
  Bot,
  Brain,
  Workflow,
  Building2,
  MapPin,
  Activity,
  CheckCircle2,
  Send,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

const recentActivity = [
  { icon: Send, color: "text-agent-auto", title: "Applied to Senior SWE at TechCorp", time: "12m ago" },
  { icon: CheckCircle2, color: "text-success", title: "Interview scheduled with DataFlow Inc", time: "1h ago" },
  { icon: Sparkles, color: "text-primary", title: "Resume optimized for ML Engineer roles", time: "3h ago" },
  { icon: Brain, color: "text-agent-skill", title: "New skill gap detected: Kubernetes", time: "5h ago" },
  { icon: Bot, color: "text-agent-mentor", title: "Mentor session completed — 12 insights", time: "Yesterday" },
];

const recommendedJobs = [
  { title: "Senior Software Engineer", company: "TechCorp AI", location: "Remote", salary: "$150–180k", match: 94, logo: "T" },
  { title: "Staff Frontend Engineer", company: "Vercel", location: "San Francisco", salary: "$180–220k", match: 91, logo: "V" },
  { title: "Full Stack Developer", company: "Linear", location: "Remote", salary: "$140–170k", match: 88, logo: "L" },
];

const quickActions = [
  { icon: FileText, label: "Optimize Resume", to: "/resume", color: "text-agent-resume" },
  { icon: Briefcase, label: "Find Jobs", to: "/applications", color: "text-agent-apply" },
  { icon: MessageSquare, label: "Ask AI Mentor", to: "/mentor", color: "text-agent-mentor" },
  { icon: Workflow, label: "Run Automation", to: "/automation", color: "text-agent-auto" },
];

const Index = () => {
  return (
    <MainLayout>
      <div className="space-y-10 animate-fade-in-up">
        {/* Welcome Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-primary/10 via-card to-accent/5 p-10 cyber-grid shadow-[inset_0_0_30px_rgba(186,100,50,0.05)]">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-primary/20 blur-3xl pointer-events-none animate-pulse-glow" />
          <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4 animate-float">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                <span className="text-xs text-muted-foreground">12 automation agents active</span>
              </div>
              <h1 className="font-heading text-4xl font-bold text-foreground mb-3 tracking-tight">
                Welcome to <span className="gradient-text">Ai based automation</span>
              </h1>
              <p className="text-muted-foreground max-w-xl">
                Your intelligent career partner is online. Agents are scanning job markets, optimizing resumes, and scheduling interviews autonomously.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/mentor"
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium text-foreground transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <MessageSquare className="w-4 h-4" /> Ask Mentor
              </Link>
              <Link
                to="/automation"
                className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all glow-primary glow-btn-primary flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <Sparkles className="w-4 h-4" /> Run Auto-Apply
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="animation-delay-100">
          <div className="flex items-end justify-between mb-5">
            <div>
              <h2 className="font-heading text-xl font-semibold text-foreground">Quick Stats</h2>
              <p className="text-sm text-muted-foreground">Live signals from your agents</p>
            </div>
            <Link to="/analytics" className="text-sm text-primary hover:underline flex items-center gap-1">
              View analytics <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard title="Match Score" value="87%" change="+3%" changeType="positive" icon={Target} iconColor="text-agent-matching" />
            <StatCard title="Active Applications" value={21} change="+5 this week" changeType="positive" icon={Briefcase} iconColor="text-agent-apply" />
            <StatCard title="Career Readiness" value="92%" change="+7%" changeType="positive" icon={TrendingUp} iconColor="text-success" />
            <StatCard title="Interviews Scheduled" value={4} change="2 this week" changeType="positive" icon={CalendarCheck} iconColor="text-warning" />
          </div>
        </section>

        {/* Activity & Recommended Jobs */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-6 animation-delay-200">
          {/* Activity Feed */}
          <div className="lg:col-span-2 premium-glass-card p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary animate-pulse" />
                <h3 className="font-heading font-semibold text-foreground">Recent Activity</h3>
              </div>
              <span className="text-xs text-muted-foreground">Live</span>
            </div>
            <div className="space-y-1">
              {recentActivity.map((a, i) => (
                <div key={i} className="flex items-start gap-3 p-3 -mx-3 rounded-xl hover:bg-white/5 transition-all hover:translate-x-1 duration-250">
                  <div className={cn("w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0", a.color)}>
                    <a.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground leading-snug">{a.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Jobs */}
          <div className="lg:col-span-3 premium-glass-card p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-heading font-semibold text-foreground">Recommended Jobs</h3>
                <p className="text-xs text-muted-foreground">AI-matched to your profile</p>
              </div>
              <Link to="/applications" className="text-sm text-primary hover:underline flex items-center gap-1">
                See all <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="space-y-3">
              {recommendedJobs.map((job, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all duration-300 group cursor-pointer hover:scale-[1.01] hover:translate-x-1 hover:border-primary/20">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center font-heading font-bold text-primary group-hover:scale-105 transition-transform">
                      {job.logo}
                    </div>
                    <div>
                      <p className="font-medium text-foreground group-hover:text-primary transition-colors">{job.title}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                        <Building2 className="w-3 h-3 animate-pulse" /> {job.company}
                        <span className="opacity-50">·</span>
                        <MapPin className="w-3 h-3" /> {job.location}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">{job.salary}</p>
                    <p className="text-xs text-primary font-medium mt-0.5">{job.match}% match</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="animation-delay-300">
          <div className="flex items-end justify-between mb-5">
            <div>
              <h2 className="font-heading text-xl font-semibold text-foreground">Quick Actions</h2>
              <p className="text-sm text-muted-foreground">Jump back into your workflow</p>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                to={action.to}
                className="premium-glass-card rounded-2xl p-5 group hover:border-primary/30 active:scale-[0.98] transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={cn("w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center transition-transform group-hover:scale-110 duration-300", action.color)}>
                    <action.icon className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-350" />
                </div>
                <p className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">{action.label}</p>
                <p className="text-xs text-muted-foreground mt-1">Open module</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Index;
