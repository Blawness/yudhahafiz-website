"use client";

import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  title: string;
  problem: string;
  solution: string;
  result: string;
  stack: string[];
  demo: string;
  github: string | null;
  category: string;
}

interface ProjectsClientProps {
  categories: string[];
  allProjects: Project[];
}

export function ProjectsClient({ categories, allProjects }: ProjectsClientProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? allProjects 
    : allProjects.filter((p) => p.category === activeCategory);

  return (
    <>
      <div className="flex justify-center gap-2 mb-12 flex-wrap">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors cursor-pointer ${
              cat === activeCategory
                ? "bg-cyan-500/15 border-cyan-500/40 text-cyan-400"
                : "border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300"
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.title}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ 
                duration: 0.4,
                ease: [0.23, 1, 0.32, 1] 
              }}
              className="group flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden hover:border-zinc-700 transition-colors duration-300"
            >
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
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
