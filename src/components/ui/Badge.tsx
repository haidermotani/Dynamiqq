import { cn } from "@/lib/cn";

interface BadgeProps {
  children: string;
  className?: string;
  tone?: "brand" | "line";
}

export function Badge({ children, className, tone = "brand" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center border px-2 py-1 font-display text-[10px] font-extrabold uppercase tracking-[0.18em]",
        tone === "brand"
          ? "border-brand/40 bg-brand/10 text-brand"
          : "border-line bg-graphite text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}