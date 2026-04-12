import type { Metadata } from "next";
import Image from "next/image";
import { Code2, Brain, Zap, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getDictionary, locales, defaultLocale, type Locale } from "@/dictionaries";

interface AboutPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = locales.includes(lang as Locale) ? (lang as Locale) : defaultLocale;
  const dict = await getDictionary(locale);
  const baseUrl = "https://yudhahafiz.com";

  return {
    title: dict.metadata.about.title,
    description: dict.metadata.about.description,
    keywords: ["Yudha Hafiz", "Yudha Hafiz developer", "Yudha Hafiz fullstack", "about Yudha Hafiz"],
    alternates: {
      canonical: locale === "id" ? `${baseUrl}/about` : `${baseUrl}/en/about`,
    },
  };
}

const skillGroups = [
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

const timelineYears = ["2024–Now", "2022–2024", "2021–2022"];

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params;
  const locale = locales.includes(lang as Locale) ? (lang as Locale) : defaultLocale;
  const dict = await getDictionary(locale);
  const d = dict.aboutPage;

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
            {d.label}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-6">{d.title}</h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">{d.subtitle}</p>
        </div>

        {/* Bio */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          {/* Avatar */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-full max-w-[280px] aspect-[864/1100] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl group flex-shrink-0">
              <Image
                src="/images/yudha-formal.webp"
                alt="Yudha Hafiz"
                fill
                sizes="(max-width: 768px) 100vw, 280px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/20 to-transparent" />
            </div>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-zinc-100 mb-4">{d.bioTitle}</h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              {d.bio.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-zinc-100 mb-8 text-center">{d.skillsTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {skillGroups.map((group) => (
              <div key={group.category} className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/15 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <group.icon size={18} />
                  </div>
                  <h3 className="font-semibold text-zinc-100">{group.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-zinc-100 mb-8 text-center">{d.experienceTitle}</h2>
          <div className="relative pl-8 border-l border-zinc-800">
            {d.timeline.map((item, i) => (
              <div key={i} className="mb-8 relative">
                <div className="absolute -left-[37px] w-4 h-4 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 border-2 border-zinc-950" />
                <span className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">
                  {timelineYears[i]}
                </span>
                <h3 className="text-lg font-semibold text-zinc-100 mt-1 mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 text-center">
          <h2 className="text-2xl font-bold text-zinc-100 mb-4">{d.valuesTitle}</h2>
          <p className="text-zinc-400 max-w-xl mx-auto mb-6">{d.valuesSubtitle}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {d.values.map((v) => (
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
