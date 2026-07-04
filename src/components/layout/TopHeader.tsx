import { Search, Bell, Command } from "lucide-react";
import { Link } from "react-router-dom";

export function TopHeader() {
  return (
    <header className="sticky top-0 z-30 h-16 backdrop-blur-xl bg-background/70 border-b border-white/5">
      <div className="h-full px-8 flex items-center justify-between max-w-7xl mx-auto">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search jobs, skills, agents..."
            className="w-full pl-10 pr-16 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground flex items-center gap-1 px-1.5 py-0.5 rounded border border-white/10 bg-white/5">
            <Command className="w-3 h-3" /> K
          </kbd>
        </div>

        <div className="flex items-center gap-3 ml-6">
          <button className="relative p-2 rounded-xl hover:bg-white/5 transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary animate-pulse" />
          </button>
          <Link to="/profile" className="flex items-center gap-3 pl-3 border-l border-white/10">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center font-heading font-semibold text-sm text-foreground">
              SY
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-foreground leading-tight">Srinivas Yarru</p>
              <p className="text-xs text-muted-foreground leading-tight">Pro Plan</p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
