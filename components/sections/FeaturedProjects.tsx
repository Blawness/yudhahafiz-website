"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const featuredProjects = [
  {
    title: "Document Management System",
    problem: "Company struggled with disorganized files, slow retrieval, and zero visibility.",
    solution: "Built a full DMS with advanced search, role-based access, audit logs, and bulk operations.",
    result: "80% reduction in document retrieval time. 100% audit compliance.",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    demo: "#",
  },
  {
    title: "AI-Powered Customer Support Bot",
    problem: "Support team overwhelmed with repetitive inquiries — 300+ tickets/week.",
    solution: "Integrated GPT-4 with custom knowledge base, escalation logic, and CRM sync.",
    result: "70% deflection rate. Support team focused on complex cases only.",
    stack: ["Python", "FastAPI", "OpenAI", "React"],
    demo: "#",
  },
  {
    title: "Business Automation Dashboard",
    problem: "Manual data entry across 5 different tools caused errors and wasted 20h/week.",
    solution: "Built a central automation hub connecting all tools via API with real-time monitoring.",
    result: "20 hours saved per week. Zero manual data entry errors.",
    stack: ["Next.js", "Node.js", "Zapier API", "Supabase"],
    demo: "#",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function FeaturedProjects() {
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
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-4">
            Featured Projects
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Real problems. Real solutions. Real impact.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          {featuredProjects.map((project) => (
            <motion.div key={project.title} variants={itemVariants}>
              <Card className="h-full flex flex-col glow-hover">
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 flex-1">
                  <div>
                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Problem</span>
                    <p className="text-sm text-zinc-400 mt-1">{project.problem}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Solution</span>
                    <p className="text-sm text-zinc-400 mt-1">{project.solution}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                    <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Result</span>
                    <p className="text-sm text-cyan-300 mt-1 font-medium">{project.result}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.stack.map((tech) => (
                      <Badge key={tech} variant="default">{tech}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <a
                    href={project.demo}
                    className="flex items-center gap-1.5 text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                  >
                    View Details <ExternalLink size={13} />
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
            <Link href="/projects-yudha-hafiz">
              See All Projects <ArrowRight size={14} />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
