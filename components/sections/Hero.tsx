"use client";

import { motion } from "framer-motion";
import { Sparkles, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TypingAnimation } from "@/components/animations/TypingAnimation";
import { TerminalAnimation } from "@/components/animations/TerminalAnimation";
import type { Dictionary, Locale } from "@/dictionaries";

interface HeroProps {
  dict: Dictionary;
  lang: Locale;
}

export function Hero({ dict, lang }: HeroProps) {
  const prefix = lang === "en" ? "/en" : "";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-8"
        >
          <Sparkles size={14} />
          {dict.hero.badge}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight mb-6 flex flex-col sm:block"
        >
          <span>{dict.hero.greeting}</span>
          <TypingAnimation
            texts={[...dict.hero.typingTexts]}
            className="gradient-text inline-block"
          />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl sm:text-2xl text-zinc-400 max-w-3xl mx-auto mb-4 leading-relaxed"
        >
          {dict.hero.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Button size="lg" asChild className="rounded-full px-8">
            <a href={`${prefix}/#contact`}>{dict.hero.cta}</a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="rounded-full px-8 border-zinc-800 hover:bg-zinc-900"
          >
            <Link href={`${prefix}/projects`}>{dict.hero.viewProjects}</Link>
          </Button>
        </motion.div>

        {/* CLI Animation */}
        <TerminalAnimation />

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-20 flex flex-col items-center gap-2 text-zinc-600"
        >
          <span className="text-xs uppercase tracking-widest">{dict.hero.scroll}</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown size={18} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
