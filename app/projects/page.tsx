import type { Metadata } from "next";
import { ProjectsClient } from "./ProjectsClient";

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

        <ProjectsClient categories={categories} allProjects={allProjects} />
      </div>
    </div>
  );
}
