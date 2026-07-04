import { useMemo, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import {
  Bookmark, Send, Phone, Building2, Trophy, XCircle,
  Plus, Calendar, Sparkles, BarChart3, Edit3, Trash2, ArrowRight, RotateCcw, Save, X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useApplications, type Application, type Status } from "@/hooks/useApplications";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

const columns: { id: Status; label: string; icon: any; color: string }[] = [
  { id: "saved", label: "Saved", icon: Bookmark, color: "text-muted-foreground" },
  { id: "applied", label: "Applied", icon: Send, color: "text-agent-auto" },
  { id: "screening", label: "Screening", icon: Phone, color: "text-agent-market" },
  { id: "interview", label: "Interview", icon: Building2, color: "text-warning" },
  { id: "offer", label: "Offer", icon: Trophy, color: "text-success" },
  { id: "rejected", label: "Rejected", icon: XCircle, color: "text-destructive" },
];

const Applications = () => {
  const { items, add, update, move, remove, reset } = useApplications();
  const [editing, setEditing] = useState<Application | null>(null);
  const [adding, setAdding] = useState(false);
  const [dragId, setDragId] = useState<string | null>(null);
  const [hoverCol, setHoverCol] = useState<Status | null>(null);

  const totals = useMemo(() => columns.map((c) => ({ ...c, count: items.filter((i) => i.status === c.id).length })), [items]);

  const onDrop = (status: Status) => {
    if (dragId) {
      move(dragId, status);
      toast({ title: `Moved to ${status}` });
    }
    setDragId(null);
    setHoverCol(null);
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground mb-2 tracking-tight">Applications</h1>
            <p className="text-muted-foreground">Track every conversation from saved to offer</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => { reset(); toast({ title: "Board reset" }); }}
              className="px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium text-muted-foreground transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
            <button className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium text-foreground transition-all flex items-center gap-2">
              <BarChart3 className="w-4 h-4" /> Insights
            </button>
            <button
              onClick={() => setAdding(true)}
              className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all glow-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Application
            </button>
          </div>
        </div>

        {/* Pipeline summary */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {totals.map((c) => (
            <div key={c.id} className="glass-card rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <c.icon className={cn("w-4 h-4", c.color)} />
                <span className="text-xs text-muted-foreground">{c.label}</span>
              </div>
              <p className="text-2xl font-heading font-bold text-foreground">{c.count}</p>
            </div>
          ))}
        </div>

        {/* Kanban */}
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {columns.map((col) => {
            const colItems = items.filter((i) => i.status === col.id);
            const active = hoverCol === col.id;
            return (
              <div
                key={col.id}
                className="space-y-3"
                onDragOver={(e) => { e.preventDefault(); setHoverCol(col.id); }}
                onDragLeave={() => setHoverCol((c) => (c === col.id ? null : c))}
                onDrop={() => onDrop(col.id)}
              >
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <col.icon className={cn("w-4 h-4", col.color)} />
                    <span className="text-sm font-medium text-foreground">{col.label}</span>
                  </div>
                  <span className="text-xs text-muted-foreground bg-white/5 px-2 py-0.5 rounded-full">{colItems.length}</span>
                </div>
                <div className={cn(
                  "space-y-3 min-h-[140px] rounded-xl p-1 transition-all",
                  active && "bg-primary/5 ring-2 ring-primary/30",
                )}>
                  {colItems.length === 0 && (
                    <div className="text-xs text-muted-foreground/60 italic px-3 py-4 text-center border border-dashed border-white/10 rounded-lg">
                      Drop here
                    </div>
                  )}
                  {colItems.map((c) => (
                    <div
                      key={c.id}
                      draggable
                      onDragStart={() => setDragId(c.id)}
                      onDragEnd={() => setDragId(null)}
                      className={cn(
                        "glass-card rounded-xl p-4 hover:ring-2 hover:ring-primary/30 transition-all cursor-grab active:cursor-grabbing group",
                        dragId === c.id && "opacity-40",
                      )}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center font-heading font-bold text-primary text-sm shrink-0">
                          {c.logo}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-foreground truncate">{c.role}</p>
                          <p className="text-xs text-muted-foreground truncate">{c.company}</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-white/10">
                              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-44">
                            <DropdownMenuLabel>Move to</DropdownMenuLabel>
                            {columns.filter((k) => k.id !== c.status).map((k) => (
                              <DropdownMenuItem key={k.id} onClick={() => { move(c.id, k.id); toast({ title: `Moved to ${k.label}` }); }}>
                                <k.icon className={cn("w-4 h-4 mr-2", k.color)} />{k.label}
                              </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setEditing(c)}>
                              <Edit3 className="w-4 h-4 mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { remove(c.id); toast({ title: "Removed" }); }} className="text-destructive focus:text-destructive">
                              <Trash2 className="w-4 h-4 mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-primary font-medium">{c.match}% match</span>
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {c.date}
                        </span>
                      </div>
                      {c.next && (
                        <div className="mt-3 pt-3 border-t border-white/5 text-xs text-warning flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> {c.next}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {(adding || editing) && (
        <ApplicationEditor
          initial={editing}
          onClose={() => { setAdding(false); setEditing(null); }}
          onSave={(a) => {
            if (editing) { update(editing.id, a); toast({ title: "Application updated" }); }
            else { add({ ...a, status: a.status ?? "saved" } as any); toast({ title: "Application added" }); }
            setAdding(false); setEditing(null);
          }}
        />
      )}
    </MainLayout>
  );
};

const ApplicationEditor = ({
  initial, onClose, onSave,
}: { initial: Application | null; onClose: () => void; onSave: (a: Partial<Application>) => void }) => {
  const [f, setF] = useState<Partial<Application>>(initial ?? {
    company: "", role: "", match: 80, status: "saved", location: "", salary: "", next: "", notes: "",
  });

  const submit = () => {
    if (!f.company?.trim() || !f.role?.trim()) {
      toast({ title: "Company and role required", variant: "destructive" });
      return;
    }
    onSave(f);
  };

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{initial ? "Edit Application" : "Add Application"}</DialogTitle>
          <DialogDescription>Track a new opportunity through your pipeline.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Company</Label>
              <Input value={f.company ?? ""} onChange={(e) => setF({ ...f, company: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Role</Label>
              <Input value={f.role ?? ""} onChange={(e) => setF({ ...f, role: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Location</Label>
              <Input value={f.location ?? ""} onChange={(e) => setF({ ...f, location: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Salary</Label>
              <Input value={f.salary ?? ""} onChange={(e) => setF({ ...f, salary: e.target.value })} placeholder="$150k - $180k" />
            </div>
            <div className="space-y-1.5">
              <Label>Stage</Label>
              <Select value={f.status ?? "saved"} onValueChange={(v) => setF({ ...f, status: v as Status })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {columns.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Next step</Label>
              <Input value={f.next ?? ""} onChange={(e) => setF({ ...f, next: e.target.value })} placeholder="Recruiter call · Fri" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Match score: {f.match ?? 80}%</Label>
            <Slider value={[f.match ?? 80]} min={0} max={100} step={1} onValueChange={(v) => setF({ ...f, match: v[0] })} />
          </div>
          <div className="space-y-1.5">
            <Label>Notes</Label>
            <Textarea rows={3} value={f.notes ?? ""} onChange={(e) => setF({ ...f, notes: e.target.value })} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}><X className="w-4 h-4 mr-1" />Cancel</Button>
          <Button onClick={submit}><Save className="w-4 h-4 mr-1" />Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Applications;
