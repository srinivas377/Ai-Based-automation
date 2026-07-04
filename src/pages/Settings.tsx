import { MainLayout } from "@/components/layout/MainLayout";
import { User, Bell, Shield, Palette, Plug, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const sections = [
  { id: "account", label: "Account", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "privacy", label: "Privacy & Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "integrations", label: "Integrations", icon: Plug },
  { id: "billing", label: "Billing", icon: CreditCard },
];

const Settings = () => {
  const [active, setActive] = useState("account");

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground mb-2 tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account and platform preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="space-y-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-left transition-colors",
                  active === s.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                )}
              >
                <s.icon className="w-4 h-4" />
                {s.label}
              </button>
            ))}
          </aside>

          <div className="lg:col-span-3 space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-heading font-semibold text-foreground mb-1">Profile</h3>
              <p className="text-sm text-muted-foreground mb-6">Update your public information</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Full name", value: "Srinivas Yarru" },
                  { label: "Email", value: "srinivas@example.com" },
                  { label: "Headline", value: "Senior Software Engineer" },
                  { label: "Location", value: "San Francisco, CA" },
                ].map((f) => (
                  <label key={f.label} className="block">
                    <span className="text-xs text-muted-foreground">{f.label}</span>
                    <input
                      defaultValue={f.value}
                      className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-heading font-semibold text-foreground mb-1">Preferences</h3>
              <p className="text-sm text-muted-foreground mb-6">Control automation and notifications</p>
              <div className="divide-y divide-white/5">
                {[
                  { label: "Email notifications for new matches", on: true },
                  { label: "Allow autonomous job applications", on: false },
                  { label: "Weekly career insights digest", on: true },
                  { label: "Beta features", on: false },
                ].map((p) => (
                  <Toggle key={p.label} label={p.label} initial={p.on} />
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all glow-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

function Toggle({ label, initial }: { label: string; initial: boolean }) {
  const [on, setOn] = useState(initial);
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm text-foreground">{label}</span>
      <button
        onClick={() => setOn(!on)}
        className={cn("relative w-11 h-6 rounded-full transition-colors", on ? "bg-primary" : "bg-white/10")}
      >
        <span className={cn(
          "absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform",
          on ? "translate-x-5" : "translate-x-0.5"
        )} />
      </button>
    </div>
  );
}

export default Settings;
