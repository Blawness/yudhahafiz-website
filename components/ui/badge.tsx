import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "accent";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const base =
    "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium transition-colors";

  const variants = {
    default: "bg-zinc-800 text-zinc-300 border border-zinc-700",
    outline: "border border-cyan-500/50 text-cyan-400 bg-cyan-500/10",
    accent: "bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-cyan-300 border border-cyan-500/30",
  };

  return <span className={cn(base, variants[variant], className)} {...props} />;
}

export { Badge };
