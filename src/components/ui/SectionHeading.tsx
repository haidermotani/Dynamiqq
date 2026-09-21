import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  align?: "left" | "right";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "right" && "ml-auto text-right",
        className,
      )}
    >
      <p className="flex items-center gap-3 font-display text-xs font-bold uppercase tracking-[0.25em] text-brand">
        <span aria-hidden="true" className="inline-block h-px w-8 bg-brand" />
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display-italic text-3xl font-black uppercase italic leading-[0.95] tracking-tight text-mist sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}