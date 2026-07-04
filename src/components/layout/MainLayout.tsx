import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { TopHeader } from "./TopHeader";
import { NetworkBackground } from "./NetworkBackground";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <NetworkBackground />
      <Sidebar />
      <div className="pl-64 transition-all duration-300">
        <TopHeader />
        <main>
          <div className="px-8 py-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
