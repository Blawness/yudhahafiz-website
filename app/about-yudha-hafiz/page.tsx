import type { Metadata } from "next";
import { Code2, Brain, Zap, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "About Yudha Hafiz | Fullstack Developer Indonesia",
  description:
    "Learn about Yudha Hafiz — a Fullstack Developer from Indonesia specializing in Web Apps, AI Integration, and Automation. 3+ years of real-world experience.",
  keywords: ["Yudha Hafiz", "Yudha Hafiz developer", "Yudha Hafiz fullstack", "about Yudha Hafiz"],
  alternates: {
    canonical: "https://yudhahafiz.com/about-yudha-hafiz",
  },
};

const skills = [
  {
    category: "Frontend",
    icon: Globe,
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    icon: Code2,
    items: ["Node.js", "Express", "Python", "FastAPI", "Prisma", "PostgreSQL"],
  },
  {
    category: "AI & Automation",
    icon: Brain,
    items: ["OpenAI API", "LangChain", "Zapier", "Make.com", "Webhook flows"],
  },
  {
    category: "Tools & DevOps",
    icon: Zap,
    items: ["Git", "Docker", "Vercel", "Supabase", "GitHub Actions"],
  },
];

const timeline = [
  {
    year: "2024–Now",
    title: "Senior Fullstack Developer",
    desc: "Building enterprise web applications and AI-integrated tools for clients across Indonesia.",
  },
  {
    year: "2022–2024",
    title: "Fullstack Developer",
    desc: "Delivered 15+ projects including DMS, automation dashboards, and e-commerce platforms.",
  },
  {
    year: "2021–2022",
    title: "Frontend Developer",
    desc: "Started career building responsive UIs with React and Next.js.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
            About
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-6">
            Yudha Hafiz
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Fullstack Developer specializing in Web Apps, Automation, and AI Integration
            that drives real business impact.
          </p>
        </div>

        {/* Bio */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          {/* Avatar placeholder */}
          <div className="flex justify-center md:justify-start">
            <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-zinc-800 flex items-center justify-center">
              <span className="text-6xl font-bold gradient-text">YH</span>
            </div>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-zinc-100 mb-4">About Me</h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p>
                I&apos;m a Fullstack Developer from Indonesia with a passion for building digital
                products that create real business value. I specialize in the intersection of
                modern web development, automation, and AI integration.
              </p>
              <p>
                What sets me apart isn&apos;t just technical skill — it&apos;s my ability to understand
                business problems and translate them into elegant technical solutions. I care
                about outcomes, not just outputs.
              </p>
              <p>
                I&apos;ve worked with UMKM owners, startup founders, and corporate clients to build
                everything from MVPs to full-scale enterprise systems. Every project is an
                opportunity to create real impact.
              </p>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-zinc-100 mb-8 text-center">Technical Skills</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {skills.map((group) => (
              <div
                key={group.category}
                className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/15 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <group.icon size={18} />
                  </div>
                  <h3 className="font-semibold text-zinc-100">{group.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <Badge key={skill} variant="outline">{skill}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-zinc-100 mb-8 text-center">Experience</h2>
          <div className="relative pl-8 border-l border-zinc-800">
            {timeline.map((item, i) => (
              <div key={i} className="mb-8 relative">
                <div className="absolute -left-[37px] w-4 h-4 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 border-2 border-zinc-950" />
                <span className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">
                  {item.year}
                </span>
                <h3 className="text-lg font-semibold text-zinc-100 mt-1 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 text-center">
          <h2 className="text-2xl font-bold text-zinc-100 mb-4">What I Stand For</h2>
          <p className="text-zinc-400 max-w-xl mx-auto mb-6">
            I believe great technology should be invisible — it just works, it&apos;s fast, and
            it solves the right problem.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: "⚡", label: "Speed", desc: "Fast delivery without cutting corners" },
              { icon: "🎯", label: "Impact", desc: "Focused on measurable business results" },
              { icon: "🤝", label: "Clarity", desc: "Clear communication throughout" },
            ].map((v) => (
              <div key={v.label} className="p-4 rounded-lg bg-zinc-800/50">
                <span className="text-2xl mb-2 block">{v.icon}</span>
                <span className="font-semibold text-zinc-100 text-sm block mb-1">{v.label}</span>
                <span className="text-xs text-zinc-400">{v.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
