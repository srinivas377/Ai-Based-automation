import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { 
  Search, 
  Filter, 
  MapPin, 
  DollarSign, 
  Clock, 
  Building2,
  Bookmark,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Send,
  MoreVertical,
  Sparkles,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";

const jobs = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "TechCorp AI",
    location: "San Francisco, CA",
    salary: "$150k - $180k",
    type: "Full-time",
    remote: "Remote",
    posted: "2 days ago",
    matchScore: 94,
    skills: ["React", "TypeScript", "Node.js", "AWS"],
    status: "interview",
    logo: "T",
    description: "We're looking for a senior engineer to lead our frontend team...",
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "DataFlow Inc",
    location: "New York, NY",
    salary: "$130k - $160k",
    type: "Full-time",
    remote: "Hybrid",
    posted: "4 days ago",
    matchScore: 87,
    skills: ["React", "Python", "PostgreSQL", "Docker"],
    status: "screening",
    logo: "D",
    description: "Join our growing team to build data-driven applications...",
  },
  {
    id: 3,
    title: "Backend Engineer",
    company: "CloudScale",
    location: "Seattle, WA",
    salary: "$140k - $170k",
    type: "Full-time",
    remote: "On-site",
    posted: "1 day ago",
    matchScore: 91,
    skills: ["Node.js", "Kubernetes", "PostgreSQL", "Redis"],
    status: "applied",
    logo: "C",
    description: "Help us scale our cloud infrastructure to millions of users...",
  },
  {
    id: 4,
    title: "ML Engineer",
    company: "AI Startup",
    location: "Boston, MA",
    salary: "$160k - $200k",
    type: "Full-time",
    remote: "Remote",
    posted: "1 week ago",
    matchScore: 76,
    skills: ["Python", "TensorFlow", "AWS", "Docker"],
    status: "saved",
    logo: "A",
    description: "Build next-generation AI models for enterprise clients...",
  },
];

const statusColors = {
  interview: { bg: "bg-warning/20", text: "text-warning", label: "Interview" },
  screening: { bg: "bg-agent-market/20", text: "text-agent-market", label: "Screening" },
  applied: { bg: "bg-agent-auto/20", text: "text-agent-auto", label: "Applied" },
  saved: { bg: "bg-white/10", text: "text-muted-foreground", label: "Saved" },
  offer: { bg: "bg-success/20", text: "text-success", label: "Offer" },
  rejected: { bg: "bg-destructive/20", text: "text-destructive", label: "Rejected" },
};

const Jobs = () => {
  const [activeTab, setActiveTab] = useState<"all" | "applied" | "saved">("all");
  const [selectedJob, setSelectedJob] = useState(jobs[0]);

  return (
    <MainLayout>
      <div className="flex flex-col h-[calc(100vh-6rem)]">
        {/* Header */}
        <div className="flex items-center justify-between pb-6">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground mb-1">Job Tracker</h1>
            <p className="text-muted-foreground">AI-matched opportunities and application status</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all glow-primary">
            <Sparkles className="w-4 h-4" />
            Auto-Apply
          </button>
        </div>

        {/* Tabs & Search */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            {(["all", "applied", "saved"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                  activeTab === tab
                    ? "bg-primary text-primary-foreground"
                    : "bg-white/5 text-muted-foreground hover:bg-white/10"
                )}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search jobs..."
                className="pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
              <Filter className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 grid grid-cols-12 gap-6 overflow-hidden">
          {/* Job List */}
          <div className="col-span-5 overflow-y-auto scrollbar-thin space-y-3 pr-2">
            {jobs.map((job) => (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className={cn(
                  "p-4 rounded-xl cursor-pointer transition-all",
                  selectedJob.id === job.id
                    ? "glass-card ring-2 ring-primary/50"
                    : "bg-white/5 hover:bg-white/10"
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center font-heading font-bold text-primary text-lg">
                      {job.logo}
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{job.title}</h3>
                      <p className="text-sm text-muted-foreground">{job.company}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-primary font-medium">
                      <TrendingUp className="w-3 h-3" />
                      {job.matchScore}%
                    </div>
                    <span className="text-xs text-muted-foreground">match</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    {job.salary}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {job.skills.slice(0, 3).map((skill) => (
                      <span key={skill} className="px-2 py-0.5 rounded-md bg-white/10 text-xs text-muted-foreground">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <span className={cn(
                    "text-xs px-2 py-1 rounded-full",
                    statusColors[job.status as keyof typeof statusColors].bg,
                    statusColors[job.status as keyof typeof statusColors].text
                  )}>
                    {statusColors[job.status as keyof typeof statusColors].label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Job Detail */}
          <div className="col-span-7 glass-card p-6 overflow-y-auto scrollbar-thin">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center font-heading font-bold text-primary text-2xl">
                  {selectedJob.logo}
                </div>
                <div>
                  <h2 className="font-heading text-xl font-bold text-foreground">{selectedJob.title}</h2>
                  <p className="text-muted-foreground">{selectedJob.company}</p>
                  <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {selectedJob.location}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white/10">
                      {selectedJob.remote}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <Bookmark className="w-5 h-5 text-muted-foreground" />
                </button>
                <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <ExternalLink className="w-5 h-5 text-muted-foreground" />
                </button>
                <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <MoreVertical className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Match Score */}
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">AI Match Score</span>
                <span className="text-2xl font-heading font-bold text-primary">{selectedJob.matchScore}%</span>
              </div>
              <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-primary rounded-full progress-glow"
                  style={{ width: `${selectedJob.matchScore}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Based on your skills, experience, and preferences
              </p>
            </div>

            {/* Job Details Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-white/5">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm">Salary Range</span>
                </div>
                <p className="font-medium text-foreground">{selectedJob.salary}</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Building2 className="w-4 h-4" />
                  <span className="text-sm">Job Type</span>
                </div>
                <p className="font-medium text-foreground">{selectedJob.type}</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Location</span>
                </div>
                <p className="font-medium text-foreground">{selectedJob.remote}</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Posted</span>
                </div>
                <p className="font-medium text-foreground">{selectedJob.posted}</p>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {selectedJob.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 rounded-lg bg-white/10 text-sm text-foreground">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Description</h3>
              <p className="text-sm text-foreground leading-relaxed">{selectedJob.description}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all glow-primary">
                <Send className="w-4 h-4" />
                Apply Now
              </button>
              <button className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-foreground font-medium transition-colors">
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Jobs;
