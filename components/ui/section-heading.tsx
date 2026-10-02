import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionEyebrowProps {
  children: ReactNode;
  tone?: "default" | "dark";
  className?: string;
}

export function SectionEyebrow({
  children,
  tone = "default",
  className,
}: SectionEyebrowProps) {
  return (
    <span
      className={cn(
        "text-xs font-semibold uppercase tracking-widest",
        tone === "dark" ? "text-background/50" : "text-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

interface SectionHeadingProps {
  children: ReactNode;
  tone?: "default" | "dark";
  size?: "lg" | "md";
  className?: string;
}

export function SectionHeading({
  children,
  tone = "default",
  size = "lg",
  className,
}: SectionHeadingProps) {
  return (
    <h2
      className={cn(
        "font-bold tracking-tight",
        size === "lg" && "text-4xl leading-[1.05] sm:text-5xl",
        size === "md" && "text-3xl leading-tight sm:text-4xl",
        tone === "dark" ? "text-background" : "text-foreground",
        className,
      )}
    >
      {children}
    </h2>
  );
}
