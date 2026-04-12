"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Dictionary, Locale } from "@/dictionaries";

const projectStacks = [
  ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
  ["Python", "FastAPI", "OpenAI", "React"],
  ["Next.js", "Node.js", "Zapier API", "Supabase"],
];

const projectDemos = ["#", "#", "#"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

interface FeaturedProjectsProps {
  dict: Dictionary;
  lang: Locale;
}

export function FeaturedProjects({ dict, lang }: FeaturedProjectsProps) {
  const prefix = lang === "en" ? "/en" : "";

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 bg-zinc-900/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
            {dict.projects.label}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-4">
            {dict.projects.title}
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">{dict.projects.subtitle}</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          {dict.projects.items.map((project, i) => (
            <motion.div key={project.title} variants={itemVariants}>
              <Card className="h-full flex flex-col glow-hover">
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 flex-1">
                  <div>
                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                      {dict.projects.problem}
                    </span>
                    <p className="text-sm text-zinc-400 mt-1">{project.problem}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                      {dict.projects.solution}
                    </span>
                    <p className="text-sm text-zinc-400 mt-1">{project.solution}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                    <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                      {dict.projects.result}
                    </span>
                    <p className="text-sm text-cyan-300 mt-1 font-medium">{project.result}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {projectStacks[i]?.map((tech) => (
                      <Badge key={tech} variant="default">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <a
                    href={projectDemos[i]}
                    className="flex items-center gap-1.5 text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                  >
                    {dict.projects.viewDetails} <ExternalLink size={13} />
                  </a>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button variant="outline" asChild>
            <Link href={`${prefix}/projects`}>
              {dict.projects.viewAll} <ArrowRight size={14} />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
