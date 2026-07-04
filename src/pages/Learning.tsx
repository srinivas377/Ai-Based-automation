import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { 
  GraduationCap, 
  BookOpen, 
  Clock, 
  Trophy,
  Play,
  CheckCircle2,
  Lock,
  TrendingUp,
  Target,
  Sparkles,
  ChevronRight,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const learningPaths = [
  {
    id: 1,
    title: "Cloud Architecture Mastery",
    description: "Essential for senior roles - identified as top skill gap",
    progress: 45,
    modules: 12,
    completed: 5,
    estimatedHours: 24,
    priority: "high",
    skills: ["AWS", "Azure", "System Design"],
  },
  {
    id: 2,
    title: "Leadership & Management",
    description: "Prepare for tech lead positions",
    progress: 30,
    modules: 8,
    completed: 2,
    estimatedHours: 16,
    priority: "medium",
    skills: ["Team Management", "Agile", "Communication"],
  },
  {
    id: 3,
    title: "Advanced TypeScript",
    description: "Deepen your TypeScript expertise",
    progress: 75,
    modules: 10,
    completed: 7,
    estimatedHours: 20,
    priority: "low",
    skills: ["TypeScript", "Design Patterns", "Testing"],
  },
];

const currentModule = {
  title: "Designing Microservices Architecture",
  path: "Cloud Architecture Mastery",
  duration: "45 min",
  progress: 60,
  lessons: [
    { title: "Introduction to Microservices", completed: true },
    { title: "Service Communication Patterns", completed: true },
    { title: "Data Management Strategies", completed: false, current: true },
    { title: "Deployment & Scaling", completed: false },
    { title: "Monitoring & Observability", completed: false },
  ],
};

const achievements = [
  { icon: Trophy, title: "Quick Learner", description: "Complete 5 modules in a week", earned: true },
  { icon: Star, title: "Skill Master", description: "Reach 90% in any skill", earned: true },
  { icon: Target, title: "Goal Setter", description: "Complete your first path", earned: false },
];

const recommendedCourses = [
  { title: "Kubernetes Deep Dive", platform: "Udemy", rating: 4.8, price: "Free", match: 95 },
  { title: "System Design Interview", platform: "Coursera", rating: 4.9, price: "$49", match: 92 },
  { title: "AWS Solutions Architect", platform: "AWS", rating: 4.7, price: "Free", match: 88 },
];

const Learning = () => {
  const [selectedPath, setSelectedPath] = useState(1);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
              Learning Path
            </h1>
            <p className="text-muted-foreground">
              AI-curated learning journey based on your skill gaps and career goals
            </p>
          </div>
          <Button className="gap-2 glow-primary">
            <Sparkles className="w-4 h-4" />
            Generate New Path
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Hours Learned", value: "47", icon: Clock, change: "+12 this week" },
            { label: "Modules Completed", value: "14", icon: BookOpen, change: "+3 this week" },
            { label: "Skills Improved", value: "8", icon: TrendingUp, change: "+2 new" },
            { label: "Achievements", value: "5", icon: Trophy, change: "2 in progress" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-4">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="w-5 h-5 text-primary" />
                <span className="text-xs text-success">{stat.change}</span>
              </div>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Learning Paths */}
          <div className="col-span-8 space-y-6">
            {/* Current Module */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs text-primary font-medium">{currentModule.path}</span>
                  <h3 className="font-heading font-semibold text-xl text-foreground mt-1">
                    {currentModule.title}
                  </h3>
                </div>
                <Button className="gap-2">
                  <Play className="w-4 h-4" />
                  Continue Learning
                </Button>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Module Progress</span>
                  <span className="text-sm font-medium text-foreground">{currentModule.progress}%</span>
                </div>
                <Progress value={currentModule.progress} className="h-2" />
              </div>

              <div className="grid grid-cols-5 gap-2">
                {currentModule.lessons.map((lesson, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border text-center ${
                      lesson.completed
                        ? "border-success/30 bg-success/10"
                        : lesson.current
                        ? "border-primary bg-primary/10"
                        : "border-border/50 bg-card/30"
                    }`}
                  >
                    {lesson.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-success mx-auto mb-1" />
                    ) : lesson.current ? (
                      <Play className="w-5 h-5 text-primary mx-auto mb-1" />
                    ) : (
                      <Lock className="w-5 h-5 text-muted-foreground mx-auto mb-1" />
                    )}
                    <span className="text-xs text-muted-foreground line-clamp-2">{lesson.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Paths List */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-semibold text-foreground">Your Learning Paths</h3>
                <span className="text-sm text-muted-foreground">3 active paths</span>
              </div>

              <div className="space-y-4">
                {learningPaths.map((path) => (
                  <button
                    key={path.id}
                    onClick={() => setSelectedPath(path.id)}
                    className={`w-full p-4 rounded-xl border transition-all text-left ${
                      selectedPath === path.id
                        ? "border-primary bg-primary/10"
                        : "border-border/50 bg-card/30 hover:bg-card/50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-foreground">{path.title}</h4>
                          {path.priority === "high" && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-destructive/20 text-destructive">
                              Priority
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{path.description}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>

                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-xs text-muted-foreground">
                        {path.completed}/{path.modules} modules
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ~{path.estimatedHours}h remaining
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <Progress value={path.progress} className="h-1.5 flex-1" />
                      <span className="text-sm font-medium text-foreground">{path.progress}%</span>
                    </div>

                    <div className="flex gap-2">
                      {path.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs px-2 py-1 rounded-full bg-card border border-border/50 text-muted-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-4 space-y-6">
            {/* AI Recommendations */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="font-heading font-semibold text-foreground">AI Recommendations</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Courses matched to your skill gaps
              </p>
              <div className="space-y-3">
                {recommendedCourses.map((course, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg border border-border/50 bg-card/30 hover:bg-card/50 transition-all"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm text-foreground">{course.title}</span>
                      <span className="text-xs text-success">{course.match}% match</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{course.platform}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-warning flex items-center gap-1">
                          <Star className="w-3 h-3 fill-warning" />
                          {course.rating}
                        </span>
                        <span className={`text-xs ${course.price === "Free" ? "text-success" : "text-muted-foreground"}`}>
                          {course.price}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Recommendations
              </Button>
            </div>

            {/* Achievements */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-warning" />
                <h3 className="font-heading font-semibold text-foreground">Achievements</h3>
              </div>
              <div className="space-y-3">
                {achievements.map((achievement, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border flex items-center gap-3 ${
                      achievement.earned
                        ? "border-warning/30 bg-warning/10"
                        : "border-border/50 bg-card/30 opacity-60"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      achievement.earned ? "bg-warning/20" : "bg-muted"
                    }`}>
                      <achievement.icon className={`w-5 h-5 ${
                        achievement.earned ? "text-warning" : "text-muted-foreground"
                      }`} />
                    </div>
                    <div>
                      <span className="font-medium text-sm text-foreground">{achievement.title}</span>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                    {achievement.earned && (
                      <CheckCircle2 className="w-5 h-5 text-success ml-auto" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Goal */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-agent-matching" />
                <h3 className="font-heading font-semibold text-foreground">Weekly Goal</h3>
              </div>
              <div className="text-center py-4">
                <div className="text-4xl font-bold text-foreground mb-1">12h</div>
                <div className="text-sm text-muted-foreground mb-4">Target: 15 hours</div>
                <Progress value={80} className="h-2 mb-2" />
                <span className="text-xs text-muted-foreground">3 hours to go!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Learning;
