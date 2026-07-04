import { useState, useRef } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import {
  Upload, Sparkles, Download, CheckCircle2, AlertTriangle, TrendingUp,
  Target, Zap, RotateCcw, Eye, FileText, Briefcase, Clock, XCircle, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useApplications, type Status } from "@/hooks/useApplications";
import { useNavigate } from "react-router-dom";

type AnalysisResult = {
  candidate: { name: string; title: string; yearsExperience?: number; topSkills: string[] };
  atsScore: number;
  atsBreakdown: { keywords: number; impact: number; skillsMatch: number; formatting: number };
  suggestions: string[];
  matchedJobs: Array<{
    company: string; role: string; location?: string; matchScore: number;
    salary?: string; status: "applied" | "queued" | "skipped"; reason: string;
  }>;
  summary: string;
};

const SAMPLE_RESUME = `Jane Smith — Senior Full-Stack Engineer
jane.smith@email.com | San Francisco, CA | 6 years experience

SUMMARY
Full-stack engineer specializing in React, TypeScript, Node.js, and cloud-native architectures.
Led migration of monolith to microservices serving 5M+ users, reducing p95 latency by 45%.

EXPERIENCE
Senior Engineer — Acme Cloud (2022-Present)
- Built real-time analytics pipeline (Kafka, ClickHouse) processing 2B events/day
- Mentored 4 engineers, drove sprint velocity up 30%
- Owned design system used across 12 product teams

Software Engineer — DataFlow Inc (2019-2022)
- Developed React/Next.js dashboards with 99.9% uptime
- Reduced AWS bill by $400K/year via infrastructure optimization

SKILLS
React, TypeScript, Node.js, Python, PostgreSQL, AWS, Docker, Kubernetes, GraphQL, Redis

EDUCATION
B.S. Computer Science, UC Berkeley`;

const statusStyles = {
  applied: { icon: CheckCircle2, color: "text-success", bg: "bg-success/10 border-success/30", label: "Applied" },
  queued: { icon: Clock, color: "text-warning", bg: "bg-warning/10 border-warning/30", label: "Queued" },
  skipped: { icon: XCircle, color: "text-muted-foreground", bg: "bg-card/30 border-border/50", label: "Skipped" },
};

const ResumeLab = () => {
  const [resumeText, setResumeText] = useState("");
  const [fileName, setFileName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const { add: addApplication } = useApplications();
  const navigate = useNavigate();

  const handleFile = async (file: File) => {
    setFileName(file.name);
    const text = await file.text();
    setResumeText(text);
    toast({ title: "Resume loaded", description: `${file.name} ready to process.` });
  };

  const runAutoApply = async () => {
    const text = resumeText.trim() || SAMPLE_RESUME;
    if (!text) {
      toast({ title: "Add a resume", description: "Upload a file or paste text first.", variant: "destructive" });
      return;
    }
    setIsProcessing(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("resume-auto-apply", {
        body: { resumeText: text, fileName: fileName || "resume.txt" },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      const analysis = data as AnalysisResult;
      setResult(analysis);
      const statusMap: Record<AnalysisResult["matchedJobs"][number]["status"], Status> = {
        applied: "applied", queued: "saved", skipped: "rejected",
      };
      analysis.matchedJobs.forEach((j) => {
        addApplication({
          company: j.company,
          role: j.role,
          match: Math.round(j.matchScore),
          status: statusMap[j.status],
          location: j.location,
          salary: j.salary,
          notes: j.reason,
          next: j.status === "applied" ? "Auto-applied via ResumeLab" : undefined,
        });
      });
      const applied = analysis.matchedJobs.filter(j => j.status === "applied").length;
      toast({
        title: "Auto-apply complete",
        description: `Applied to ${applied} jobs · ${analysis.matchedJobs.length} added to pipeline.`,
        action: (
          <button onClick={() => navigate("/applications")} className="text-xs font-medium text-primary hover:underline">
            View board
          </button>
        ) as any,
      });
    } catch (e: any) {
      toast({ title: "Processing failed", description: e.message || "Try again.", variant: "destructive" });
    } finally {
      setIsProcessing(false);
    }
  };

  const loadSample = () => {
    setResumeText(SAMPLE_RESUME);
    setFileName("sample-resume.txt");
    toast({ title: "Sample loaded", description: "Click Auto-Apply to process." });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Resume Lab</h1>
            <p className="text-muted-foreground">Upload a resume — AI scores it and auto-applies to matched jobs.</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <input
              ref={fileInput} type="file" accept=".txt,.md,.json,.pdf,.doc,.docx"
              className="hidden"
              onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
            <Button variant="outline" onClick={() => fileInput.current?.click()} className="gap-2">
              <Upload className="w-4 h-4" /> Upload Resume
            </Button>
            <Button variant="outline" onClick={loadSample} className="gap-2">
              <FileText className="w-4 h-4" /> Try Sample
            </Button>
            <Button onClick={runAutoApply} disabled={isProcessing} className="gap-2 glow-primary">
              {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
              {isProcessing ? "Processing..." : "Auto-Apply"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading font-semibold text-foreground flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Resume Content
                </h3>
                {fileName && <span className="text-xs text-muted-foreground">{fileName}</span>}
              </div>
              <textarea
                value={resumeText}
                onChange={e => setResumeText(e.target.value)}
                placeholder="Paste your resume here or upload a file above..."
                className="w-full h-64 p-4 rounded-lg bg-card/50 border border-border/50 text-sm text-foreground font-mono resize-none focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            {isProcessing && (
              <div className="glass-card p-8 flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-foreground font-medium">AI agents are processing your resume…</p>
                <p className="text-xs text-muted-foreground">Parsing → ATS scoring → Job matching → Auto-applying</p>
              </div>
            )}

            {result && (
              <>
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-success/20 to-success/5 flex items-center justify-center">
                        <span className="text-3xl font-bold text-success">{result.atsScore}</span>
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-xl text-foreground">{result.candidate.name}</h3>
                        <p className="text-muted-foreground">{result.candidate.title}</p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {result.candidate.topSkills.slice(0, 6).map(s => (
                            <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-primary/15 text-primary">{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {([
                      ["Keywords", result.atsBreakdown.keywords],
                      ["Impact", result.atsBreakdown.impact],
                      ["Skills Match", result.atsBreakdown.skillsMatch],
                      ["Formatting", result.atsBreakdown.formatting],
                    ] as const).map(([label, score]) => (
                      <div key={label} className="p-4 rounded-xl bg-card/50 border border-border/50">
                        <div className="text-sm text-muted-foreground mb-1">{label}</div>
                        <div className="text-2xl font-bold text-foreground mb-2">{score}%</div>
                        <Progress value={score} className="h-1.5" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading font-semibold text-foreground flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-primary" /> Auto-Apply Pipeline
                    </h3>
                    <span className="text-sm text-muted-foreground">
                      {result.matchedJobs.filter(j => j.status === "applied").length} applied · {result.matchedJobs.filter(j => j.status === "queued").length} queued
                    </span>
                  </div>
                  <div className="space-y-3">
                    {result.matchedJobs.map((job, i) => {
                      const s = statusStyles[job.status];
                      const Icon = s.icon;
                      return (
                        <div key={i} className={`p-4 rounded-xl border ${s.bg}`}>
                          <div className="flex items-start justify-between gap-4 flex-wrap">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-foreground">{job.role}</span>
                                <span className="text-muted-foreground">·</span>
                                <span className="text-foreground">{job.company}</span>
                              </div>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                                {job.location && <span>{job.location}</span>}
                                {job.salary && <span>· {job.salary}</span>}
                              </div>
                              <p className="text-sm text-muted-foreground">{job.reason}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <div className="text-xs text-muted-foreground">Match</div>
                                <div className="text-xl font-bold text-foreground">{job.matchScore}%</div>
                              </div>
                              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${s.color}`}>
                                <Icon className="w-4 h-4" />
                                <span className="text-sm font-medium">{s.label}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="glass-card p-6">
              <h3 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" /> How it works
              </h3>
              <ol className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3"><span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0">1</span><span>Upload resume (.txt, .md) or try the sample.</span></li>
                <li className="flex gap-3"><span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0">2</span><span>Resume Agent parses + scores ATS compatibility.</span></li>
                <li className="flex gap-3"><span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0">3</span><span>Matching Agent finds best-fit roles.</span></li>
                <li className="flex gap-3"><span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0">4</span><span>Apply Agent auto-applies to ≥80% matches.</span></li>
              </ol>
            </div>

            {result && (
              <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-primary" />
                  <h3 className="font-heading font-semibold text-foreground">AI Suggestions</h3>
                </div>
                <div className="space-y-2">
                  {result.suggestions.map((s, i) => (
                    <div key={i} className="p-3 rounded-lg border border-primary/20 bg-primary/5 text-sm text-foreground flex gap-2">
                      <TrendingUp className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result && (
              <div className="glass-card p-6">
                <h3 className="font-heading font-semibold text-foreground mb-2">Summary</h3>
                <p className="text-sm text-muted-foreground">{result.summary}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ResumeLab;
