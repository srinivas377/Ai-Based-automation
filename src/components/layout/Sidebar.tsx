import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  FileText,
  Briefcase,
  GraduationCap,
  MessageSquare,
  TrendingUp,
  Settings,
  Bot,
  Zap,
  Brain,
  Workflow,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: User, label: "Profile", path: "/profile" },
  { icon: FileText, label: "Resume Lab", path: "/resume" },
  { icon: Briefcase, label: "Applications", path: "/applications" },
  { icon: Brain, label: "Skills Intelligence", path: "/skills" },
  { icon: GraduationCap, label: "Learning Path", path: "/learning" },
  { icon: Workflow, label: "Automation Engine", path: "/automation" },
  { icon: MessageSquare, label: "AI Mentor", path: "/mentor" },
  { icon: TrendingUp, label: "Analytics", path: "/analytics" },
  { icon: Bot, label: "Agents", path: "/agents" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out",
        "bg-sidebar border-r border-sidebar-border",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-primary/25 flex items-center justify-center glow-primary">
              <Zap className="w-5 h-5 text-primary animate-pulse" />
            </div>
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-success rounded-full animate-pulse" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-heading font-bold text-sm text-foreground leading-tight tracking-tight uppercase">
                Ai based automation
              </span>
              <span className="text-[9px] text-muted-foreground/80 tracking-widest leading-tight uppercase font-medium">
                Next-Gen AI Platform
              </span>
            </div>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-sidebar-accent transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 p-3 mt-2 overflow-y-auto scrollbar-thin h-[calc(100vh-9rem)]">
        {!collapsed && (
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60 px-3 mb-2 mt-1 font-semibold">
            Workspace Modules
          </p>
        )}
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-350 relative",
                "hover:bg-sidebar-accent/65 hover:translate-x-1 active:scale-[0.98] group",
                isActive && "bg-primary/10 border border-primary/25 shadow-[0_0_15px_-3px_rgba(186,100,50,0.15)]"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-r-full bg-primary glow-primary" />
              )}
              <item.icon
                className={cn(
                  "w-[18px] h-[18px] transition-transform duration-300 shrink-0 group-hover:scale-110",
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )}
              />
              {!collapsed && (
                <span
                  className={cn(
                    "text-sm font-medium transition-colors duration-300",
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  )}
                >
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Settings at bottom */}
      <div className="absolute bottom-4 left-0 right-0 px-3">
        <Link
          to="/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
            "hover:bg-sidebar-accent group",
            location.pathname === "/settings" && "bg-primary/10 text-primary"
          )}
        >
          <Settings className="w-[18px] h-[18px] text-muted-foreground group-hover:text-foreground" />
          {!collapsed && (
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">
              Settings
            </span>
          )}
        </Link>
      </div>
    </aside>
  );
}
