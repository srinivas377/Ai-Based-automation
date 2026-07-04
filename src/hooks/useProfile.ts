import { useEffect, useState, useCallback } from "react";

export type Skill = { name: string; level: number; verified: boolean };
export type Experience = { role: string; company: string; duration: string; location: string; description: string };
export type Education = { degree: string; school: string; year: string; gpa: string };
export type Certification = { name: string; issuer: string; year: string };

export type ProfileData = {
  name: string;
  title: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  website: string;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
};

const STORAGE_KEY = "careeros.profile.v1";

const DEFAULT_PROFILE: ProfileData = {
  name: "Srinivas Yarru",
  title: "Senior Software Engineer",
  location: "San Francisco, CA",
  email: "srinivas@example.com",
  github: "https://github.com/srinivas",
  linkedin: "https://linkedin.com/in/srinivas",
  website: "https://srinivas.dev",
  skills: [
    { name: "React", level: 92, verified: true },
    { name: "TypeScript", level: 88, verified: true },
    { name: "Node.js", level: 75, verified: false },
    { name: "Python", level: 70, verified: true },
    { name: "AWS", level: 55, verified: false },
    { name: "Docker", level: 60, verified: false },
  ],
  experience: [
    { role: "Senior Software Engineer", company: "TechCorp Inc", duration: "2022 - Present", location: "San Francisco, CA", description: "Leading frontend architecture and mentoring junior developers." },
    { role: "Software Engineer", company: "StartupX", duration: "2020 - 2022", location: "Remote", description: "Built scalable web applications using React and Node.js." },
  ],
  education: [
    { degree: "M.S. Computer Science", school: "Stanford University", year: "2020", gpa: "3.9" },
    { degree: "B.S. Computer Science", school: "UC Berkeley", year: "2018", gpa: "3.7" },
  ],
  certifications: [
    { name: "AWS Solutions Architect", issuer: "Amazon", year: "2023" },
    { name: "Professional Scrum Master", issuer: "Scrum.org", year: "2022" },
    { name: "Google Cloud Professional", issuer: "Google", year: "2023" },
    { name: "Kubernetes Administrator", issuer: "CNCF", year: "2022" },
  ],
};

export function useProfile() {
  const [profile, setProfile] = useState<ProfileData>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
    } catch {}
    return DEFAULT_PROFILE;
  });

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(profile)); } catch {}
  }, [profile]);

  const update = useCallback((patch: Partial<ProfileData>) => {
    setProfile((p) => ({ ...p, ...patch }));
  }, []);

  const reset = useCallback(() => setProfile(DEFAULT_PROFILE), []);

  return { profile, setProfile, update, reset };
}
