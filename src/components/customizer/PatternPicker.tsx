import type { CustomizerState } from "@/components/customizer/state";
import { PATTERNS } from "@/data/designs";
import { cn } from "@/lib/cn";

interface PatternPickerProps {
  state: CustomizerState;
  onChange: (next: CustomizerState) => void;
}

export function PatternPicker({ state, onChange }: PatternPickerProps) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {PATTERNS.map((p) => {
        const active = state.pattern === p.id;
        return (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => onChange({ ...state, pattern: p.id })}
              aria-pressed={active}
              className={cn(
                "flex w-full flex-col items-start gap-1 border p-4 text-left transition-colors duration-150",
                active
                  ? "border-brand bg-brand/5"
                  : "border-line bg-coal hover:border-brand/50",
              )}
            >
              <span
                className={cn(
                  "font-display-italic text-sm font-black uppercase italic",
                  active ? "text-brand" : "text-mist",
                )}
              >
                {p.name}
              </span>
              <span className="text-xs leading-snug text-muted">{p.hint}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}