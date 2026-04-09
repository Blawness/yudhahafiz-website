"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const contactOptions = [
  {
    icon: Mail,
    label: "Email",
    value: "yudhahafiz@gmail.com",
    href: "mailto:yudhahafiz@gmail.com",
    description: "Best for detailed project briefs",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+62 812-3456-7890",
    href: "https://wa.me/6281234567890?text=Hi%20Yudha%2C%20I%27d%20like%20to%20discuss%20a%20project",
    description: "Quick chat & fast response",
  },
  {
    icon: Calendar,
    label: "Schedule a Call",
    value: "Book a free 30-min call",
    href: "https://calendly.com/yudhahafiz",
    description: "Let's talk about your project",
  },
];

export function ContactCTA() {
  return (
    <section id="contact" className="py-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-violet-500/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-zinc-100 mb-6 leading-tight">
            Let&apos;s build something{" "}
            <span className="gradient-text">impactful</span>
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-lg">
            Have a project in mind? I&apos;d love to hear about it. Let&apos;s talk about how we can work together.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
        >
          {contactOptions.map((option, i) => (
            <motion.a
              key={option.label}
              href={option.href}
              target={option.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="group flex flex-col items-center text-center p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:border-cyan-500/50 hover:bg-zinc-900 transition-all duration-300 glow-hover"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform duration-200">
                <option.icon size={20} />
              </div>
              <span className="text-sm font-semibold text-zinc-100 mb-1">{option.label}</span>
              <span className="text-xs text-cyan-400 mb-2 font-medium">{option.value}</span>
              <span className="text-xs text-zinc-500">{option.description}</span>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Button size="lg" asChild>
            <a href="mailto:yudhahafiz@gmail.com">
              Start a Conversation <ArrowRight size={16} />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
