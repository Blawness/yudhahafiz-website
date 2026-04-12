"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { type Locale } from "@/dictionaries";

interface LanguageToggleProps {
  currentLang: Locale;
}

export function LanguageToggle({ currentLang }: LanguageToggleProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function switchLocale(targetLocale: Locale) {
    if (targetLocale === currentLang) return;

    // Save preference in cookie (1 year)
    document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=${60 * 60 * 24 * 365}`;

    // Build new path
    let newPath: string;
    if (currentLang === "en") {
      // Currently on /en/... → strip prefix
      newPath = pathname.replace(/^\/en/, "") || "/";
    } else {
      // Currently on /... → add /en prefix
      newPath = `/en${pathname === "/" ? "" : pathname}`;
    }

    startTransition(() => {
      router.push(newPath);
    });
  }

  return (
    <div
      className="flex items-center gap-0.5 rounded-full border border-zinc-700/60 bg-zinc-900/80 p-0.5"
      role="group"
      aria-label="Language switcher"
    >
      <button
        onClick={() => switchLocale("id")}
        disabled={isPending}
        aria-label="Switch to Bahasa Indonesia"
        className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-200 ${
          currentLang === "id"
            ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
            : "text-zinc-500 hover:text-zinc-200"
        }`}
      >
        🇮🇩 ID
      </button>
      <button
        onClick={() => switchLocale("en")}
        disabled={isPending}
        aria-label="Switch to English"
        className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-200 ${
          currentLang === "en"
            ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
            : "text-zinc-500 hover:text-zinc-200"
        }`}
      >
        🇬🇧 EN
      </button>
    </div>
  );
}
