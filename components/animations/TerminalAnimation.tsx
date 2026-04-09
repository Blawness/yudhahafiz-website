"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const commands = [
  { cmd: "whoami", output: "Yudha Hafiz — Fullstack Developer" },
  { cmd: "location", output: "Jakarta, Indonesia" },
  { cmd: "skills --frontend", output: "React, Next.js, Tailwind, TypeScript" },
  { cmd: "skills --backend", output: "Node.js, Prisma, PostgreSQL, AI Agent" },
  { cmd: "status", output: "Building the future of web apps..." },
];

export function TerminalAnimation() {
  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines((prev) => (prev < commands.length * 2 ? prev + 1 : prev));
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="w-full max-w-2xl mx-auto mt-12 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-sm shadow-2xl"
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
        <div className="w-3 h-3 rounded-full bg-red-500/50" />
        <div className="w-3 h-3 rounded-full bg-amber-500/50" />
        <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
        <div className="ml-2 text-xs text-zinc-500 font-mono">yudhahafiz @ mbp — zsh</div>
      </div>

      {/* Terminal Content */}
      <div className="p-6 font-mono text-sm sm:text-base text-zinc-300 min-h-[300px] text-left">
        {commands.slice(0, Math.ceil(visibleLines / 2)).map((item, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">➜</span>
              <span className="text-cyan-400">~</span>
              <span className="text-zinc-100">{item.cmd}</span>
            </div>
            {visibleLines > index * 2 + 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-1 text-zinc-400 pl-6"
              >
                {item.output}
              </motion.div>
            )}
          </div>
        ))}
        {visibleLines < commands.length * 2 && (
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">➜</span>
            <span className="text-cyan-400">~</span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-2.5 h-5 bg-zinc-400"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
