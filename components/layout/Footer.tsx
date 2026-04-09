import Link from "next/link";
import { Github, Linkedin, Mail, MessageCircle, Code2 } from "lucide-react";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about-yudha-hafiz", label: "About" },
  { href: "/projects-yudha-hafiz", label: "Projects" },
  { href: "/blog", label: "Blog" },
];

const socialLinks = [
  {
    href: "mailto:yudhahafiz@gmail.com",
    icon: Mail,
    label: "Email",
  },
  {
    href: "https://wa.me/6281234567890",
    icon: MessageCircle,
    label: "WhatsApp",
  },
  {
    href: "https://github.com/yudhahafiz",
    icon: Github,
    label: "GitHub",
  },
  {
    href: "https://linkedin.com/in/yudhahafiz",
    icon: Linkedin,
    label: "LinkedIn",
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center">
                <Code2 size={16} className="text-white" />
              </div>
              <span className="font-bold text-zinc-100">Yudha Hafiz</span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
              Fullstack Developer specializing in Web Apps, Automation, and AI Integration.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-100 mb-3">Navigation</h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-100 mb-3">Contact</h3>
            <ul className="flex flex-col gap-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-zinc-400 hover:text-cyan-400 transition-colors"
                  >
                    <link.icon size={14} />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-500">
            © {currentYear} Yudha Hafiz. All rights reserved.
          </p>
          <p className="text-xs text-zinc-600">
            Built with Next.js · TypeScript · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
