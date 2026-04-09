"use client";

import { motion } from "framer-motion";
import { Globe, Zap, Brain, MessageSquare } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const services = [
  {
    icon: Globe,
    title: "Web Application Development",
    description:
      "Full-stack web apps built with Next.js, React, and TypeScript. From MVPs to scalable enterprise solutions — fast, reliable, and beautiful.",
    color: "cyan",
  },
  {
    icon: Zap,
    title: "Automation & Workflow",
    description:
      "Eliminate repetitive tasks with custom automation. Save hundreds of hours monthly with tailored backend processes and integrations.",
    color: "violet",
  },
  {
    icon: Brain,
    title: "AI Integration",
    description:
      "Integrate LLMs, chatbots, and AI features into your products. Turn AI from a buzzword into a real competitive advantage.",
    color: "cyan",
  },
  {
    icon: MessageSquare,
    title: "Tech Consulting",
    description:
      "Not sure where to start? Get clear technical direction for your product — architecture, stack decisions, and build roadmap.",
    color: "violet",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Services() {
  return (
    <section id="services" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
            What I Do
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-4">
            Services
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            I help businesses and startups build digital products that actually work — and scale.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={itemVariants}>
              <Card className="h-full glow-hover group">
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${
                      service.color === "cyan"
                        ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/20"
                        : "bg-violet-500/15 text-violet-400 border border-violet-500/20"
                    }`}
                  >
                    <service.icon size={22} />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
