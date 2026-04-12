"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { type Locale } from "@/dictionaries";
import { motion } from "framer-motion";

interface LanguageToggleProps {
  currentLang: Locale;
}

const FlagID = () => (
  <svg viewBox="0 0 6 4" className="w-4 h-4 rounded-sm shadow-sm overflow-hidden">
    <rect width="6" height="2" fill="#e70011" />
    <rect width="6" height="2" y="2" fill="#fff" />
  </svg>
);

const FlagUK = () => (
  <svg viewBox="0 0 60 30" className="w-4 h-4 rounded-sm shadow-sm overflow-hidden">
    <clipPath id="s">
      <path d="M0,0 v30 h60 v-30 z" />
    </clipPath>
    <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" />
    <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
    <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
  </svg>
);

export function LanguageToggle({ currentLang }: LanguageToggleProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function switchLocale(targetLocale: Locale) {
    if (targetLocale === currentLang) return;

    document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=${60 * 60 * 24 * 365}`;

    let newPath: string;
    if (currentLang === "en") {
      newPath = pathname.replace(/^\/en/, "") || "/";
    } else {
      newPath = `/en${pathname === "/" ? "" : pathname}`;
    }

    startTransition(() => {
      router.push(newPath);
    });
  }

  return (
    <div className="relative flex items-center gap-1 rounded-full border border-zinc-800 bg-zinc-950/50 p-1 backdrop-blur-sm">
      {/* Background slide indicator */}
      <motion.div
        className="absolute inset-y-1 rounded-full bg-zinc-800"
        initial={false}
        animate={{
          x: currentLang === "id" ? 0 : "100%",
          width: "calc(50% - 2px)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />

      <button
        onClick={() => switchLocale("id")}
        disabled={isPending}
        className={`relative z-10 flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 ${
          currentLang === "id" ? "text-cyan-400" : "text-zinc-500 hover:text-zinc-300"
        }`}
      >
        <FlagID />
        <span>ID</span>
      </button>

      <button
        onClick={() => switchLocale("en")}
        disabled={isPending}
        className={`relative z-10 flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 ${
          currentLang === "en" ? "text-cyan-400" : "text-zinc-500 hover:text-zinc-300"
        }`}
      >
        <FlagUK />
        <span>EN</span>
      </button>
    </div>
  );
}
