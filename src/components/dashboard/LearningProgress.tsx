import { BookOpen, Clock, Trophy, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const currentCourses = [
  {
    title: "Advanced Kubernetes",
    provider: "Udemy",
    progress: 67,
    estimatedCompletion: "3 days",
    priority: "high",
  },
  {
    title: "System Design Interview",
    provider: "Educative",
    progress: 45,
    estimatedCompletion: "1 week",
    priority: "high",
  },
  {
    title: "GraphQL Fundamentals",
    provider: "Apollo",
    progress: 20,
    estimatedCompletion: "2 weeks",
    priority: "medium",
  },
];

const recommendedNext = [
  { title: "Machine Learning Engineering", reason: "Matches 78% of target roles" },
  { title: "Cloud Architecture", reason: "High demand skill gap" },
];

export function LearningProgress() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-semibold text-lg text-foreground">
          Learning Roadmap
        </h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>12h this week</span>
        </div>
      </div>

      {/* Current courses */}
      <div className="space-y-4 mb-6">
        {currentCourses.map((course) => (
          <div
            key={course.title}
            className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {course.title}
                </p>
                <p className="text-xs text-muted-foreground">{course.provider}</p>
              </div>
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-full",
                course.priority === "high" && "bg-destructive/20 text-destructive",
                course.priority === "medium" && "bg-warning/20 text-warning"
              )}>
                {course.priority}
              </span>
            </div>
            <div className="relative h-2 bg-white/10 rounded-full overflow-hidden mb-2">
              <div
                className="absolute left-0 top-0 h-full bg-primary rounded-full transition-all duration-500 progress-glow"
                style={{ width: `${course.progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{course.progress}% complete</span>
              <span>~{course.estimatedCompletion}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recommended */}
      <div className="border-t border-white/10 pt-4">
        <p className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-accent" />
          Recommended Next
        </p>
        {recommendedNext.map((course) => (
          <div
            key={course.title}
            className="flex items-center justify-between p-3 rounded-lg bg-white/5 mb-2 hover:bg-white/10 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              <div>
                <p className="text-sm text-foreground group-hover:text-primary transition-colors">
                  {course.title}
                </p>
                <p className="text-xs text-muted-foreground">{course.reason}</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
}
