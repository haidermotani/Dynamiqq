import { cn } from "@/lib/cn";

interface MarqueeProps {
  items: string[];
  className?: string;
}

export function Marquee({ items, className }: MarqueeProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border-y border-line bg-coal py-3",
        className,
      )}
      aria-hidden="true"
    >
      <div className="animate-marquee flex w-max items-center">
        {[0, 1].map((half) => (
          <ul
            key={half}
            className="flex shrink-0 items-center gap-8 pr-8"
            aria-hidden={half === 1 ? true : undefined}
          >
            {items.map((item) => (
              <li
                key={`${half}-${item}`}
                className="flex items-center gap-8 font-display text-sm font-extrabold uppercase tracking-[0.2em] text-muted"
              >
                {item}
                <span aria-hidden="true" className="h-2 w-2 bg-brand" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}