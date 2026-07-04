import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import {
  User, Mail, MapPin, Briefcase, GraduationCap, Award,
  Edit3, CheckCircle2, ExternalLink, Github, Linkedin, Globe,
  Plus, Trash2, RotateCcw, Save, X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useProfile, type ProfileData, type Skill, type Experience, type Education, type Certification } from "@/hooks/useProfile";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

type EditMode =
  | { kind: "profile" }
  | { kind: "skill"; index: number | null }
  | { kind: "experience"; index: number | null }
  | { kind: "education"; index: number | null }
  | { kind: "certification"; index: number | null }
  | null;

const Profile = () => {
  const { profile, setProfile, reset } = useProfile();
  const [mode, setMode] = useState<EditMode>(null);

  const close = () => setMode(null);

  const removeAt = <K extends keyof ProfileData>(key: K, index: number, label: string) => {
    setProfile((p) => ({ ...p, [key]: (p[key] as any[]).filter((_, i) => i !== index) } as ProfileData));
    toast({ title: `${label} removed` });
  };

  return (
    <MainLayout>
      <div className="grid grid-cols-12 gap-6">
        {/* Profile Header */}
        <div className="col-span-12 glass-card p-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <User className="w-12 h-12 text-primary" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg bg-success flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-success-foreground" />
                </div>
              </div>
              <div>
                <h1 className="font-heading text-2xl font-bold text-foreground mb-1">{profile.name}</h1>
                <p className="text-muted-foreground mb-2">{profile.title}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{profile.location}</span>
                  <span className="flex items-center gap-1"><Mail className="w-4 h-4" />{profile.email}</span>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <a href={profile.github} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"><Github className="w-4 h-4 text-muted-foreground" /></a>
                  <a href={profile.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"><Linkedin className="w-4 h-4 text-muted-foreground" /></a>
                  <a href={profile.website} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"><Globe className="w-4 h-4 text-muted-foreground" /></a>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => { reset(); toast({ title: "Profile reset to defaults" }); }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-sm text-muted-foreground transition-colors"
              >
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
              <button
                onClick={() => setMode({ kind: "profile" })}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <Edit3 className="w-4 h-4" /> Edit Profile
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
            <Stat label="Profile Match" value="87%" />
            <Stat label="Skills Tracked" value={String(profile.skills.length)} />
            <Stat label="Certifications" value={String(profile.certifications.length)} />
            <Stat label="Career Readiness" value="92%" />
          </div>
        </div>

        {/* Skills */}
        <Section
          className="col-span-12 lg:col-span-6"
          title="Skills"
          onAdd={() => setMode({ kind: "skill", index: null })}
          addLabel="Add Skill"
        >
          <div className="space-y-4">
            {profile.skills.length === 0 && <Empty text="No skills yet. Add one to get started." />}
            {profile.skills.map((skill, i) => (
              <div key={i} className="group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{skill.name}</span>
                    {skill.verified && <CheckCircle2 className="w-3.5 h-3.5 text-success" />}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    <RowActions onEdit={() => setMode({ kind: "skill", index: i })} onDelete={() => removeAt("skills", i, "Skill")} />
                  </div>
                </div>
                <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "absolute left-0 top-0 h-full rounded-full transition-all duration-500",
                      skill.level >= 80 && "bg-success",
                      skill.level >= 60 && skill.level < 80 && "bg-primary",
                      skill.level < 60 && "bg-warning"
                    )}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Experience */}
        <Section
          className="col-span-12 lg:col-span-6"
          title="Experience"
          icon={<Briefcase className="w-5 h-5 text-primary" />}
          onAdd={() => setMode({ kind: "experience", index: null })}
          addLabel="Add Experience"
        >
          <div className="space-y-6">
            {profile.experience.length === 0 && <Empty text="No experience yet." />}
            {profile.experience.map((exp, i) => (
              <div key={i} className="relative pl-6 border-l-2 border-white/10 group">
                <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-primary" />
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-medium text-foreground">{exp.role}</h3>
                    <p className="text-sm text-primary">{exp.company}</p>
                    <p className="text-xs text-muted-foreground mt-1">{exp.duration} • {exp.location}</p>
                    <p className="text-sm text-muted-foreground mt-2">{exp.description}</p>
                  </div>
                  <RowActions onEdit={() => setMode({ kind: "experience", index: i })} onDelete={() => removeAt("experience", i, "Experience")} />
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Education */}
        <Section
          className="col-span-12 lg:col-span-6"
          title="Education"
          icon={<GraduationCap className="w-5 h-5 text-primary" />}
          onAdd={() => setMode({ kind: "education", index: null })}
          addLabel="Add Education"
        >
          <div className="space-y-4">
            {profile.education.length === 0 && <Empty text="No education yet." />}
            {profile.education.map((edu, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/5 group">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-medium text-foreground">{edu.degree}</h3>
                    <p className="text-sm text-primary">{edu.school}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>{edu.year}</span>
                      {edu.gpa && <span>GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                  <RowActions onEdit={() => setMode({ kind: "education", index: i })} onDelete={() => removeAt("education", i, "Education")} />
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Certifications */}
        <Section
          className="col-span-12 lg:col-span-6"
          title="Certifications"
          icon={<Award className="w-5 h-5 text-accent" />}
          onAdd={() => setMode({ kind: "certification", index: null })}
          addLabel="Add Certification"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {profile.certifications.length === 0 && <Empty text="No certifications yet." />}
            {profile.certifications.map((cert, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                <div className="flex items-center justify-between">
                  <Award className="w-4 h-4 text-accent" />
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setMode({ kind: "certification", index: i })} className="p-1 rounded hover:bg-white/10"><Edit3 className="w-3 h-3 text-muted-foreground" /></button>
                    <button onClick={() => removeAt("certifications", i, "Certification")} className="p-1 rounded hover:bg-white/10"><Trash2 className="w-3 h-3 text-destructive" /></button>
                    <ExternalLink className="w-3 h-3 text-muted-foreground" />
                  </div>
                </div>
                <p className="text-sm font-medium text-foreground mt-2">{cert.name}</p>
                <p className="text-xs text-muted-foreground">{cert.issuer} • {cert.year}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* Editors */}
      {mode?.kind === "profile" && (
        <ProfileEditor
          initial={profile}
          onClose={close}
          onSave={(p) => { setProfile((prev) => ({ ...prev, ...p })); close(); toast({ title: "Profile updated" }); }}
        />
      )}
      {mode?.kind === "skill" && (
        <SkillEditor
          initial={mode.index !== null ? profile.skills[mode.index] : null}
          onClose={close}
          onSave={(s) => {
            setProfile((prev) => {
              const skills = [...prev.skills];
              if (mode.index !== null) skills[mode.index] = s; else skills.push(s);
              return { ...prev, skills };
            });
            close();
            toast({ title: mode.index !== null ? "Skill updated" : "Skill added" });
          }}
        />
      )}
      {mode?.kind === "experience" && (
        <ExperienceEditor
          initial={mode.index !== null ? profile.experience[mode.index] : null}
          onClose={close}
          onSave={(s) => {
            setProfile((prev) => {
              const experience = [...prev.experience];
              if (mode.index !== null) experience[mode.index] = s; else experience.push(s);
              return { ...prev, experience };
            });
            close();
            toast({ title: mode.index !== null ? "Experience updated" : "Experience added" });
          }}
        />
      )}
      {mode?.kind === "education" && (
        <EducationEditor
          initial={mode.index !== null ? profile.education[mode.index] : null}
          onClose={close}
          onSave={(s) => {
            setProfile((prev) => {
              const education = [...prev.education];
              if (mode.index !== null) education[mode.index] = s; else education.push(s);
              return { ...prev, education };
            });
            close();
            toast({ title: mode.index !== null ? "Education updated" : "Education added" });
          }}
        />
      )}
      {mode?.kind === "certification" && (
        <CertificationEditor
          initial={mode.index !== null ? profile.certifications[mode.index] : null}
          onClose={close}
          onSave={(s) => {
            setProfile((prev) => {
              const certifications = [...prev.certifications];
              if (mode.index !== null) certifications[mode.index] = s; else certifications.push(s);
              return { ...prev, certifications };
            });
            close();
            toast({ title: mode.index !== null ? "Certification updated" : "Certification added" });
          }}
        />
      )}
    </MainLayout>
  );
};

/* ---------- helpers ---------- */

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="text-center">
    <p className="text-2xl font-heading font-bold text-foreground">{value}</p>
    <p className="text-sm text-muted-foreground">{label}</p>
  </div>
);

const Empty = ({ text }: { text: string }) => (
  <p className="text-sm text-muted-foreground italic">{text}</p>
);

const Section = ({
  className, title, icon, onAdd, addLabel, children,
}: {
  className?: string; title: string; icon?: React.ReactNode; onAdd: () => void; addLabel: string; children: React.ReactNode;
}) => (
  <div className={cn("glass-card p-6", className)}>
    <div className="flex items-center justify-between mb-6">
      <h2 className="font-heading font-semibold text-lg text-foreground flex items-center gap-2">
        {icon}{title}
      </h2>
      <button onClick={onAdd} className="text-sm text-primary hover:underline flex items-center gap-1">
        <Plus className="w-3.5 h-3.5" /> {addLabel}
      </button>
    </div>
    {children}
  </div>
);

const RowActions = ({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) => (
  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
    <button onClick={onEdit} className="p-1 rounded hover:bg-white/10" aria-label="Edit"><Edit3 className="w-3.5 h-3.5 text-muted-foreground" /></button>
    <button onClick={onDelete} className="p-1 rounded hover:bg-white/10" aria-label="Delete"><Trash2 className="w-3.5 h-3.5 text-destructive" /></button>
  </div>
);

/* ---------- editors ---------- */

const EditorShell = ({
  title, description, onClose, onSubmit, children,
}: { title: string; description?: string; onClose: () => void; onSubmit: () => void; children: React.ReactNode }) => (
  <Dialog open onOpenChange={(o) => !o && onClose()}>
    <DialogContent className="max-w-lg">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
      </DialogHeader>
      <div className="space-y-4 py-2">{children}</div>
      <DialogFooter>
        <Button variant="ghost" onClick={onClose}><X className="w-4 h-4 mr-1" />Cancel</Button>
        <Button onClick={onSubmit}><Save className="w-4 h-4 mr-1" />Save</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1.5"><Label>{label}</Label>{children}</div>
);

const ProfileEditor = ({ initial, onClose, onSave }: { initial: ProfileData; onClose: () => void; onSave: (p: Partial<ProfileData>) => void }) => {
  const [f, setF] = useState({
    name: initial.name, title: initial.title, location: initial.location, email: initial.email,
    github: initial.github, linkedin: initial.linkedin, website: initial.website,
  });
  return (
    <EditorShell title="Edit Profile" onClose={onClose} onSubmit={() => onSave(f)}>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Name"><Input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></Field>
        <Field label="Title"><Input value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} /></Field>
        <Field label="Location"><Input value={f.location} onChange={(e) => setF({ ...f, location: e.target.value })} /></Field>
        <Field label="Email"><Input type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></Field>
        <Field label="GitHub URL"><Input value={f.github} onChange={(e) => setF({ ...f, github: e.target.value })} /></Field>
        <Field label="LinkedIn URL"><Input value={f.linkedin} onChange={(e) => setF({ ...f, linkedin: e.target.value })} /></Field>
        <div className="col-span-2"><Field label="Website"><Input value={f.website} onChange={(e) => setF({ ...f, website: e.target.value })} /></Field></div>
      </div>
    </EditorShell>
  );
};

const SkillEditor = ({ initial, onClose, onSave }: { initial: Skill | null; onClose: () => void; onSave: (s: Skill) => void }) => {
  const [f, setF] = useState<Skill>(initial ?? { name: "", level: 60, verified: false });
  return (
    <EditorShell title={initial ? "Edit Skill" : "Add Skill"} onClose={onClose} onSubmit={() => { if (!f.name.trim()) { toast({ title: "Name required", variant: "destructive" }); return; } onSave(f); }}>
      <Field label="Skill"><Input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="e.g. React" /></Field>
      <Field label={`Proficiency: ${f.level}%`}>
        <Slider value={[f.level]} min={0} max={100} step={1} onValueChange={(v) => setF({ ...f, level: v[0] })} />
      </Field>
      <div className="flex items-center justify-between">
        <Label>Verified</Label>
        <Switch checked={f.verified} onCheckedChange={(v) => setF({ ...f, verified: v })} />
      </div>
    </EditorShell>
  );
};

const ExperienceEditor = ({ initial, onClose, onSave }: { initial: Experience | null; onClose: () => void; onSave: (s: Experience) => void }) => {
  const [f, setF] = useState<Experience>(initial ?? { role: "", company: "", duration: "", location: "", description: "" });
  return (
    <EditorShell title={initial ? "Edit Experience" : "Add Experience"} onClose={onClose} onSubmit={() => { if (!f.role.trim() || !f.company.trim()) { toast({ title: "Role and company required", variant: "destructive" }); return; } onSave(f); }}>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Role"><Input value={f.role} onChange={(e) => setF({ ...f, role: e.target.value })} /></Field>
        <Field label="Company"><Input value={f.company} onChange={(e) => setF({ ...f, company: e.target.value })} /></Field>
        <Field label="Duration"><Input value={f.duration} onChange={(e) => setF({ ...f, duration: e.target.value })} placeholder="2022 - Present" /></Field>
        <Field label="Location"><Input value={f.location} onChange={(e) => setF({ ...f, location: e.target.value })} /></Field>
      </div>
      <Field label="Description"><Textarea rows={3} value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} /></Field>
    </EditorShell>
  );
};

const EducationEditor = ({ initial, onClose, onSave }: { initial: Education | null; onClose: () => void; onSave: (s: Education) => void }) => {
  const [f, setF] = useState<Education>(initial ?? { degree: "", school: "", year: "", gpa: "" });
  return (
    <EditorShell title={initial ? "Edit Education" : "Add Education"} onClose={onClose} onSubmit={() => { if (!f.degree.trim() || !f.school.trim()) { toast({ title: "Degree and school required", variant: "destructive" }); return; } onSave(f); }}>
      <Field label="Degree"><Input value={f.degree} onChange={(e) => setF({ ...f, degree: e.target.value })} /></Field>
      <Field label="School"><Input value={f.school} onChange={(e) => setF({ ...f, school: e.target.value })} /></Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Year"><Input value={f.year} onChange={(e) => setF({ ...f, year: e.target.value })} /></Field>
        <Field label="GPA"><Input value={f.gpa} onChange={(e) => setF({ ...f, gpa: e.target.value })} /></Field>
      </div>
    </EditorShell>
  );
};

const CertificationEditor = ({ initial, onClose, onSave }: { initial: Certification | null; onClose: () => void; onSave: (s: Certification) => void }) => {
  const [f, setF] = useState<Certification>(initial ?? { name: "", issuer: "", year: "" });
  return (
    <EditorShell title={initial ? "Edit Certification" : "Add Certification"} onClose={onClose} onSubmit={() => { if (!f.name.trim()) { toast({ title: "Name required", variant: "destructive" }); return; } onSave(f); }}>
      <Field label="Name"><Input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Issuer"><Input value={f.issuer} onChange={(e) => setF({ ...f, issuer: e.target.value })} /></Field>
        <Field label="Year"><Input value={f.year} onChange={(e) => setF({ ...f, year: e.target.value })} /></Field>
      </div>
    </EditorShell>
  );
};

export default Profile;
