import type { Metadata } from "next";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Projects by Yudha Hafiz | Fullstack Developer Portfolio",
  description:
    "Explore projects by Yudha Hafiz — a Fullstack Developer from Indonesia. Web apps, AI integrations, automation systems, and more.",
  keywords: ["Yudha Hafiz projects", "Yudha Hafiz portfolio", "fullstack developer portfolio"],
  alternates: {
    canonical: "https://yudhahafiz.com/projects-yudha-hafiz",
  },
};

const allProjects = [
  {
    title: "Document Management System (DMS)",
    problem:
      "Company struggled with disorganized files, slow retrieval, and zero audit visibility across departments.",
    solution:
      "Built a full DMS with advanced search, role-based access control, activity logs, bulk operations, and Kanban workflow.",
    result: "80% reduction in document retrieval time. Full audit compliance achieved.",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
    demo: "#",
    github: null,
    category: "Web App",
  },
  {
    title: "AI-Powered Customer Support Bot",
    problem:
      "Support team overwhelmed with 300+ repetitive inquiries per week. Response time averaging 4 hours.",
    solution:
      "Integrated GPT-4 with custom knowledge base, smart escalation logic, and CRM sync — deployed as WhatsApp + web chat.",
    result: "70% ticket deflection. Average response time: 30 seconds.",
    stack: ["Python", "FastAPI", "OpenAI API", "React", "PostgreSQL"],
    demo: "#",
    github: null,
    category: "AI",
  },
  {
    title: "Business Automation Dashboard",
    problem:
      "Manual data entry across 5 different business tools causing 20+ hours of lost productivity per week.",
    solution:
      "Central automation hub connecting all tools via API with real-time monitoring, alerts, and one-click triggers.",
    result: "20 hours saved per week. Zero manual data entry errors.",
    stack: ["Next.js", "Node.js", "Supabase", "Tailwind CSS"],
    demo: "#",
    github: null,
    category: "Automation",
  },
  {
    title: "E-Commerce Platform",
    problem: "Client needed a custom online store with unique pricing rules and B2B features.",
    solution:
      "Built a full e-commerce platform with product catalog, cart, checkout, order management, and admin dashboard.",
    result: "Launched in 6 weeks. Processing 50+ orders/day from day one.",
    stack: ["Next.js", "TypeScript", "Stripe", "Prisma", "PostgreSQL"],
    demo: "#",
    github: null,
    category: "Web App",
  },
  {
    title: "HR Analytics Dashboard",
    problem: "HR team spending 10 hours/week compiling attendance and performance reports manually.",
    solution:
      "Automated HR dashboard pulling from attendance system API with visual charts, filters, and auto-generated PDF reports.",
    result: "10 hours saved weekly. Reports generated in seconds, not hours.",
    stack: ["React", "Node.js", "Chart.js", "PostgreSQL", "Puppeteer"],
    demo: "#",
    github: null,
    category: "Automation",
  },
  {
    title: "AI Content Generator",
    problem: "Marketing team struggling to produce consistent branded content at scale.",
    solution:
      "Custom AI content generator trained on brand guidelines — generates blog posts, social media copy, and email campaigns.",
    result: "3x content output. 40% reduction in content creation costs.",
    stack: ["Next.js", "OpenAI API", "Langchain", "Supabase"],
    demo: "#",
    github: null,
    category: "AI",
  },
];

const categories = ["All", "Web App", "AI", "Automation"];

export default function ProjectsPage() {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
            Portfolio
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-6">
            Projects by Yudha Hafiz
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Every project starts with a real problem. These are the solutions I&apos;ve built — and the impact they delivered.
          </p>
        </div>

        {/* Category pills */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {categories.map((cat) => (
            <span
              key={cat}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all cursor-pointer ${
                cat === "All"
                  ? "bg-cyan-500/15 border-cyan-500/40 text-cyan-400"
                  : "border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300"
              }`}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {allProjects.map((project) => (
            <div
              key={project.title}
              className="group flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden hover:border-zinc-700 transition-all duration-300"
            >
              {/* Category banner */}
              <div className="h-1 w-full bg-gradient-to-r from-cyan-500 to-violet-600" />

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h2 className="text-lg font-bold text-zinc-100 leading-snug">{project.title}</h2>
                  <Badge variant="accent" className="shrink-0">{project.category}</Badge>
                </div>

                <div className="space-y-4 flex-1">
                  <div>
                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                      Problem
                    </span>
                    <p className="text-sm text-zinc-400 mt-1">{project.problem}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                      Solution
                    </span>
                    <p className="text-sm text-zinc-400 mt-1">{project.solution}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                    <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                      Result
                    </span>
                    <p className="text-sm text-cyan-300 mt-1 font-medium">{project.result}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-zinc-800">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.stack.map((tech) => (
                      <Badge key={tech} variant="default">{tech}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={project.demo}
                      className="flex items-center gap-1.5 text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                    >
                      <ExternalLink size={13} />
                      View Demo
                    </a>
                    {project.github && (
                      <a
                        href={project.github}
                        className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-300 transition-colors"
                      >
                        <Github size={13} />
                        Source
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
