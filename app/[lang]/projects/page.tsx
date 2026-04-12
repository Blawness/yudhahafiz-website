import type { Metadata } from "next";
import { ProjectsClient } from "./ProjectsClient";
import { getDictionary, locales, defaultLocale, type Locale } from "@/dictionaries";

interface ProjectsPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: ProjectsPageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = locales.includes(lang as Locale) ? (lang as Locale) : defaultLocale;
  const dict = await getDictionary(locale);
  const baseUrl = "https://yudhahafiz.com";

  return {
    title: dict.metadata.projects.title,
    description: dict.metadata.projects.description,
    keywords: ["Yudha Hafiz projects", "Yudha Hafiz portfolio", "fullstack developer portfolio"],
    alternates: {
      canonical: locale === "id" ? `${baseUrl}/projects` : `${baseUrl}/en/projects`,
    },
  };
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { lang } = await params;
  const locale = locales.includes(lang as Locale) ? (lang as Locale) : defaultLocale;
  const dict = await getDictionary(locale);
  const d = dict.projectsPage;

  // Stacks and Demos are static
  const projectMocks = [
    {
      stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
      demo: "#",
      github: null,
    },
    {
      stack: ["Python", "FastAPI", "OpenAI API", "React", "PostgreSQL"],
      demo: "#",
      github: null,
    },
    {
      stack: ["Next.js", "Node.js", "Supabase", "Tailwind CSS"],
      demo: "#",
      github: null,
    },
    {
      stack: ["Next.js", "TypeScript", "Stripe", "Prisma", "PostgreSQL"],
      demo: "#",
      github: null,
    },
    {
      stack: ["React", "Node.js", "Chart.js", "PostgreSQL", "Puppeteer"],
      demo: "#",
      github: null,
    },
    {
      stack: ["Next.js", "OpenAI API", "Langchain", "Supabase"],
      demo: "#",
      github: null,
    },
  ];

  const allProjects = d.items.map((item, index) => ({
    ...item,
    stack: projectMocks[index]?.stack || [],
    demo: projectMocks[index]?.demo || "#",
    github: projectMocks[index]?.github || null,
  }));

  const categories = Object.keys(d.categories);

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
            {d.label}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-6">{d.title}</h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">{d.subtitle}</p>
        </div>

        <ProjectsClient categories={categories} allProjects={allProjects} dict={dict} />
      </div>
    </div>
  );
}
