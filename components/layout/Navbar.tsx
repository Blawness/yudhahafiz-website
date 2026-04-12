"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import type { Dictionary, Locale } from "@/dictionaries";

interface NavbarProps {
  dict: Dictionary;
  lang: Locale;
}

export function Navbar({ dict, lang }: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const prefix = lang === "en" ? "/en" : "";

  const navLinks = [
    { href: `${prefix}/`, label: dict.nav.home },
    { href: `${prefix}/about`, label: dict.nav.about },
    { href: `${prefix}/projects`, label: dict.nav.projects },
    { href: `${prefix}/blog`, label: dict.nav.blog },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === `${prefix}/`) return pathname === "/" || pathname === `${prefix}/` || pathname === prefix;
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 shadow-xl"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href={`${prefix}/`}
          className="flex items-center gap-2 text-zinc-100 font-bold text-lg group"
        >
          <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <Image
              src="/favicon.ico"
              alt="Yudha Hafiz Logo"
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="gradient-text">Yudha Hafiz</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive(link.href)
                    ? "text-cyan-400 bg-cyan-500/10"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side: Lang toggle + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageToggle currentLang={lang} />
          <Button size="sm" asChild>
            <a href={`${prefix}/#contact`}>{dict.nav.cta}</a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-zinc-400 hover:text-zinc-100 p-2 rounded-lg hover:bg-zinc-800 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800">
          <ul className="px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
                    isActive(link.href)
                      ? "text-cyan-400 bg-cyan-500/10"
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 flex items-center justify-between gap-3">
              <LanguageToggle currentLang={lang} />
              <Button size="sm" className="flex-1" asChild>
                <a href={`${prefix}/#contact`} onClick={() => setMobileOpen(false)}>
                  {dict.nav.cta}
                </a>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
