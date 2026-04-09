"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const highlights = [
  "3+ years building production web applications",
  "Specialized in AI integration & automation",
  "Focus on business impact, not just code",
  "Remote-friendly, fast communicator",
];

export function AboutShort() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
              About
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-6 leading-tight">
              I build products that{" "}
              <span className="gradient-text">actually move the needle</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              I&apos;m Yudha Hafiz, a Fullstack Developer based in Indonesia. I don&apos;t just write
              code — I solve business problems through technology. Whether it&apos;s a scalable
              web app, an automation system, or an AI-powered feature, I&apos;m focused on
              delivering measurable outcomes.
            </p>

            <ul className="flex flex-col gap-3 mb-8">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-cyan-400 mt-0.5 shrink-0" />
                  <span className="text-sm text-zinc-300">{item}</span>
                </li>
              ))}
            </ul>

            <Button variant="outline" asChild>
              <Link href="/about">
                Learn More About Me <ArrowRight size={14} />
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { value: "3+", label: "Years of Experience" },
              { value: "20+", label: "Projects Delivered" },
              { value: "10+", label: "Happy Clients" },
              { value: "100%", label: "Remote Ready" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="gradient-border rounded-xl p-6 bg-zinc-900/50 text-center"
              >
                <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-sm text-zinc-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
