import type { ReactNode } from "react";

interface SectionProps {
  step: number;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function Section({ step, title, subtitle, children }: SectionProps) {
  return (
    <section className="border-t border-line pt-8">
      <div className="flex items-baseline gap-3">
        <span
          aria-hidden="true"
          className="font-display-italic text-2xl font-black italic text-brand"
        >
          {String(step).padStart(2, "0")}
        </span>
        <h3 className="font-display-italic text-2xl font-black uppercase italic leading-none text-mist sm:text-3xl">
          {title}
        </h3>
      </div>
      {subtitle && <p className="mt-2 max-w-xl text-sm text-muted">{subtitle}</p>}
      <div className="mt-6">{children}</div>
    </section>
  );
}